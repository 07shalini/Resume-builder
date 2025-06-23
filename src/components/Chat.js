import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Chat.css";

const Chat = () => {
  const [messages, setMessages] = useState([
    {
      type: "bot",
      text: "Hello! I'll help you create your professional resume. What is your full name?",
      timestamp: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    },
  ]);
  const [input, setInput] = useState("");
  const [currentStep, setCurrentStep] = useState("name");
  const [isComplete, setIsComplete] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [userData, setUserData] = useState({
    personalInfo: {},
    contact: {},
    professionalSummary: "",
    skills: [],
    workExperience: [],
    education: [],
    certifications: [],
    languages: [],
    projects: [],
    awards: [],
  });
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  const navigate = useNavigate();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Focus input field when component mounts and after typing finishes
  useEffect(() => {
    if (!isTyping && !isComplete) {
      inputRef.current?.focus();
    }
  }, [isTyping, isComplete]);

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const simulateTyping = async (response) => {
    setIsTyping(true);
    // Simulate typing delay based on message length
    await new Promise((resolve) =>
      setTimeout(resolve, Math.min(1000, response.length * 20))
    );
    setIsTyping(false);
    return response;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const timestamp = new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });

    // Add user message
    setMessages((prev) => [...prev, { type: "user", text: input, timestamp }]);
    setInput("");

    try {
      // Check if user wants to skip
      if (input.toLowerCase().trim() === "skip") {
        // Store empty data for the current step
        const newUserData = { ...userData };
        switch (currentStep) {
          case "name":
            newUserData.personalInfo.fullName = "";
            setCurrentStep("title");
            break;
          case "title":
            newUserData.personalInfo.title = "";
            setCurrentStep("email");
            break;
          case "email":
            newUserData.contact.email = "";
            setCurrentStep("phone");
            break;
          case "phone":
            newUserData.contact.phone = "";
            setCurrentStep("location");
            break;
          case "location":
            newUserData.contact.location = "";
            setCurrentStep("linkedin");
            break;
          case "linkedin":
            newUserData.contact.linkedin = "";
            setCurrentStep("summary");
            break;
          case "summary":
            newUserData.professionalSummary = "";
            setCurrentStep("skills");
            break;
          case "skills":
            newUserData.skills = [];
            setCurrentStep("experience");
            break;
          case "experience":
            newUserData.workExperience = [];
            setCurrentStep("education");
            break;
          case "education":
            newUserData.education = [];
            setCurrentStep("certifications");
            break;
          case "certifications":
            newUserData.certifications = [];
            setCurrentStep("languages");
            break;
          case "languages":
            newUserData.languages = [];
            setCurrentStep("projects");
            break;
          case "projects":
            newUserData.projects = [];
            setCurrentStep("awards");
            break;
          case "awards":
            newUserData.awards = [];
            setIsComplete(true);
            break;
          default:
            console.log("Unknown step:", currentStep);
            break;
        }
        setUserData(newUserData);

        // Get next question from server
        const response = await fetch("http://localhost:3001/api/chat", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            message: "",
            step: currentStep,
          }),
        });

        const data = await response.json();
        const botResponse = await simulateTyping(data.nextQuestion);

        setMessages((prev) => [
          ...prev,
          {
            type: "bot",
            text: botResponse,
            timestamp: new Date().toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            }),
          },
        ]);

        if (data.isComplete) {
          setIsComplete(true);
          navigate("/select-template", { state: { resumeData: newUserData } });
        }
        return;
      }

      const response = await fetch("http://localhost:3001/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: input,
          step: currentStep,
        }),
      });

      const data = await response.json();

      if (data.error) {
        const errorMessage = await simulateTyping(
          "Sorry, something went wrong. Please try again."
        );
        setMessages((prev) => [
          ...prev,
          {
            type: "bot",
            text: errorMessage,
            timestamp: new Date().toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            }),
          },
        ]);
        return;
      }

      // Store user data
      const newUserData = { ...userData };
      switch (currentStep) {
        case "name":
          newUserData.personalInfo.fullName = input;
          setCurrentStep("title");
          break;
        case "title":
          newUserData.personalInfo.title = input;
          setCurrentStep("email");
          break;
        case "email":
          newUserData.contact.email = input;
          setCurrentStep("phone");
          break;
        case "phone":
          newUserData.contact.phone = input;
          setCurrentStep("location");
          break;
        case "location":
          newUserData.contact.location = input;
          setCurrentStep("linkedin");
          break;
        case "linkedin":
          if (input.trim()) {
            newUserData.contact.linkedin = input;
          }
          setCurrentStep("summary");
          break;
        case "summary":
          newUserData.professionalSummary = input;
          setCurrentStep("skills");
          break;
        case "skills":
          newUserData.skills = input.split(",").map((skill) => skill.trim());
          setCurrentStep("experience");
          break;
        case "experience":
          const [company, position, duration, responsibilities] = input
            .split("|")
            .map((item) => item.trim());
          newUserData.workExperience = [
            {
              company,
              position,
              duration,
              responsibilities,
            },
          ];
          setCurrentStep("education");
          break;
        case "education":
          const [degree, institution, year, gpa] = input
            .split("|")
            .map((item) => item.trim());
          newUserData.education = [
            {
              degree,
              institution,
              year,
              gpa: gpa || null,
            },
          ];
          setCurrentStep("certifications");
          break;
        case "certifications":
          if (input.trim()) {
            const [name, organization, year] = input
              .split("|")
              .map((item) => item.trim());
            newUserData.certifications = [
              {
                name,
                organization,
                year,
              },
            ];
          }
          setCurrentStep("languages");
          break;
        case "languages":
          const [language, proficiency] = input
            .split("-")
            .map((item) => item.trim());
          newUserData.languages = [
            {
              language,
              proficiency,
            },
          ];
          setCurrentStep("projects");
          break;
        case "projects":
          if (input.trim()) {
            const [name, description, technologies] = input
              .split("|")
              .map((item) => item.trim());
            newUserData.projects = [
              {
                name,
                description,
                technologies,
              },
            ];
          }
          setCurrentStep("awards");
          break;
        case "awards":
          if (input.trim()) {
            const [name, organization, year] = input
              .split("|")
              .map((item) => item.trim());
            newUserData.awards = [
              {
                name,
                organization,
                year,
              },
            ];
          }
          setIsComplete(true);
          break;
        default:
          console.log("Unknown step:", currentStep);
          break;
      }
      setUserData(newUserData);

      // Simulate typing for bot response
      const botResponse = await simulateTyping(data.nextQuestion);

      // Add bot response
      setMessages((prev) => [
        ...prev,
        {
          type: "bot",
          text: botResponse,
          timestamp: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
        },
      ]);

      // Handle completion
      if (data.isComplete) {
        setIsComplete(true);
        // Navigate to template selection page with user data
        navigate("/select-template", { state: { resumeData: newUserData } });
      }
    } catch (error) {
      console.error("Error:", error);
      const errorMessage = await simulateTyping(
        "Sorry, there was an error. Please try again."
      );
      setMessages((prev) => [
        ...prev,
        {
          type: "bot",
          text: errorMessage,
          timestamp: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
        },
      ]);
    }
  };

  return (
    <div className="chat-container">
      <div className="chat-header">
        <h1>Resume Builder AI</h1>
        <div className="chat-status">
          <div className="status-indicator"></div>
          <span>AI Assistant Online</span>
        </div>
      </div>

      <div className="messages">
        {messages.map((message, index) => (
          <div key={index} className={`message ${message.type}`}>
            <div className="message-content">{message.text}</div>
            <div className="message-timestamp">{message.timestamp}</div>
          </div>
        ))}
        {isTyping && (
          <div className="message bot">
            <div className="message-content">
              <div className="typing-indicator">
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <form onSubmit={handleSubmit} className="input-form">
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={handleInputChange}
          placeholder="Type your response..."
          disabled={isComplete || isTyping}
        />
        <button
          type="submit"
          disabled={isComplete || isTyping || !input.trim()}
        >
          <span>Send</span>
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" />
          </svg>
        </button>
      </form>
    </div>
  );
};

export default Chat;
