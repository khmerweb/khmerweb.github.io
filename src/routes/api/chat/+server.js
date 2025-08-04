// src/routes/api/chat/+server.js
  import { deepseek } from '@ai-sdk/deepseek';
  import { streamText } from 'ai';
  import { DEEPSEEK_API_KEY } from '$env/static/private'; // Import your API key

  export async function POST({ request }) {
    const { messages } = await request.json();
    const result = streamText({
      model: deepseek('deepseek-reasoner', { apiKey: DEEPSEEK_API_KEY }),
      messages,
    });

    return new Response(result, {
    headers: {
      'Content-Type': 'text/plain',
      'Transfer-Encoding': 'chunked'
    }
  });
  }