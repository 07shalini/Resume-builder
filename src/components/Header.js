import React from "react";
import { useNavigate } from "react-router-dom";
import "./Header.css";

const Header = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Remove the auth token
    localStorage.removeItem("authToken");
    // Redirect to auth page
    navigate("/auth");
  };

  return (
    <header className="app-header">
      <div className="header-content">
        <h1>Resume Builder AI</h1>
        <button onClick={handleLogout} className="logout-button">
          Logout
        </button>
      </div>
    </header>
  );
};

export default Header;
