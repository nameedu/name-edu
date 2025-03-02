
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import AdminGuard from "@/components/AdminGuard";
import Index from "./pages/Index";
import Overview from "./pages/Overview";
import Faculty from "./pages/Faculty";
import Mission from "./pages/Mission";
import Infrastructure from "./pages/Infrastructure";
import Testimonials from "./pages/Testimonials";
import Courses from "./pages/Courses";
import Results from "./pages/Results";
import OnlineForm from "./pages/OnlineForm";
import OnlineClass from "./pages/OnlineClass";
import Contact from "./pages/Contact";
import StudyMaterials from "./pages/StudyMaterials";
import VideoLectures from "./pages/VideoLectures";
import QuestionBank from "./pages/QuestionBank";
import News from "./pages/News";
import Assignments from "./pages/Assignments";
import Syllabus from "./pages/Syllabus";
import PreviousPapers from "./pages/PreviousPapers";
import StudentPortal from "./pages/StudentPortal";
import ExamSchedule from "./pages/ExamSchedule";
import FeePayment from "./pages/FeePayment";
import NotFound from "./pages/NotFound";
import Auth from "./pages/Auth";
import SignUp from "./pages/SignUp";
import ResetPassword from "./pages/ResetPassword";
import Dashboard from "./pages/admin/Dashboard";
import ListResult from "./pages/admin/ListResult";
import AddResult from "./pages/admin/AddResult";
import Notices from "./pages/admin/Notices";
import SingleNotice from "@/pages/SingleNotice";
import AdminCourses from "./pages/admin/AdminCourses";
import MaterialsIndex from "./pages/admin/materials/index";
import MaterialsAdd from "./pages/admin/materials/add";
import PapersIndex from "./pages/admin/papers/index";
import PapersAdd from "./pages/admin/papers/add";

const queryClient = new QueryClient();

const App = () => {
  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Index />} />
            <Route path="/overview" element={<Overview />} />
            <Route path="/faculty" element={<Faculty />} />
            <Route path="/mission" element={<Mission />} />
            <Route path="/infrastructure" element={<Infrastructure />} />
            <Route path="/testimonials" element={<Testimonials />} />
            <Route path="/courses" element={<Courses />} />
            <Route path="/results" element={<Results />} />
            <Route path="/online-form" element={<OnlineForm />} />
            <Route path="/online-class" element={<OnlineClass />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/materials" element={<StudyMaterials />} />
            <Route path="/videos" element={<VideoLectures />} />
            <Route path="/questionbank" element={<QuestionBank />} />
            <Route path="/news" element={<News />} />
            <Route path="/assignments" element={<Assignments />} />
            <Route path="/syllabus" element={<Syllabus />} />
            <Route path="/papers" element={<PreviousPapers />} />
            <Route path="/portal" element={<StudentPortal />} />
            <Route path="/schedule" element={<ExamSchedule />} />
            <Route path="/payment" element={<FeePayment />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/news/:id" element={<SingleNotice />} />
            
            {/* Admin Routes - All Protected by AdminGuard */}
            <Route path="/admin" element={<AdminGuard><Dashboard /></AdminGuard>} />
            <Route path="/admin/results" element={<AdminGuard><ListResult /></AdminGuard>} />
            <Route path="/admin/add-result" element={<AdminGuard><AddResult /></AdminGuard>} />
            <Route path="/admin/notices" element={<AdminGuard><Notices /></AdminGuard>} />
            <Route path="/admin/courses" element={<AdminGuard><AdminCourses /></AdminGuard>} />
            
            {/* Student Zone Admin Routes */}
            <Route path="/admin/materials" element={<AdminGuard><MaterialsIndex /></AdminGuard>} />
            <Route path="/admin/materials/add" element={<AdminGuard><MaterialsAdd /></AdminGuard>} />
            <Route path="/admin/papers" element={<AdminGuard><PapersIndex /></AdminGuard>} />
            <Route path="/admin/papers/add" element={<AdminGuard><PapersAdd /></AdminGuard>} />
            
            {/* Catch all route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
          <Toaster />
          <Sonner />
        </TooltipProvider>
      </QueryClientProvider>
    </BrowserRouter>
  );
};

export default App;
