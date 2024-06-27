import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

const openAiApiKey = process.env.OPEN_AI_API;

if (!openAiApiKey) {
  throw new Error('Missing OPEN_AI_API environment variable');
}

const openai = new OpenAI({
  apiKey: openAiApiKey,
  dangerouslyAllowBrowser: false,
});

const assistantId = process.env.ASSISTANT_ID;

if (!assistantId) {
  throw new Error('Missing ASSISTANT_ID environment variable');
}

export async function POST(req: NextRequest) {
  try {
    const { message, threadId } = await req.json();

    if (!threadId) {
      const thread = await openai.beta.threads.create();
      return NextResponse.json({ threadId: thread.id });
    }

    await openai.beta.threads.messages.create(threadId, {
      role: "user",
      content: message,
    });

    const responseChunks: { text: string; type: 'sent' | 'received' }[] = [];
    const run = openai.beta.threads.runs.stream(threadId, {
      assistant_id: assistantId || '',
    });

    run
      .on('textCreated', (text) => {
        responseChunks.push({ text: "", type: 'received' });
      })
      .on('textDelta', (textDelta) => {
        responseChunks[responseChunks.length - 1].text += textDelta.value || '';
      })
      .on('toolCallCreated', (toolCall) => {
        responseChunks.push({ text: `${toolCall.type}\n\n`, type: 'received' });
      })
      .on('toolCallDelta', (toolCallDelta) => {
        if (toolCallDelta.type === 'code_interpreter' && toolCallDelta.code_interpreter) {
          if (toolCallDelta.code_interpreter.input) {
            responseChunks.push({ text: toolCallDelta.code_interpreter?.input || '', type: 'received' });
          }
          if (toolCallDelta.code_interpreter.outputs) {
            responseChunks.push({ text: "\noutput >\n", type: 'received' });
            toolCallDelta.code_interpreter.outputs.forEach(output => {
              if (output.type === "logs" && output.logs) {
                responseChunks.push({ text: `${output.logs}\n`, type: 'received' });
              }
            });
          }
        }
      });

    return new Promise((resolve, reject) => {
      run.on('end', () => {
        resolve(NextResponse.json({ messages: responseChunks }));
      });

      run.on('error', (error) => {
        console.error("Error in streaming response:", error);
        reject(NextResponse.json({ message: 'Internal server error' }, { status: 500 }));
      });
    });
  } catch (error) {
    console.error("Error handling request:", error);
    return NextResponse.json({ message: 'Internal server error'}, { status: 500 });
  }
}
  