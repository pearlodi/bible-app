import {
    Drawer,
    DrawerContent,
    DrawerTrigger,
    DrawerHeader,
    DrawerTitle,
    DrawerDescription,
    DrawerClose,
  } from "@/components/ui/drawer";
  
  import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { X } from "lucide-react";
import { FaBible } from "react-icons/fa";

  export function BibleVerseDrawer({ verseText }: { verseText: string }) {

  const { data, isLoading, error } = useQuery({
    queryKey: ["bible", verseText],
    queryFn: async () => {
      const res = await fetch(`https://bible-api.com/${encodeURIComponent(verseText || "")}`);
      if (!res.ok) throw new Error("Failed to fetch passage");
      return res.json();
    },
    enabled: !!verseText,
  });
    return (
      <Drawer direction="right">
        <DrawerTrigger asChild>
          <Button variant="link" className="cursor-pointer p-0 h-auto text-sm  text-white font-medium underline">
            {verseText}
          </Button>

        </DrawerTrigger>
        <DrawerContent className="p-4 !w-full !max-w-[600px] overflow-scroll">
          <DrawerHeader className="p-0">
            <DrawerTitle className="flex justify-between  items-center">
              <span className="flex items-center gap-2"><FaBible/>Bible reading </span>

            <DrawerClose className="mt-4 bg-gray-100 p-2 rounded-full mb-2 flex justify-center cursor-pointer">
            <X size={16}/>
          </DrawerClose>
            </DrawerTitle>
            <DrawerDescription className="font-semibold text-base text-black mt-2">
              {verseText}
            </DrawerDescription>
          </DrawerHeader>
          <div className="mt-6">
          {data?.verses?.map((v: any) => (
            <p key={`${v.chapter}-${v.verse}`}>
              <strong>{v.verse}.</strong> {v.text}
            </p>
          ))}
          </div>
         
        </DrawerContent>
      </Drawer>
    );
  }
  