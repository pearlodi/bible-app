// lib/groq.ts
import axios from "axios";

const GROQ_API_KEY = import.meta.env.VITE_GROQ_API_KEY;
const GROQ_ENDPOINT = import.meta.env.VITE_GROQ_ENDPOINT;

export async function sendToGroq({ messages }: {
  messages: { role: string; text: string }[];
}) {
    const formattedMessages = [
        {
          role: "system",
          content: `You are a helpful, friendly assistant who answers questions and engages in conversation based on Christian and biblical principles. Keep your tone warm and understanding.`,
        },
        ...messages.map((msg) => ({
          role: msg.role === "ai" ? "assistant" : "user",
          content: msg.text,
        })),
      ];
      
  const response = await axios.post(
    GROQ_ENDPOINT,
    {
      model: "llama-3.3-70b-versatile",
      messages: formattedMessages,
    },
    {
      headers: {
        Authorization: `Bearer ${GROQ_API_KEY}`,
        "Content-Type": "application/json",
      },
    }
  );

  return response.data.choices[0].message.content;
}
