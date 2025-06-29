import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useBibleStore } from "@/store/useBibleStore";
import ChapterSelector from "../shared/ChapterSelector";
import BookTabs from "../shared/BookTab";
import { DialogDescription, DialogTitle } from "@radix-ui/react-dialog";
type Props = {
  open: boolean;
  onClose: () => void;
};

export default function BookSelectorModal({ open, onClose }: Props) {
  const { pendingBook } = useBibleStore();

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl w-full">
        <DialogTitle></DialogTitle>
        <DialogDescription></DialogDescription>

        {pendingBook ? (
          <ChapterSelector onClose={onClose} />
        ) : (
          <BookTabs />
        )}
      </DialogContent>
    </Dialog>
  );
}
