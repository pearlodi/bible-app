import { useRef, useState } from "react";
import { useDrag } from "react-dnd";
import type { MemoryMeta, MemoryStatus } from "@/types/memory";
import { MemoryVerseComplete } from "@/components/modals/MemoryVerseComplete";

export default function MemoryCard({
  memory,
  status,
  onStart,
}: {
  memory: MemoryMeta;
  status: MemoryStatus;
  onStart?: () => void;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [openMemoryComplete,  setOpenMemoryComplete] = useState(false)
  const [, drag] = useDrag(() => ({
    type: "plan",
    item: { id: memory.id },
  }));

  drag(ref);

  return (
    <div
      ref={ref}
      className={`shadow p-3 rounded cursor-move border border-gray-300 space-y-2 ${
        status === "completed" ? "bg-white" : "bg-[white]"
      }`}
    >
    <div className="flex justify-between items-center">
    <h4 className="font-semibold">{memory.verse}</h4>
    <h4 className="font-normal text-xs" >{memory.date}</h4>
    </div>
      <p className="text-sm text-gray-600">{memory.text}</p>

      {status === "available" && (
        <button
          className="text-sm bg-[#008000d6] text-[white] px-3 py-1 rounded  "
          onClick={onStart}
        >
          Start Memorizing
        </button>
      )}
      {status === "memorizing" && (
        <button className="text-sm bg-[#008000d6] text-[white] px-3 py-1 rounded" onClick={() => setOpenMemoryComplete(true)}>Done </button>
      )}
      <MemoryVerseComplete open={openMemoryComplete} onClose={()=> setOpenMemoryComplete(false)} verse={memory.text} id={memory.id}/>
    </div>
  );
}
