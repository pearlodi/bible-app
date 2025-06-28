import { create } from 'zustand';

type BibleStore = {
    selectedBook: string;
    selectedChapter: number;
    pendingBook: string | null;
    setBook: (book: string) => void;
    setChapter: (chapter: number) => void;
    setPendingBook: (book: string | null) => void;
    finalizeSelection: (chapter: number) => void;
  };
  
  export const useBibleStore = create<BibleStore>((set, get) => ({
    selectedBook: "Genesis",
    selectedChapter: 1,
    pendingBook: null,
    setBook: (book) => set({ selectedBook: book, selectedChapter: 1 }),
    setChapter: (chapter) => set({ selectedChapter: chapter }),
    setPendingBook: (book) => set({ pendingBook: book }),
    finalizeSelection: (chapter) =>
      set({
        selectedBook: get().pendingBook || get().selectedBook,
        selectedChapter: chapter,
        pendingBook: null,
      }),
  }));
  