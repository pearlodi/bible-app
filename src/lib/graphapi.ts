// lib/groq.ts
import axios from "axios";

const GROQ_API_KEY = import.meta.env.VITE_GROQ_API_KEY;
const GROQ_ENDPOINT = import.meta.env.VITE_GROQ_ENDPOINT;

export async function sendToGroq({ messages, fileData }: {
  messages: { role: string; text: string }[];
  fileData?: any;
}) {
  const formattedMessages = [
    {
      role: "system",
      content: `Here is some data to keep in memory:\n\n${JSON.stringify(fileData)}`,
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
