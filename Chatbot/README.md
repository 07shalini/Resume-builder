# Resume Generator Chatbot

A modern web application that helps users create professional resumes through an interactive chat interface.

## Features

- Interactive chat interface for collecting user information
- Step-by-step resume creation process
- Professional PDF resume generation
- Modern and responsive UI
- Real-time chat experience

## Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)

## Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd resume-generator-chatbot
```

2. Install backend dependencies:

```bash
npm install
```

3. Install frontend dependencies:

```bash
cd client
npm install
```

## Running the Application

1. Start the backend server (from the root directory):

```bash
npm run dev
```

2. In a new terminal, start the frontend development server:

```bash
cd client
npm start
```

The application will be available at:

- Frontend: http://localhost:3000
- Backend: http://localhost:3001

## Usage

1. Open your browser and navigate to http://localhost:3000
2. Follow the chat prompts to enter your information:
   - Full name
   - Email address
   - Skills
   - Work experience
   - Education
3. Once all information is collected, click the "Generate Resume" button
4. Your resume will be generated and downloaded as a PDF file

## Technologies Used

- Frontend:

  - React
  - CSS3
  - Modern JavaScript (ES6+)

- Backend:
  - Node.js
  - Express
  - Puppeteer (for PDF generation)
  - Handlebars (for template rendering)

## License

MIT
