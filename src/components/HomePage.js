import React from "react";
import { useNavigate } from "react-router-dom";
import "./HomePage.css";

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="homepage-container">
      <div className="homepage-content">
        <div className="hero-section">
          <h1 className="gradient-text">Create Your Professional Resume</h1>
          <p className="hero-subtitle">
            Powered by AI, designed for success. Build a standout resume in
            minutes.
          </p>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z" />
                </svg>
              </div>
              <h3>Smart Templates</h3>
              <p>
                Choose from professionally designed templates optimized for ATS
              </p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z" />
                </svg>
              </div>
              <h3>AI Chat Assistant</h3>
              <p>Get guided assistance to craft the perfect resume content</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                </svg>
              </div>
              <h3>ATS Optimized</h3>
              <p>Ensure your resume passes Applicant Tracking Systems</p>
            </div>
          </div>
          <div className="cta-buttons">
            <button className="start-button" onClick={() => navigate("/chat")}>
              Start Creating
            </button>
            <button
              className="upload-button"
              onClick={() => navigate("/upload-resume")}
            >
              Upload Resume
            </button>
          </div>
        </div>
      </div>
      <div className="background-gradient"></div>
      <div className="background-pattern"></div>
    </div>
  );
};

export default HomePage;
