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
    <section className="relative overflow-hidden bg-white py-24 sm:py-28">
      {/* Background decoration */}
      <div className="pointer-events-none absolute -left-40 top-20 h-80 w-80 rounded-full bg-emerald-50 blur-3xl" />
      <div className="pointer-events-none absolute -right-40 bottom-20 h-80 w-80 rounded-full bg-cyan-50 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-6">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-3xl text-center"
        >
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-emerald-100 bg-emerald-50 px-4 py-2 text-sm font-semibold text-emerald-700">
            <Compass className="h-4 w-4" />
            Why Paila
          </div>

          <h2 className="text-4xl font-black tracking-tight text-slate-900 sm:text-5xl">
            Everything you need to
            <span className="block text-emerald-600">
              explore Nepal better.
            </span>
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-slate-500 sm:text-lg sm:leading-8">
            From discovering destinations to getting practical travel advice,
            Paila brings the tools and information you need into one simple
            travel experience.
          </p>
        </motion.div>

        {/* Features */}
        <div className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => {
            const Icon = feature.icon;

            return (
              <motion.article
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.07,
                }}
                whileHover={{ y: -7 }}
                className="group relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-7 shadow-sm transition-all duration-300 hover:border-emerald-200 hover:shadow-xl hover:shadow-slate-200/60 sm:p-8"
              >
                {/* Number */}
                <span className="absolute right-6 top-5 text-5xl font-black text-slate-100 transition-colors duration-300 group-hover:text-emerald-50">
                  0{index + 1}
                </span>

                {/* Icon */}
                <div className="relative flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600 transition-all duration-300 group-hover:bg-emerald-600 group-hover:text-white group-hover:shadow-lg group-hover:shadow-emerald-600/20">
                  <Icon className="h-7 w-7" />
                </div>

                {/* Content */}
                <div className="relative">
                  <h3 className="mt-6 text-xl font-bold text-slate-900">
                    {feature.title}
                  </h3>

                  <p className="mt-3 text-[15px] leading-7 text-slate-500">
                    {feature.description}
                  </p>

                  {/* Small accent */}
                  <div className="mt-6 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-600 opacity-0 transition-all duration-300 group-hover:translate-x-1 group-hover:opacity-100">
                    Explore with Paila
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </div>
                </div>

                {/* Bottom accent */}
                <div className="absolute bottom-0 left-0 h-1 w-0 bg-emerald-500 transition-all duration-500 group-hover:w-full" />
              </motion.article>
            );
          })}
        </div>

        {/* Bottom statement */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mx-auto mt-16 max-w-3xl text-center"
        >
          <div className="rounded-3xl border border-emerald-100 bg-gradient-to-r from-emerald-50 to-cyan-50 px-6 py-7 sm:px-10">
            <p className="text-base leading-7 text-slate-600 sm:text-lg">
              <span className="font-bold text-slate-900">
                One place. Better decisions. More memorable journeys.
              </span>{" "}
              Paila is built to make exploring Nepal simpler, more accessible,
              and more enjoyable.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}