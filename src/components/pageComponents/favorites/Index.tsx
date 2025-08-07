import { useEffect, useState } from "react";
import { storage } from "@/utils/storage";
import { Heart } from "lucide-react";
import { GiDrippingStar } from "react-icons/gi";

const Favorites = () => {
  const [favorites, setFavorites] = useState<Record<string, string>>({});

  useEffect(() => {
    const storedFavorites = storage.get().favorite || {};
    setFavorites(storedFavorites);
  }, []);

  return (
    <div className="flex gap-6  text-white justify-between lg:px-10 px-4 max-h-screen h-screen overflow-scroll nobar w-full max-w-full 2xl:max-w-[1500px] mx-auto">
      <div className="chat w-full p-4 lg:p-8">
        <h2 className="text-xl font-bold mb-4">Favorite Verses</h2>
        {Object.keys(favorites).length === 0 ? (
          <div className="flex flex-col justify-center items-center">
            <GiDrippingStar size={120} />
            <p className="text-white mt-1">
              You havent added any favorites yet!
            </p>
          </div>
        ) : (
          <ul className="space-y-3">
            {Object.entries(favorites).map(([key, value]) => (
              <li
                key={key}
                className="flex items-start lg:items-center gap-2 border-b p-3 border-[#ffffff5f] shadow"
              >
                <span>
                  <Heart size={16} />
                </span>
                <p
                  dangerouslySetInnerHTML={{ __html: value }}
                  className="text-sm"
                />
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Favorites;
