
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AdminGuard from "@/components/AdminGuard";
import StudentGuard from "@/components/StudentGuard";
import Index from "./pages/Index";
import Overview from "./pages/about/Overview";
import Faculty from "./pages/about/Faculty";
import Mission from "./pages/about/Mission";
import Infrastructure from "./pages/about/Infrastructure";
import Testimonials from "./pages/about/Testimonials";
import Courses from "./pages/Courses";
import Results from "./pages/Results";
import OnlineForm from "./pages/OnlineForm";
import OnlineClass from "./pages/OnlineClass";
import Contact from "./pages/Contact";
import StudyMaterials from "./pages/students/StudyMaterials";
import VideoLectures from "./pages/VideoLectures";
import QuestionBank from "./pages/students/QuestionBank";
import News from "./pages/News";
import Assignments from "./pages/students/Assignments";
import Syllabus from "./pages/students/Syllabus";
import PreviousPapers from "./pages/students/PreviousPapers";
import StudentPortal from "./pages/students/StudentPortal";
import ExamSchedule from "./pages/students/ExamSchedule";
import FeePayment from "./pages/students/FeePayment";
import NotFound from "./pages/NotFound";
import Auth from "./pages/auth/Auth";
import SignUp from "./pages/auth/SignUp";
import ResetPassword from "./pages/auth/ResetPassword";
import Dashboard from "./pages/admin/Dashboard";
import ListResult from "./pages/admin/ListResult";
import AddResult from "./pages/admin/AddResult";
import Notices from "./pages/admin/Notices";
import ComingSoon from "./pages/admin/ComingSoon";
import SingleNotice from "@/pages/SingleNotice";
import PrivacyPolicy from "./pages/policies/PrivacyPolicy";
import TermsOfService from "./pages/policies/TermsOfService";
import CookiesPolicy from "./pages/policies/CookiesPolicy";

const queryClient = new QueryClient();

const App = () => {
  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Routes>
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
            <Route path="/news" element={<News />} />
            <Route path="/videos" element={<VideoLectures />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/news/:id" element={<SingleNotice />} />
            
            {/* Policy Pages */}
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/terms-of-service" element={<TermsOfService />} />
            <Route path="/cookies-policy" element={<CookiesPolicy />} />
            
            {/* Admin Routes - Protected by AdminGuard */}
            <Route path="/admin" element={<AdminGuard><Dashboard /></AdminGuard>} />
            <Route path="/admin/results" element={<AdminGuard><ListResult /></AdminGuard>} />
            <Route path="/admin/add-result" element={<AdminGuard><AddResult /></AdminGuard>} />
            <Route path="/admin/notices" element={<AdminGuard><Notices /></AdminGuard>} />
            <Route path="/admin/courses" element={<AdminGuard><ComingSoon /></AdminGuard>} />
            <Route path="/admin/faculty" element={<AdminGuard><ComingSoon /></AdminGuard>} />
            <Route path="/admin/materials" element={<AdminGuard><ComingSoon /></AdminGuard>} />
            <Route path="/admin/videos" element={<AdminGuard><ComingSoon /></AdminGuard>} />
            <Route path="/admin/schedule" element={<AdminGuard><ComingSoon /></AdminGuard>} />
            <Route path="/admin/links" element={<AdminGuard><ComingSoon /></AdminGuard>} />
            
            {/* Student Routes - Protected by StudentGuard */}
            <Route path="/materials" element={<StudentGuard><StudyMaterials /></StudentGuard>} />
            <Route path="/assignments" element={<StudentGuard><Assignments /></StudentGuard>} />
            <Route path="/papers" element={<StudentGuard><PreviousPapers /></StudentGuard>} />
            <Route path="/questionbank" element={<StudentGuard><QuestionBank /></StudentGuard>} />
            <Route path="/syllabus" element={<StudentGuard><Syllabus /></StudentGuard>} />
            <Route path="/portal" element={<StudentGuard><StudentPortal /></StudentGuard>} />
            <Route path="/schedule" element={<StudentGuard><ExamSchedule /></StudentGuard>} />
            <Route path="/payment" element={<StudentGuard><FeePayment /></StudentGuard>} />
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
