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
        className="relative overflow-hidden bg-[#05070a] py-20 text-white sm:py-24 lg:py-28"
      >
        {/* Ambient background glow */}
        <motion.div
          animate={{
            x: [0, 25, 0],
            y: [0, -20, 0],
          }}
          transition={{
            duration: 11,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="pointer-events-none absolute -left-40 top-10 h-80 w-80 rounded-full bg-emerald-500/10 blur-3xl"
        />

        <motion.div
          animate={{
            x: [0, -25, 0],
            y: [0, 20, 0],
          }}
          transition={{
            duration: 13,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="pointer-events-none absolute -right-40 bottom-20 h-80 w-80 rounded-full bg-cyan-500/10 blur-3xl"
        />

        <div className="relative mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7 }}
            className="flex flex-col gap-7 border-b border-white/10 pb-9 lg:flex-row lg:items-end lg:justify-between sm:pb-11"
          >
            <div className="max-w-3xl">
              <div className="mb-5 flex items-center gap-3">
                <span className="h-px w-10 bg-emerald-400" />

                <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-emerald-300 sm:text-[11px]">
                  Traveler Experiences
                </p>
              </div>

              <h2 className="text-4xl font-medium leading-[1.02] tracking-[-0.045em] text-white sm:text-5xl lg:text-[4.3rem]">
                Stories from the
                <span className="block font-light italic text-white/40">
                  road.
                </span>
              </h2>

              <p className="mt-6 max-w-2xl text-sm leading-7 text-white/50 sm:text-base sm:leading-8">
                Discover what travelers have experienced while exploring Nepal
                with Paila.
              </p>
            </div>

            <Link
              to="/feedback"
              className="group inline-flex w-fit items-center gap-3 text-sm font-semibold text-white/70 transition hover:text-white"
            >
              See all feedback

              <span className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 bg-white/[0.03] transition-all duration-300 group-hover:border-emerald-400/40 group-hover:bg-emerald-400 group-hover:text-slate-950">
                <ArrowRight
                  size={15}
                  className="transition-transform duration-300 group-hover:translate-x-0.5"
                />
              </span>
            </Link>
          </motion.div>

          {/* Reviews */}
          <div className="mt-10 grid gap-4 sm:mt-12 sm:grid-cols-2 lg:grid-cols-3">
            {reviews.map((review, index) => (
              <motion.article
                key={review.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.08,
                }}
                whileHover={{ y: -6 }}
                className="group relative overflow-hidden rounded-[28px] border border-white/10 bg-[#080b0f] p-6 shadow-lg shadow-black/20 transition-all duration-500 hover:border-white/20 hover:bg-[#0b1015] hover:shadow-2xl hover:shadow-black/40 sm:p-7 lg:p-8"
              >
                {/* Quote icon */}
                <motion.div
                  animate={{
                    y: [0, -5, 0],
                    rotate: [0, 2, 0],
                  }}
                  transition={{
                    duration: 4 + index * 0.4,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: index * 0.2,
                  }}
                  className="absolute right-6 top-6 flex h-11 w-11 items-center justify-center rounded-full border border-emerald-400/10 bg-emerald-400/10 text-emerald-300 transition-all duration-500 group-hover:border-emerald-400/40 group-hover:bg-emerald-400 group-hover:text-slate-950"
                >
                  <Quote className="h-5 w-5" />
                </motion.div>

                {/* Rating */}
                <div className="flex gap-1">
                  {[...Array(5)].map((_, starIndex) => (
                    <Star
                      key={starIndex}
                      className="h-3.5 w-3.5 fill-amber-400 text-amber-400"
                    />
                  ))}
                </div>

                {/* Review */}
                <p className="mt-7 min-h-[132px] max-w-md text-[15px] leading-7 text-white/55">
                  “{review.review}”
                </p>

                {/* Divider */}
                <div className="my-6 h-px bg-white/10" />

                {/* User */}
                <div className="flex items-center gap-4">
                  <motion.div
                    animate={{
                      y: [0, -3, 0],
                    }}
                    transition={{
                      duration: 4 + index * 0.3,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: index * 0.25,
                    }}
                    className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/[0.06] text-xs font-semibold text-white"
                  >
                    {review.name
                      .split(" ")
                      .map((word) => word[0])
                      .join("")
                      .slice(0, 2)
                      .toUpperCase()}
                  </motion.div>

                  <div className="min-w-0">
                    <h3 className="truncate text-sm font-semibold text-white">
                      {review.name}
                    </h3>

                    <div className="mt-1 flex items-center gap-1.5 text-xs text-white/40">
                      <MapPin className="h-3.5 w-3.5 text-emerald-400" />
                      <span className="truncate">{review.location}</span>
                    </div>
                  </div>
                </div>

                {/* Bottom animated accent */}
                <motion.div
                  className="absolute bottom-0 left-0 h-[2px] bg-emerald-400"
                  initial={{ width: "0%" }}
                  whileHover={{ width: "100%" }}
                  transition={{ duration: 0.5 }}
                />

                {/* Subtle glow */}
                <div className="pointer-events-none absolute -bottom-20 -right-20 h-40 w-40 rounded-full bg-emerald-400/5 blur-3xl opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              </motion.article>
            ))}
          </div>

          {/* Feedback CTA */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7 }}
            className="relative mt-10 overflow-hidden rounded-[28px] border border-white/10 bg-[#080b0f] px-6 py-10 shadow-2xl shadow-black/20 sm:mt-14 sm:px-10 sm:py-12 lg:rounded-[32px] lg:px-14"
          >
            {/* Moving emerald glow */}
            <motion.div
              animate={{
                x: [0, 40, 0],
                y: [0, -20, 0],
              }}
              transition={{
                duration: 10,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="pointer-events-none absolute -left-20 -top-20 h-60 w-60 rounded-full bg-emerald-500/15 blur-3xl"
            />

            {/* Moving cyan glow */}
            <motion.div
              animate={{
                x: [0, -30, 0],
                y: [0, 20, 0],
              }}
              transition={{
                duration: 12,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="pointer-events-none absolute -bottom-24 -right-16 h-64 w-64 rounded-full bg-cyan-500/10 blur-3xl"
            />

            <div className="relative flex flex-col items-start gap-7 lg:flex-row lg:items-center lg:justify-between">
              <div className="max-w-2xl">
                <div className="flex items-center gap-3">
                  <motion.div
                    animate={{
                      y: [0, -4, 0],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.05] text-emerald-300"
                  >
                    <Sparkles className="h-5 w-5" />
                  </motion.div>

                  <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-emerald-300 sm:text-xs">
                    Your story matters
                  </p>
                </div>

                <h3 className="mt-5 text-2xl font-medium tracking-tight text-white sm:text-3xl lg:text-4xl">
                  Have you tried Paila?
                </h3>

                <p className="mt-3 max-w-xl text-sm leading-7 text-white/45 sm:text-base">
                  Tell us about your experience. Your feedback helps us make
                  Paila better for every traveler.
                </p>
              </div>

              <button
                type="button"
                onClick={() => setIsOpen(true)}
                className="group inline-flex w-full shrink-0 items-center justify-center gap-3 rounded-full bg-white px-6 py-3.5 text-sm font-semibold text-slate-950 shadow-lg shadow-black/20 transition-all duration-300 hover:-translate-y-0.5 hover:bg-emerald-400 hover:text-slate-950 sm:w-auto"
              >
                <MessageCircle className="h-4 w-4" />

                Give Feedback

                <ArrowRight
                  size={15}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
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
            className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 p-4 backdrop-blur-md"
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