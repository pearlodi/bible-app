import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { bibleInOneYear } from "@/data/bible-reading";

export default function BibleReadingPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const reading = bibleInOneYear.find((r) => r.id === id);

  const [step, setStep] = useState(0);
  const passage = reading?.passages[step];

  const { data, isLoading, error } = useQuery({
    queryKey: ["bible", passage],
    queryFn: async () => {
      const res = await fetch(`https://bible-api.com/${encodeURIComponent(passage || "")}`);
      if (!res.ok) throw new Error("Failed to fetch passage");
      return res.json();
    },
    enabled: !!passage,
  });

  if (!reading) return <p className="p-6">Invalid reading ID</p>;

  const markAsDone = () => {
    const done = JSON.parse(localStorage.getItem("bible-reading-done") || "[]");
    if (!done.includes(id)) {
      localStorage.setItem("bible-reading-done", JSON.stringify([...done, id]));
    }
    navigate("/bible-reading"); 
  };

  return (
    <div className="w-full px-4 lg:px-10 max-h-screen  lg:h-screen nobar overflow-auto max-w-full 2xl:max-w-[1500px] mx-auto">
      <div className=" chat text-white p-6">
      <h2 className="text-xl font-bold">📖 Reading for {reading.date}</h2>
      <p className="text-sm italic text-[#ffffffad]">{passage}</p>

      {isLoading ? (
        <p>Loading Bible passage...</p>
      ) : error ? (
        <p className="text-red-500">Error loading passage</p>
      ) : (
        <div className="leading-[40px]">
          {data?.verses?.map((v: any) => (
            <p className="text-white" key={`${v.chapter}-${v.verse}`}>
              <strong>{v.verse}.</strong> {v.text}
            </p>
          ))}
        </div>
      )}

      <div className="pt-6">
        {step < reading.passages.length - 1 ? (
          <button
            className="bg-[green] text-white px-4 py-2 rounded hover:bg-blue-700"
            onClick={() => setStep((prev) => prev + 1)}
          >
            Next
          </button>
        ) : (
          <button
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            onClick={markAsDone}
          >
            ✅ Mark as Done
          </button>
        )}
      </div>
    </div>
    </div>
  );
}
