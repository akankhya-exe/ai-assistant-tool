# My AI Assistant Tool 🚀

A full-stack, decoupled AI web application that leverages the Google Gemini 2.5 Flash model to process user text. Built with a Python/Flask backend API and a modern React/Vite frontend.

## 🌟 Features
* **Custom AI Prompting:** Includes specialized routes for Explaining Concepts (ELI5), Summarizing Text, and Generating Quizzes.
* **Graceful Error Handling:** Validates inputs and handles empty submissions without crashing.
* **Persistent Chat History:** Maintains the context of the conversation during the active session.
* **Rich Markdown Support:** Parses and renders markdown (bolding, lists, code blocks) directly from the LLM output.
* **Interactive UI:** Features real-time loading states and disabled inputs during API calls.

## 🛠️ Tech Stack
* **Backend:** Python, Flask, Flask-CORS
* **Frontend:** React, Vite, react-markdown
* **AI Model:** Google Gemini API (`gemini-2.5-flash`)

## 🚀 Setup & Installation

### Prerequisites
* Node.js (v18+)
* Python (3.9+)
* A free Google Gemini API Key

### 1. Backend Setup
Navigate to the `backend` directory and set up the Python environment:

    cd backend
    python -m venv venv
    # Activate on Windows: venv\Scripts\activate
    # Activate on Mac/Linux: source venv/bin/activate
    
    pip install -r requirements.txt

Create a `.env` file in the `backend` folder and add your key:

    GEMINI_API_KEY=your_api_key_here

Start the server:

    python app.py

### 2. Frontend Setup
Open a new terminal, navigate to the `frontend` directory, and start the application:

    cd frontend
    npm install
    npm run dev