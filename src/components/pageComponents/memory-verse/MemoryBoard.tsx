// import { memoryVerses } from "@/data/memorise";
// import { DndProvider } from "react-dnd";
// import { HTML5Backend } from "react-dnd-html5-backend";
// import { MemoryColumn } from "./MemoryColumn";
// import type { MemoryStatus } from "@/types/memory";
// import { useMemorise } from "@/hooks/useMemorise";

// export default function PlanBoard() {
//   const { getStatus, selectMemorise, removeMemorise } = useMemorise();

//   const categorized = memoryVerses.reduce<Record<MemoryStatus, typeof memoryVerses>>(
//     (acc, plan) => {
//       const status = getStatus(plan.id);
//       acc[status].push(plan); 
//       return acc;
//     },
//     {
//       available: [],
//       memorizing: [],
//       completed: [],
//     }
//   );

//   const setStatus = (id: string, newStatus: MemoryStatus) => {
//     if (newStatus === "memorizing") return selectMemorise(id); 
//     if (newStatus === "completed") return removeMemorise(id);
//     if (newStatus === "available") return removeMemorise(id); 
//   };
  

//   return (
//   <div className="p-8">
//       <DndProvider backend={HTML5Backend}  >
//       <div className="flex flex-col md:flex-row gap-4 p-4 card">
//         <MemoryColumn title="Memory verses" status="available" plans={categorized.available} onDropPlan={setStatus} />
//         <MemoryColumn title="Memorizing" status="memorizing" plans={categorized.memorizing} onDropPlan={setStatus} />
//         <MemoryColumn title="Memorized" status="completed" plans={categorized.completed} onDropPlan={setStatus} />
//       </div>
//     </DndProvider>
//   </div>
//   );
// }
import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { MemoryColumn } from "./MemoryColumn";
import type { MemoryStatus } from "@/types/memory";
import { useMemorise } from "@/hooks/useMemorise";


import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { filterMemoryVersesByMonth, getMemoryMonths } from "@/utils/memoryVerse";

export default function PlanBoard() {
  const { getStatus, selectMemorise, removeMemorise } = useMemorise();
  const [searchParams, setSearchParams] = useSearchParams();
  const monthFromParams = searchParams.get("month");

  const [selectedMonth, setSelectedMonth] = useState<string | null>(
    monthFromParams || null
  );

  const filteredVerses = filterMemoryVersesByMonth(selectedMonth);
  const { monthKeys, monthMap } = getMemoryMonths();

  const categorized = filteredVerses.reduce<Record<MemoryStatus, typeof filteredVerses>>(
    (acc, plan) => {
      const status = getStatus(plan.id);
      acc[status].push(plan);
      return acc;
    },
    {
      available: [],
      memorizing: [],
      completed: [],
    }
  );

  const setStatus = (id: string, newStatus: MemoryStatus) => {
    if (newStatus === "memorizing") return selectMemorise(id);
    if (newStatus === "completed") return removeMemorise(id);
    if (newStatus === "available") return removeMemorise(id);
  };

  const handleMonthChange = (value: string) => {
    if (value === "all") {
      setSelectedMonth(null);
      setSearchParams({});
    } else {
      setSelectedMonth(value);
      setSearchParams({ month: value });
    }
  };

  return (
    <div>
      <div>
        <Select value={selectedMonth ?? undefined} onValueChange={handleMonthChange}>
          <SelectTrigger className="bg-white font-semibole mt-3 !text-black">
            <SelectValue placeholder="Select month" className="text-black bg-[white]" />
          </SelectTrigger>
          <SelectContent>
            {/* <SelectItem value="al" className="text-white">All Months</SelectItem> */}
            {monthKeys.map((key) => (
              <SelectItem key={key} value={key}>
                {monthMap[key]}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <DndProvider backend={HTML5Backend}>
        <div className="flex  mt-8 flex-col md:flex-row gap-4 card p-4">
          <MemoryColumn
            title="Memory Verses"
            status="available"
            plans={categorized.available}
            onDropPlan={setStatus}
          />
          <MemoryColumn
            title="Memorizing"
            status="memorizing"
            plans={categorized.memorizing}
            onDropPlan={setStatus}
          />
          <MemoryColumn
            title="Memorized"
            status="completed"
            plans={categorized.completed}
            onDropPlan={setStatus}
          />
        </div>
      </DndProvider>
    </div>
  );
}
