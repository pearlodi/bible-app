import { Link, useLocation } from "react-router-dom";

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Menu, X } from "lucide-react";
import { useState } from "react";

const menuItems = [
  { title: "Bible", path: "/" },
  { title: "Open Heavens", path: "/open-heavens" },
  { title: "Memorise", path: "/memory-verse" },
  { title: "Bible reading", path: "/bible-reading" },
  { title: "Notes", path: "/notes" },
  // { title: "Calendar", path: "/calendar" },
  { title: "Chat", path: "/chat-bot" },
  { title: "Favorites", path: "/favorites" },
];

export function NavigationMenuDemo() {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div> 
    <NavigationMenu viewport={false} className="fixed  hidden lg:flex w-full max-w-full nav py-3">
      <NavigationMenuList className="bg-transparent text-white hover:text-white w-full">
        {menuItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <NavigationMenuItem
              key={item.path}
              className={isActive ? "border-b border-white hover:text-white rounded-none text-white" : "hover:text-white"}
            >
              <NavigationMenuLink  asChild className={navigationMenuTriggerStyle()}>
                <Link
                  to={item.path}
                  className={`text-white bg-transparent px-3 py-1 ${
                    isActive ? "font-bold text-white" : "font-normal"
                  }`}
                >
                  {item.title}
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
          );
        })}
      </NavigationMenuList>
    </NavigationMenu>



      <div className="fixed w-full flex items-center justify-between px-4 py-3 navmobile text-white md:hidden z-30">
        <div className="text-lg font-semibold">Devotional</div>
        <button onClick={() => setIsOpen(true)}>
          <Menu className="w-6 h-6" />
        </button>
      </div>

      <div
        className={`fixed top-0 left-0 h-full w-full navmobile text-white transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 z-40`}
      >
        <div className="flex justify-between items-center px-4 py-3 border-b border-gray-700">
          <span className="text-lg font-bold">Menu</span>
          <button onClick={() => setIsOpen(false)}>
            <X className="w-6 h-6" />
          </button>
        </div>
        <nav className="flex flex-col p-4 space-y-2">
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setIsOpen(false)}
                className={`block px-2 py-2 rounded ${
                  isActive ? "bg-white w-1/2 text-black font-bold" : "hover:bg-gray-800"
                }`}
              >
                {item.title}
              </Link>
            );
          })}
        </nav>
      </div>

      {isOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-30 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  );
}
