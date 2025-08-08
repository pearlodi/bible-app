// // import { devotionals } from "@/data/open-heavens";
// // import { Link } from "react-router-dom";
// // import { storage } from "@/utils/storage";
// // import badge from '../../../assets/badge.png'
// // const DevotionalList = () => {
// //   const finishedStatuses = storage.get().plans?.statuses || {};

// //   return (
// //     <div className="p-6 grid grid-cols-1 md:grid-cols-2 h-screen overflow-auto lg:grid-cols-4 gap-6 text-white">
// //       {devotionals.map((devotion) => {
// //         const isFinished = finishedStatuses[devotion.id] === "finished";
// //         return (
// //           <Link
// //             to={`/open-heavens/${devotion.id}`}
// //             key={devotion.id}
//             className={`rounded-2xl h-fit relative shadow px-4 py-6 transition hover:shadow-lg ${
// //               isFinished ? "card" : "card"
// //             }`}
// //           >
// //             {
//   isFinished && (
//     <div className="w-12 absolute mt-[-38px] left-0">
//     <img src={badge} alt="badge"/>

//     </div>
//   )
// }
// <p className="text-sm text-[#ffffffbd]">{devotion.date}</p>
// <h2 className="text-xl font-semibold text-white">{devotion.title}</h2>
// //           </Link>
// //         );
// //       })}
// //     </div>
// //   );
// // };

// // export default DevotionalList;
// import { useState } from "react";
// import { devotionals } from "@/data/open-heavens";
// import { Link } from "react-router-dom";
// import { storage } from "@/utils/storage";
// import badge from "../../../assets/badge.png";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";

// // Utility: Get month name from date string
// const getMonthName = (dateStr: string) => {
//   const date = new Date(dateStr);
//   return date.toLocaleString("default", { month: "long" });
// };

// const DevotionalList = () => {
//   const finishedStatuses = storage.get().plans?.statuses || {};

//   // 1. Extract available months from devotionals
//   const months = Array.from(
//     new Set(
//       devotionals.map((dev) => {
//         const date = new Date(dev.date);
//         return `${date.getFullYear()}-${date.getMonth() + 1}`; // e.g., "2025-8"
//       })
//     )
//   );

//   const monthMap: Record<string, string> = {};
//   months.forEach((key) => {
//     const [year, month] = key.split("-");
//     const date = new Date(Number(year), Number(month) - 1);
//     const label = date.toLocaleString("default", { month: "long", year: "numeric" });
//     monthMap[key] = label;
//   });

//   // 2. Track selected month
//   const [selectedMonth, setSelectedMonth] = useState<string | null>(null);

//   // 3. Filter devotionals by selected month
//   const filteredDevotionals = selectedMonth
//     ? devotionals.filter((dev) => {
//         const date = new Date(dev.date);
//         const monthKey = `${date.getFullYear()}-${date.getMonth() + 1}`;
//         return monthKey === selectedMonth;
//       })
//     : devotionals;

//   return (
//     <div className="p-6">
//       {/* Month Filter Dropdown */}
//       <div className="max-w-sm mb-6">
//         <Select onValueChange={(value) => setSelectedMonth(value)}>
//           <SelectTrigger>
//             <SelectValue placeholder="Filter by Month" />
//           </SelectTrigger>
//           <SelectContent>
//             {months.map((key) => (
//               <SelectItem key={key} value={key}>
//                 {monthMap[key]}
//               </SelectItem>
//             ))}
//           </SelectContent>
//         </Select>
//       </div>

//       {/* Devotional Cards */}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 text-white h-[calc(100vh-120px)] overflow-auto">
//         {filteredDevotionals.map((devotion) => {
//           const isFinished = finishedStatuses[devotion.id] === "finished";
//           return (
//             <Link
//               to={`/open-heavens/${devotion.id}`}
//               key={devotion.id}
//               className={`rounded-2xl h-fit relative shadow px-4 py-6 transition hover:shadow-lg card`}
//             >
//               {isFinished && (
//                 <div className="w-12 absolute mt-[-38px] left-0">
//                   <img src={badge} alt="badge" />
//                 </div>
//               )}
//               <p className="text-sm text-[#ffffffbd]">{devotion.date}</p>
//               <h2 className="text-xl font-semibold text-white">{devotion.title}</h2>
//             </Link>
//           );
//         })}
//       </div>
//     </div>
//   );
// };

// export default DevotionalList;
import { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { storage } from "@/utils/storage";
import badge from "../../../assets/badge.png";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  filterDevotionalsByMonth,
  getAvailableMonths,
} from "@/utils/devotionalFilters";

const DevotionalList = () => {
  const finishedStatuses = storage.get().plans?.statuses || {};

  const { monthKeys, monthMap } = getAvailableMonths();

  const [searchParams, setSearchParams] = useSearchParams();
  const monthFromParams = searchParams.get("month");

  const [selectedMonth, setSelectedMonth] = useState<string | null>(
    monthFromParams || null
  );

  const handleMonthChange = (value: string) => {
    setSelectedMonth(value);
    if (value === "all") {
      setSelectedMonth(null);
      setSearchParams({});
    } else {
      setSelectedMonth(value);
      setSearchParams({ month: value });
    }
  };

  const filteredDevotionals = filterDevotionalsByMonth(selectedMonth);

  return (
    <div className="px-4 lg:px-10">
      <div className="w-full max-h-screen lg:h-screen nobar overflow-auto max-w-full 2xl:max-w-[1500px] mx-auto">
          <div className="max-w-sm mb-6">
            <Select
              value={selectedMonth ?? undefined}
              onValueChange={handleMonthChange}
            >
              <SelectTrigger className="bg-white font-semibole mt-3 !text-black">
                <SelectValue
                  placeholder="Select month"
                  className="text-black bg-[white]"
                />
              </SelectTrigger>
              <SelectContent>
                {monthKeys.map((key) => (
                  <SelectItem key={key} value={key}>
                    {monthMap[key]}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="py-6 grid grid-cols-1 md:grid-cols-2 overflow-auto lg:grid-cols-4 gap-6 text-white">
            {filteredDevotionals.map((devotion) => {
              const isFinished = finishedStatuses[devotion.id] === "finished";
              return (
                <Link
                  to={`/open-heavens/${devotion.id}`}
                  key={devotion.id}
                  className={`rounded-2xl h-fit relative shadow px-4 py-6 transition hover:shadow-lg ${
                    isFinished ? "card" : "card"
                  }`}
                >
                  {isFinished && (
                    <div className="w-12 absolute mt-[-38px] left-0">
                      <img src={badge} alt="badge" />
                    </div>
                  )}
                  <p className="text-sm text-[#ffffffbd]">{devotion.date}</p>
                  <h2 className="text-xl font-semibold mt-2 text-white">
                    {devotion.title}
                  </h2>
                </Link>
              );
            })}
          </div>
        </div>
    </div>
  );
};

export default DevotionalList;
