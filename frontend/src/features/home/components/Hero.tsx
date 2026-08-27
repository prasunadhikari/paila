import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import heroImage from "../../../assets/images/hero.jpg";

export default function Hero() {
  return (
    <section
      className="relative min-h-screen overflow-hidden bg-cover bg-center"
      style={{ backgroundImage: `url(${heroImage})` }}
    >
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/45" />

      {/* Bottom Gradient */}
      <div className="absolute inset-x-0 bottom-0 h-64 bg-gradient-to-t from-black/70 to-transparent" />

      {/* Content */}
      <div className="relative z-10 mx-auto flex min-h-screen max-w-7xl items-center px-6 pb-32 pt-32">
        <motion.div
          className="w-full max-w-4xl"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Badge */}
          <p className="mb-5 text-lg font-semibold text-emerald-300">
            Your Nepal Travel Companion
          </p>

          {/* Heading */}
          <h1 className="text-6xl font-black leading-[0.95] tracking-tight text-white md:text-8xl">
            Explore Nepal.
            <span className="block bg-gradient-to-r from-emerald-300 to-cyan-400 bg-clip-text text-transparent">
              Your journey starts here.
            </span>
          </h1>

          {/* Description */}
          <p className="mt-7 max-w-2xl text-lg leading-8 text-gray-200 md:text-xl">
            Discover beautiful destinations, unforgettable experiences,
            places to stay and the best ways to travel across Nepal.
          </p>

          {/* Search Box */}
          <div className="mt-10 max-w-3xl rounded-2xl bg-white p-2 shadow-2xl">
            <div className="flex flex-col gap-2 md:flex-row">
              {/* Destination Search */}
              <Link
                to="/login"
                className="flex flex-1 items-center rounded-xl bg-slate-50 px-5 py-4 transition hover:bg-slate-100"
              >
                <span className="mr-3 text-xl">🔍</span>

                <div>
                  <p className="text-left text-xs font-semibold uppercase tracking-wide text-slate-400">
                    Destination
                  </p>

                  <p className="mt-1 text-left text-sm text-slate-500">
                    Where do you want to go?
                  </p>
                </div>
              </Link>

              {/* Explore Button */}
              <Link
                to="/login"
                className="flex items-center justify-center rounded-xl bg-emerald-600 px-8 py-4 font-semibold text-white transition hover:bg-emerald-700"
              >
                Explore Nepal →
              </Link>
            </div>
          </div>

          {/* Quick Destinations */}
          <div className="mt-7 flex flex-wrap items-center gap-3">
            <span className="text-sm font-medium text-white/70">
              Popular:
            </span>

            <Link
              to="/login"
              className="rounded-full border border-white/30 bg-white/10 px-4 py-2 text-sm text-white backdrop-blur-md transition hover:bg-white/20"
            >
              Pokhara
            </Link>

            <Link
              to="/login"
              className="rounded-full border border-white/30 bg-white/10 px-4 py-2 text-sm text-white backdrop-blur-md transition hover:bg-white/20"
            >
              Mustang
            </Link>

            <Link
              to="/login"
              className="rounded-full border border-white/30 bg-white/10 px-4 py-2 text-sm text-white backdrop-blur-md transition hover:bg-white/20"
            >
              Chitwan
            </Link>
          </div>

          {/* AI Chat */}
          <div className="mt-8">
            <Link
              to="/login"
              className="inline-flex items-center gap-2 text-sm font-semibold text-white/80 transition hover:text-emerald-300"
            >
              ✨ Ask Paila AI about your trip →
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
