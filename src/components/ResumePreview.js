import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ModernTemplate from "./templates/ModernTemplate";
import ProfessionalTemplate from "./templates/ProfessionalTemplate";
import CreativeTemplate from "./templates/CreativeTemplate";
import "./ResumePreview.css";

const ResumePreview = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [resumeData] = useState(location.state?.resumeData || {});
  const [templateId] = useState(location.state?.templateId || "modern");
  const [isGenerating, setIsGenerating] = useState(false);

  if (!resumeData.personalInfo?.fullName) {
    navigate("/");
    return null;
  }

  const handleChangeTemplate = () => {
    navigate("/select-template", { state: { resumeData } });
  };

  const handleAtsAnalysis = () => {
    navigate("/ats-analysis", { state: { resumeData, templateId } });
  };

  const handleDownload = async () => {
    try {
      setIsGenerating(true);
      const response = await fetch(
        "http://localhost:3001/api/generate-resume",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(resumeData),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to generate PDF");
      }

      // Get the blob from the response
      const blob = await response.blob();

      // Create a URL for the blob
      const url = window.URL.createObjectURL(blob);

      // Create a temporary link element
      const link = document.createElement("a");
      link.href = url;
      link.download = `${resumeData.personalInfo.fullName.replace(
        /\s+/g,
        "_"
      )}_Resume.pdf`;

      // Append to body, click, and remove
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      // Clean up the URL
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error generating PDF:", error);
      alert("Failed to generate PDF. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  const getTemplateComponent = () => {
    switch (templateId) {
      case "modern":
        return <ModernTemplate resumeData={resumeData} />;
      case "professional":
        return <ProfessionalTemplate resumeData={resumeData} />;
      case "creative":
        return <CreativeTemplate resumeData={resumeData} />;
      default:
        return <ModernTemplate resumeData={resumeData} />;
    }
  };

  return (
    <div className="resume-preview-container">
      <div className="resume-preview-header">
        <h1>Resume Preview</h1>
        <div className="header-buttons">
          <button className="analyze-button" onClick={handleAtsAnalysis}>
            <span className="button-text">ATS Analysis</span>
            <span className="button-icon">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </span>
          </button>
          <button
            className="download-button"
            onClick={handleDownload}
            disabled={isGenerating}
          >
            {isGenerating ? "Generating..." : "Download PDF"}
          </button>
          <button
            className="change-template-button"
            onClick={handleChangeTemplate}
          >
            Change Template
          </button>
        </div>
      </div>

      <div className="resume-content">
        <div className="resume-preview">
          <div className="template-info">
            {templateId.charAt(0).toUpperCase() + templateId.slice(1)} Template
          </div>
          {getTemplateComponent()}
        </div>
      </div>
    </div>
  );
};

export default ResumePreview;
