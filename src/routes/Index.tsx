import {  Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import Bible from "@/components/pageComponents/bible/Bible";
import PlansPage from "@/pages/Plans";
import PlanDayList from "@/components/pageComponents/plans/PlanDays";
import PlanDayView from "@/components/pageComponents/plans/PlanDayView";
import PlanBoardPage from "@/pages/PlanBoard";
import PlanCalendar from "@/pages/Calendar";


const AppRoutes = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route
        //  element={<AuthLayout />
        >
          <Route path="/" element={<Bible />} />
          <Route path="/plans" element={<PlansPage />} />
          <Route path="/plans/:planId" element={<PlanDayList />} />
          <Route path="/plans/:planId/:day" element={<PlanDayView />} />
          <Route path="/my-plans" element={<PlanBoardPage />} />
          <Route path="/calendar" element={<PlanCalendar />} />
        </Route>
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;
