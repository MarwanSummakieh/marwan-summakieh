import OpenAI from 'openai';

const key = process.env.NEXT_PUBLIC_OPEN_AI_API
const openai = new OpenAI({
  apiKey: key, dangerouslyAllowBrowser: true
});

export default openai