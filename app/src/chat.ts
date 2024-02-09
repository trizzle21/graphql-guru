import OpenAI from "openai";

const apiKey = process.env.REACT_APP_OPENAI_API_KEY;
const organization = process.env.REACT_APP_OPENAI_ORG_ID;


const openai: OpenAI = new OpenAI({
    apiKey,
    organization,
    dangerouslyAllowBrowser: true
});
  
export const post = async (query: string, schema: string) => {
    try {
      const response: OpenAI.Chat.Completions.ChatCompletion = await openai.chat.completions.create({
          model: 'gpt-4',
          messages: [
            {
              role: "system",
              content: "You are a helpful assistent designed to output only formatted graphql."
            },
            {
              role: "system",
              content: `here is the graphql schema you should use ${schema}`
            },
            {
                role: 'user',
                content: query
            }
        ],
      });
      return response['choices'][0]['message']['content'];
    } catch (error) {
        console.error('OpenAI API error:', error);
        return 'ERROR';
      }
}
