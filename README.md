# 🌦️ AI Weather Tool Agent

An intelligent AI-powered agent that decides whether to respond directly using an LLM or fetch real-time weather data using an external API tool.

Built using **Next.js, OpenAI API, Zod validation, and a custom tool-calling agent architecture.**

🔗 **Live Demo:** https://ai-weather-tool-agent.vercel.app/

---

## ✨ Features

- 🧠 Smart intent-based routing (weather vs general chat)
- 🌦️ Real-time weather data fetching using external API
- ⚙️ Tool-calling based AI agent architecture
- 📦 Strict structured JSON responses for frontend rendering
- 🎯 Separation of reasoning (LLM) and execution (tools)
- 💬 Dual response system: Chat + Weather
- ⚡ Fast and lightweight API-based backend flow
- 🧾 Clean UI-ready response format

---

## 🧱 Tech Stack

### Frontend
- Next.js (App Router)
- React
- Tailwind CSS

### Backend
- Next.js API Routes
- Custom AI Agent Layer (Router + Executor pattern)
- Zod (Schema validation)

### AI + Tools
- OpenAI API (LLM reasoning)
- Weather API (OpenWeather / WeatherAPI)
- Axios (API requests)

---

## ⚙️ How It Works

1. User sends a message from the frontend  
2. API route receives the request  
3. Router classifies intent (weather or chat)  

### If weather-related:
- Extract city + time
- Call Weather API tool

### If not weather-related:
- LLM responds directly

4. Response is formatted into strict JSON  
5. Frontend renders UI dynamically:
   - 🌦 Weather Card
   - 💬 Chat Bubble

---

## 🧠 Example Output

{
  "route": "weather",
  "status": "success",
  "message": "Weather data fetched successfully",
  "data": {
    "weather": {
      "city": "Mumbai",
      "temperature": 32,
      "condition": "Cloudy",
      "humidity": 70,
      "windSpeed": 12
    }
  }
}
🧩 Core Concepts
Tool Calling in AI Agents
Intent Detection / Routing Logic
LLM vs Tool Execution Separation
Structured Output Design (JSON schemas)
API integration inside AI workflows
Backend-driven AI architecture
🔥 API Flow
User Query
   ↓
Router (Intent Detection)
   ↓
Weather Query?
   ├── Yes → Weather Tool (API Call)
   └── No  → Direct LLM Response
                  ↓
        Response Formatter (Zod Schema)
                  ↓
         Final Structured JSON
                  ↓
              Frontend UI
🧾 Response Format
{
  "route": "weather | chat",
  "status": "success | error",
  "message": "Human readable message",
  "data": {
    "weather": {
      "city": "Mumbai",
      "temperature": 32,
    },
    "chat": {
      "text": "General AI response"
    }
  }
}
🛠️ Run Locally
git clone https://github.com/your-username/ai-weather-tool-agent
cd ai-weather-tool-agent

npm install
npm run dev
🔐 Environment Variables

Create a .env file:

OPENAI_API_KEY=your_key
GEMINI_API_KEY=your_key
GROQ_API_KEY=your_key
WEATHER_API_KEY=your_key
🚀 Future Improvements
🌍 Add multiple tools (news, calculator, time)
🧠 Memory-based conversations
🔗 Multi-step tool chaining
⚡ Streaming responses (ChatGPT-like UX)
🧩 LangGraph-style agent orchestration
📊 Smarter routing using LLM classifiers
📌 Why This Project Stands Out

This project demonstrates:

Real-world AI agent architecture
Tool-calling system design (Router → Tool → Formatter)
Clean separation of reasoning vs execution
Production-style structured JSON APIs
Practical understanding of modern LLM workflows
Scalable backend AI design patterns
⭐ If You Like This Project

Give it a star and explore the live demo:
👉 https://ai-weather-tool-agent.vercel.app/
