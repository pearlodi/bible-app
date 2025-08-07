import { useParams, useNavigate } from "react-router-dom";
import { devotionals } from "@/data/open-heavens";
import { storage } from "@/utils/storage"; 
import { BibleVerseDrawer } from "@/components/shared/drawer/BibleReading";
import { FaPrayingHands } from "react-icons/fa";
import { IoBookOutline } from "react-icons/io5";

const OpenHeavens = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const devotional = devotionals.find((d) => d.id === id);

  if (!devotional) return <div className="p-6">Devotional not found.</div>;

  const markAsFinished = () => {
    const current = storage.get();
    const updatedStatuses = {
      ...(current.plans?.statuses || {}),
      [id!]: "finished",
    };

    storage.set({
      plans: {
        ...current.plans,
        statuses: updatedStatuses,
      },
    });

    navigate("/open-heavens"); 
  };

  return (
   <div className="px-4 lg:px-10 text-white">
     <div className="w-full nobar  h-screen overflow-auto max-w-full 2xl:max-w-[1500px] mx-auto" >
     <div className="p-6 card"> 
     <h1 className="text-2xl font-bold mb-2">{devotional.title}</h1>
      <p className="text-[#ffffffb0] text-xs mb-4">{devotional.date}</p>
      <div className="mb-4 w-full lg:w-[80%]">
        <strong className="block mb-1">MEMORISE:</strong>
        <p className="text-sm lg:text-base">{devotional.memorise}</p>
      </div>

      <div className="mb-4 text-white">
        <strong className="block mb-1">READ:</strong>
        {/* <p>{devotional.read}</p> */}
        <BibleVerseDrawer verseText={devotional.read}/>
      </div>
     </div>

    <div className="p-6 card mt-8">
    <div className="mb-4 text-sm lg:text-base leading-[30px]">
        {/* <strong className="block mb-1 leading-3.5">MESSAGE:</strong> */}
        <p dangerouslySetInnerHTML={{ __html: devotional.message }} />

      </div>

      <div className="mb-4">
        <strong className="font-semibold mb-1 flex items-center gap-1"><FaPrayingHands/>PRAYER POINT:</strong>
        <p>{devotional.prayerPoint}</p>
      </div>

      <div className="mb-4">
        <strong className=" mb-1 flex items-center gap-1"><IoBookOutline/>HYMN:</strong>
        <p>{devotional.hymn}</p>
      </div>
    </div>

      <button
        onClick={markAsFinished}
        className="mt-4 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
      >
        Mark as Finished
      </button>
    </div>
   </div>
  );
};

export default OpenHeavens;
