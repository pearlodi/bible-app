// hooks/usePlan.ts
import { useState } from "react";
import { allPlans } from "@/data/plans";
import type { PlanMeta, PlanStatus } from "@/types/plan";
import { storage } from "@/utils/storage";

export type PlanProgress = {
  id: string;
  currentDay: number;
  completed: number[];
  startDate: string; // YYYY-MM-DD
  startedAt?: string; // ✅ optional but preferred

};
export type CalendarDay = {
  date: string; // ISO date
  planId: string;
  color: "green" | "yellow" | "red" | "blue";
};
type CalendarEvent = {
  title: string;
  start: Date;
  end: Date;
  allDay: boolean;
  status: CalendarStatus;
};

export type CalendarStatus = "pending" | "missed" | "completed";


export function usePlan() {
  const [selectedPlans, setSelectedPlans] = useState<PlanProgress[]>(() => {
    const plans = storage.get().plans?.selected;
    return Array.isArray(plans) ? plans : [];
  });

  const saveToStorage = (plans: PlanProgress[]) => {
    setSelectedPlans(plans);
    storage.set({ plans: { selected: plans } });
  };

  const selectPlan = (id: string) => {
    if (selectedPlans.some((p) => p.id === id)) return;
    const today = new Date().toISOString().split("T")[0];
  
    const newPlan: PlanProgress = {
      id,
      currentDay: 1,
      completed: [],
      startDate: today,
    };
  
    saveToStorage([...selectedPlans, newPlan]);
  };
  
  const removePlan = (id: string) => {
    saveToStorage(selectedPlans.filter((p) => p.id !== id));
  };

  const markDayDone = (id: string, day: number) => {
    const updated = selectedPlans.map((p) =>
      p.id === id
        ? {
            ...p,
            currentDay: day + 1,
            completed: [...new Set([...(p.completed ?? []), day])],
          }
        : p
    );
    saveToStorage(updated);
  };

  const getPlanProgress = (id: string): PlanProgress | null =>
    selectedPlans.find((p) => p.id === id) || null;

  const getPlanData = (id: string): PlanMeta | null =>
    allPlans.find((p) => p.id === id) || null;

  const getStatus = (id: string): PlanStatus => {
    const progress = getPlanProgress(id);
    const plan = getPlanData(id);
    if (!progress) return "available";
    if (progress.completed.length >= (plan?.totalDays || 0)) return "completed";
    return "ongoing";
  };
   const getCalendarData = (): CalendarEvent[] => {
    const events: CalendarEvent[] = [];
  
    selectedPlans.forEach((progress) => {
      const plan = allPlans.find((p) => p.id === progress.id);
      if (!plan || !progress.currentDay) return;
  
      const startDate = new Date();
      startDate.setDate(startDate.getDate() - (progress.currentDay - 1));
  
      for (let day = 1; day <= plan.totalDays; day++) {
        const date = new Date(startDate);
        date.setDate(startDate.getDate() + (day - 1));
  
        const status: CalendarStatus = progress.completed.includes(day)
          ? "completed"
          : day < progress.currentDay
          ? "missed"
          : "pending";
  
        events.push({
          title: `${plan.name} - Day ${day}`,
          start: date,
          end: date,
          allDay: true,
          status,
        });
      }
    });
  
    return events;
  };
  
  
  return {
    selectedPlans,
    selectPlan,
    removePlan,
    markDayDone,
    getPlanProgress,
    getPlanData,
    getStatus,
    getCalendarData
  };
}
