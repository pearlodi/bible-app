import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerClose,
  DrawerDescription,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { Textarea } from "@/components/ui/textarea";
import { sendToGroq } from "@/lib/graphapi";
import { storage } from "@/utils/storage";
import { Loader2, Send, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import ReactMarkdown from "react-markdown";

type Props = {
  verse: string;
  open: boolean;
  onClose: () => void;
};

export default function VerseChatDrawer({ verse, open, onClose }: Props) {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<{ role: string; text: string }[]>(
    []
  );
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (open) {
      setInput("");
      const savedChats = storage.get().verseChats || {};
      if (savedChats[verse]) {
        setMessages(savedChats[verse]);
      } else {
        setMessages([
          {
            role: "ai",
            text: `Hi! You can ask me anything about the verse: `,
          },
        ]);
      }
    }
  }, [verse, open]);

  const saveMessagesToStorage = (
    newMessages: { role: string; text: string }[]
  ) => {
    const current = storage.get().verseChats || {};
    current[verse] = newMessages;
    storage.set({ verseChats: current });
  };

  const handleSend = async () => {
    if (!input.trim()) return;
    const userMessage = { role: "user", text: input };
    const updated = [...messages, userMessage];
    setMessages(updated);
    saveMessagesToStorage(updated);
    setLoading(true);

    try {
      const aiReply = await sendToGroq({
        messages: updated,
        fileData: { selectedVerse: verse },
      });
      const finalMessages = [...updated, { role: "ai", text: aiReply }];
      setMessages(finalMessages);
      saveMessagesToStorage(finalMessages);
      setInput("");
    } catch (err) {
      console.error(err);
      const fallback = [
        ...updated,
        { role: "ai", text: "Something went wrong. Try again." },
      ];
      setMessages(fallback);
      saveMessagesToStorage(fallback);
    } finally {
      setLoading(false);
    }
  };

  const handleClear = () => {
    const welcome = {
      role: "ai",
      text: `Hi! You can ask me anything about the verse: `,
    };
    setMessages([welcome]);
    saveMessagesToStorage([welcome]);
    setInput("");
  };

  return (
    <Drawer direction="right" open={open} onClose={onClose}>
      <DrawerContent className="h-full !w-full lg:w-fit !max-w-full lg:!max-w-[500px] overflow-hidden  p-5">
      <DrawerHeader className="hidden">
              <DrawerTitle></DrawerTitle>
              <DrawerDescription>
              </DrawerDescription>
            </DrawerHeader>
        <div className="w-full flex items-center justify-between">
          <button
            onClick={handleClear}
            disabled={loading}
            className="bg-[#d500005d] font-medium text-[red] px-2 py-1 text-sm rounded-lg"
          >
            Clear chat
          </button>
          <DrawerClose className="self-end" asChild>
            <Button variant="ghost" className="">
              <X />
            </Button>
          </DrawerClose>
        </div>
        <DrawerHeader className="py-0 mt-3">
          <DrawerTitle className="text-lg py-0"></DrawerTitle>
        </DrawerHeader>
        <div className="w-full">
          <div className=" pt-4 max-h-[75vh] w-full overflow-scroll">
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
                      ? "text-white w-[90%] chat p-3"
                      : "text-gray-700 full "
                  }`}
                >
                  <strong
                    className={`font-bold ${
                      m.role === "user" ? "text-white " : "text-black"
                    }`}
                  >
                    {m.role === "user" ? "You" : "AI"}:
                  </strong>
                  <ReactMarkdown>{m.text}</ReactMarkdown>
                </div>
              </div>
            ))}
          </div>

          <div></div>
          <div
            className={`flex w-[90%] items-center gap-2 fixed bottom-10 ${
              verse && messages.length < 2 && "bg-white"
            }`}
          >
              <div
                className={` w-full ${
                  verse && messages.length < 2 && "aichat pt-5 px-2 z-10 w-full"
                }`}
              >
                {verse && messages.length < 2 && (
                  <p className="pb-2 text-white text-[13px]">{verse}</p>
                )}
                <Textarea
                  className="max-h-[100px]  bg-white w-full"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask a question based on the verse..."
                />
              </div>
              <div className="">
                <button onClick={handleSend} disabled={loading}>
                  {loading ? (
                    <div>
                  <Loader2 className="h-6 w-6 animate-spin text-[black] text-center" />

                    </div>
                  ) : (
                    <div className="chat p-3">
                      <Send className="w-5 h-5  text-white" />
                    </div>
                  )}
                </button>
              </div>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
