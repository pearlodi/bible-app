// components/ThemeDrawer.tsx
import {
    Drawer,
    DrawerContent,
    DrawerTrigger,
    DrawerClose,
    DrawerHeader,
    DrawerTitle,
  } from "@/components/ui/drawer";
  import { Button } from "@/components/ui/button";
  import { useState } from "react";
  import { useThemeBackground } from "@/hooks/useTheme";


export const BACKGROUND_IMAGES = [
    "https://themewagon.github.io/dashtreme/assets/images/bg-themes/1.png",
    "https://themewagon.github.io/dashtreme/assets/images/bg-themes/5.png",
    "https://themewagon.github.io/dashtreme/assets/images/bg-themes/4.png",
    "https://themewagon.github.io/dashtreme/assets/images/bg-themes/6.png",
    "https://themewagon.github.io/dashtreme/assets/images/bg-themes/2.png",
    "https://themewagon.github.io/dashtreme/assets/images/bg-themes/3.png"
  ];
  
  export default function ThemeDrawer() {
    const [open, setOpen] = useState(false);
    const { setTheme, background } = useThemeBackground();
  
    return (
      <div className="fixed bottom-[50%] right-6 z-50">
        <Drawer direction="right" open={open} onOpenChange={setOpen}>
          <DrawerTrigger asChild>
            <Button className="rounded-full w-12 h-12 shadow-lg hover:bg-white cursor-pointer bg-white text-white p-0">
              <img src="https://data.tooliphone.net/iskin/themes/33940/18485/preview-256.png" className="rounded-full"/>
            </Button>
          </DrawerTrigger>
  
          <DrawerContent className="max-w-sm mx-auto p-4 card">
            <DrawerHeader>
              <DrawerTitle>Select a Background</DrawerTitle>
            </DrawerHeader>
            <div className="grid grid-cols-2 gap-3 p-4">
              {BACKGROUND_IMAGES.map((img, idx) => (
                <button
                  key={idx}
                  className={`w-full aspect-square rounded-xl overflow-hidden border-2 ${
                    background === img ? "border-blue-500" : "border-transparent"
                  }`}
                  onClick={() => setTheme(img)}
                >
                  <img src={img} alt={`Theme ${idx}`} className="object-cover w-full h-full" />
                </button>
              ))}
            </div>
  
            <DrawerClose asChild>
              <Button variant="ghost" className="mt-4 w-full">
                Close
              </Button>
            </DrawerClose>
          </DrawerContent>
        </Drawer>
      </div>
    );
  }
  