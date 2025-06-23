import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import ModernTemplate from "./templates/ModernTemplate";
import ProfessionalTemplate from "./templates/ProfessionalTemplate";
import CreativeTemplate from "./templates/CreativeTemplate";
import "./TemplateSelection.css";

const templates = [
  {
    id: "modern",
    name: "Modern Template",
    description:
      "Clean and minimalist design perfect for tech and startup roles. Features a sleek layout with emphasis on skills and achievements.",
    component: ModernTemplate,
    features: [
      "ATS-Optimized Layout",
      "Custom Typography",
      "Skills Showcase",
      "Mobile Responsive",
    ],
    popular: true,
  },
  {
    id: "professional",
    name: "Professional Template",
    description:
      "Traditional yet elegant design ideal for corporate and executive positions. Emphasizes professional experience and accomplishments.",
    component: ProfessionalTemplate,
    features: [
      "Executive Style",
      "Section Hierarchy",
      "Achievement Focused",
      "Print Ready",
    ],
  },
  {
    id: "creative",
    name: "Creative Template",
    description:
      "Bold and innovative design for creative professionals. Features a unique two-column layout with customizable color accents.",
    component: CreativeTemplate,
    features: [
      "Custom Color Themes",
      "Portfolio Section",
      "Visual Elements",
      "Dynamic Layout",
    ],
  },
];

const TemplateSelection = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const resumeData = location.state?.resumeData;
  const [selectedTemplate, setSelectedTemplate] = useState(null);

  const handleTemplateSelect = (templateId) => {
    if (!resumeData) {
      navigate("/");
      return;
    }

    setSelectedTemplate(templateId);
    navigate("/resume-preview", {
      state: {
        resumeData,
        templateId,
      },
    });
  };

  if (!resumeData) {
    return (
      <div className="template-selection-container">
        <h2>Please complete your resume information first</h2>
        <button
          onClick={() => navigate("/")}
          className="select-button"
          style={{ maxWidth: "300px", margin: "0 auto" }}
        >
          Go Back
        </button>
      </div>
    );
  }

  const CheckIcon = () => (
    <svg viewBox="0 0 20 20" fill="currentColor" width="16" height="16">
      <path
        fillRule="evenodd"
        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
        clipRule="evenodd"
      />
    </svg>
  );

  return (
    <div className="template-selection-container">
      <h2>Choose Your Perfect Template</h2>
      <div className="templates-grid">
        {templates.map((template) => {
          const TemplateComponent = template.component;
          return (
            <div
              key={template.id}
              className="template-card"
              onClick={() => handleTemplateSelect(template.id)}
            >
              {template.popular && (
                <div
                  style={{
                    position: "absolute",
                    top: "1rem",
                    left: "-2rem",
                    background: "linear-gradient(to right, #ff4d4d, #f9cb28)",
                    color: "white",
                    padding: "0.5rem 2rem",
                    transform: "rotate(-45deg)",
                    fontSize: "0.8rem",
                    fontWeight: "bold",
                    zIndex: 1,
                    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                  }}
                >
                  POPULAR
                </div>
              )}
              <div className="template-preview">
                <TemplateComponent resumeData={{}} isPreview={true} />
              </div>
              <h3>{template.name}</h3>
              <p>{template.description}</p>
              <div className="template-features">
                {template.features.map((feature, index) => (
                  <div key={index} className="template-feature">
                    <CheckIcon />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
              <button
                className="select-button"
                style={{
                  background:
                    selectedTemplate === template.id
                      ? "linear-gradient(to right, #28a745, #20c997)"
                      : "linear-gradient(to right, #007bff, #00bcd4)",
                }}
              >
                {selectedTemplate === template.id ? "Selected" : "Use Template"}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TemplateSelection;
