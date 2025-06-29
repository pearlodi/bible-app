import type {  PlanMeta } from "@/types/plan";


export const planTypeLabels: Record<string, string> = {
    "one-week": "7-Day Plans",
    "one-month": "30-Day Plans",
  };
  
export const weeklyWisdom: PlanMeta = {
  id: "wisdom-week",
  name: "7-Day Wisdom Plan",
  type: "one-week",
  description: "Wisdom from Proverbs in 7 days.",
  totalDays: 7,
  entries: [
    { day: 1, title: "Wisdom Begins", references: ["Proverbs 1"] },
    { day: 2, title: "Trust in the Lord", references: ["Proverbs 3"] },
    { day: 3, title: "Guard Your Heart", references: ["Proverbs 4"] },
    { day: 4, title: "Avoid Evil", references: ["Proverbs 5"] },
    { day: 5, title: "The Tongue", references: ["Proverbs 15"] },
    { day: 6, title: "The Wise Life", references: ["Proverbs 24"] },
    { day: 7, title: "The Fear of the Lord", references: ["Proverbs 31"] },
  ],
};

export const prayerWeek: PlanMeta = {
  id: "prayer-week",
  name: "7-Day Prayer Plan",
  type: "one-week",
  description: "Grow in prayer over 7 days.",
  totalDays: 7,
  entries: [
    { day: 1, title: "Jesus Teaches Prayer", references: ["Luke 11"] },
    { day: 2, title: "The Lord is Near", references: ["Philippians 4"] },
    { day: 3, title: "Faith in Prayer", references: ["Mark 11"] },
    { day: 4, title: "Confession & Healing", references: ["James 5"] },
    { day: 5, title: "Persistence", references: ["Luke 18"] },
    { day: 6, title: "God Hears", references: ["1 John 5"] },
    { day: 7, title: "In the Spirit", references: ["Ephesians 6"] },
  ],
};

export const psalmsMonth: PlanMeta = {
  id: "psalms-month",
  name: "30 Days in Psalms",
  type: "one-month",
  description: "Discover the heart of worship.",
  totalDays: 30,
  entries: Array.from({ length: 30 }, (_, i) => ({
    day: i + 1,
    references: [`Psalm ${i + 1}`],
  })),
};

export const ntOverviewMonth: PlanMeta = {
  id: "nt-overview-month",
  name: "New Testament in 30 Days",
  type: "one-month",
  description: "Highlights from Matthew to Revelation.",
  totalDays: 30,
  entries: Array.from({ length: 30 }, (_, i) => ({
    day: i + 1,
    references: [`Matthew ${i + 1}`], 
  })),
};

export const allPlans: PlanMeta[] = [
  weeklyWisdom,
  prayerWeek,
  psalmsMonth,
  ntOverviewMonth,
];
