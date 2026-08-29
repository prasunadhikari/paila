import { useState, type ReactNode } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Bot,
  Compass,
  Home,
  Map,
  MapPin,
  Menu,
  MessageCircle,
  Plus,
  Send,
  Sparkles,
  User,
  X,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Message {
  id: number;
  role: "user" | "assistant";
  content: string;
}

const suggestions = [
  {
    title: "Explore Pokhara",
    description: "Lakes, mountains, viewpoints and things to do",
    icon: MapPin,
    prompt: "Tell me about Pokhara",
  },
  {
    title: "Discover Nepal",
    description: "Find the best places to visit in Nepal",
    icon: Compass,
    prompt: "Best places to visit in Nepal?",
  },
  {
    title: "Travel to Mustang",
    description: "Routes, transport and travel tips",
    icon: Map,
    prompt: "How can I travel to Mustang?",
  },
  {
    title: "Kathmandu Guide",
    description: "Places, culture, food and experiences",
    icon: Home,
    prompt: "What can I do in Kathmandu?",
  },
];

function formatInlineText(text: string): ReactNode[] {
  const parts = text.split(/(\*\*.*?\*\*)/g);

  return parts.map((part, index) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <strong
          key={index}
          className="font-semibold text-slate-900"
        >
          {part.slice(2, -2)}
        </strong>
      );
    }

    return part;
  });
}

