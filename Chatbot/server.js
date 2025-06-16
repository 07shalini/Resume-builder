const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const puppeteer = require("puppeteer");
const handlebars = require("handlebars");
const fs = require("fs").promises;
const path = require("path");
const { scoreResume } = require("./utils/atsScorer");

const app = express();
const port = process.env.PORT || 3001;
const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key"; // In production, use environment variable

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static("public"));

// Store first 20 users in an array
const MAX_USERS = 20;
const users = [];

// Authentication middleware
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Authentication required" });
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ message: "Invalid token" });
    }
    req.user = user;
    next();
  });
};

// Sign up endpoint
app.post("/api/auth/signup", async (req, res) => {
  try {
    const { email, password, name } = req.body;

    // Check if maximum users reached
    if (users.length >= MAX_USERS) {
      return res.status(400).json({
        message: "Maximum user limit reached. Please try again later.",
      });
    }

    // Check if user already exists
    if (users.find((user) => user.email === email)) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const user = {
      id: users.length + 1,
      email,
      password: hashedPassword,
      name,
      createdAt: new Date().toISOString(),
    };
    users.push(user);

    // Generate token
    const token = jwt.sign(
      { id: user.id, email: user.email, name: user.name },
      JWT_SECRET
    );

    res.status(201).json({
      token,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Error creating user" });
  }
});

// Login endpoint
app.post("/api/auth/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user
    const user = users.find((user) => user.email === email);
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    // Check password
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(400).json({ message: "Invalid password" });
    }

    // Generate token
    const token = jwt.sign(
      { id: user.id, email: user.email, name: user.name },
      JWT_SECRET
    );

    res.json({
      token,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Error logging in" });
  }
});

// Get current user endpoint
app.get("/api/auth/me", authenticateToken, (req, res) => {
  const user = users.find((u) => u.id === req.user.id);
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  res.json({
    id: user.id,
    email: user.email,
    name: user.name,
  });
});

// Get all users (for admin purposes)
app.get("/api/auth/users", authenticateToken, (req, res) => {
  // Only return non-sensitive user data
  const userList = users.map((user) => ({
    id: user.id,
    email: user.email,
    name: user.name,
    createdAt: user.createdAt,
  }));

  res.json(userList);
});

// Store user data temporarily (in a real app, use a database)
let userData = {
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
};

// Chat endpoint to handle user responses
app.post("/api/chat", (req, res) => {
  const { message, step } = req.body;

  // Store user response based on the current step
  switch (step) {
    case "name":
      if (message) userData.personalInfo.fullName = message;
      res.json({
        nextQuestion:
          "What is your professional title? (e.g., Senior Software Engineer)",
      });
      break;
    case "title":
      if (message) userData.personalInfo.title = message;
      res.json({ nextQuestion: "What is your email address?" });
      break;
    case "email":
      if (message) userData.contact.email = message;
      res.json({ nextQuestion: "What is your phone number?" });
      break;
    case "phone":
      if (message) userData.contact.phone = message;
      res.json({
        nextQuestion: "Where are you located? (City, State/Country)",
      });
      break;
    case "location":
      if (message) userData.contact.location = message;
      res.json({
        nextQuestion: "Please provide your LinkedIn profile URL (optional):",
      });
      break;
    case "linkedin":
      if (message) userData.contact.linkedin = message;
      res.json({
        nextQuestion:
          "Write a brief professional summary about yourself (2-3 sentences):",
      });
      break;
    case "summary":
      if (message) userData.professionalSummary = message;
      res.json({
        nextQuestion: "What are your technical skills? (comma-separated)",
      });
      break;
    case "skills":
      if (message)
        userData.skills = message.split(",").map((skill) => skill.trim());
      res.json({
        nextQuestion:
          "Enter your most recent work experience in the following format:\nCompany Name | Position | Start Date - End Date | Key Responsibilities",
      });
      break;
    case "experience":
      if (message) {
        const [company, position, duration, responsibilities] = message
          .split("|")
          .map((item) => item.trim());
        userData.workExperience.push({
          company,
          position,
          duration,
          responsibilities,
        });
      }
      res.json({
        nextQuestion:
          "Enter your highest education in the following format:\nDegree | Institution | Year | GPA (optional)",
      });
      break;
    case "education":
      if (message) {
        const [degree, institution, year, gpa] = message
          .split("|")
          .map((item) => item.trim());
        userData.education.push({
          degree,
          institution,
          year,
          gpa: gpa || null,
        });
      }
      res.json({
        nextQuestion:
          "Enter your most relevant certification (if any) in the following format:\nCertification Name | Issuing Organization | Year",
      });
      break;
    case "certifications":
      if (message) {
        const [name, organization, year] = message
          .split("|")
          .map((item) => item.trim());
        userData.certifications.push({
          name,
          organization,
          year,
        });
      }
      res.json({
        nextQuestion:
          "Enter your primary language and proficiency (e.g., English - Native):",
      });
      break;
    case "languages":
      if (message) {
        const [language, proficiency] = message
          .split("-")
          .map((item) => item.trim());
        userData.languages.push({
          language,
          proficiency,
        });
      }
      res.json({
        nextQuestion:
          "Enter your most significant project in the following format:\nProject Name | Description | Technologies Used",
      });
      break;
    case "projects":
      if (message) {
        const [name, description, technologies] = message
          .split("|")
          .map((item) => item.trim());
        userData.projects.push({
          name,
          description,
          technologies,
        });
      }
      res.json({
        nextQuestion:
          "Enter your most notable award or achievement in the following format:\nAward Name | Organization | Year",
      });
      break;
    case "awards":
      if (message) {
        const [name, organization, year] = message
          .split("|")
          .map((item) => item.trim());
        userData.awards.push({
          name,
          organization,
          year,
        });
      }
      res.json({
        nextQuestion:
          "Great! Your resume information has been collected. Would you like to generate your resume now?",
        isComplete: true,
      });
      break;
    default:
      res.json({ error: "Invalid step" });
  }
});

// Generate PDF resume
app.post("/api/generate-resume", async (req, res) => {
  try {
    // Read the resume template
    const template = await fs.readFile(
      path.join(__dirname, "templates", "resume.hbs"),
      "utf-8"
    );
    const compiledTemplate = handlebars.compile(template);
    const html = compiledTemplate(userData);

    // Generate PDF using Puppeteer
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.setContent(html);
    const pdf = await page.pdf({ format: "A4" });
    await browser.close();

    // Send PDF to client
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", "attachment; filename=resume.pdf");
    res.send(pdf);
  } catch (error) {
    console.error("Error generating PDF:", error);
    res.status(500).json({ error: "Failed to generate PDF" });
  }
});

// ATS scoring endpoint
app.post("/api/score-resume", async (req, res) => {
  try {
    const { resume, jobDescription } = req.body;

    // Score the resume against the job description
    const score = scoreResume(resume, jobDescription);

    res.json(score);
  } catch (error) {
    console.error("Error scoring resume:", error);
    res.status(500).json({ error: "Failed to score resume" });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
