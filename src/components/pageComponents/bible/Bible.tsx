import { useState } from "react";
import { useBibleStore } from "@/store/useBibleStore";
import { useBibleQuery } from "@/hooks/query/useBibleQuery";
import BookSelectorModal from "@/components/modals/BookSelector";
import { Button } from "@/components/ui/button";
import { useSyncBibleUrl } from "@/hooks/UseSyncBibleUrl";
import { useIsMobile } from "@/hooks/useIsMobile";
import MobileBookSelector from "@/components/shared/MobileBookSelector";
import { useBibleNavigation } from "@/hooks/useBibleNavigation";

export default function Bible() {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedVerse, setSelectedVerse] = useState("");
  const { selectedBook, selectedChapter } = useBibleStore();
  const {
    goToNext,
    goToPrevious,
    isFirstChapter,
    isLastChapter,
    hasNextBook,
    hasPreviousBook,
  } = useBibleNavigation();

  const { data, isPending: biblePending } = useBibleQuery();
  const isMobile = useIsMobile();
  useSyncBibleUrl();

  return (
    <div className="">
      <div>
        {biblePending ? (
          "loading"
        ) : (
          <div>
         <div>

            <div className="flex gap-4 mb-6 items-center">
              <Button onClick={() => setModalOpen(true)}>
                {selectedBook
                  ? `${selectedBook} ${selectedChapter}`
                  : "Select Book"}
              </Button>
              <Button
                variant="secondary"
                onClick={goToPrevious}
                disabled={!hasPreviousBook && isFirstChapter}
              >
                Previous Chapter
              </Button>

              <Button
                variant="secondary"
                onClick={goToNext}
                disabled={!hasNextBook && isLastChapter}
              >
                Next Chapter
              </Button>
            </div>

            {data && (
              <div
                id={`${selectedBook}-${selectedChapter}`}
                className="space-y-2 scroll-mt-20"
              >
                <h2 className="font-semibold text-lg">{data.reference}</h2>

                {data.verses.map((verse: any) => (
                  <p
                    key={verse.verse}
                    onClick={() => setSelectedVerse(verse.text)}
                    className={`cursor-pointer rounded px-2 py-1 ${
                      selectedVerse === verse.text
                        ? "bg-yellow-300"
                        : "bg-green-100"
                    }`}
                  >
                    <strong>{verse.verse}.</strong> {verse.text}
                  </p>
                ))}
              </div>
            )}
            </div>
            <div className="flex justify-center gap-4  items-center fixed bottom-0 bg-[green] w-full">
              <Button onClick={() => setModalOpen(true)}>
                {selectedBook
                  ? `${selectedBook} ${selectedChapter}`
                  : "Select Book"}
              </Button>
              <Button
                variant="secondary"
                onClick={goToPrevious}
                disabled={!hasPreviousBook && isFirstChapter}
              >
                Previous Chapter
              </Button>

              <Button
                variant="secondary"
                onClick={goToNext}
                disabled={!hasNextBook && isLastChapter}
              >
                Next Chapter
              </Button>
            </div>

          </div>
        )}
      </div>



      {isMobile ? (
        <MobileBookSelector
          open={modalOpen}
          onClose={() => setModalOpen(false)}
        />
      ) : (
        <BookSelectorModal
          open={modalOpen}
          onClose={() => setModalOpen(false)}
        />
      )}
    </div>
  );
}
