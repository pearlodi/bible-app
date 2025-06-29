// components/PlanCalendar.tsx
import { Calendar, type Event as RBCEvent } from "react-big-calendar";
import { localizer } from "@/utils/calendarConfig";
import { usePlan } from "@/hooks/usePlan";
import "react-big-calendar/lib/css/react-big-calendar.css";

export default function PlanCalendar() {
  const { getCalendarData } = usePlan();
  const events = getCalendarData();

  const eventStyleGetter = (event: RBCEvent & { status: string }) => {
    let backgroundColor = "#60A5FA"; // blue-400
    if (event.status === "completed") backgroundColor = "#34D399"; // green-400
    if (event.status === "missed") backgroundColor = "#F87171"; // red-400
    if (event.status === "pending") backgroundColor = "#FBBF24"; // yellow-400

    return {
      style: {
        backgroundColor,
        borderRadius: "6px",
        opacity: 0.9,
        color: "white",
        border: "none",
        display: "block",
      },
    };
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">📅 Reading Plan Calendar</h2>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 600 }}
        eventPropGetter={eventStyleGetter}
      />
    </div>
  );
}
