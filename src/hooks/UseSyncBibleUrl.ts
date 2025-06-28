import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useBibleStore } from "@/hooks/useBibleStore";

export function useSyncBibleUrl() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { selectedBook, selectedChapter, setBook, setChapter } = useBibleStore();

  useEffect(() => {
    const book = searchParams.get("book");
    const chapter = searchParams.get("chapter");

    if (book && chapter) {
      setBook(book);
      setChapter(Number(chapter));
    } else {
      setBook("Genesis");
      setChapter(1);
      setSearchParams({ book: "Genesis", chapter: "1" });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (selectedBook && selectedChapter) {
      setSearchParams({ book: selectedBook, chapter: String(selectedChapter) });
    }
  }, [selectedBook, selectedChapter, setSearchParams]);
}
