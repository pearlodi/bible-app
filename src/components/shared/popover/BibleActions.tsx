import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Copy } from "lucide-react";
import askai from "@/assets/askai.png";
import ask from "../../../assets/ask.png";
import { FaRegHeart } from "react-icons/fa";
import { IoCopy } from "react-icons/io5";
import { BsWechat } from "react-icons/bs";
import { useState } from "react";
import VerseChatDrawer from "@/components/shared/drawer/BibleChat";
import { storage } from "@/utils/storage";
import { useIsMobile } from "@/hooks/useIsMobile";


interface BibleAction {
    selectedChapter: number,
    selectedVerse: string,
    bibleText: string,
    selectedBook:string

}
const BibleActions:React.FC<BibleAction> = ({selectedChapter,selectedVerse,bibleText,selectedBook}) => {
    const [copySuccess, setCopySuccess] = useState<string>('');
    const textToCopy = `${selectedBook} ${selectedChapter} : ${selectedVerse}. ${bibleText} `;
    const [chatOpen, setChatOpen] = useState(false);
  const isMobile = useIsMobile()
    const handleCopy = async () => {
      try {
        await navigator.clipboard.writeText(textToCopy);
        setCopySuccess('Copied!');
      } catch (err) {
        setCopySuccess('Failed to copy!');
      }
  
      setTimeout(() => setCopySuccess(''), 2000); 
    };


    const handleFavorite = () => {
      const verseKey = `${selectedBook} ${selectedChapter}:${selectedVerse}`;
      const favoriteText = `<strong>${verseKey}</strong> ${bibleText}`;
    
      const storageData = storage.get();
    
      const updatedFavorites = {
        ...(storageData.favorite || {}),
        [verseKey]: favoriteText,
      };
    
      storage.set({
        favorite: updatedFavorites,
      });
    };
    
  return (
    <div>
      <Popover>
        <PopoverTrigger className="absoulte right-0  top-[-60px]">
          <img src={ask} alt="ai chat" className="w-16 lg:w-20 " />
        </PopoverTrigger>
        <PopoverContent className="mr-5 w-fit">
          <div>
            <div className="flex items-center gap-6 ">
              <div onClick={handleFavorite} className="flex-col cursor-pointer flex items-center justify-center">
                <FaRegHeart size={isMobile ? 18 : 24} />
                <span className="text-center text-sm lg:text-lg">Favorite</span>
              </div>
              <div onClick={handleCopy} className="flex-col cursor-pointer flex items-center justify-center">
                <IoCopy size={isMobile ? 18 : 24} />
                <span className="text-center text-sm lg:text-lg">{copySuccess ? 'copied!' : 'copy'}</span>
              </div>
              <div onClick={() => setChatOpen(true)} className="flex-col cursor-pointer flex items-center justify-center">
                <BsWechat size={isMobile ? 18 : 24} />
                <span className="text-center text-sm lg:text-lg">Ai Chat</span>
              </div>
             
            </div>
          </div>
        </PopoverContent>
      </Popover>
         <VerseChatDrawer
              verse={bibleText}
              open={chatOpen}
              onClose={() => setChatOpen(false)}
            />
    </div>
  );
};

export default BibleActions;
