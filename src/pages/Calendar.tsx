import { Calendar, type Event as RBCEvent } from "react-big-calendar";
import { localizer } from "@/utils/calendarConfig";
import "react-big-calendar/lib/css/react-big-calendar.css";

export default function PlanCalendar() {

  const eventStyleGetter = (event: RBCEvent & { status: string }) => {
    let backgroundColor = "#60A5FA"; 
    if (event.status === "completed") backgroundColor = "#34D399"; 
    if (event.status === "missed") backgroundColor = "#F87171"; 
    if (event.status === "pending") backgroundColor = "#FBBF24"; 

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
      <h2 className="text-2xl font-bold mb-4 text-white">Streaks</h2>
      <Calendar
        localizer={localizer}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 600 }}
        eventPropGetter={eventStyleGetter}
      />
    </div>
  );
}
