import { useState } from "react";
import { useBibleStore } from "@/hooks/useBibleStore";
import { useBibleQuery } from "@/hooks/useBibleQuery";
import BookSelectorModal from "@/components/modals/BookSelector";
import { Button } from "@/components/ui/button";
import { useSyncBibleUrl } from "@/hooks/UseSyncBibleUrl";
import { useIsMobile } from "@/hooks/useIsMobile";
import MobileBookSelector from "@/components/shared/MobileBookSelector";

export default function Bible() {
  const [modalOpen, setModalOpen] = useState(false);

  const { selectedBook, selectedChapter } = useBibleStore();
  const { data } = useBibleQuery();
const isMobile = useIsMobile()
  useSyncBibleUrl();

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <div className="flex gap-4 mb-6">
        <Button onClick={() => setModalOpen(true)}>
          {selectedBook ? `${selectedBook} ${selectedChapter}` : "Select Book"}
        </Button>
      </div>

      {data && (
        <div
          id={`${selectedBook}-${selectedChapter}`}
          className="space-y-2 scroll-mt-20"
        >
          <h2 className="font-semibold text-lg">{data.reference}</h2>
          {data.verses.map((verse: any) => (
            <p key={verse.verse}>
              <strong>{verse.verse}.</strong> {verse.text}
            </p>
          ))}
        </div>
      )}

      {/* <BookSelectorModal
        open={modalOpen}
        onClose={() => {
          setModalOpen(false);
        }}
      /> */}
      {isMobile ? (
  <MobileBookSelector open={modalOpen}   onClose={() => {
    setModalOpen(false);
  }}/>
) : (
  <BookSelectorModal open={modalOpen}   onClose={() => {
    setModalOpen(false);
  }} />
)}

    </div>
  );
}
