export type MemoryStatus = "available" | "ongoing" | "completed";
export interface MemoryMeta {
    id: string;
    date: string; // e.g. "2025-01-01"
    verse: string; // E.g. "John 3:16"
    text: string;  // Actual verse content
  }
  // export interface MemoryMeta {
  //   id: string;
  //   name: string;
  //   description: string;
  //   totalDays: number;
  //   entries: {
  //     day: number;
  //     title?: string;
  //     references: string[];
  //   }[];
  // }
  
  export const memoryVerses: MemoryMeta[] = [
    {
      id: "1",
      date: "2025-01-01",
      verse: "John 3:16",
      text: "For God so loved the world that He gave His one and only Son, that whoever believes in Him shall not perish but have eternal life.",
    },
    {
      id: "2",
      date: "2025-01-02",
      verse: "Psalm 119:11",
      text: "I have hidden your word in my heart that I might not sin against you.",
    },
    {
      id: "3",
      date: "2025-01-03",
      verse: "Proverbs 3:5",
      text: "Trust in the Lord with all your heart and lean not on your own understanding.",
    },
    {
      id: "4",
      date: "2025-01-04",
      verse: "Isaiah 41:10",
      text: "Do not fear, for I am with you; do not be dismayed, for I am your God.",
    },
    {
      id: "5",
      date: "2025-01-05",
      verse: "Romans 8:28",
      text: "And we know that in all things God works for the good of those who love him.",
    },
    {
      id: "6",
      date: "2025-01-06",
      verse: "Philippians 4:13",
      text: "I can do all things through Christ who strengthens me.",
    },
    {
      id: "7",
      date: "2025-01-07",
      verse: "Joshua 1:9",
      text: "Be strong and courageous. Do not be afraid; do not be discouraged, for the Lord your God will be with you wherever you go.",
    },
    // Add more days as needed...
  ];
  