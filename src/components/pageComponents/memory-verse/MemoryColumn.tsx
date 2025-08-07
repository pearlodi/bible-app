import { useRef } from "react";
import { useDrop } from "react-dnd";
import type { MemoryMeta, MemoryStatus } from "@/types/memory";
import MemoryCard from "./MemoryCard";
import badge from '../../../assets/badge.png'
type ColumnProps = {
  title: string;
  status: MemoryStatus;
  plans: MemoryMeta[];
  onDropPlan: (id: string, newStatus: MemoryStatus) => void;
  canDrop?: boolean;
};

export function MemoryColumn({
  title,
  status,
  plans,
  onDropPlan,
}: ColumnProps) {
  const ref = useRef<HTMLDivElement | null>(null);

  const [, drop] = useDrop({
    accept: "plan",
    canDrop: () => status !== "completed",

    drop: (item: { id: string }) => onDropPlan(item.id, status),
  });

  drop(ref);

  return (
    <div className="w-full md:w-1/3 p-2 overflow-auto h-[250px] nobar lg:h-full">
      <div
        ref={ref}
        className={` rounded-md  min-h-[300px] space-y-4 ${
          status === "completed" ? "" : "card p-4"
        }`}
      >
        <div className="text-xl font-semibold  flex gap-1 items-center mb-2 text-white">
          {status === "completed" && <div><img src={badge} className="w-12 h-12" alt="badge"/></div>}
          {title}
        </div>
        {
          (status === 'memorizing' && plans.length < 1 ) && 
          <div className="text-center flex flex-col justify-center items-center h-full mt-10">
            <p className="text-white">Want to memoriae a verse?</p>
            <p className="text-[#ffffffbb]">Drag it here or  click the start memorizing button</p>

          </div>
        }
        {plans.map((plan) => (
          <MemoryCard
            key={plan.id}
            memory={plan}
            status={status}
            onStart={() => {
              if (status === "available") {
                onDropPlan(plan.id, "memorizing");
              }
            }}
          />
        ))}
      </div>
    </div>
  );
}
