import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Auth from "./pages/Auth";
import HomePage from "./components/HomePage";
import Chat from "./components/Chat";
import TemplateSelection from "./components/TemplateSelection";
import ResumePreview from "./components/ResumePreview";
import ATSAnalysis from "./components/ATSAnalysis";
import UploadResume from "./components/UploadResume";
import Header from "./components/Header";
import "./App.css";

// Protected Route component
const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("authToken");
  if (!token) {
    return <Navigate to="/auth" replace />;
  }
  return (
    <>
      <Header />
      {children}
    </>
  );
};

function App() {
  return (
    <Router>
      <div className="App">

        <main>
          <Routes>
            <Route path="/auth" element={<Auth />} />
            <Route
              path="/homepage"
              element={
                <ProtectedRoute>
                  <HomePage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/chat"
              element={
                <ProtectedRoute>
                  <Chat />
                </ProtectedRoute>
              }
            />
            <Route
              path="/select-template"
              element={
                <ProtectedRoute>
                  <TemplateSelection />
                </ProtectedRoute>
              }
            />
            <Route
              path="/resume-preview"
              element={
                <ProtectedRoute>
                  <ResumePreview />
                </ProtectedRoute>
              }
            />
            <Route
              path="/ats-analysis"
              element={
                <ProtectedRoute>
                  <ATSAnalysis />
                </ProtectedRoute>
              }
            />
            <Route
              path="/upload-resume"
              element={
                <ProtectedRoute>
                  <UploadResume />
                </ProtectedRoute>
              }
            />
            <Route path="/" element={<Navigate to="/homepage" replace />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
