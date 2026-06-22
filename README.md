🌦️ AI Weather Tool Agent

🔗 Live Demo: https://ai-weather-tool-agent.vercel.app/

📌 Overview

AI Weather Tool Agent is an intelligent system that decides whether to respond directly using an LLM or fetch real-time weather data using an external API.

It demonstrates how modern AI agents work internally using:

Routing (intent detection)
Tool calling (API execution)
Structured JSON responses
Separation of reasoning vs execution
🚀 Features
🧠 Smart query routing (weather vs general chat)
🌦️ Real-time weather data integration
⚙️ Tool-based AI architecture
📦 Structured JSON responses for UI rendering
🎯 Clean separation of decision and execution logic
💬 Dual response system (Chat + Weather)
🧩 Core Concepts

This project is built to understand:

Tool Calling in AI agents
Intent Classification / Routing
Structured Output Design (JSON Schema)
LLM as a decision-making system
API integration inside AI workflows
Modular agent architecture
🏗️ System Architecture
User Query
   ↓
Router (Intent Detection)
   ↓
Is Weather Related?
   ├── Yes → Weather Tool (API Call)
   └── No  → Direct LLM Response
                  ↓
        Response Formatter (JSON)
                  ↓
         Final Structured Output
                  ↓
              Frontend UI
🔁 Workflow
User sends a message from the frontend
API route receives the request
Router analyzes intent
If weather-related → calls Weather API tool
Otherwise → LLM generates response
Response is formatted into structured JSON
Frontend renders UI dynamically:
🌦 Weather Card
💬 Chat Bubble
🧾 API Response Format
{
  "route": "weather | chat",
  "status": "success | error",
  "message": "Human readable message",
  "data": {
    "weather": {
      "city": "Mumbai",
      "temperature": 32,
      "condition": "Cloudy",
      "humidity": 70,
      "windSpeed": 12
    },
    "chat": {
      "text": "General AI response here"
    }
  }
}
🌦️ Weather Tool
Provider
WeatherAPI.com (or OpenWeather API)
Input
{
  "city": "Mumbai",
  "date": "today | tomorrow | custom"
}
Output
{
  "temperature": 32,
  "condition": "Cloudy",
  "humidity": 70,
  "windSpeed": 12
}
🧠 Routing Logic
User Query	Action
Weather in Mumbai tomorrow	🌦 Weather Tool
Will it rain today?	🌦 Weather Tool
What is monsoon?	💬 Chat (LLM)
Explain climate change	💬 Chat (LLM)
🖥️ Frontend UI

The UI dynamically renders based on response type:

Components
💬 Chat Input Box
⏳ Loading State (Thinking / Fetching data)
🌦 Weather Card
💬 Chat Bubble
⚙️ Tech Stack
Next.js (App Router)
TypeScript
OpenAI API
Axios
Zod (Schema Validation)
Weather API
📚 Learning Outcomes

This project helps you understand:

How real AI agents are structured
Tool calling architecture
Routing before LLM execution
Structured JSON design for frontend systems
API integration inside AI workflows
Separation of decision-making vs execution
