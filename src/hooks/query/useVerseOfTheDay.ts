// src/hooks/useVerseOfTheDay.ts
import { useQuery } from "@tanstack/react-query";

type Verse = {
  text: string;
  reference: string;
};

export function useVerseOfTheDay() {
  return useQuery<Verse>({
    queryKey: ["verse-of-the-day"],
    queryFn: async () => {
      const res = await fetch(
        "https://beta.ourmanna.com/api/v1/get/?format=json&order=daily"
      );
      if (!res.ok) throw new Error("Failed to fetch verse of the day");
      const data = await res.json();
      return {
        text: data.verse.details.text,
        reference: data.verse.details.reference,
      };
    },
    staleTime: 1000 * 60 * 60 * 24, // 24 hours
  });
}
