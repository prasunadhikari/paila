
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Loader2,
  MapPin,
  MessageCircle,
  Quote,
  Star,
} from "lucide-react";
import { apiRequest } from "../../../api/client";

interface Feedback {
  _id: string;
  name: string;
  location: string;
  rating: number;
  message: string;
  approved: boolean;
  createdAt: string;
}

interface FeedbackResponse {
  success: boolean;
  feedback: Feedback[];
}

export default function AllFeedbackPage() {
  const [feedback, setFeedback] = useState<Feedback[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadFeedback() {
      try {
        setLoading(true);
        setError("");

        const data = await apiRequest<FeedbackResponse>(
          "/feedback/approved"
        );

        setFeedback(data.feedback || []);
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : "Unable to load feedback."
        );
      } finally {
        setLoading(false);
      }
    }

    loadFeedback();
  }, []);

  return (
    <main className="min-h-screen bg-slate-50">
      {/* Header */}
      <section className="relative overflow-hidden bg-slate-950 px-6 py-20 sm:py-24">
        <div className="pointer-events-none absolute -left-32 top-10 h-72 w-72 rounded-full bg-blue-500/20 blur-3xl" />
        <div className="pointer-events-none absolute -right-32 bottom-0 h-72 w-72 rounded-full bg-emerald-500/20 blur-3xl" />

        <div className="relative mx-auto max-w-5xl">
          <Link
            to="/"
            className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-slate-300 transition hover:bg-white/10 hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Link>

          <div className="mt-10 text-center">
            <div className="mx-auto inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-4 py-2 text-sm font-semibold text-slate-200">
              <MessageCircle className="h-4 w-4 text-emerald-400" />
              Traveler Experiences
            </div>

            <h1 className="mt-6 text-4xl font-bold tracking-tight text-white sm:text-6xl">
              What Travelers Say
            </h1>

            <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-slate-300">
              Explore real feedback from travelers who have shared
              their experience with Paila.
            </p>
          </div>
        </div>
      </section>

      {/* Feedback */}
      <section className="px-6 py-16 sm:py-20">
        <div className="mx-auto max-w-6xl">
          {loading && (
            <div className="flex min-h-64 items-center justify-center rounded-3xl bg-white shadow-sm ring-1 ring-slate-200">
              <div className="text-center">
                <Loader2 className="mx-auto h-8 w-8 animate-spin text-emerald-600" />

                <p className="mt-3 text-sm text-slate-500">
                  Loading traveler feedback...
                </p>
              </div>
            </div>
          )}

          {!loading && error && (
            <div className="rounded-3xl border border-red-200 bg-red-50 p-10 text-center">
              <h2 className="text-xl font-bold text-red-800">
                Unable to load feedback
              </h2>

              <p className="mt-2 text-sm text-red-600">
                {error}
              </p>
            </div>
          )}

          {!loading && !error && feedback.length === 0 && (
            <div className="rounded-3xl bg-white p-12 text-center shadow-sm ring-1 ring-slate-200">
              <MessageCircle className="mx-auto h-12 w-12 text-slate-300" />

              <h2 className="mt-5 text-2xl font-bold text-slate-900">
                No feedback yet
              </h2>

              <p className="mx-auto mt-2 max-w-md text-slate-500">
                Be the first traveler to share your experience with
                Paila.
              </p>

              <Link
                to="/"
                className="mt-7 inline-flex rounded-xl bg-slate-900 px-6 py-3 font-semibold text-white transition hover:bg-slate-800"
              >
                Share Your Feedback
              </Link>
            </div>
          )}

          {!loading && !error && feedback.length > 0 && (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {feedback.map((item, index) => (
                <motion.article
                  key={item._id}
                  initial={{ opacity: 0, y: 25 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.45,
                    delay: index * 0.05,
                  }}
                  whileHover={{ y: -5 }}
                  className="group relative flex flex-col rounded-3xl border border-slate-200 bg-white p-7 shadow-sm transition-shadow hover:shadow-xl"
                >
                  {/* Quote */}
                  <div className="absolute right-6 top-6 rounded-2xl bg-slate-50 p-3 text-slate-300 transition group-hover:bg-blue-50 group-hover:text-blue-400">
                    <Quote className="h-5 w-5" />
                  </div>

                  {/* Rating */}
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((rating) => (
                      <Star
                        key={rating}
                        className={`h-4 w-4 ${
                          rating <= item.rating
                            ? "fill-amber-400 text-amber-400"
                            : "text-slate-200"
                        }`}
                      />
                    ))}
                  </div>

                  {/* Message */}
                  <p className="mt-6 flex-1 text-[15px] leading-7 text-slate-600">
                    "{item.message}"
                  </p>

                  <div className="my-6 h-px bg-slate-100" />

                  {/* User */}
                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-blue-600 to-indigo-600 text-sm font-bold text-white shadow-sm">
                      {item.name
                        .split(" ")
                        .map((word) => word[0])
                        .join("")
                        .slice(0, 2)
                        .toUpperCase()}
                    </div>

                    <div className="min-w-0">
                      <h3 className="truncate font-semibold text-slate-900">
                        {item.name}
                      </h3>

                      <div className="mt-1 flex items-center gap-1.5 text-sm text-slate-500">
                        <MapPin className="h-3.5 w-3.5 shrink-0" />
                        <span className="truncate">
                          {item.location}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Date */}
                  <p className="mt-5 text-xs text-slate-400">
                    {new Date(item.createdAt).toLocaleDateString(
                      undefined,
                      {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      }
                    )}
                  </p>
                </motion.article>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Submit Feedback CTA */}
      <section className="px-6 pb-20">
        <div className="mx-auto max-w-5xl overflow-hidden rounded-3xl bg-slate-900 px-8 py-12 text-center shadow-xl sm:px-12">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10">
            <MessageCircle className="h-7 w-7 text-emerald-400" />
          </div>

          <h2 className="mt-6 text-3xl font-bold text-white">
            Have you tried Paila?
          </h2>

          <p className="mx-auto mt-3 max-w-xl leading-7 text-slate-300">
            We'd love to hear about your experience. Share your
            thoughts and help us make Paila better for every traveler.
          </p>

          <Link
            to="/#testimonials"
            className="mt-7 inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3 font-semibold text-slate-900 transition hover:-translate-y-0.5 hover:bg-slate-100"
          >
            <MessageCircle className="h-5 w-5" />
            Submit Feedback
          </Link>
        </div>
      </section>
    </main>
  );
}