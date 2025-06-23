import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./ATSAnalysis.css";

const ATSAnalysis = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [resumeData] = useState(location.state?.resumeData || {});
  const [jobDescription, setJobDescription] = useState("");
  const [atsScore, setAtsScore] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  if (!resumeData.personalInfo?.fullName) {
    navigate("/");
    return null;
  }

  const handleAtsAnalysis = async () => {
    if (!jobDescription.trim()) {
      alert("Please enter a job description first");
      return;
    }

    setIsAnalyzing(true);
    try {
      // Create a flattened version of the resume text for analysis
      const resumeText = `
        ${resumeData.personalInfo.fullName}
        ${resumeData.personalInfo.title || ""}
        
        Contact Information:
        ${resumeData.contact.email}
        ${resumeData.contact.phone || ""}
        ${resumeData.contact.location || ""}
        ${resumeData.contact.linkedin || ""}
        
        Professional Summary:
        ${resumeData.professionalSummary || ""}
        
        Skills:
        ${resumeData.skills.join(", ")}
        
        Work Experience:
        ${resumeData.workExperience
          .map(
            (exp) => `
          ${exp.position} at ${exp.company}
          ${exp.duration}
          ${exp.responsibilities}
        `
          )
          .join("\n")}
        
        Education:
        ${resumeData.education
          .map(
            (edu) => `
          ${edu.degree}
          ${edu.institution}
          ${edu.year}
          ${edu.gpa ? `GPA: ${edu.gpa}` : ""}
        `
          )
          .join("\n")}
        
        ${
          resumeData.certifications
            ? `
        Certifications:
        ${resumeData.certifications
          .map(
            (cert) => `
          ${cert.name} - ${cert.organization} (${cert.year})
        `
          )
          .join("\n")}
        `
            : ""
        }
        
        ${
          resumeData.languages
            ? `
        Languages:
        ${resumeData.languages
          .map(
            (lang) => `
          ${lang.language} - ${lang.proficiency}
        `
          )
          .join("\n")}
        `
            : ""
        }
        
        ${
          resumeData.projects
            ? `
        Projects:
        ${resumeData.projects
          .map(
            (project) => `
          ${project.name}
          ${project.description}
          Technologies: ${project.technologies}
        `
          )
          .join("\n")}
        `
            : ""
        }
        
        ${
          resumeData.awards
            ? `
        Awards:
        ${resumeData.awards
          .map(
            (award) => `
          ${award.name} - ${award.organization} (${award.year})
        `
          )
          .join("\n")}
        `
            : ""
        }
      `;

      const response = await fetch("http://localhost:3001/api/score-resume", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          resume: resumeText,
          jobDescription,
        }),
      });

      const data = await response.json();
      setAtsScore(data);
    } catch (error) {
      console.error("Error analyzing resume:", error);
      alert("Error analyzing resume. Please try again.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleBack = () => {
    navigate("/resume-preview", {
      state: { resumeData, templateId: location.state?.templateId },
    });
  };

  return (
    <div className="ats-analysis-container">
      <div className="ats-analysis-header">
        <button className="back-button" onClick={handleBack}>
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
          Back to Preview
        </button>
        <h1>ATS Analysis</h1>
      </div>

      <div className="ats-analysis-content">
        <div className="ats-analysis">
          <h2>Analyze Your Resume</h2>
          <div className="job-description-input">
            <textarea
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              placeholder="Paste the job description here..."
              rows="6"
            />
            <button
              onClick={handleAtsAnalysis}
              disabled={isAnalyzing}
              className="analyze-button"
            >
              {isAnalyzing ? "Analyzing..." : "Analyze Resume"}
            </button>
          </div>

          {atsScore && (
            <div className="score-details">
              <div className="score-item">
                <h3>Overall Score</h3>
                <div className="score-value">{atsScore.overallScore}%</div>
              </div>
              <div className="score-item">
                <h3>Keyword Match</h3>
                <div className="score-value">{atsScore.keywordMatch}%</div>
              </div>
              <div className="score-item">
                <h3>Skills Match</h3>
                <div className="score-value">{atsScore.skillsMatch}%</div>
              </div>
              <div className="matching-keywords">
                <h3>Matching Keywords</h3>
                <ul>
                  {atsScore.matchingKeywords.map((keyword, index) => (
                    <li key={index}>{keyword}</li>
                  ))}
                </ul>
              </div>
              <div className="suggestions">
                <h3>Suggestions for Improvement</h3>
                <ul>
                  {atsScore.suggestions.map((suggestion, index) => (
                    <li key={index}>{suggestion}</li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ATSAnalysis;
