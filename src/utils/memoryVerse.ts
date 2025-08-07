import { memoryVerses } from "@/data/memorise";

export const getMemoryMonths = () => {
  const keys = Array.from(
    new Set(
      memoryVerses.map((verse) => {
        const date = new Date(verse.date);
        return `${date.getFullYear()}-${date.getMonth() + 1}`;
      })
    )
  );

  const monthMap: Record<string, string> = {};
  keys.forEach((key) => {
    const [year, month] = key.split("-");
    const date = new Date(Number(year), Number(month) - 1);
    monthMap[key] = date.toLocaleString("default", {
      month: "long",
      year: "numeric",
    });
  });

  return { monthKeys: keys, monthMap };
};

export const filterMemoryVersesByMonth = (month: string | null) => {
  if (!month) return memoryVerses;

  return memoryVerses.filter((verse) => {
    const date = new Date(verse.date);
    const key = `${date.getFullYear()}-${date.getMonth() + 1}`;
    return key === month;
  });
};
