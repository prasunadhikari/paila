
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Bot,
  MapPin,
  Send,
  Sparkles,
  User,
  RotateCcw,
} from "lucide-react";
import { apiRequest } from "../../../api/client";

interface Message {
  id: number;
  role: "user" | "assistant";
  content: string;
}

interface AIResponse {
  success: boolean;
  message: string;
}

const suggestions = [
  "Tell me about Pokhara",
  "Best places to visit in Nepal?",
  "How can I travel to Mustang?",
  "What can I do in Kathmandu?",
];

function getStoredToken(): string | null {
  return (
    localStorage.getItem("paila_token") ||
    sessionStorage.getItem("paila_token")
  );
}

export default function PailaAIPage() {
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      role: "assistant",
      content:
        "Namaste! 👋 I'm Paila AI. I can help you explore Nepal — destinations, things to do, transportation, food, budgets, trekking, travel tips, and more. What would you like to know?",
    },
  ]);

  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  /* =========================
     AUTO SCROLL
  ========================== */

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages, loading]);

  /* =========================
     SEND MESSAGE
  ========================== */

  async function handleSend(messageOverride?: string) {
    const message = (messageOverride ?? input).trim();

    if (!message || loading) return;

    const token = getStoredToken();

    if (!token) {
      setMessages((current) => [
        ...current,
        {
          id: Date.now(),
          role: "assistant",
          content:
            "Please log in to use Paila AI. Your account is required to access the AI travel assistant.",
        },
      ]);

      return;
    }

    const userMessage: Message = {
      id: Date.now(),
      role: "user",
      content: message,
    };

    setMessages((current) => [...current, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const response = await apiRequest<AIResponse>("/ai/chat", {
        method: "POST",
        token,
        body: JSON.stringify({
          message,
        }),
      });

      setMessages((current) => [
        ...current,
        {
          id: Date.now() + 1,
          role: "assistant",
          content:
            response.message ||
            "Sorry, I couldn't generate a response.",
        },
      ]);
    } catch (error) {
      setMessages((current) => [
        ...current,
        {
          id: Date.now() + 1,
          role: "assistant",
          content:
            error instanceof Error
              ? error.message
              : "Something went wrong while contacting Paila AI. Please try again.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  /* =========================
     RESET CHAT
  ========================== */

  function handleReset() {
    setInput("");
    setMessages([
      {
        id: Date.now(),
        role: "assistant",
        content:
          "Namaste! 👋 I'm Paila AI. I can help you explore Nepal — destinations, things to do, transportation, food, budgets, trekking, travel tips, and more. What would you like to know?",
      },
    ]);
  }

  /* =========================
     SUGGESTION
  ========================== */

  function handleSuggestion(suggestion: string) {
    handleSend(suggestion);
  }

  return (
    <main className="min-h-screen bg-[#f8faf9] text-slate-900">
      {/* =========================
          HEADER
      ========================== */}

      <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/95 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
          {/* Back */}
          <Link
            to="/"
            className="inline-flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-medium text-slate-500 transition hover:bg-slate-100 hover:text-slate-900"
          >
            <ArrowLeft className="h-4 w-4" />
            <span className="hidden sm:inline">Back to Home</span>
          </Link>

          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-600 shadow-sm">
              <Sparkles className="h-4 w-4 text-white" />
            </div>

            <div className="text-left">
              <p className="text-sm font-bold text-slate-900">
                Paila AI
              </p>

              <p className="hidden text-[10px] font-medium uppercase tracking-wider text-slate-400 sm:block">
                Nepal Travel Assistant
              </p>
            </div>
          </div>

          {/* Status + Reset */}
          <div className="flex items-center gap-2">
            <div className="hidden items-center gap-2 rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-medium text-emerald-700 sm:flex">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
              Online
            </div>

            <button
              type="button"
              onClick={handleReset}
              className="flex h-9 w-9 items-center justify-center rounded-xl text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
              aria-label="Reset chat"
              title="New conversation"
            >
              <RotateCcw className="h-4 w-4" />
            </button>
          </div>
        </div>
      </header>

      {/* =========================
          CHAT
      ========================== */}

      <section className="mx-auto flex h-[calc(100vh-4rem)] max-w-6xl flex-col px-3 py-3 sm:px-5 sm:py-5">
        <div className="flex min-h-0 flex-1 flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
          {/* Chat Header */}
          <div className="border-b border-slate-100 px-5 py-4 sm:px-6">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-emerald-50">
                <Bot className="h-5 w-5 text-emerald-600" />
              </div>

              <div>
                <h1 className="text-sm font-bold text-slate-900">
                  Ask Paila
                </h1>

                <p className="text-xs text-slate-400">
                  Your guide to exploring Nepal
                </p>
              </div>
            </div>
          </div>

          {/* Messages */}
          <div className="min-h-0 flex-1 overflow-y-auto px-4 py-6 sm:px-8">
            <div className="mx-auto max-w-3xl space-y-6">
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{
                    opacity: 0,
                    y: 10,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  transition={{
                    duration: 0.25,
                  }}
                  className={`flex gap-3 ${
                    message.role === "user"
                      ? "justify-end"
                      : "justify-start"
                  }`}
                >
                  {/* AI Avatar */}
                  {message.role === "assistant" && (
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-emerald-50">
                      <Bot className="h-4 w-4 text-emerald-600" />
                    </div>
                  )}

                  {/* Message */}
                  <div
                    className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-7 shadow-sm sm:max-w-[75%] ${
                      message.role === "user"
                        ? "rounded-br-md bg-slate-900 text-white"
                        : "rounded-bl-md border border-slate-100 bg-slate-50 text-slate-700"
                    }`}
                  >
                    {message.content}
                  </div>

                  {/* User Avatar */}
                  {message.role === "user" && (
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-slate-900">
                      <User className="h-4 w-4 text-white" />
                    </div>
                  )}
                </motion.div>
              ))}

              {/* Typing indicator */}
              {loading && (
                <motion.div
                  initial={{
                    opacity: 0,
                  }}
                  animate={{
                    opacity: 1,
                  }}
                  className="flex items-start gap-3"
                >
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-emerald-50">
                    <Bot className="h-4 w-4 text-emerald-600" />
                  </div>

                  <div className="rounded-2xl rounded-bl-md border border-slate-100 bg-slate-50 px-4 py-3">
                    <div className="flex items-center gap-1.5">
                      <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-slate-400 [animation-delay:-0.3s]" />
                      <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-slate-400 [animation-delay:-0.15s]" />
                      <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-slate-400" />
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Suggestions */}
              {messages.length === 1 && !loading && (
                <div className="pt-3">
                  <div className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-400">
                    <MapPin className="h-3.5 w-3.5" />
                    Popular questions
                  </div>

                  <div className="grid gap-2 sm:grid-cols-2">
                    {suggestions.map((suggestion) => (
                      <button
                        key={suggestion}
                        type="button"
                        onClick={() =>
                          handleSuggestion(suggestion)
                        }
                        className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-left text-sm font-medium text-slate-600 transition hover:border-emerald-300 hover:bg-emerald-50 hover:text-emerald-700"
                      >
                        {suggestion}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>
          </div>

          {/* Input */}
          <div className="border-t border-slate-100 bg-slate-50/70 p-3 sm:p-4">
            <div className="mx-auto max-w-3xl">
              <div className="flex items-end gap-2 rounded-2xl border border-slate-200 bg-white p-2 shadow-sm transition focus-within:border-emerald-400 focus-within:ring-4 focus-within:ring-emerald-500/10">
                <textarea
                  value={input}
                  onChange={(event) =>
                    setInput(event.target.value)
                  }
                  onKeyDown={(event) => {
                    if (
                      event.key === "Enter" &&
                      !event.shiftKey
                    ) {
                      event.preventDefault();
                      handleSend();
                    }
                  }}
                  placeholder="Ask anything about Nepal..."
                  rows={1}
                  disabled={loading}
                  className="max-h-32 min-h-11 flex-1 resize-none bg-transparent px-3 py-2.5 text-sm text-slate-900 outline-none placeholder:text-slate-400 disabled:cursor-not-allowed disabled:opacity-60"
                />

                <button
                  type="button"
                  onClick={() => handleSend()}
                  disabled={!input.trim() || loading}
                  className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-slate-900 text-white transition hover:bg-emerald-600 disabled:cursor-not-allowed disabled:opacity-30"
                  aria-label="Send message"
                >
                  <Send className="h-4 w-4" />
                </button>
              </div>

              <p className="mt-2 text-center text-[11px] text-slate-400">
                Paila AI can make mistakes. Verify important travel,
                safety, permit, and pricing information before your trip.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}