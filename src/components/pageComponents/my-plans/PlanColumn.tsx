import { useRef } from "react";
import { useDrop } from "react-dnd";
import type { PlanMeta, PlanStatus } from "@/types/plan";
import PlanCard from "./PlanCard";

type ColumnProps = {
  title: string;
  status: PlanStatus;
  plans: PlanMeta[];
  onDropPlan: (id: string, newStatus: PlanStatus) => void;
};

export function PlanColumn({ title, status, plans, onDropPlan }: ColumnProps) {
  const ref = useRef<HTMLDivElement | null>(null);

  const [, drop] = useDrop({
    accept: "plan",
    drop: (item: { id: string }) => onDropPlan(item.id, status),
  });

  drop(ref); 

  return (
    <div className="w-full md:w-1/3 p-2">
      <div
        ref={ref}
        className="bg-gray-100 rounded-md p-4 min-h-[300px] space-y-4"
      >
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        {plans.map((plan) => (
          <PlanCard key={plan.id} plan={plan} />
        ))}
      </div>
    </div>
  );
}
