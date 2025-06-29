// import { Link } from "react-router-dom";
// import { usePlan } from "@/hooks/usePlan";
// import { allPlans } from "@/data/plans";

// export default function MyPlansPage() {
//   const { allStarted, selected, selectPlan } = usePlan();

//   if (!allStarted.length) {
//     return <p className="p-6">You haven’t started any plans yet.</p>;
//   }

//   return (
//     <div className="p-6 max-w-2xl mx-auto space-y-6">
//       <h2 className="text-xl font-bold">📘 Your Plans</h2>

//       {allStarted.map((progress) => {
//         const plan = allPlans.find((p) => p.id === progress.id);
//         if (!plan) return null;

//         const isActive = selected?.id === plan.id;
//         const percent = Math.floor(
//           (progress.completed.length / plan.totalDays) * 100
//         );

//         return (
//           <div
//             key={plan.id}
//             className={`p-4 rounded shadow border transition space-y-1 ${
//               isActive ? "bg-green-100 border-green-500" : "bg-gray-100"
//             }`}
//           >
//             <div className="flex justify-between items-center">
//               <div>
//                 <h3 className="font-semibold">{plan.name}</h3>
//                 <p className="text-sm text-gray-600">
//                   {progress.completed.length} / {plan.totalDays} days complete ({percent}%)
//                 </p>
//               </div>

//               {!isActive && (
//                 <button
//                   onClick={() => selectPlan(plan.id)}
//                   className="text-sm bg-blue-500 text-white px-3 py-1 rounded"
//                 >
//                   Switch to this plan
//                 </button>
//               )}
//             </div>

//             <Link
//               to={`/plans/${plan.id}`}
//               className="inline-block text-blue-600 hover:underline text-sm mt-1"
//             >
//               View Days →
//             </Link>
//           </div>
//         );
//       })}
//     </div>
//   );
// }
