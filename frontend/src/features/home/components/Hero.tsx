import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  ArrowDown,
  ArrowRight,
  Hotel,
  MapPin,
  Sparkles,
} from "lucide-react";
import heroImage from "../../../assets/images/hero.jpg";

const featuredDestinations = [
  {
    name: "Pokhara",
    slug: "pokhara",
    label: "Lakes & Mountains",
  },
  {
    name: "Mustang",
    slug: "mustang",
    label: "The Hidden Kingdom",
  },
  {
    name: "Chitwan",
    slug: "chitwan",
    label: "Wild Nepal",
  },
];

export default function Hero() {
  return (
    <section className="relative h-screen min-h-[620px] overflow-hidden bg-slate-950">
      {/* Background image */}
      <motion.div
        className="absolute inset-0"
        initial={{ scale: 1.08 }}
        animate={{ scale: 1 }}
        transition={{ duration: 2, ease: "easeOut" }}
      >
        <img
          src={heroImage}
          alt="Beautiful landscape of Nepal"
          className="h-full w-full object-cover"
        />
      </motion.div>

      {/* Cinematic overlays */}
      <div className="absolute inset-0 bg-black/30" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/65 via-black/15 to-black/80" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-black/20" />

      {/* Content */}
      <div className="relative z-10 mx-auto flex h-full max-w-7xl flex-col justify-end px-5 pb-7 pt-24 sm:px-8 sm:pb-9 lg:px-10 lg:pb-10">
        <div className="w-full">
          {/* Small label */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-3 flex items-center gap-3 sm:mb-4"
          >
            <div className="h-px w-8 bg-white/70 sm:w-10" />

            <span className="text-[10px] font-semibold uppercase tracking-[0.25em] text-white/80 sm:text-xs">
              Discover Nepal
            </span>
          </motion.div>

          {/* Main heading */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            <h1 className="max-w-5xl text-[clamp(2.8rem,7vw,7rem)] font-medium leading-[0.9] tracking-[-0.045em] text-white">
              Every journey
              <span className="block italic font-light text-white/85">
                starts with a step.
              </span>
            </h1>
          </motion.div>

          {/* Description + CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.25 }}
            className="mt-4 flex flex-col gap-4 sm:mt-5 lg:flex-row lg:items-end lg:justify-between"
          >
            <div className="max-w-lg">
              <p className="text-sm leading-6 text-white/80 sm:text-base sm:leading-7">
                Discover the places, experiences, and stays that make Nepal
                unforgettable. Your next story begins here.
              </p>

              {/* Buttons */}
              <div className="mt-4 flex flex-wrap gap-2.5 sm:mt-5">
                <Link
                  to="/destinations"
                  className="group inline-flex items-center gap-2.5 rounded-full bg-white px-5 py-3 text-xs font-bold text-slate-900 transition hover:bg-slate-100 sm:px-6 sm:py-3.5 sm:text-sm"
                >
                  Explore Nepal

                  <ArrowRight
                    size={16}
                    className="transition-transform group-hover:translate-x-1"
                  />
                </Link>

                <Link
                  to="/ai"
                  className="group inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-5 py-3 text-xs font-semibold text-white backdrop-blur-md transition hover:bg-white/20 sm:px-6 sm:py-3.5 sm:text-sm"
                >
                  <Sparkles size={15} className="text-emerald-300" />

                  Talk to Paila AI
                </Link>
              </div>
            </div>

            {/* Quick links */}
            <div className="hidden lg:block">
              <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-white/50">
                Start exploring
              </p>

              <div className="flex gap-2">
                <Link
                  to="/hotels"
                  className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3.5 py-2 text-xs font-medium text-white backdrop-blur-md transition hover:bg-white/20"
                >
                  <Hotel size={14} />
                  Hotels
                </Link>

                <Link
                  to="/destinations"
                  className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3.5 py-2 text-xs font-medium text-white backdrop-blur-md transition hover:bg-white/20"
                >
                  <MapPin size={14} />
                  Destinations
                </Link>
              </div>
            </div>
          </motion.div>

          {/* Featured destinations */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="mt-6 border-t border-white/20 pt-3 sm:mt-7 sm:pt-4"
          >
            <div className="flex items-center justify-between">
              <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/50 sm:text-xs">
                Places to begin
              </p>

              <Link
                to="/destinations"
                className="flex items-center gap-1.5 text-xs font-medium text-white/70 transition hover:text-white sm:text-sm"
              >
                View all
                <ArrowRight size={14} />
              </Link>
            </div>

            <div className="mt-2.5 grid grid-cols-3 gap-2 sm:mt-3 sm:gap-3">
              {featuredDestinations.map((destination, index) => (
                <motion.div
                  key={destination.slug}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.4,
                    delay: 0.5 + index * 0.1,
                  }}
                >
                  <Link
                    to={`/destinations/${destination.slug}`}
                    className="group flex items-center justify-between rounded-xl border border-white/15 bg-black/15 px-3 py-2.5 backdrop-blur-md transition hover:border-white/30 hover:bg-white/10 sm:rounded-2xl sm:px-4 sm:py-3"
                  >
                    <div className="min-w-0">
                      <p className="truncate text-xs font-semibold text-white sm:text-sm">
                        {destination.name}
                      </p>

                      <p className="mt-0.5 truncate text-[9px] text-white/50 sm:text-xs">
                        {destination.label}
                      </p>
                    </div>

                    <ArrowRight
                      size={14}
                      className="ml-2 shrink-0 text-white/50 transition group-hover:translate-x-1 group-hover:text-white sm:size-4"
                    />
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.2 }}
        className="absolute bottom-5 right-6 hidden flex-col items-center gap-1.5 text-white/50 xl:flex"
      >
        <span className="text-[9px] uppercase tracking-[0.25em]">
          Scroll
        </span>

        <ArrowDown size={14} className="animate-bounce" />
      </motion.div>
    </section>
  );
}