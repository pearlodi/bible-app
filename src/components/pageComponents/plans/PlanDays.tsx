// import { useParams, Link } from "react-router-dom";
// import { usePlan } from "@/hooks/usePlan";

// export default function PlanDayListPage() {
//   const { getPlanData, getPlanProgress } = usePlan();
//   const { planId } = useParams();

//   const plan = getPlanData(planId!);
//   const progress = getPlanProgress(planId!);

//   if (!plan) {
//     return <p className="p-6">No plan found</p>;
//   }

//   return (
//     <div className="p-6 max-w-2xl mx-auto space-y-4">
//       <h2 className="text-xl font-bold mb-4">{plan.name}</h2>

//       {plan.entries.map((entry) => {
// const isDone = progress?.completed?.includes(entry.day) ?? false;

//         return (
//           <Link
//             key={entry.day}
//             to={`/plans/${planId}/${entry.day}`}
//             className={`block p-4 rounded shadow transition ${
//               isDone ? "bg-green-100" : "bg-yellow-100"
//             }`}
//           >
//             <div className="font-medium">📖 Day {entry.day}</div>
//             <div className="text-sm text-gray-600">
//               {entry.title || entry.references.join(", ")}
//             </div>
//           </Link>
//         );
//       })}
//     </div>
//   );
// }
