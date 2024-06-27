import OpenAI from 'openai';

const key = process.env.OPEN_AI_API
const openai = new OpenAI({
  apiKey: "sk-may-service-account-4O2BN7EsJx6icyqRUGnQT3BlbkFJtAUqnij4nWXWDtJnkT6s", dangerouslyAllowBrowser: true
});

export default openai