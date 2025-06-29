import { useVerseOfTheDay } from "@/hooks/query/useVerseOfTheDay";

// src/components/VerseOfTheDay.tsx
export default function VerseOfTheDay() {
  const { data, isLoading, error } = useVerseOfTheDay();

  if (isLoading) return <p>Loading verse...</p>;
  if (error) return <p>Couldn't load verse. Try again later.</p>;

  return (
    <div className="bg-yellow-100 p-4 rounded shadow">
      <h2 className="font-bold text-lg mb-2">Verse of the Day</h2>
      <p className="text-gray-800 italic">"{data?.text}"</p>
      <p className="text-right font-semibold mt-2">— {data?.reference}</p>
    </div>
  );
}
