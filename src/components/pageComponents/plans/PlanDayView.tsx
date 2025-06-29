import { useParams } from "react-router-dom";
import { usePlan } from "@/hooks/usePlan";
import { useQuery } from "@tanstack/react-query";

export default function PlanDayPage() {
  const { planId, day } = useParams();
  const { getPlanData, markDayDone } = usePlan();

  const plan = getPlanData(planId!);
  const dayNumber = Number(day);
  const dayEntry = plan?.entries.find((d) => d.day === dayNumber);

  const reference = dayEntry?.references.join(", ");
  const { data, isLoading } = useQuery({
    queryKey: ["bible", reference],
    queryFn: async () => {
      const res = await fetch(
        `https://bible-api.com/${encodeURIComponent(reference || "")}`
      );
      return res.json();
    },
    enabled: !!reference,
  });

  if (!dayEntry) return <p className="p-6">Invalid day</p>;

  return (
    <div className="p-6 max-w-2xl mx-auto space-y-4">
      <h2 className="text-xl font-bold mb-2">📖 Day {dayEntry.day}</h2>
      <p className="text-sm italic text-gray-500">{reference}</p>

      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div className="space-y-2">
          {data?.verses?.map((v: any) => (
            <p key={v.verse}>
              <strong>{v.verse}.</strong> {v.text}
            </p>
          ))}
        </div>
      )}

      <button
        className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
        onClick={() => markDayDone(planId!, dayNumber)}
      >
        ✅ Mark as Done
      </button>
    </div>
  );
}
