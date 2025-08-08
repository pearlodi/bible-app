import { useState } from "react";
import type { MemoryMeta } from "@/types/memory";
import { storage } from "@/utils/storage";
import { memoryVerses } from "@/data/memorise";

export type MemoriseProgress = {
  id: string;
  currentDay: number;
  completed: number[];
  startDate: string;
  startedAt?: string;
  status?: "available" | "ongoing" | "completed";
};
export type CalendarDay = {
  date: string;
  MemoriseId: string;
  color: "green" | "yellow" | "red" | "blue";
};
type CalendarEvent = {
  title: string;
  start: Date;
  end: Date;
  allDay: boolean;
  status: CalendarStatus;
};
export type MemoryStatus = "available" | "ongoing" | "completed";
export type CalendarStatus = "pending" | "missed" | "completed";

export function useMemorise() {
  const [selectedMemorises, setSelectedMemorises] = useState<
    MemoriseProgress[]
  >(() => {
    const Memorises = storage.get().memory?.selected;
    return Array.isArray(Memorises) ? Memorises : [];
  });

  const saveToStorage = (Memorises: MemoriseProgress[]) => {
    setSelectedMemorises(Memorises);
    storage.set({ memory: { selected: Memorises } });
  };

  const selectMemorise = (id: string) => {
    if (selectedMemorises.some((p) => p.id === id)) return;

    const today = new Date().toISOString().split("T")[0];

    const newMemorise: MemoriseProgress = {
      id,
      currentDay: 1,
      completed: [],
      startDate: today,
      status: "ongoing",
    };

    saveToStorage([...selectedMemorises, newMemorise]);
  };

  const removeMemorise = (id: string) => {
    saveToStorage(selectedMemorises.filter((p) => p.id !== id));
  };

  const markDayDone = (id: string, day: number) => {
    const updated = selectedMemorises.map((p) =>
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

  const getMemoriseProgress = (id: string): MemoriseProgress | null =>
    selectedMemorises.find((p) => p.id === id) || null;

  const getMemoriseData = (id: string): MemoryMeta | null =>
    memoryVerses.find((p) => p.id === id) || null;


  const markAsCompleted = (id: string) => {
    const updated = selectedMemorises.map((p): MemoriseProgress => {
      if (p.id === id) {
        return { ...p, status: "completed" };
      }
      return p;
    });
    saveToStorage(updated);
    console.log('storesuccessfully')
  };
  
  const getStatus = (id: string): MemoryStatus => {
    const progress = getMemoriseProgress(id);
    if (!progress) return "available";
  
    if (progress.status === "completed") return "completed";
  
    return "ongoing";
  };
  
  const getCalendarData = (): CalendarEvent[] => {
    const events: CalendarEvent[] = [];

    selectedMemorises.forEach((progress) => {
      const Memorise = memoryVerses.find((p) => p.id === progress.id);
      if (!Memorise || !progress.currentDay) return;

      const startDate = new Date();
      startDate.setDate(startDate.getDate() - (progress.currentDay - 1));
    });

    return events;
  };

  return {
    selectedMemorises,
    selectMemorise,
    removeMemorise,
    markDayDone,
    getMemoriseProgress,
    getMemoriseData,
    getStatus,
    getCalendarData,
    markAsCompleted
  };
}
