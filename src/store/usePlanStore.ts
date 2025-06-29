import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { PlanMeta } from "@/types/plan";

interface PlanState {
  selectedPlans: PlanMeta[];
  addPlan: (plan: PlanMeta) => void;
  removePlan: (id: string) => void;
  isPlanSelected: (id: string) => boolean;
}

export const usePlanStore = create<PlanState>()(
  persist(
    (set, get) => ({
      selectedPlans: [],
      addPlan: (plan) => {
        const already = get().selectedPlans.find((p) => p.id === plan.id);
        if (!already) {
          set((state) => ({
            selectedPlans: [...state.selectedPlans, plan],
          }));
        }
      },
      removePlan: (id) => {
        set((state) => ({
          selectedPlans: state.selectedPlans.filter((p) => p.id !== id),
        }));
      },
      isPlanSelected: (id) => {
        return get().selectedPlans.some((p) => p.id === id);
      },
    }),
    {
      name: "bible-app", // 📦 All your data under one key
      partialize: (state) => ({
        selectedPlans: state.selectedPlans,
      }),
    }
  )
);
