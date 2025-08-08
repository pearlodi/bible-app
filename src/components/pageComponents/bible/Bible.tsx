import { useState } from "react";
import { useBibleStore } from "@/store/useBibleStore";
import { useBibleQuery } from "@/hooks/query/useBibleQuery";
import BookSelectorModal from "@/components/modals/BookSelector";
import { Button } from "@/components/ui/button";
import { useSyncBibleUrl } from "@/hooks/UseSyncBibleUrl";
import { useIsMobile } from "@/hooks/useIsMobile";
import MobileBookSelector from "@/components/shared/MobileBookSelector";
import { useBibleNavigation } from "@/hooks/useBibleNavigation";
import VerseOfTheDay from "./Votd";
import BibleActions from "@/components/shared/popover/BibleActions";

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
    <div className=" text-white overflow-scroll nobar max-h-screen h-screen">
      <div>
        <div className="w-full max-w-full 2xl:max-w-[1500px] mx-auto">
          <div className="px-4 lg:px-10">
            <VerseOfTheDay />
            <div className="lg:flex justify-between mt-8 w-full gap-4 mb-6 items-center">
              <div>
                <Button variant="secondary" className="bg-white text-black hover:bg-white cursor-pointer" onClick={() => setModalOpen(true)}>Select verse</Button>
              </div>
              <div className="flex gap-2 mt-3 lg:mt-0">
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

            <div>
              {biblePending ? (
                <div className="flex justify-center items-center h-full">
                <div className="loader"></div>
                </div>
              ) : (
                <div>
                  {data && (
                    <div
                      id={`${selectedBook}-${selectedChapter}`}
                      className="space-y-2 scroll-mt-20 card p-4"
                    >
                      <h2 className="font-semibold text-lg">
                        {data.reference}
                      </h2>

                      {data.verses.map((verse: any) => (
                        <div
                          key={verse.verse}
                          onClick={() => setSelectedVerse(verse.text)}
                          className={`cursor-pointer text-sm lg:text-base relative rounded px-2 py-1 ${
                            selectedVerse === verse.text ? "nav" : ""
                          }`}
                        >
                          <strong>{verse.verse}.</strong> {verse.text}
                          {selectedVerse === verse.text && (
                            <div className="absolute h-22 cursor-pointer top-[-50px] right-2">
                              {/* <button onClick={() => setChatOpen(true)}><img src={ask} alt="ai chat" className="w-20 "/> Ask Ai</button> */}
                              <BibleActions
                                selectedChapter={selectedChapter}
                                selectedVerse={verse.verse}
                                bibleText={verse.text}
                                selectedBook={selectedBook}
                              />
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
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
