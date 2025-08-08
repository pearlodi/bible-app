// // hooks/useMemory.ts
// import { useState, useCallback } from "react";
// import type { MemoryStatus } from "@/types/status";
// import { storage } from "@/utils/storage";
// export function useMemory() {
//   const [memoryStatuses, setMemoryStatuses] = useState<Record<string, MemoryStatus>>(() => {
//     return storage.get().memoryStatuses || {};
//   });

//   const getStatus = useCallback((id: string): MemoryStatus => {
//     return memoryStatuses[id] || "memoryVerse";
//   }, [memoryStatuses]);

//   const setStatus = useCallback((id: string, newStatus: MemoryStatus) => {
//     const updated = { ...memoryStatuses, [id]: newStatus };
//     setMemoryStatuses(updated);
//     storage.set({ memoryStatuses: updated });
//   }, [memoryStatuses]);

//   const removeMemory = useCallback((id: string) => {
//     const updated = { ...memoryStatuses };
//     delete updated[id];
//     setMemoryStatuses(updated);
//     storage.set({ memoryStatuses: updated });
//   }, [memoryStatuses]);

//   return {
//     getStatus,
//     setStatus,
//     removeMemory,
//   };
// }
