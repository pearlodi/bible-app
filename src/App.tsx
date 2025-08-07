import AppRoutes from "./routes/Index";
import { useThemeBackground } from "@/hooks/useTheme";
import AOS from "aos";
import "aos/dist/aos.css";
import "react-calendar/dist/Calendar.css";
import ThemeDrawer from "./components/shared/drawer/Theme";
import { NavigationMenuDemo } from "./components/shared/Navbar";
import { useEffect } from "react";
import { useLocation } from "react-router-dom"; 

const App = () => {
  const location = useLocation(); 
  const isRootPath = location.pathname === "/welcome";

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
  }, []);

  useThemeBackground();

  return (
    <div className="w-full">
      {!isRootPath && <NavigationMenuDemo />}
      <div className={isRootPath ? "" : "pt-[80px]"}>
        <AppRoutes />
        <ThemeDrawer />
      </div>
    </div>
  );
};

export default App;
