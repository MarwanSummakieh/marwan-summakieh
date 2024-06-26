"use client";

import React, { useState, useEffect, useRef } from 'react';
import openai from '../utils/openai';
import { ThemeProvider } from './ThemeProvider';
import { PlaceholdersAndVanishInput } from './ui/PlaceholdersAndVanishInput';
import { Spotlight } from './ui/Spotlight';
import Image from 'next/image';

interface Message {
  text: string;
  type: 'sent' | 'received';
}

const Chat: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState<string>('');
  const [threadId, setThreadId] = useState<string | null>(null);
  const [imageSrc, setImageSrc] = useState<string>('/imojies/hey.png');
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const currentMessageRef = useRef<string>("");

  const placeholders = [
    "What's your experience in software engineering?",
    "Can you tell me more about your projects?",
    "What technologies do you specialize in?",
    "How can I contact you?",
  ];

  useEffect(() => {
    const createNewThread = async () => {
      try {
        const thread = await openai.beta.threads.create();
        setThreadId(thread.id);
      } catch (error) {
        console.error("Error creating new thread:", (error as Error).message);
        setImageSrc('/imojies/oops.png');
      }
    };

    createNewThread();
  }, []);

  const handleSend = async (message: string) => {
    if (message.trim() && threadId) {
      setMessages((prevMessages) => [...prevMessages, { text: message, type: 'sent' }]);
      setImageSrc('/imojies/hmmm.png');
      await sendMessageToOpenAI(message);
    }
  };

  const sendMessageToOpenAI = async (message: string) => {
    if (!threadId) return; // Ensure threadId is defined

    try {
      await openai.beta.threads.messages.create(threadId, {
        role: "user",
        content: message,
      });

      currentMessageRef.current = "";

      const run = openai.beta.threads.runs.stream(threadId, {
        assistant_id: process.env.ASSISTANT_ID || ''
      });

      run
        .on('textCreated', (text) => {
          currentMessageRef.current = "";
          setMessages((prevMessages) => [...prevMessages, { text: "", type: 'received' }]);
        })
        .on('textDelta', (textDelta, snapshot) => {
          currentMessageRef.current += textDelta.value || '';
          setMessages((prevMessages) => {
            const newMessages = [...prevMessages];
            const lastMessageIndex = newMessages.length - 1;
            if (lastMessageIndex >= 0 && newMessages[lastMessageIndex].type === 'received') {
              newMessages[lastMessageIndex].text = currentMessageRef.current;
            } else {
              newMessages.push({ text: currentMessageRef.current, type: 'received' });
            }
            return newMessages;
          });
          setImageSrc('/imojies/smiling.png');
        })
        .on('toolCallCreated', (toolCall) => {
          setMessages((prevMessages) => [...prevMessages, { text: `${toolCall.type}\n\n`, type: 'received' }]);
          setImageSrc('/imojies/smiling.png');
        })
        .on('toolCallDelta', (toolCallDelta, snapshot) => {
          if (toolCallDelta.type === 'code_interpreter' && toolCallDelta.code_interpreter) {
            if (toolCallDelta.code_interpreter.input) {
              setMessages((prevMessages) => [...prevMessages, { text: toolCallDelta.code_interpreter?.input || '', type: 'received' }]);
            }
            if (toolCallDelta.code_interpreter.outputs) {
              setMessages((prevMessages) => {
                const newMessages = [...prevMessages];
                newMessages.push({ text: "\noutput >\n", type: 'received' });
                toolCallDelta.code_interpreter?.outputs?.forEach(output => {
                  if (output.type === "logs" && output.logs) {
                    newMessages.push({ text: `${output.logs}\n`, type: 'received' });
                  }
                });
                return newMessages;
              });
            }
          }
          setImageSrc('/imojies/smiling.png');
        });
    } catch (error) {
      console.error("Error calling OpenAI API:", (error as Error).message);
      setMessages((prevMessages) => [...prevMessages, { text: "Sorry, I couldn't process your request. " + (error as Error).message, type: 'received' }]);
      setImageSrc('/imojies/oops.png');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleSend(inputValue);
    setInputValue('');
  };

  useEffect(() => {
    const chatContainer = chatContainerRef.current;
    if (chatContainer) {
      chatContainer.scrollTop = chatContainer.scrollHeight;
    }
  }, [messages]);

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem
      disableTransitionOnChange
    >
      <div>
          <Spotlight className="-top-40 -left-10 md:-left-32 md:-top-20 h-screen" fill="white" />
          <Spotlight className="-top-10 -left-full h-[80vh] w-[50vw]" fill="purple" />
          <Spotlight className="top-28 left-80 h-[80vh] w-[50vw]" fill="blue" />
        </div>
      <h2 className="text-center text-xl font-bold mt-16">Chat with Marwan</h2>
      <div className="relative flex mb-32 justify-center items-center h-[85vh]">
        <div className="flex flex-col md:flex-row w-full max-w-6xl h-full items-center justify-between space-x-0 md:space-x-4 p-4">
          <div className="flex-1 mb-10 md:mb-0 flex items-end justify-center">
            <Image
              src={imageSrc}
              alt="Chat Illustration"
              objectFit="cover"
              width={500}
              height={500}
              className="rounded-2xl"
            />
          </div>
          <div className="flex-1 h-full flex flex-col justify-between shadow-lg p-4">
            <div
              id="chat-container"
              ref={chatContainerRef}
              className="relative flex-grow overflow-y-auto p-4 rounded-2xl mb-4 w-full h-full scrollbar-hide"
            >
              <div
                id="top-fade"
                className="absolute top-0 left-0 right-0 h-8 bg-gradient-to-b from-gray-100 dark:from-gray-800 to-transparent pointer-events-none z-10 opacity-0 transition-opacity duration-300"
              ></div>
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`flex mb-2 ${msg.type === 'sent' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-xs p-3 rounded-2xl ${
                      msg.type === 'sent' ? 'bg-blue-500 text-white' : 'bg-cyan-800 text-white'
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
              <div
                id="bottom-fade"
                className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-gray-100 dark:from-gray-800 to-transparent pointer-events-none z-10 opacity-0 transition-opacity duration-300"
              ></div>
            </div>
            <div className="w-full">
              <PlaceholdersAndVanishInput
                placeholders={placeholders}
                onChange={handleChange}
                onSubmit={handleSubmit}
              />
            </div>
          </div>
        </div>
      </div>
      <style jsx global>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none; /* IE and Edge */
          scrollbar-width: none; /* Firefox */
        }
      `}</style>
    </ThemeProvider>
  );
};

export default Chat;
