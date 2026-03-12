import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import ProtectedRoute from "./components/ProtectedRoute";

import Dashboard from "./pages/Dashboard";
import Jobs from "./pages/Jobs";
import Match from "./pages/Match";
import Roadmap from "./pages/Roadmap";
import ResumeUpload from "./pages/ResumeUpload";
import ResumeMatch from "./pages/ResumeMatch";
import ResumeFeedback from "./pages/ResumeFeedback";
import AICareerAdvisor from "./pages/AICareerAdvisor";
import InterviewPrep from "./pages/InterviewPrep";
import CareerDashboard from "./pages/CareerDashboard";
import VoiceInterview from "./pages/VoiceInterview";

/* AUTH PAGES */
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Profile from "./pages/Profile";

function App() {
  return (
    <Router>
      <Routes>

        {/* PUBLIC ROUTES */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* PROTECTED ROUTES */}

        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/analytics"
          element={
            <ProtectedRoute>
              <CareerDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/jobs"
          element={
            <ProtectedRoute>
              <Jobs />
            </ProtectedRoute>
          }
        />

        <Route
          path="/match"
          element={
            <ProtectedRoute>
              <Match />
            </ProtectedRoute>
          }
        />

        <Route
          path="/roadmap/:jobId"
          element={
            <ProtectedRoute>
              <Roadmap />
            </ProtectedRoute>
          }
        />

        <Route
          path="/resume-upload"
          element={
            <ProtectedRoute>
              <ResumeUpload />
            </ProtectedRoute>
          }
        />

        <Route
          path="/resume-match"
          element={
            <ProtectedRoute>
              <ResumeMatch />
            </ProtectedRoute>
          }
        />

        <Route
          path="/resume-feedback"
          element={
            <ProtectedRoute>
              <ResumeFeedback />
            </ProtectedRoute>
          }
        />

        <Route
          path="/advisor"
          element={
            <ProtectedRoute>
              <AICareerAdvisor />
            </ProtectedRoute>
          }
        />

        <Route
          path="/interview"
          element={
            <ProtectedRoute>
              <InterviewPrep />
            </ProtectedRoute>
          }
        />

        <Route
          path="/voice-interview"
          element={
            <ProtectedRoute>
              <VoiceInterview />
            </ProtectedRoute>
          }
        />

        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />

      </Routes>
    </Router>
  );
}

export default App;