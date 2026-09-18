import { Link } from "react-router-dom";
import {
  MessageCircle,
  MapPinned,
  Wallet,
  Compass,
  CloudSun,
  ShieldCheck,
  ArrowUpRight,
} from "lucide-react";
import { motion } from "framer-motion";

const features = [
  {
    icon: MessageCircle,
    title: "Travel AI Assistant",
    description:
      "Chat with Paila to get travel ideas, destination suggestions, route guidance, and practical answers for your Nepal journey.",
  },
  {
    icon: MapPinned,
    title: "Discover Nepal",
    description:
      "Explore popular destinations, hidden gems, local attractions, and experiences across Nepal—all in one place.",
  },
  {
    icon: Wallet,
    title: "Travel on Your Budget",
    description:
      "Understand estimated travel costs and discover options that match your budget, from affordable trips to comfortable experiences.",
  },
  {
    icon: Compass,
    title: "Plan With Confidence",
    description:
      "Get useful travel information about routes, transportation, places to visit, and things to consider before you go.",
  },
  {
    icon: CloudSun,
    title: "Travel Information",
    description:
      "Find helpful information about destinations, weather, activities, and other important details to make better travel decisions.",
  },
  {
    icon: ShieldCheck,
    title: "Made for Nepal",
    description:
      "Built with Nepal in mind, Paila brings destinations, travel ideas, and practical guidance together for local and international travelers.",
  },
];

export default function WhyPaila() {
  return (
    <section className="relative overflow-hidden bg-white py-20 sm:py-24 lg:py-28">
      {/* Soft background decoration */}
      <motion.div
        animate={{
          x: [0, 25, 0],
          y: [0, -20, 0],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="pointer-events-none absolute -left-40 top-20 h-80 w-80 rounded-full bg-emerald-50/80 blur-3xl"
      />

      <motion.div
        animate={{
          x: [0, -20, 0],
          y: [0, 25, 0],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="pointer-events-none absolute -right-40 bottom-20 h-80 w-80 rounded-full bg-cyan-50/70 blur-3xl"
      />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7 }}
          className="max-w-3xl"
        >
          <div className="mb-5 flex items-center gap-3">
            <span className="h-px w-10 bg-emerald-600" />

            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-emerald-700">
              Why Paila
            </p>
          </div>

          <h2 className="text-4xl font-medium leading-[1.05] tracking-[-0.04em] text-slate-900 sm:text-5xl lg:text-6xl">
            More than a travel
            <span className="block font-light italic text-slate-500">
              website.
            </span>
          </h2>

          <p className="mt-6 max-w-2xl text-sm leading-7 text-slate-500 sm:text-base sm:leading-8">
            From discovering destinations to getting practical travel advice,
            Paila brings the tools and information you need into one simple
            travel experience.
          </p>
        </motion.div>

        {/* Features */}
        <div className="mt-12 grid gap-px overflow-hidden rounded-[28px] border border-slate-200 bg-slate-200 sm:mt-16 sm:grid-cols-2 lg:grid-cols-3 lg:rounded-[32px]">
          {features.map((feature, index) => {
            const Icon = feature.icon;

            return (
              <motion.article
                key={feature.title}
                initial={{ opacity: 0, y: 35 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.08,
                }}
                whileHover={{
                  y: -5,
                }}
                className="group relative min-h-[290px] overflow-hidden bg-white p-6 transition-all duration-500 hover:z-10 hover:shadow-2xl hover:shadow-slate-300/40 sm:p-8 lg:min-h-[320px] lg:p-9"
              >
                {/* Floating number */}
                <motion.span
                  animate={{
                    y: [0, -7, 0],
                  }}
                  transition={{
                    duration: 4 + index * 0.4,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: index * 0.3,
                  }}
                  className="absolute right-6 top-5 text-5xl font-light tracking-tight text-slate-100 transition-colors duration-500 group-hover:text-emerald-50 sm:right-8 sm:top-6 sm:text-6xl"
                >
                  0{index + 1}
                </motion.span>

                {/* Floating icon */}
                <motion.div
                  animate={{
                    y: [0, -6, 0],
                    rotate: [0, 1.5, 0],
                  }}
                  transition={{
                    duration: 4 + index * 0.3,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: index * 0.2,
                  }}
                  className="relative flex h-12 w-12 items-center justify-center rounded-full border border-emerald-100 bg-emerald-50 text-emerald-700 transition-all duration-500 group-hover:border-emerald-600 group-hover:bg-emerald-600 group-hover:text-white sm:h-14 sm:w-14"
                >
                  <Icon className="h-5 w-5 sm:h-6 sm:w-6" />
                </motion.div>

                {/* Content */}
                <div className="relative mt-6">
                  <h3 className="text-xl font-medium tracking-tight text-slate-900 sm:text-2xl">
                    {feature.title}
                  </h3>

                  <p className="mt-3 max-w-md text-sm leading-6 text-slate-500 sm:text-[15px] sm:leading-7">
                    {feature.description}
                  </p>

                  {/* Hover link */}
                  <div className="mt-6 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.15em] text-emerald-700 opacity-0 transition-all duration-400 group-hover:translate-x-1 group-hover:opacity-100">
                    Explore with Paila
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </div>
                </div>

                {/* Bottom animated line */}
                <motion.div
                  className="absolute bottom-0 left-0 h-[2px] bg-emerald-500"
                  initial={{ width: "0%" }}
                  whileHover={{ width: "100%" }}
                  transition={{ duration: 0.5 }}
                />
              </motion.article>
            );
          })}
        </div>

        {/* Bottom statement */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7 }}
          className="mt-12 sm:mt-16"
        >
          <div className="relative overflow-hidden rounded-[28px] bg-slate-950 px-6 py-10 sm:rounded-[32px] sm:px-10 sm:py-12 lg:px-14">
            {/* Floating glow */}
            <motion.div
              animate={{
                x: [0, 35, 0],
                y: [0, -15, 0],
              }}
              transition={{
                duration: 9,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full bg-emerald-500/20 blur-3xl"
            />

            <div className="relative flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
              <div className="max-w-3xl">
                <p className="text-xs font-semibold uppercase tracking-[0.25em] text-emerald-300">
                  The Paila idea
                </p>

                <h3 className="mt-4 text-2xl font-medium leading-tight tracking-tight text-white sm:text-3xl lg:text-4xl">
                  One place.
                  <span className="font-light italic text-white/60">
                    {" "}
                    Better journeys.
                  </span>
                </h3>

                <p className="mt-4 max-w-2xl text-sm leading-7 text-white/60 sm:text-base">
                  Paila is built to make exploring Nepal simpler, more
                  accessible, and more enjoyable.
                </p>
              </div>

              <Link
                to="/ai"
                className="group inline-flex w-fit shrink-0 items-center gap-3 rounded-full bg-white px-5 py-3.5 text-sm font-semibold text-slate-900 transition-all duration-300 hover:bg-emerald-400 hover:text-white"
              >
                Start exploring
                <ArrowUpRight
                  size={16}
                  className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
