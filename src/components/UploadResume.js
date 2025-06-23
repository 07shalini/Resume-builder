import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./UploadResume.css";

const UploadResume = () => {
  const [file, setFile] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState("");
  const [isUploaded, setIsUploaded] = useState(false);
  const [showAnalysis, setShowAnalysis] = useState(false);
  const [analysisData, setAnalysisData] = useState(null);
  const navigate = useNavigate();

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const droppedFile = e.dataTransfer.files[0];
    handleFile(droppedFile);
  };

  const handleFileInput = (e) => {
    const selectedFile = e.target.files[0];
    handleFile(selectedFile);
  };

  const handleFile = (file) => {
    if (file) {
      if (
        file.type === "application/pdf" ||
        file.type === "application/msword" ||
        file.type ===
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
      ) {
        setFile(file);
        setError("");
        setIsUploaded(false);
        setShowAnalysis(false);
      } else {
        setError("Please upload a PDF or Word document");
      }
    }
  };

  const handleUpload = () => {
    if (!file) {
      setError("Please select a file first");
      return;
    }
    setIsUploaded(true);
    setError("");
  };

  const handleAnalyze = () => {
    // Generate random scores between 60 and 95
    const atsScore = Math.floor(Math.random() * (95 - 60 + 1)) + 60;
    const keywordScore = Math.floor(Math.random() * (95 - 60 + 1)) + 60;
    const overallScore = Math.floor((atsScore + keywordScore) / 2);

    const data = {
      overallScore,
      atsScore,
      keywordScore,
      improvements: [
        "Add more industry-specific keywords",
        "Improve formatting consistency",
        "Highlight key achievements with metrics",
        "Optimize section headings",
      ],
    };

    setAnalysisData(data);
    setShowAnalysis(true);
  };

  return (
    <div className="upload-resume-container">
      <div className="upload-resume-content">
        <h1>Upload Your Resume</h1>
        <p className="upload-description">
          Upload your existing resume and we'll help you analyze it and give you
          a detailed score breakdown.
        </p>

        <div
          className={`upload-area ${isDragging ? "dragging" : ""} ${
            file ? "has-file" : ""
          }`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <input
            type="file"
            id="file-input"
            accept=".pdf,.doc,.docx"
            onChange={handleFileInput}
            className="file-input"
          />
          <div className="upload-icon">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="17 8 12 3 7 8" />
              <line x1="12" y1="3" x2="12" y2="15" />
            </svg>
          </div>
          <p className="upload-text">
            {file
              ? file.name
              : "Drag & drop your resume here or click to browse"}
          </p>
          <p className="upload-hint">Supported formats: PDF, DOC, DOCX</p>
        </div>

        {error && <p className="error-message">{error}</p>}

        <div className="upload-actions">
          {!isUploaded ? (
            <button
              className="upload-button"
              onClick={handleUpload}
              disabled={!file}
            >
              Upload Resume
            </button>
          ) : (
            <button className="upload-button" onClick={handleAnalyze}>
              Analyze Score
            </button>
          )}
          <button className="back-button" onClick={() => navigate(-1)}>
            Go Back
          </button>
        </div>

        {showAnalysis && analysisData && (
          <div className="analysis-section">
            <h2>Resume Analysis Results</h2>

            <div className="score-cards">
              <div className="score-card overall">
                <h3>Overall Score</h3>
                <div className="score-value">{analysisData.overallScore}%</div>
              </div>

              <div className="score-card ats">
                <h3>ATS Score</h3>
                <div className="score-value">{analysisData.atsScore}%</div>
              </div>

              <div className="score-card keywords">
                <h3>Keyword Match</h3>
                <div className="score-value">{analysisData.keywordScore}%</div>
              </div>
            </div>

            <div className="improvements-section">
              <h3>Areas for Improvement</h3>
              <ul className="improvements-list">
                {analysisData.improvements.map((improvement, index) => (
                  <li key={index}>{improvement}</li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UploadResume;
