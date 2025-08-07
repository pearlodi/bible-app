import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { format } from "date-fns";
import badge from "../../../assets/badge.png";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { filterBibleReadingByMonth, getCompletedBibleReadingIds, getReadingMonths } from "@/utils/bibleFilters";


export default function BibleReadingListPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const monthFromParams = searchParams.get("month");

  const [selectedMonth, setSelectedMonth] = useState<string | null>(
    monthFromParams || null
  );
  const [completedIds, setCompletedIds] = useState<string[]>([]);

  useEffect(() => {
    setCompletedIds(getCompletedBibleReadingIds());
  }, []);

  const { monthKeys, monthMap } = getReadingMonths();
  const filteredReadings = filterBibleReadingByMonth(selectedMonth);

  const handleMonthChange = (value: string) => {
    if (value === "all") {
      setSelectedMonth(null);
      setSearchParams({});
    } else {
      setSelectedMonth(value);
      setSearchParams({ month: value });
    }
  };

  return (
    <div className="w-full nobar px-4 lg:px-10 max-h-screen lg:h-screen  text-white overflow-auto max-w-full 2xl:max-w-[1500px] mx-auto" >
      <h1 className="text-2xl font-bold">📖 Bible in One Year</h1>

      {/* Month Filter Dropdown */}
      <div className="max-w-sm mb-6">
        <Select value={selectedMonth ?? undefined} onValueChange={handleMonthChange}>
        <SelectTrigger className="bg-white font-semibole mt-3 !text-black">
            <SelectValue placeholder="Select month" className="text-black bg-[white]" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Months</SelectItem>
            {monthKeys.map((key) => (
              <SelectItem key={key} value={key}>
                {monthMap[key]}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 mt-8 md:grid-cols-4 gap-4">
        {filteredReadings.map((reading) => {
          const isDone = completedIds.includes(reading.id);

          return (
            <Link
              key={reading.id}
              to={`/bible-reading-page/${reading.id}`}
              className={`block relative border rounded py-6 px-4 transition text-sm font-medium card`}
            >
              {isDone && (
                <div className="w-12 h-12 absolute left-0 top-[-20px]">
                  <img src={badge} alt="badge" />
                </div>
              )}
              <div className="font-bold text-lg">
                {format(new Date(reading.date), "MMM dd, yyyy")}
              </div>
              <div className="mt-1">{reading.passages.join(", ")}</div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
