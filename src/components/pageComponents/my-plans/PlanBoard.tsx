// import { allPlans } from "@/data/plans";
// import { usePlan } from "@/hooks/usePlan";
// import { DndProvider } from "react-dnd";
// import { HTML5Backend } from "react-dnd-html5-backend";
// import { PlanColumn } from "./PlanColumn";
// import type { PlanStatus } from "@/types/plan";

// export default function PlanBoard() {
//   const { getStatus, selectPlan, removePlan } = usePlan();

//   const categorized = allPlans.reduce<Record<PlanStatus, typeof allPlans>>(
//     (acc, plan) => {
//       const status = getStatus(plan.id);
//       acc[status].push(plan);
//       return acc;
//     },
//     {
//       available: [],
//       ongoing: [],
//       completed: [],
//     }
//   );

//   const setStatus = (id: string, newStatus: PlanStatus) => {
//     if (newStatus === "available") return removePlan(id);
//     if (newStatus === "ongoing") return selectPlan(id);
//     if (newStatus === "completed") {
//       selectPlan(id); 
//     }
//   };

//   return (
//     <DndProvider backend={HTML5Backend}>
//       <div className="flex flex-col md:flex-row gap-4 p-4">
//         <PlanColumn title="Available" status="available" plans={categorized.available} onDropPlan={setStatus} />
//         <PlanColumn title="Ongoing" status="ongoing" plans={categorized.ongoing} onDropPlan={setStatus} />
//         <PlanColumn title="Completed" status="completed" plans={categorized.completed} onDropPlan={setStatus} />
//       </div>
//     </DndProvider>
//   );
// }
