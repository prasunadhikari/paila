import { motion } from "framer-motion";
import TripPlannerCard from "./TripPlannerCard";
import heroImage from "../../../assets/images/hero.jpg";

export default function Hero() {
  return (
    <section
      className="relative min-h-screen bg-cover bg-center"
      style={{ backgroundImage: `url(${heroImage})` }}
    >
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/45"></div>

      {/* Content */}
      <div className="relative z-10 mx-auto flex min-h-screen max-w-7xl flex-col items-center justify-center gap-16 px-6 pt-32 pb-48 md:flex-row">

        {/* Left */}
        <motion.div
          className="max-w-2xl text-white"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <p className="mb-4 text-lg font-semibold text-emerald-400">
            🇳🇵 AI Travel Planner
          </p>

          <h1 className="text-6xl font-black leading-[0.95] tracking-tight md:text-8xl">
            Discover Nepal
            <span className="block bg-gradient-to-r from-emerald-300 to-cyan-400 bg-clip-text text-transparent">
              with AI.
            </span>
          </h1>

          <p className="mt-8 max-w-xl text-xl leading-9 text-gray-200">
            Tell Paila your budget, travel days, and interests.
            Let AI create your perfect Nepal adventure in seconds.
          </p>

          <div className="mt-10 flex flex-wrap gap-4">
            <button className="rounded-xl bg-emerald-600 px-7 py-4 font-semibold text-white transition hover:scale-105 hover:bg-emerald-700">
              Start Planning →
            </button>

            <button className="rounded-xl border border-white/40 bg-white/10 px-7 py-4 font-semibold text-white backdrop-blur-md transition hover:bg-white/20">
              Explore Destinations
            </button>
          </div>
        </motion.div>

        {/* Right */}
        <motion.div
          className="mt-12 md:mt-0"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <TripPlannerCard />
        </motion.div>

      </div>
    </section>
  );
}