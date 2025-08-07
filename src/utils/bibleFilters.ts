// import { bibleInOneYear } from "@/data/bible-reading";

// export const getAvailableBibleReadingMonths = () => {
//   const monthKeys = Array.from(
//     new Set(
//       bibleInOneYear.map((entry) => {
//         const date = new Date(entry.date);
//         return `${date.getFullYear()}-${date.getMonth() + 1}`; // e.g., "2025-8"
//       })
//     )
//   );

//   const monthMap: Record<string, string> = {};
//   monthKeys.forEach((key) => {
//     const [year, month] = key.split("-");
//     const date = new Date(Number(year), Number(month) - 1);
//     monthMap[key] = date.toLocaleString("default", {
//       month: "long",
//       year: "numeric",
//     });
//   });

//   return { monthKeys, monthMap };
// };

// export const filterBibleReadingsByMonth = (monthKey: string | null) => {
//   if (!monthKey) return bibleInOneYear;

//   return bibleInOneYear.filter((entry) => {
//     const date = new Date(entry.date);
//     const key = `${date.getFullYear()}-${date.getMonth() + 1}`;
//     return key === monthKey;
//   });
// };
// utils/bibleReading.ts
import { bibleInOneYear } from "@/data/bible-reading";


export const getReadingMonths = () => {
  const uniqueMonthKeys = Array.from(
    new Set(
      bibleInOneYear.map((reading) => {
        const date = new Date(reading.date);
        return `${date.getFullYear()}-${date.getMonth() + 1}`;
      })
    )
  );

  const monthMap: Record<string, string> = {};
  uniqueMonthKeys.forEach((key) => {
    const [year, month] = key.split("-");
    const date = new Date(Number(year), Number(month) - 1);
    monthMap[key] = date.toLocaleString("default", {
      month: "long",
      year: "numeric",
    });
  });

  return { monthKeys: uniqueMonthKeys, monthMap };
};


export const filterBibleReadingByMonth = (monthKey: string | null) => {
  if (!monthKey) return bibleInOneYear;

  return bibleInOneYear.filter((reading) => {
    const date = new Date(reading.date);
    const key = `${date.getFullYear()}-${date.getMonth() + 1}`;
    return key === monthKey;
  });
};


export const getCompletedBibleReadingIds = (): string[] => {
  const stored = localStorage.getItem("bible-reading-done");
  return stored ? JSON.parse(stored) : [];
};
