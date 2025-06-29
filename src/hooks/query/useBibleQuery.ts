import { useBibleStore } from "../../store/useBibleStore";
import { useQuery } from "@tanstack/react-query";

export function useBibleQuery() {
  const { selectedBook, selectedChapter } = useBibleStore();

  return useQuery({
    queryKey: ['bible', selectedBook, selectedChapter],
    queryFn: async () => {
      const response = await fetch(`https://bible-api.com/${selectedBook}+${selectedChapter}`);
      if (!response.ok) throw new Error("Failed to fetch verses");
      return response.json();
    },
  });
}
