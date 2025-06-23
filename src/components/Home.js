import React from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";

const Home = () => {
  const navigate = useNavigate();

  const handleStartChat = () => {
    navigate("/chat");
  };

  return (
    <div className="home-container">
      <div className="home-content">
        <h1>Welcome to Resume Builder AI</h1>
        <p>Create a professional resume with the help of our AI assistant</p>
        <button onClick={handleStartChat} className="start-button">
          Start Building Your Resume
        </button>
      </div>
    </div>
  );
};

export default Home;
