
import { devotionals } from "@/data/open-heavens";

export const getAvailableMonths = () => {
  const uniqueMonthKeys = Array.from(
    new Set(
      devotionals.map((dev) => {
        const date = new Date(dev.date);
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

export const filterDevotionalsByMonth = (monthKey: string | null) => {
  if (!monthKey) return devotionals;

  return devotionals.filter((dev) => {
    const date = new Date(dev.date);
    const key = `${date.getFullYear()}-${date.getMonth() + 1}`;
    return key === monthKey;
  });
};
