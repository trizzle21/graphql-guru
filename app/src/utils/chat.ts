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
              content: "You are a wise sage that outputs graphql queries"
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

export async function introspectGraphql(url = "/graphql", data = {}) {
  const response = await fetch(url, {
    method: "POST",
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    redirect: "follow",
    referrerPolicy: "no-referrer", 
    body: JSON.stringify(data),
  });
  return response.json(); // parses JSON response into native JavaScript objects
}
