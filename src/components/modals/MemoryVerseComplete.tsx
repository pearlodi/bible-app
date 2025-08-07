import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useMemorise } from "@/hooks/useMemorise";
import { useState } from "react";

type MemoryProps = {
  open: boolean;
  onClose: () => void;
  verse?: string;
  id:string
};

export function MemoryVerseComplete({ open, onClose, verse = "", id }: MemoryProps) {
  const [inputVerse, setInputVerse] = useState("");
  const [feedback, setFeedback] = useState<"success" | "almost" | "failed" | null>(null);
const {markAsCompleted} = useMemorise()
  const handleSubmit = () => {
    const similarity = calculateSimilarity(verse, inputVerse);

    if (similarity >= 0.9) {
      console.log("successes");
      setFeedback("success");
        markAsCompleted((id)); 
    } else if (similarity >= 0.7) {
      console.log("almost there");
      setFeedback("almost");
    } else {
      console.log("failed");
      setFeedback("failed");
    }
  };

  const calculateSimilarity = (original: string, userInput: string): number => {
    const normalize = (str: string) =>
      str
        .toLowerCase()
        .replace(/[^\w\s]/g, "")
        .split(/\s+/)
        .filter(Boolean);

    const originalWords = normalize(original);
    const inputWords = normalize(userInput);

    if (originalWords.length === 0) return 0;

    let matchCount = 0;
    for (const word of inputWords) {
      if (originalWords.includes(word)) {
        matchCount++;
      }
    }

    return matchCount / originalWords.length;
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            {/* {verse} */}
            </DialogTitle>
          <DialogDescription>
            Type the verse from memory. If it matches at least 80%, you'll succeed!
          </DialogDescription>
        </DialogHeader>

        {feedback !== null && (
          <p
            className={`text-sm ${
              feedback === "success"
                ? "text-green-600"
                : feedback === "almost"
                ? "text-yellow-600"
                : "text-red-600"
            }`}
          >
            {feedback === "success"
              ? "✅ Success"
              : feedback === "almost"
              ? "🟡 Almost there"
              : "❌ Failed"}
          </p>
        )}

        <div className="grid gap-4 mt-2">
          <div className="grid gap-3">
            <Label htmlFor="verse-input">Enter Verse</Label>
            <Input
              id="verse-input"
              value={inputVerse}
              onChange={(e) => setInputVerse(e.target.value)}
            />
          </div>
        </div>

        <DialogFooter>
          <Button type="button" variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button type="button" onClick={handleSubmit}>
            Submit
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
