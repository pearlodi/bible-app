import { useState } from "react";
import { allPlans } from "@/data/plans";
import type { PlanMeta } from "@/types/plan";
import { storage } from "@/utils/storage";

export type PlanProgress = {
  id: string;
  status: "available" | "ongoing" | "completed";
};

export type PlanStatus = PlanProgress["status"];

export function usePlan() {
  const [selectedPlans, setSelectedPlans] = useState<PlanProgress[]>(() => {
    const plans = storage.get().plans?.selected;
    return Array.isArray(plans) ? plans : [];
  });

  const saveToStorage = (plans: PlanProgress[]) => {
    setSelectedPlans(plans);
    const current = storage.get();
    storage.set({
      plans: {
        ...current.plans,
        selected: plans,
      },
    });
  };

  const selectPlan = (id: string) => {
    if (selectedPlans.some((p) => p.id === id)) return;
    const newPlan: PlanProgress = {
      id,
      status: "available", // default state
    };
    saveToStorage([...selectedPlans, newPlan]);
  };

  const updatePlanStatus = (id: string, status: PlanStatus) => {
    const updated = selectedPlans.map((p) =>
      p.id === id ? { ...p, status } : p
    );
    saveToStorage(updated);
  };

  const removePlan = (id: string) => {
    saveToStorage(selectedPlans.filter((p) => p.id !== id));
  };

  const getPlanProgress = (id: string): PlanProgress | null =>
    selectedPlans.find((p) => p.id === id) || null;

  const getPlanData = (id: string): PlanMeta | null =>
    allPlans.find((p) => p.id === id) || null;

  const getStatus = (id: string): PlanStatus | "available" => {
    const plan = getPlanProgress(id);
    return plan ? plan.status : "available";
  };

  return {
    selectedPlans,
    selectPlan,
    updatePlanStatus,
    removePlan,
    getPlanProgress,
    getPlanData,
    getStatus,
  };
}
