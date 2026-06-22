"use client";

import { useEffect, useRef, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { DirectResultCard } from "@/components/result/DirectResultCard";
import { WeatherResultCard } from "@/components/result/WeatherResultCard";
import { Send, ArrowDown } from "lucide-react";

type Message = {
  role: "user" | "assistant";
  data?: any;
  text?: string;
};

export default function Home() {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);

  const chatEndRef = useRef<HTMLDivElement | null>(null);
  const [showScrollBtn, setShowScrollBtn] = useState(false);

  const isDisabled = loading || !query.trim();

  const handleSubmit = async () => {
    if (!query.trim() || loading) return;

    const userMessage: Message = { role: "user", text: query };
    setMessages((p) => [...p, userMessage]);

    const currentQuery = query;
    setQuery("");
    setLoading(true);

    try {
      const res = await fetch("/api/ask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: currentQuery }),
      });

      const json = await res.json();

      setMessages((p) => [...p, { role: "assistant", data: json }]);
    } finally {
      setLoading(false);
    }
  };

  const clearChat = () => setMessages([]);

  // Auto scroll on new messages
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  // Detect scroll position
  useEffect(() => {
    const handleScroll = () => {
      const atBottom =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 120;

      setShowScrollBtn(!atBottom);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="h-screen flex flex-col bg-linear-to-b from-blue-50 via-white to-blue-50">

      {/* HEADER */}
      <header className="border-b bg-white/70 backdrop-blur-md sticky top-0 z-10">
        <div className="max-w-3xl mx-auto px-4 py-3 flex items-center justify-between">

          <div>
            <h1 className="text-sm font-semibold tracking-tight text-blue-900">
              AI Query Engine
            </h1>
            <p className="text-[11px] text-muted-foreground">
              Smart routing • Direct + Weather intelligence system
            </p>
          </div>

          {messages.length > 0 && (
            <Button
              onClick={clearChat}
              variant="outline"
              className="text-xs h-8 border-blue-200 text-blue-700 hover:bg-blue-50"
            >
              Clear chat
            </Button>
          )}

        </div>
      </header>

      {/* MAIN */}
      <main className="flex-1 flex justify-center overflow-y-auto px-4">
        <div className="w-full max-w-3xl flex flex-col">

          {/* EMPTY STATE */}
          {messages.length === 0 && (
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center space-y-5">

                <h2 className="text-3xl font-bold text-blue-900">
                  Ask. Analyze. Understand. ⚡
                </h2>

                <p className="text-sm text-muted-foreground max-w-md mx-auto">
                  Structured AI system that intelligently routes queries into specialized pipelines.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                  <div className="p-3 bg-blue-50 border border-blue-100 rounded-xl shadow-sm">
                    ⚡ Fast structured responses
                  </div>
                  <div className="p-3 bg-blue-50 border border-blue-100 rounded-xl shadow-sm">
                    🌦 Weather intelligence engine
                  </div>
                  <div className="p-3 bg-blue-50 border border-blue-100 rounded-xl shadow-sm">
                    🧠 Smart routing AI
                  </div>
                </div>

                <div className="mt-6 p-4 rounded-xl border border-blue-100 bg-blue-50/40 text-[11px] text-muted-foreground max-w-md mx-auto">
                  <p className="font-medium text-blue-900 mb-1">
                    System Note
                  </p>
                  <p>
                    Uses a hybrid system combining Weather API + LLM reasoning engine.
                    Responses may vary depending on query clarity and routing behavior.
                  </p>
                </div>

              </div>
            </div>
          )}

          {/* CHAT */}
          <div className="space-y-4 py-6 pb-32">
            {messages.map((msg, i) => (
              <div key={i}>

                {msg.role === "user" && (
                  <div className="ml-auto max-w-[80%] bg-blue-600 text-white px-4 py-2 rounded-2xl text-sm w-fit shadow-sm">
                    {msg.text}
                  </div>
                )}

                {msg.role === "assistant" && msg.data && (
                  <div className="space-y-2">
                    {msg.data.path === "direct" && (
                      <DirectResultCard data={msg.data.result} />
                    )}

                    {msg.data.path === "weather" && (
                      <WeatherResultCard data={msg.data.result} />
                    )}
                  </div>
                )}
              </div>
            ))}

            {loading && (
              <div className="text-xs text-blue-600 animate-pulse">
                Processing request through AI pipeline...
              </div>
            )}

            {/* scroll anchor */}
            <div ref={chatEndRef} />
          </div>
        </div>
      </main>

      {/* FLOATING SCROLL BUTTON */}
      {showScrollBtn && (
        <button
          onClick={scrollToBottom}
          className="fixed bottom-24 right-6 bg-blue-600 text-white p-2 rounded-full shadow-lg hover:bg-blue-700 transition"
        >
          <ArrowDown size={18} />
        </button>
      )}

      {/* INPUT */}
      <div className="fixed bottom-5 left-0 right-0 flex justify-center px-4">
        <div className="w-full max-w-3xl">

          <div className="flex items-center gap-2 bg-white/70 backdrop-blur-xl border border-blue-100 shadow-xl rounded-2xl p-2 transition-all focus-within:ring-2 focus-within:ring-blue-200">

            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
              placeholder="Ask anything..."
              className="flex-1 border-0 shadow-none focus-visible:ring-0 text-sm bg-transparent px-2"
            />

            <Button
              onClick={handleSubmit}
              disabled={isDisabled}
              className="rounded-xl px-4 h-10 bg-blue-600 hover:bg-blue-700 text-white shadow-sm hover:shadow-md disabled:opacity-40"
            >
              <Send size={18} />
            </Button>

          </div>

          <p className="text-center text-[11px] text-muted-foreground mt-2">
            Powered by AI routing engine • Direct + Weather pipelines
          </p>

        </div>
      </div>

      {/* FOOTER */}
      <footer className="border-t bg-white/60 backdrop-blur-md">
        <div className="max-w-3xl mx-auto px-4 py-3 flex justify-between text-[11px] text-muted-foreground">

          <span>Built with Next.js • Tailwind • AI backend</span>

          <span className="text-blue-600 font-medium">
            v1.0 • Smart Response System
          </span>

        </div>
      </footer>

    </div>
  );
}