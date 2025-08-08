import ChatBot from "@/components/pageComponents/Chat.tsx/Index";
import Favorites from "@/components/pageComponents/favorites/Index";
import HomePage from "@/components/pageComponents/home/Index";
import DevotionalList from "@/components/pageComponents/open-heavens/DevtionalTag";
import { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";
const Bible = lazy(() => import("@/components/pageComponents/bible/Bible"));
const PlansPage = lazy(() => import("@/pages/Plans"));
// const PlanDayList = lazy(() => import("@/components/pageComponents/plans/PlanDays"));
// const PlanDayView = lazy(() => import("@/components/pageComponents/plans/PlanDayView"));
// const PlanBoardPage = lazy(() => import("@/pages/PlanBoard"));
const MemorisePage = lazy(() => import("@/pages/Memory"));
const PlanCalendar = lazy(() => import("@/pages/Calendar"));
const Notepad = lazy(() => import("@/components/pageComponents/create-document/Main"));
const BibleInAYear = lazy(() => import("@/components/pageComponents/bible-reading/Main"));
const BibleReadingPageBibleInAYear = lazy(() => import("@/components/pageComponents/bible-reading/BiblePage"));
const OpenHeavensPage = lazy(() => import("@/pages/OpenHeavens"));
// const NoteEditorPage = lazy(() => import("@/components/pageComponents/notes/Index"));

const AppRoutes = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route>
          <Route path="/" element={<Bible />} />
          <Route path="/welcome" element={<HomePage />} />
          {/* <Route path="/bible" element={<Bible />} /> */}
          <Route path="/plans" element={<PlansPage />} />
          {/* <Route path="/plans/:planId" element={<PlanDayList />} /> */}
          {/* <Route path="/plans/:planId/:day" element={<PlanDayView />} /> */}
          {/* <Route path="/my-plans" element={<PlanBoardPage />} /> */}
          <Route path="/memory-verse" element={<MemorisePage />} />
          <Route path="/calendar" element={<PlanCalendar />} />
          <Route path="/notes" element={<Notepad />} />
          <Route path="/bible-reading" element={<BibleInAYear />} />
          <Route path="/bible-reading-page/:id" element={<BibleReadingPageBibleInAYear />} />
          <Route path="/open-heavens/:id" element={<OpenHeavensPage />} />
          <Route path="/open-heavens" element={<DevotionalList />} />
          <Route path="/chat-bot" element={<ChatBot />} />
          <Route path="/favorites" element={<Favorites />} />


        </Route>
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;
