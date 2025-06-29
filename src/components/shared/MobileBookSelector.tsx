import { useEffect, useMemo, useState } from "react";
import Picker from "react-mobile-picker";
import { books } from "@/data/books";
import { useBibleStore } from "@/store/useBibleStore";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { DialogDescription, DialogTitle } from "@radix-ui/react-dialog";

type Props = {
  open: boolean;
  onClose: () => void;
};

export default function MobileBookSelector({ open, onClose }: Props) {
  const { selectedBook, selectedChapter, setBook, setChapter } = useBibleStore();

  const [pickerValue, setPickerValue] = useState({
    book: selectedBook,
    chapter: String(selectedChapter),
  });

  const chapterOptions = useMemo(() => {
    const selected = books.find((b) => b.name === pickerValue.book);
    return selected ? Array.from({ length: selected.chapters }, (_, i) => String(i + 1)) : [];
  }, [pickerValue.book]);

  useEffect(() => {
    const selected = books.find((b) => b.name === pickerValue.book);
    if (selected && Number(pickerValue.chapter) > selected.chapters) {
      setPickerValue((prev) => ({ ...prev, chapter: "1" }));
    }
  }, [pickerValue.book]);

  const handleConfirm = () => {
    setBook(pickerValue.book);
    setChapter(Number(pickerValue.chapter));
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[320px] w-full">
        <DialogTitle></DialogTitle>
        <DialogDescription></DialogDescription>
        <div className="text-center mb-4 font-semibold">Select Book & Chapter</div>
        <Picker value={pickerValue} onChange={setPickerValue}>
          <Picker.Column name="book">
            {books.map((book) => (
              <Picker.Item key={book.name} value={book.name}>
                {book.name}
              </Picker.Item>
            ))}
          </Picker.Column>
          <Picker.Column name="chapter">
            {chapterOptions.map((num) => (
              <Picker.Item key={num} value={num}>
                {num}
              </Picker.Item>
            ))}
          </Picker.Column>
        </Picker>

        <div className="flex justify-center mt-6">
          <Button onClick={handleConfirm}>Confirm</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
