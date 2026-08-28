import { useState } from "react";
import { Link } from "react-router-dom";
import {
ArrowLeft,
Bot,
MapPin,
Send,
Sparkles,
User,
} from "lucide-react";
import { motion } from "framer-motion";

interface Message {
id: number;
role: "user" | "assistant";
content: string;
}

const suggestions = [
"Tell me about Pokhara",
"Best places to visit in Nepal?",
"How can I travel to Mustang?",
"What can I do in Kathmandu?",
];

function formatInlineText(text: string) {
const parts = text.split(/(\*\*.*?\*\*)/g);

return parts.map((part, index) => {
if (part.startsWith("**") && part.endsWith("**")) {
return ( <strong
       key={index}
       className="font-semibold text-slate-900"
     >
{part.slice(2, -2)} </strong>
);
}

return part;


});
}

function formatAIMessage(content: string) {
const lines = content.split("\n");

return ( <div className="space-y-1">
{lines.map((line, index) => {
const trimmed = line.trim();


    if (!trimmed || trimmed === "---") {
      return null;
    }

    if (trimmed.startsWith("### ")) {
      return (
        <h3
          key={index}
          className="mt-5 mb-2 text-base font-bold text-slate-900 first:mt-0"
        >
          {trimmed.replace("### ", "")}
        </h3>
      );
    }

    if (trimmed.startsWith("## ")) {
      return (
        <h2
          key={index}
          className="mt-5 mb-2 text-lg font-bold text-slate-900 first:mt-0"
        >
          {trimmed.replace("## ", "")}
        </h2>
      );
    }

    if (/^\d+\.\s/.test(trimmed)) {
      const text = trimmed.replace(/^\d+\.\s/, "");

      return (
        <div key={index} className="mt-4">
          <p className="font-semibold text-slate-900">
            {formatInlineText(text)}
          </p>
        </div>
      );
    }

    if (trimmed.startsWith("- ") || trimmed.startsWith("* ")) {
      const text = trimmed.replace(/^[-*]\s/, "");

      return (
        <div key={index} className="flex gap-2 pl-1">
          <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-500" />
          <p className="text-slate-700">
            {formatInlineText(text)}
          </p>
        </div>
      );
    }

    return (
      <p
        key={index}
        className="mb-2 text-slate-700 last:mb-0"
      >
        {formatInlineText(trimmed)}
      </p>
    );
  })}
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
    throw new Error(
      data.message || "Something went wrong."
    );
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

const handleSuggestion = (suggestion: string) => {
setInput(suggestion);
};

return ( <main className="min-h-screen bg-slate-50"> <header className="border-b border-slate-200 bg-white"> <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6"> <Link
         to="/"
         className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 transition hover:text-slate-900"
       > <ArrowLeft className="h-4 w-4" /> <span className="hidden sm:inline">
Back to Home </span> </Link>


      <div className="flex items-center gap-2">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-50">
          <Sparkles className="h-5 w-5 text-emerald-600" />
        </div>

        <span className="font-bold text-slate-900">
          Paila AI
        </span>
      </div>

      <div className="hidden items-center gap-2 text-xs font-medium text-emerald-600 sm:flex">
        <span className="h-2 w-2 rounded-full bg-emerald-500" />
        Travel Assistant
      </div>
    </div>
  </header>

  <section className="flex min-h-[calc(100vh-4rem)] flex-col">
    <div className="mx-auto flex w-full max-w-5xl flex-1 flex-col px-3 py-5 sm:px-6 sm:py-8">
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="mb-6 text-center sm:mb-8"
      >
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-50 sm:h-16 sm:w-16">
          <Bot className="h-7 w-7 text-emerald-600 sm:h-8 sm:w-8" />
        </div>

        <h1 className="mt-4 text-2xl font-bold tracking-tight text-slate-900 sm:mt-5 sm:text-4xl">
          Ask Paila AI
        </h1>

        <p className="mx-auto mt-2 max-w-xl text-sm leading-6 text-slate-500 sm:mt-3 sm:text-base">
          Your AI travel companion for exploring Nepal.
        </p>
      </motion.div>

      <div className="flex flex-1 flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
        <div className="flex-1 space-y-6 overflow-y-auto p-4 sm:p-7">
          {messages.map((message) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex gap-3 ${
                message.role === "user"
                  ? "justify-end"
                  : "justify-start"
              }`}
            >
              {message.role === "assistant" && (
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-emerald-50">
                  <Bot className="h-5 w-5 text-emerald-600" />
                </div>
              )}

              <div
                className={`max-w-[88%] text-sm leading-6 sm:max-w-[78%] ${
                  message.role === "user"
                    ? "rounded-2xl rounded-br-md bg-slate-900 px-4 py-3 text-white"
                    : "rounded-2xl rounded-bl-md border border-slate-100 bg-slate-50 px-4 py-4"
                }`}
              >
                {message.role === "assistant" ? (
                  formatAIMessage(message.content)
                ) : (
                  <p>{message.content}</p>
                )}
              </div>

              {message.role === "user" && (
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-slate-900">
                  <User className="h-5 w-5 text-white" />
                </div>
              )}
            </motion.div>
          ))}

          {isLoading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex gap-3"
            >
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-emerald-50">
                <Bot className="h-5 w-5 text-emerald-600" />
              </div>

              <div className="rounded-2xl rounded-bl-md border border-slate-100 bg-slate-50 px-5 py-4">
                <div className="flex items-center gap-1.5">
                  <span className="h-2 w-2 animate-bounce rounded-full bg-slate-400" />

                  <span
                    className="h-2 w-2 animate-bounce rounded-full bg-slate-400"
                    style={{ animationDelay: "150ms" }}
                  />

                  <span
                    className="h-2 w-2 animate-bounce rounded-full bg-slate-400"
                    style={{ animationDelay: "300ms" }}
                  />
                </div>
              </div>
            </motion.div>
          )}

          {messages.length === 1 && (
            <div className="pt-2">
              <div className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-slate-400">
                <MapPin className="h-3.5 w-3.5" />
                Try asking
              </div>

              <div className="grid gap-2 sm:grid-cols-2">
                {suggestions.map((suggestion) => (
                  <button
                    key={suggestion}
                    type="button"
                    onClick={() =>
                      handleSuggestion(suggestion)
                    }
                    className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-left text-sm text-slate-600 transition hover:border-emerald-300 hover:bg-emerald-50 hover:text-emerald-700"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="border-t border-slate-100 bg-slate-50 p-3 sm:p-5">
          <div className="flex items-end gap-2 rounded-2xl border border-slate-200 bg-white p-2 shadow-sm focus-within:border-emerald-400 focus-within:ring-4 focus-within:ring-emerald-500/10">
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
              placeholder="Ask Paila AI about Nepal..."
              rows={1}
              disabled={isLoading}
              className="max-h-32 min-h-11 flex-1 resize-none bg-transparent px-3 py-2.5 text-sm text-slate-900 outline-none placeholder:text-slate-400 disabled:opacity-60"
            />

            <button
              type="button"
              onClick={handleSend}
              disabled={!input.trim() || isLoading}
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-slate-900 text-white transition hover:bg-emerald-600 disabled:cursor-not-allowed disabled:opacity-40"
              aria-label="Send message"
            >
              <Send className="h-4 w-4" />
            </button>
          </div>

          <p className="mt-2 text-center text-xs text-slate-400">
            Paila AI can make mistakes. Verify important
            travel information before your trip.
          </p>
        </div>
      </div>
    </div>
  </section>
</main>

);
}
