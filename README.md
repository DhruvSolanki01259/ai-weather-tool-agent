🌦️ AI Weather Tool Agent

🔗 Live Demo: https://ai-weather-tool-agent.vercel.app/

An AI-powered agent that intelligently decides whether to answer directly or fetch real-time weather data using a tool (Weather API). Built with Next.js, this project demonstrates core concepts of modern AI systems like routing, tool calling, and structured JSON outputs.

🚀 Features
🧠 Intelligent query routing (weather vs general chat)
🌦️ Real-time weather data fetching using external API
⚙️ Tool-based architecture (agent decides when to call APIs)
📦 Structured JSON responses for frontend rendering
🎯 Separation of decision-making and execution
💬 Dual-mode responses: Weather + Chat
🧩 Core Concepts

This project demonstrates:

Tool Calling in AI agents
Routing / Intent classification
Structured Output (JSON schema design)
LLM as a decision maker
API integration inside AI workflows
Separation of concerns in agent architecture
🏗️ System Architecture
User Query
   ↓
Router (Intent Detection)
   ↓
Weather Query? ─────── Yes ───────→ Weather Tool (API Call)
   ↓                                   ↓
No                                    Weather Data
   ↓                                   ↓
LLM Direct Answer              Response Formatter
   ↓                                   ↓
        Final Structured JSON Response
🔁 Workflow
User sends a message from frontend UI
API route receives the request
Router classifies intent:
Weather-related → calls weather tool
Otherwise → direct LLM response
Weather API is called when required
LLM formats final structured response
JSON is returned to frontend
UI renders:
🌦 Weather Card
💬 Chat Bubble
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
      "text": "General AI response here"
    }
  }
}
🌦️ Weather Tool

Uses external APIs like:
WeatherAPI.com

Input:
{
  "city": "Mumbai",
  "date": "2026-06-22" 
}

Output:
{
  "temperature": 32,
  "condition": "Cloudy",
}

🧠 Routing Logic
User Query	Action
"Weather in Mumbai tomorrow"	🌦 Weather Tool
"Will it rain today?"	🌦 Weather Tool
"What is monsoon?"	💬 Chat
"Explain climate change"	💬 Chat
🖥️ Frontend UI
💬 Chat input box
⏳ Loading state (thinking / fetching weather)
🌦 Weather card (dynamic rendering)
💬 Chat message UI

UI changes dynamically based on route.

⚙️ Tech Stack
Next.js (App Router)
TypeScript
OpenAI API
Axios
Zod (schema validation)
Weather API (OpenWeather / WeatherAPI)
📚 Learning Outcomes
How AI agents are structured in production
Tool calling architecture
Routing systems in LLM applications
Structured JSON design for UI
API integration inside AI workflows
Separation of decision vs execution logic