import { storage } from "@/utils/storage";
import { useEffect, useState } from "react";
export function useThemeBackground() {
  const [background, setBackground] = useState<string | null>(null);

  useEffect(() => {
    const saved = storage.get()?.theme?.background || null;
    setBackground(saved || "https://themewagon.github.io/dashtreme/assets/images/bg-themes/1.png");
  }, []);

  useEffect(() => {
    if (background) {
      document.body.style.backgroundImage = `url(${background})`;
      document.body.style.backgroundSize = "cover";
      document.body.style.backgroundRepeat = "no-repeat";
      document.body.style.backgroundPosition = "center";
      document.body.style.height = "100%";
      // document.body.style.maxHeight = "100vh";
      
    }
  }, [background]);

  const setTheme = (bgUrl: string) => {
    setBackground(bgUrl);
    storage.set({
      theme: { background: bgUrl || 'https://themewagon.github.io/dashtreme/assets/images/bg-themes/1.png' },
    });
  };

  return { background, setTheme };
}
