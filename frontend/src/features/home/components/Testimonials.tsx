import { useState } from "react";
import type { FormEvent } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  MapPin,
  Quote,
  Star,
  MessageCircle,
  X,
  Send,
  CheckCircle2,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import { apiRequest } from "../../../api/client";

const reviews = [
  {
    name: "Aayush Karki",
    location: "Kathmandu, Nepal",
    review:
      "I was looking for an easier way to plan my Nepal trip. Paila made the whole process feel simple and organized.",
  },
  {
    name: "Sanjana Rai",
    location: "Pokhara, Nepal",
    review:
      "The idea behind Paila is really useful for travelers who don't know where to start. Everything feels much easier to explore.",
  },
  {
    name: "Rojan Bhandari",
    location: "Biratnagar, Nepal",
    review:
      "I loved how simple the experience was. Instead of opening ten different websites, I could get travel ideas in one place.",
  },
  {
    name: "Nischal Thapa",
    location: "Lalitpur, Nepal",
    review:
      "Paila gives me a much clearer idea of where to go and what to explore. The overall experience feels clean and easy.",
  },
  {
    name: "Prakriti Gurung",
    location: "Chitwan, Nepal",
    review:
      "I really like the concept of having Nepal travel information in one place. It makes discovering new destinations much easier.",
  },
  {
    name: "Bibek Shrestha",
    location: "Dharan, Nepal",
    review:
      "The interface is simple, modern, and easy to understand. Paila has a lot of potential for Nepal travelers.",
  },
];

