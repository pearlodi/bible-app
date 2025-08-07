
const APP_KEY = "bible-app";
import type { MemoryStatus } from "@/types/memory";

type BibleAppStorage = {
  plans?: {
    selected?: any[];
    statuses?: Record<string, string>;
  };
  memory?: {
    selected?: any[];
    statuses?: Record<string, string>;
  };
  notes?: Record<string, string>; 

  memoryStatuses?: Record<string, MemoryStatus>;
  theme?: {
    background?: string;
  };
  chat?: {
    messages: { role: string; text: string }[];
  };
  verseChats?: Record<string, { role: string; text: string }[]>;
  favorite?:Record<string,string>

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
