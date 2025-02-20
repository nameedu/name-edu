
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
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
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
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
          <Route path="/materials" element={<StudyMaterials />} />
          <Route path="/videos" element={<VideoLectures />} />
          <Route path="/questionbank" element={<QuestionBank />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
