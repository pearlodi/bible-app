import type { PlanProgress } from "@/hooks/usePlan";

const APP_KEY = "bible-app";

export type PlanStatus = "available" | "ongoing" | "completed";

type BibleAppStorage = {
  plans?: {
    selected?: PlanProgress[];
    statuses?: Record<string, PlanStatus>; // plan.id -> "available" | "ongoing" | "completed"
  };
};

function getStorage(): BibleAppStorage {
  if (typeof window === "undefined") return {};
  const raw = localStorage.getItem(APP_KEY);
  try {
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

function setStorage(newData: Partial<BibleAppStorage>) {
  const current = getStorage();
  const updated = { ...current, ...newData };
  localStorage.setItem(APP_KEY, JSON.stringify(updated));
}

function clearStorage() {
  localStorage.removeItem(APP_KEY);
}

export const storage = {
  get: getStorage,
  set: setStorage,
  clear: clearStorage,
};