function formatAIMessage(content: string) {
  const lines = content.split("\n");
  const elements: ReactNode[] = [];

  lines.forEach((line, index) => {
    const trimmed = line.trim();

    if (!trimmed || trimmed === "---") {
      return;
    }

    if (trimmed.startsWith("## ")) {
      elements.push(
        <h2
          key={index}
          className="mb-3 mt-6 text-lg font-bold tracking-tight text-slate-900 first:mt-0"
        >
          {formatInlineText(trimmed.replace(/^## /, ""))}
        </h2>
      );

      return;
    }

    if (trimmed.startsWith("### ")) {
      elements.push(
        <h3
          key={index}
          className="mb-2 mt-5 text-base font-bold text-slate-900"
        >
          {formatInlineText(trimmed.replace(/^### /, ""))}
        </h3>
      );

      return;
    }

    const numberedMatch = trimmed.match(/^(\d+)\.\s(.+)$/);

    if (numberedMatch) {
      elements.push(
        <div
          key={index}
          className="mt-3 flex gap-3"
        >
          <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-50 text-xs font-bold text-emerald-700">
            {numberedMatch[1]}
          </span>

          <p className="pt-0.5 text-sm leading-7 text-slate-700">
            {formatInlineText(numberedMatch[2])}
          </p>
        </div>
      );

      return;
    }

    if (trimmed.startsWith("- ") || trimmed.startsWith("* ")) {
      const text = trimmed.replace(/^[-*]\s/, "");

      elements.push(
        <div
          key={index}
          className="flex gap-3 pl-1"
        >
          <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-500" />

          <p className="text-sm leading-7 text-slate-700">
            {formatInlineText(text)}
          </p>
        </div>
      );

      return;
    }

    elements.push(
      <p
        key={index}
        className="mb-2 text-sm leading-7 text-slate-700 last:mb-0"
      >
        {formatInlineText(trimmed)}
      </p>
    );
  });

  return <div className="space-y-1">{elements}</div>;
}

function PailaLogo() {
  return (
    <div className="flex items-center gap-3">
      <div className="relative flex h-10 w-10 items-center justify-center rounded-2xl bg-emerald-500 shadow-lg shadow-emerald-500/20">
        <Sparkles className="h-5 w-5 text-white" />

        <span className="absolute -right-1 -top-1 h-2.5 w-2.5 rounded-full bg-cyan-400 ring-2 ring-slate-950" />
      </div>

      <div>
        <p className="text-base font-bold tracking-tight text-white">
          Paila
        </p>

        <p className="text-[11px] font-medium text-slate-500">
          Explore Nepal
        </p>
      </div>
    </div>
  );
}

export default function PailaAIPage() {
  const [input, setInput] = useState("");

  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      role: "assistant",
      content:
        "Namaste! 👋 I'm Paila AI. I can help you explore Nepal — destinations, things to do, transportation, food, budgets, trekking, travel tips, and more. What would you like to know?",
    },
  ]);

  const [isLoading, setIsLoading] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const getToken = () => {
    return (
      localStorage.getItem("paila_token") ||
      sessionStorage.getItem("paila_token")
    );
  };

  const handleSend = async () => {
    const message = input.trim();

    if (!message || isLoading) {
      return;
    }

    const token = getToken();

    if (!token) {
      setMessages((current) => [
        ...current,
        {
          id: Date.now(),
          role: "assistant",
          content: "Please log in to use Paila AI.",
        },
      ]);

      return;
    }

    setMessages((current) => [
      ...current,
      {
        id: Date.now(),
        role: "user",
        content: message,
      },
    ]);

    setInput("");
    setIsLoading(true);

    try {
      const API_BASE_URL =
        import.meta.env.VITE_API_URL ||
        "https://paila-backend.onrender.com/api/v1";

      const response = await fetch(`${API_BASE_URL}/ai/chat`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          message,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Something went wrong.");
      }

      setMessages((current) => [
        ...current,
        {
          id: Date.now() + 1,
          role: "assistant",
          content:
            data.message ||
            "Sorry, I couldn't generate a response right now.",
        },
      ]);
    } catch (error) {
      console.error("Paila AI error:", error);

      setMessages((current) => [
        ...current,
        {
          id: Date.now() + 1,
          role: "assistant",
          content:
            "Sorry, I couldn't connect to Paila AI right now. Please try again.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSuggestion = (prompt: string) => {
    setInput(prompt);
  };

  const startNewChat = () => {
    setMessages([
      {
        id: Date.now(),
        role: "assistant",
        content:
          "Namaste! 👋 I'm Paila AI. Where would you like to explore in Nepal?",
      },
    ]);

    setInput("");
  };

  return (
    <main className="min-h-screen bg-slate-100">
      {/* MOBILE HEADER */}
      <header className="fixed left-0 right-0 top-0 z-50 flex h-16 items-center justify-between border-b border-slate-800 bg-slate-950 px-4 lg:hidden">
        <button
          type="button"
          onClick={() => setSidebarOpen(true)}
          className="flex h-10 w-10 items-center justify-center rounded-xl text-slate-300 transition hover:bg-white/10 hover:text-white"
          aria-label="Open menu"
        >
          <Menu className="h-5 w-5" />
        </button>

        <PailaLogo />

        <div className="flex h-2.5 w-2.5 rounded-full bg-emerald-400 shadow-lg shadow-emerald-400/50" />
      </header>

      {/* MOBILE SIDEBAR OVERLAY */}
      <AnimatePresence>
        {sidebarOpen && (
          <>
            <motion.button
              type="button"
              aria-label="Close menu"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSidebarOpen(false)}
              className="fixed inset-0 z-[60] bg-black/50 backdrop-blur-sm lg:hidden"
            />

            <motion.aside
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 28 }}
              className="fixed bottom-0 left-0 top-0 z-[70] w-[280px] bg-slate-950 p-5 lg:hidden"
            >
              <div className="flex items-center justify-between">
                <PailaLogo />

                <button
                  type="button"
                  onClick={() => setSidebarOpen(false)}
                  className="flex h-9 w-9 items-center justify-center rounded-xl text-slate-400 hover:bg-white/10 hover:text-white"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <SidebarContent
                onNewChat={startNewChat}
                onNavigate={() => setSidebarOpen(false)}
              />
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* DESKTOP SIDEBAR */}
      <aside className="fixed bottom-0 left-0 top-0 z-40 hidden w-[260px] flex-col border-r border-slate-800 bg-slate-950 lg:flex">
        <div className="p-6">
          <PailaLogo />
        </div>

        <SidebarContent onNewChat={startNewChat} />

        <div className="mt-auto p-5">
          <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-500/10">
                <Sparkles className="h-4 w-4 text-emerald-400" />
              </div>

              <div>
                <p className="text-xs font-semibold text-white">
                  Paila AI
                </p>

                <p className="text-[11px] text-slate-500">
                  Your Nepal companion
                </p>
              </div>
            </div>
          </div>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <section className="flex min-h-screen flex-col pt-16 lg:ml-[260px] lg:pt-0">
        {/* TOP BAR */}
        <header className="hidden h-[72px] items-center justify-between border-b border-slate-200 bg-white px-8 lg:flex">
          <div>
            <div className="flex items-center gap-2">
              <MessageCircle className="h-4 w-4 text-emerald-600" />

              <span className="text-sm font-semibold text-slate-900">
                Paila AI
              </span>
            </div>

            <p className="mt-0.5 text-xs text-slate-400">
              Your intelligent Nepal travel companion
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1.5">
              <span className="h-2 w-2 rounded-full bg-emerald-500 shadow-sm shadow-emerald-500/50" />

              <span className="text-xs font-semibold text-emerald-700">
                Online
              </span>
            </div>

            <button
              type="button"
              onClick={startNewChat}
              className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-600 transition hover:border-emerald-200 hover:bg-emerald-50 hover:text-emerald-700"
            >
              <Plus className="h-4 w-4" />
              New chat
            </button>
          </div>
        </header>

        {/* CHAT AREA */}
        <div className="flex min-h-[calc(100vh-4rem)] flex-1 flex-col lg:min-h-[calc(100vh-72px)]">
          {/* AI HERO */}
          <div className="relative overflow-hidden border-b border-slate-800 bg-slate-950">
            <div className="absolute -left-24 -top-32 h-80 w-80 rounded-full bg-emerald-500/15 blur-3xl" />

            <div className="absolute -right-24 -top-20 h-72 w-72 rounded-full bg-cyan-500/10 blur-3xl" />

            <div className="relative mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
              <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-4">
                  <div className="relative flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-emerald-400/20 bg-emerald-500/10">
                    <Bot className="h-7 w-7 text-emerald-400" />

                    <span className="absolute -right-1 -top-1 h-3 w-3 rounded-full bg-emerald-400 ring-4 ring-slate-950" />
                  </div>

                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-400">
                      Travel Intelligence
                    </p>

                    <h1 className="mt-1 text-2xl font-bold tracking-tight text-white sm:text-3xl">
                      Ask Paila anything.
                    </h1>

                    <p className="mt-1 text-sm text-slate-400">
                      Explore Nepal through conversation.
                    </p>
                  </div>
                </div>

                <div className="hidden max-w-xs text-right sm:block">
                  <p className="text-xs leading-5 text-slate-500">
                    Destinations, routes, food, trekking, budgets and
                    travel ideas — all in one place.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* MESSAGES */}
          <div className="flex-1 overflow-y-auto">
            <div className="mx-auto w-full max-w-5xl px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
              <div className="space-y-7">
                {messages.map((message) => (
                  <motion.div
                    key={message.id}
                    initial={{
                      opacity: 0,
                      y: 12,
                    }}
                    animate={{
                      opacity: 1,
                      y: 0,
                    }}
                    transition={{
                      duration: 0.3,
                    }}
                    className={`flex gap-3 sm:gap-4 ${
                      message.role === "user"
                        ? "justify-end"
                        : "justify-start"
                    }`}
                  >
                    {message.role === "assistant" && (
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-emerald-50 ring-1 ring-emerald-100">
                        <Bot className="h-4 w-4 text-emerald-600" />
                      </div>
                    )}

                    <div
                      className={`max-w-[90%] sm:max-w-[75%] ${
                        message.role === "user"
                          ? "rounded-2xl rounded-br-md bg-slate-900 px-5 py-3.5 text-white shadow-sm"
                          : "rounded-2xl rounded-bl-md border border-slate-200 bg-white px-5 py-4 shadow-sm"
                      }`}
                    >
                      {message.role === "assistant" ? (
                        formatAIMessage(message.content)
                      ) : (
                        <p className="text-sm leading-7 text-white">
                          {message.content}
                        </p>
                      )}
                    </div>

                    {message.role === "user" && (
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-slate-900 shadow-sm">
                        <User className="h-4 w-4 text-white" />
                      </div>
                    )}
                  </motion.div>
                ))}

                {/* TYPING */}
                <AnimatePresence>
                  {isLoading && (
                    <motion.div
                      initial={{
                        opacity: 0,
                        y: 8,
                      }}
                      animate={{
                        opacity: 1,
                        y: 0,
                      }}
                      exit={{
                        opacity: 0,
                      }}
                      className="flex gap-3 sm:gap-4"
                    >
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-emerald-50 ring-1 ring-emerald-100">
                        <Bot className="h-4 w-4 text-emerald-600" />
                      </div>

                      <div className="rounded-2xl rounded-bl-md border border-slate-200 bg-white px-5 py-4 shadow-sm">
                        <div className="flex items-center gap-1.5">
                          <span className="h-2 w-2 animate-bounce rounded-full bg-emerald-400" />

                          <span
                            className="h-2 w-2 animate-bounce rounded-full bg-emerald-400"
                            style={{
                              animationDelay: "150ms",
                            }}
                          />

                          <span
                            className="h-2 w-2 animate-bounce rounded-full bg-emerald-400"
                            style={{
                              animationDelay: "300ms",
                            }}
                          />
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* SUGGESTIONS */}
              {messages.length === 1 && !isLoading && (
                <motion.div
                  initial={{
                    opacity: 0,
                    y: 15,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  transition={{
                    delay: 0.2,
                  }}
                  className="mt-10"
                >
                  <div className="mb-4 flex items-center gap-2">
                    <Sparkles className="h-4 w-4 text-emerald-500" />

                    <p className="text-xs font-bold uppercase tracking-[0.16em] text-slate-400">
                      Start exploring
                    </p>
                  </div>

                  <div className="grid gap-3 sm:grid-cols-2">
                    {suggestions.map((suggestion) => {
                      const Icon = suggestion.icon;

                      return (
                        <button
                          key={suggestion.title}
                          type="button"
                          onClick={() =>
                            handleSuggestion(suggestion.prompt)
                          }
                          className="group flex items-start gap-4 rounded-2xl border border-slate-200 bg-white p-4 text-left shadow-sm transition duration-300 hover:-translate-y-0.5 hover:border-emerald-200 hover:shadow-lg"
                        >
                          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-slate-50 transition group-hover:bg-emerald-50">
                            <Icon className="h-5 w-5 text-slate-500 transition group-hover:text-emerald-600" />
                          </div>

                          <div className="min-w-0 flex-1">
                            <div className="flex items-center justify-between gap-3">
                              <p className="text-sm font-bold text-slate-900">
                                {suggestion.title}
                              </p>

                              <ArrowRight className="h-4 w-4 shrink-0 text-slate-300 transition group-hover:translate-x-1 group-hover:text-emerald-500" />
                            </div>

                            <p className="mt-1 text-xs leading-5 text-slate-500">
                              {suggestion.description}
                            </p>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </motion.div>
              )}
            </div>
          </div>

          {/* COMPOSER */}
          <div className="border-t border-slate-200 bg-white/95 px-3 py-3 backdrop-blur-xl sm:px-6 sm:py-4 lg:px-8">
            <div className="mx-auto max-w-5xl">
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-2 shadow-sm transition focus-within:border-emerald-300 focus-within:bg-white focus-within:shadow-lg focus-within:shadow-emerald-500/5">
                <div className="flex items-end gap-2">
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
                    placeholder="Ask Paila about Nepal..."
                    rows={1}
                    disabled={isLoading}
                    className="max-h-32 min-h-[46px] flex-1 resize-none bg-transparent px-3 py-3 text-sm text-slate-900 outline-none placeholder:text-slate-400 disabled:opacity-60"
                  />

                  <button
                    type="button"
                    onClick={handleSend}
                    disabled={!input.trim() || isLoading}
                    className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-slate-900 text-white shadow-sm transition hover:bg-emerald-600 hover:shadow-lg hover:shadow-emerald-500/20 disabled:cursor-not-allowed disabled:opacity-40"
                    aria-label="Send message"
                  >
                    <Send className="h-4 w-4" />
                  </button>
                </div>
              </div>

              <div className="mt-2 flex items-center justify-center gap-2">
                <Sparkles className="h-3 w-3 text-slate-300" />

                <p className="text-[11px] text-slate-400">
                  Paila AI can make mistakes. Verify important travel
                  information before your trip.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

interface SidebarContentProps {
  onNewChat: () => void;
  onNavigate?: () => void;
}

function SidebarContent({
  onNewChat,
  onNavigate,
}: SidebarContentProps) {
  return (
    <div className="flex flex-1 flex-col px-4 pt-8">
      <button
        type="button"
        onClick={onNewChat}
        className="flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-500 px-4 py-3 text-sm font-bold text-white shadow-lg shadow-emerald-500/10 transition hover:bg-emerald-400"
      >
        <Plus className="h-4 w-4" />
        New conversation
      </button>

      <nav className="mt-8 space-y-1">
        <p className="mb-3 px-3 text-[10px] font-bold uppercase tracking-[0.18em] text-slate-600">
          Workspace
        </p>

        <Link
          to="/"
          onClick={onNavigate}
          className="flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium text-slate-400 transition hover:bg-white/5 hover:text-white"
        >
          <Home className="h-[18px] w-[18px]" />
          Home
        </Link>

        <Link
          to="/destinations"
          onClick={onNavigate}
          className="flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium text-slate-400 transition hover:bg-white/5 hover:text-white"
        >
          <Compass className="h-[18px] w-[18px]" />
          Destinations
        </Link>

        <Link
          to="/ai"
          onClick={onNavigate}
          className="flex items-center gap-3 rounded-xl bg-emerald-500/10 px-3 py-3 text-sm font-semibold text-emerald-400 ring-1 ring-emerald-500/10"
        >
          <MessageCircle className="h-[18px] w-[18px]" />
          Paila AI

          <span className="ml-auto h-1.5 w-1.5 rounded-full bg-emerald-400" />
        </Link>

        <Link
          to="/planner"
          onClick={onNavigate}
          className="flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium text-slate-400 transition hover:bg-white/5 hover:text-white"
        >
          <Map className="h-[18px] w-[18px]" />
          Trip Planner
        </Link>
      </nav>

      <div className="mt-8 border-t border-white/5 pt-6">
        <p className="px-3 text-[10px] font-bold uppercase tracking-[0.18em] text-slate-600">
          Current session
        </p>

        <div className="mt-3 rounded-xl bg-white/[0.03] px-3 py-3">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500/10">
              <MessageCircle className="h-4 w-4 text-emerald-400" />
            </div>

            <div className="min-w-0">
              <p className="truncate text-xs font-semibold text-slate-300">
                Nepal Travel Assistant
              </p>

              <p className="mt-0.5 text-[10px] text-slate-600">
                Active conversation
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}