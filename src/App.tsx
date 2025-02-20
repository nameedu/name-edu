
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Index from "./pages/Index";
import Overview from "./pages/Overview";
import Courses from "./pages/Courses";
import Results from "./pages/Results";
import Contact from "./pages/Contact";
import OnlineForm from "./pages/OnlineForm";
import OnlineClass from "./pages/OnlineClass";
import StudyMaterials from "./pages/StudyMaterials";
import VideoLectures from "./pages/VideoLectures";
import QuestionBank from "./pages/QuestionBank";
import NotFound from "./pages/NotFound";

const App = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/overview" element={<Overview />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/results" element={<Results />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/online-form" element={<OnlineForm />} />
          <Route path="/online-class" element={<OnlineClass />} />
          <Route path="/study-materials" element={<StudyMaterials />} />
          <Route path="/video-lectures" element={<VideoLectures />} />
          <Route path="/question-bank" element={<QuestionBank />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;
