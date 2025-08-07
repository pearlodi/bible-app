import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog";
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
      <DialogContent className="!max-w-[1200px] !w-[1200px] bg-[white] ">
        <DialogHeader>
        <DialogTitle></DialogTitle>
        <DialogDescription></DialogDescription>
        </DialogHeader>

        {pendingBook ? (
          <ChapterSelector onClose={onClose} />
        ) : (
          <BookTabs />
        )}
      </DialogContent>
    </Dialog>
  );
}
