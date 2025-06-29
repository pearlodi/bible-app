// src/hooks/useBibleNavigation.ts

import { useBibleStore } from "../store/useBibleStore";
import { books } from "@/data/books";

export function useBibleNavigation() {
  const { selectedBook, selectedChapter, setBook, setChapter } = useBibleStore();

  const currentBookIndex = books.findIndex((b) => b.name === selectedBook);
  const currentBook = books[currentBookIndex];

  const isFirstChapter = selectedChapter === 1;
  const isLastChapter = selectedChapter >= currentBook?.chapters;

  const hasPreviousBook = currentBookIndex > 0;
  const hasNextBook = currentBookIndex < books.length - 1;

  const goToNext = () => {
    if (!isLastChapter) {
      setChapter(selectedChapter + 1);
    } else if (hasNextBook) {
      const nextBook = books[currentBookIndex + 1];
      setBook(nextBook.name);
      setChapter(1);
    }
  };

  const goToPrevious = () => {
    if (!isFirstChapter) {
      setChapter(selectedChapter - 1);
    } else if (hasPreviousBook) {
      const prevBook = books[currentBookIndex - 1];
      setBook(prevBook.name);
      setChapter(prevBook.chapters);
    }
  };

  return {
    goToNext,
    goToPrevious,
    isFirstChapter,
    isLastChapter,
    hasNextBook,
    hasPreviousBook,
  };
}
