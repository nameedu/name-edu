
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// Pages
import Index from "@/pages/Index";
import Contact from "@/pages/Contact";
import Courses from "@/pages/Courses";
import Faculty from "@/pages/Faculty";
import Infrastructure from "@/pages/Infrastructure";
import Mission from "@/pages/Mission";
import NotFound from "@/pages/NotFound";
import OnlineClass from "@/pages/OnlineClass";
import OnlineForm from "@/pages/OnlineForm";
import Overview from "@/pages/Overview";
import Results from "@/pages/Results";
import Testimonials from "@/pages/Testimonials";
import Auth from "@/pages/Auth";
import SignUp from "@/pages/SignUp";
import ResetPassword from "@/pages/ResetPassword";
import Assignments from "@/pages/Assignments";
import ExamSchedule from "@/pages/ExamSchedule";
import FeePayment from "@/pages/FeePayment";
import News from "@/pages/News";
import PreviousPapers from "@/pages/PreviousPapers";
import QuestionBank from "@/pages/QuestionBank";
import Syllabus from "@/pages/Syllabus";
import StudentPortal from "@/pages/StudentPortal";
import StudyMaterials from "@/pages/StudyMaterials";
import VideoLectures from "@/pages/VideoLectures";
import SingleNotice from "@/pages/SingleNotice";

// Admin Pages
import Dashboard from "@/pages/admin/Dashboard";
import Notices from "@/pages/admin/Notices";
import ListResult from "@/pages/admin/ListResult";
import AddResult from "@/pages/admin/AddResult";

// New Policy Pages
import PrivacyPolicy from "@/pages/PrivacyPolicy";
import TermsOfService from "@/pages/TermsOfService";
import CookiePolicy from "@/pages/CookiePolicy";

// Components
import CookieConsent from "@/components/CookieConsent";

// Create a client
const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/overview" element={<Overview />} />
          <Route path="/mission" element={<Mission />} />
          <Route path="/faculty" element={<Faculty />} />
          <Route path="/infrastructure" element={<Infrastructure />} />
          <Route path="/testimonials" element={<Testimonials />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/results" element={<Results />} />
          <Route path="/online-form" element={<OnlineForm />} />
          <Route path="/online-class" element={<OnlineClass />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Auth />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/reset-password" element={<ResetPassword />} />

          {/* Student Zone Routes */}
          <Route path="/materials" element={<StudyMaterials />} />
          <Route path="/videos" element={<VideoLectures />} />
          <Route path="/questionbank" element={<QuestionBank />} />
          <Route path="/news" element={<News />} />
          <Route path="/news/:id" element={<SingleNotice />} />
          <Route path="/assignments" element={<Assignments />} />
          <Route path="/syllabus" element={<Syllabus />} />
          <Route path="/papers" element={<PreviousPapers />} />
          <Route path="/portal" element={<StudentPortal />} />
          <Route path="/schedule" element={<ExamSchedule />} />
          <Route path="/payment" element={<FeePayment />} />

          {/* New Policy Pages */}
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms-of-service" element={<TermsOfService />} />
          <Route path="/cookie-policy" element={<CookiePolicy />} />

          {/* Admin Routes */}
          <Route path="/admin/dashboard" element={<Dashboard />} />
          <Route path="/admin/notices" element={<Notices />} />
          <Route path="/admin/results" element={<ListResult />} />
          <Route path="/admin/results/add" element={<AddResult />} />
          
          <Route path="*" element={<NotFound />} />
        </Routes>
        
        <CookieConsent />
        <Toaster />
      </BrowserRouter>
    </QueryClientProvider>
  );
};

export default App;
