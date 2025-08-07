import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { Textarea } from "@/components/ui/textarea";
import { sendToGroq } from "@/lib/chatApi";
import { storage } from "@/utils/storage";
import { Send, Loader2 } from "lucide-react";
import ask from "../../../assets/ask.png";

const ChatBot = () => {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<{ role: string; text: string }[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const saved = storage.get().chat?.messages || [];
    if (saved.length === 0) {
      const welcome = {
        role: "ai",
        text: "Hi there! Feel free to ask me anything about the Bible, Christianity, or life in general.",
      };
      setMessages([welcome]);
      storage.set({ chat: { messages: [welcome] } });
    } else {
      setMessages(saved);
    }
  }, []);

  const handleSend = async () => {
    if (!input.trim()) return;
    const userMessage = { role: "user", text: input };
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    storage.set({ chat: { messages: updatedMessages } });
    setLoading(true);

    try {
      const aiReply = await sendToGroq({ messages: updatedMessages });
      const newMessages = [...updatedMessages, { role: "ai", text: aiReply }];
      setMessages(newMessages);
      storage.set({ chat: { messages: newMessages } });
      setInput("");
    } catch (err) {
      console.error(err);
      const errorMessages = [
        ...updatedMessages,
        { role: "ai", text: "Something went wrong. Try again." },
      ];
      setMessages(errorMessages);
      storage.set({ chat: { messages: errorMessages } });
    } finally {
      setLoading(false);
    }
  };

  const handleClear = () => {
    const welcome = {
      role: "ai",
      text: "Hi there! Feel free to ask me anything about the Bible or Christianity.",
    };
    setMessages([welcome]);
    storage.set({ chat: { messages: [welcome] } });
    setInput("");
  };

  return (
    <div className="w-full lg:px-10 px-4 nobar max-w-full 2xl:max-w-[1900px] mx-auto h-screen max-h-screen  relative">
      <div className="relative h-full flex flex-col">
        <h1 className="text-2xl font-bold mb-4 text-center text-white">Ai Chat</h1>

        {/* Chat messages area */}
        <div className="space-y-4 flex-1 overflow-y-auto chat p-4 pb-40">
          <div className="space-y-2 pt-4">
             {messages.map((m, i) => (
                         <div
                           key={i}
                           className={`text-sm mt-3 ${
                             m.role === "user" ? "flex justify-end" : " self-start "
                           }`}
                         >
                           <div
                             className={`leading-6 text-sm ${
                               m.role === "user"
                                 ? "text-white w-full lg:w-[50%] chat p-3"
                                 : "text-white w-full lg:w-[50%] full "
                             }`}
                           >
                             <strong
                               className={`font-bold  ${
                                 m.role === "user" ? "text-white " : "text-white"
                               }`}
                             >
                               {m.role === "user" ? "You:" : <img src={ask} className="w-10" />}
                             </strong>
                             <p >
                               {m.text}
                             </p>
                           </div>
                         </div>
                       ))}
          </div>
        </div>

        <div className="fixed bottom-0 left-0 w-full px-8 py-4 chat border-t border-gray-700 z-50 flex justify-center">
          <div className="flex w-full max-w-[1900px] items-end gap-2">
            <Textarea
              className="min-h-[80px] text-white flex-1"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask something about faith, life, or the Bible..."
            />
            <div className="flex gap-2">
              <Button
                className="text-black bg-white"
                onClick={handleSend}
                disabled={loading}
              >
                {loading ? (
                  <Loader2 className="h-6 w-6 animate-spin text-[black] text-center" />
                ) : (
                  <Send />
                )}
              </Button>
              {/* <Button variant="outline" onClick={handleClear} disabled={loading}>
                Clear
              </Button> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatBot;