export default function Testimonials() {
  const [isOpen, setIsOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    name: "",
    location: "",
    rating: 0,
    message: "",
  });

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setError("");

    if (!form.name || !form.location || !form.rating || !form.message) {
      setError("Please complete all fields before submitting.");
      return;
    }

    try {
      setLoading(true);

      await apiRequest("/feedback", {
        method: "POST",
        body: JSON.stringify(form),
      });

      setSubmitted(true);

      setForm({
        name: "",
        location: "",
        rating: 0,
        message: "",
      });
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const closeModal = () => {
    if (loading) return;

    setIsOpen(false);
    setSubmitted(false);
    setError("");
  };

  return (
    <>
      <section
        id="testimonials"
        className="relative overflow-hidden bg-slate-50 py-24 sm:py-28"
      >
        {/* Background decoration */}
        <div className="pointer-events-none absolute -left-40 top-20 h-80 w-80 rounded-full bg-emerald-100/60 blur-3xl" />
        <div className="pointer-events-none absolute -right-40 bottom-10 h-80 w-80 rounded-full bg-cyan-100/50 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-6">
          {/* Heading */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mx-auto max-w-3xl text-center"
          >
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-emerald-100 bg-white px-4 py-2 text-sm font-semibold text-emerald-700 shadow-sm">
              <MessageCircle className="h-4 w-4" />
              Traveler Experiences
            </div>

            <h2 className="text-4xl font-black tracking-tight text-slate-900 sm:text-5xl">
              What travelers are saying
            </h2>

            <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-slate-500 sm:text-lg sm:leading-8">
              Discover what travelers think about using Paila to make their
              Nepal journey simpler.
            </p>
          </motion.div>

          {/* Reviews */}
          <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {reviews.map((review, index) => (
              <motion.article
                key={review.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.07,
                }}
                whileHover={{ y: -6 }}
                className="group relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-7 shadow-sm transition-all duration-300 hover:border-emerald-200 hover:shadow-xl hover:shadow-slate-200/60 sm:p-8"
              >
                {/* Quote */}
                <div className="absolute right-6 top-6 flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-500 transition-all duration-300 group-hover:bg-emerald-600 group-hover:text-white">
                  <Quote className="h-5 w-5" />
                </div>

                {/* Stars */}
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="h-4 w-4 fill-amber-400 text-amber-400"
                    />
                  ))}
                </div>

                {/* Review */}
                <p className="mt-6 min-h-[126px] text-[15px] leading-7 text-slate-600">
                  "{review.review}"
                </p>

                <div className="my-6 h-px bg-slate-100" />

                {/* User */}
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-emerald-500 to-cyan-500 text-sm font-bold text-white shadow-sm">
                    {review.name
                      .split(" ")
                      .map((word) => word[0])
                      .join("")
                      .slice(0, 2)
                      .toUpperCase()}
                  </div>

                  <div className="min-w-0">
                    <h3 className="font-bold text-slate-900">
                      {review.name}
                    </h3>

                    <div className="mt-1 flex items-center gap-1.5 text-sm text-slate-500">
                      <MapPin className="h-3.5 w-3.5 text-emerald-500" />
                      <span>{review.location}</span>
                    </div>
                  </div>
                </div>

                {/* Bottom accent */}
                <div className="absolute bottom-0 left-0 h-1 w-0 bg-emerald-500 transition-all duration-500 group-hover:w-full" />
              </motion.article>
            ))}
          </div>

          {/* All feedback */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="mt-10 text-center"
          >
            <Link
              to="/feedback"
              className="group inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-6 py-3.5 font-semibold text-slate-700 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-emerald-200 hover:text-emerald-600 hover:shadow-md"
            >
              See All Feedback
              <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
            </Link>
          </motion.div>

          {/* Feedback CTA */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative mt-14 overflow-hidden rounded-3xl bg-slate-900 px-7 py-12 text-center shadow-xl sm:px-12"
          >
            {/* Decorative glow */}
            <div className="pointer-events-none absolute -left-20 -top-20 h-48 w-48 rounded-full bg-emerald-500/20 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-24 -right-16 h-56 w-56 rounded-full bg-cyan-500/20 blur-3xl" />

            <div className="relative mx-auto max-w-2xl">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-500/15 text-emerald-300 ring-1 ring-emerald-400/20">
                <Sparkles className="h-6 w-6" />
              </div>

              <h3 className="mt-6 text-2xl font-black text-white sm:text-3xl">
                Have you tried Paila?
              </h3>

              <p className="mt-3 leading-7 text-slate-300">
                We'd love to hear about your experience. Your feedback helps
                us make Paila better for every traveler.
              </p>

              <button
                type="button"
                onClick={() => setIsOpen(true)}
                className="mt-7 inline-flex items-center gap-2 rounded-xl bg-emerald-500 px-6 py-3.5 font-bold text-white shadow-lg shadow-emerald-500/20 transition-all duration-200 hover:-translate-y-0.5 hover:bg-emerald-400 hover:shadow-xl active:scale-95"
              >
                <MessageCircle className="h-5 w-5" />
                Give Feedback
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Feedback Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 p-4 backdrop-blur-sm"
            onMouseDown={(event) => {
              if (event.target === event.currentTarget) {
                closeModal();
              }
            }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.2 }}
              className="relative max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-3xl bg-white p-6 shadow-2xl sm:p-8"
            >
              {/* Close */}
              <button
                type="button"
                onClick={closeModal}
                disabled={loading}
                className="absolute right-5 top-5 rounded-full p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700 disabled:cursor-not-allowed disabled:opacity-50"
                aria-label="Close feedback form"
              >
                <X className="h-5 w-5" />
              </button>

              {!submitted ? (
                <>
                  {/* Modal heading */}
                  <div className="pr-10">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600">
                      <MessageCircle className="h-6 w-6" />
                    </div>

                    <h3 className="mt-5 text-2xl font-bold text-slate-900">
                      Share your experience
                    </h3>

                    <p className="mt-2 text-sm leading-6 text-slate-500">
                      Your feedback helps us make Paila better for travelers.
                    </p>
                  </div>

                  <form onSubmit={handleSubmit} className="mt-7 space-y-5">
                    {/* Name */}
                    <div>
                      <label
                        htmlFor="feedback-name"
                        className="mb-2 block text-sm font-semibold text-slate-700"
                      >
                        Your name
                      </label>

                      <input
                        id="feedback-name"
                        type="text"
                        value={form.name}
                        onChange={(event) =>
                          setForm({
                            ...form,
                            name: event.target.value,
                          })
                        }
                        placeholder="e.g. Aayush Karki"
                        maxLength={80}
                        className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-emerald-500 focus:bg-white focus:ring-4 focus:ring-emerald-500/10"
                      />
                    </div>

                    {/* Location */}
                    <div>
                      <label
                        htmlFor="feedback-location"
                        className="mb-2 block text-sm font-semibold text-slate-700"
                      >
                        Where are you from?
                      </label>

                      <input
                        id="feedback-location"
                        type="text"
                        value={form.location}
                        onChange={(event) =>
                          setForm({
                            ...form,
                            location: event.target.value,
                          })
                        }
                        placeholder="e.g. Pokhara, Nepal"
                        maxLength={100}
                        className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-emerald-500 focus:bg-white focus:ring-4 focus:ring-emerald-500/10"
                      />
                    </div>

                    {/* Rating */}
                    <div>
                      <label className="mb-2 block text-sm font-semibold text-slate-700">
                        How was your experience?
                      </label>

                      <div className="flex items-center gap-2">
                        {[1, 2, 3, 4, 5].map((rating) => (
                          <button
                            key={rating}
                            type="button"
                            onClick={() =>
                              setForm({
                                ...form,
                                rating,
                              })
                            }
                            className="rounded-lg p-1 transition hover:scale-110"
                            aria-label={`Rate ${rating} out of 5`}
                          >
                            <Star
                              className={`h-8 w-8 ${
                                rating <= form.rating
                                  ? "fill-amber-400 text-amber-400"
                                  : "text-slate-300"
                              }`}
                            />
                          </button>
                        ))}

                        {form.rating > 0 && (
                          <span className="ml-2 text-sm font-medium text-slate-500">
                            {form.rating}/5
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Message */}
                    <div>
                      <label
                        htmlFor="feedback-message"
                        className="mb-2 block text-sm font-semibold text-slate-700"
                      >
                        Your feedback
                      </label>

                      <textarea
                        id="feedback-message"
                        value={form.message}
                        onChange={(event) =>
                          setForm({
                            ...form,
                            message: event.target.value,
                          })
                        }
                        placeholder="Tell us what you liked or what we can improve..."
                        maxLength={500}
                        rows={4}
                        className="w-full resize-none rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm leading-6 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-emerald-500 focus:bg-white focus:ring-4 focus:ring-emerald-500/10"
                      />

                      <p className="mt-1 text-right text-xs text-slate-400">
                        {form.message.length}/500
                      </p>
                    </div>

                    {/* Error */}
                    {error && (
                      <div className="rounded-xl border border-red-100 bg-red-50 px-4 py-3 text-sm text-red-600">
                        {error}
                      </div>
                    )}

                    {/* Submit */}
                    <button
                      type="submit"
                      disabled={loading}
                      className="flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-600 px-5 py-3.5 font-semibold text-white transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      {loading ? (
                        "Submitting..."
                      ) : (
                        <>
                          <Send className="h-4 w-4" />
                          Submit Feedback
                        </>
                      )}
                    </button>
                  </form>
                </>
              ) : (
                /* Success state */
                <div className="py-10 text-center">
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
                    <CheckCircle2 className="h-8 w-8" />
                  </div>

                  <h3 className="mt-6 text-2xl font-bold text-slate-900">
                    Thank you!
                  </h3>

                  <p className="mx-auto mt-3 max-w-sm text-sm leading-6 text-slate-500">
                    Your feedback has been received. We really appreciate you
                    taking the time to help improve Paila.
                  </p>

                  <button
                    type="button"
                    onClick={closeModal}
                    className="mt-7 rounded-xl bg-slate-900 px-6 py-3 font-semibold text-white transition hover:bg-slate-800"
                  >
                    Done
                  </button>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}