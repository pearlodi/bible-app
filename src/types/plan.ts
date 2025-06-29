export type PlanType = "one-week" | "one-month";
export type PlanStatus = "available" | "ongoing" | "completed";

export interface PlanMeta {
  id: string;
  name: string;
  type: PlanType;
  description: string;
  totalDays: number;
  entries: {
    day: number;
    title?: string;
    references: string[];
  }[];
}

 export type PlanInfo = {
  id: string;
  title: string;
  percent?: number;
};