import { useDrag } from "react-dnd";
import type { PlanMeta } from "@/types/plan";
import { usePlan } from "@/hooks/usePlan";

export default function PlanCard({ plan }: { plan: PlanMeta }) {
  const [, drag] = useDrag(() => ({
    type: "plan",
    item: { id: plan.id },
  }));

  const { getPlanProgress } = usePlan();
  const progress = getPlanProgress(plan.id);
  const isOngoing = !!progress && progress.completed.length < plan.totalDays;

  return (
    <div
      ref={drag}
      className="bg-white shadow p-3 rounded cursor-move border border-gray-300 space-y-1"
    >
      <h4 className="font-semibold">{plan.name}</h4>
      <p className="text-sm text-gray-500">{plan.description}</p>

      {isOngoing && progress?.currentDay && (
    <>
        <p className="text-sm text-blue-600 font-medium">
          📅 Current Day: {progress.currentDay}
        </p>
        <div className="h-2 bg-gray-200 rounded overflow-hidden mt-2">
        <div
          className="h-full bg-green-500"
          style={{
            width: `${(progress.completed.length / plan.totalDays) * 100}%`,
          }}
        />
      </div>
    </>
      
      )}
      
    </div>
  );
}
