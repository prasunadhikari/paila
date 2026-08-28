import {
  MessageCircle,
  MapPinned,
  Wallet,
  Compass,
  CloudSun,
  ShieldCheck,
} from "lucide-react";
import { motion } from "framer-motion";

const features = [
  {
    icon: <MessageCircle size={40} className="text-emerald-600" />,
    title: "Travel AI Assistant",
    description:
      "Chat with Paila to get travel ideas, destination suggestions, route guidance, and practical answers for your Nepal journey.",
  },
  {
    icon: <MapPinned size={40} className="text-emerald-600" />,
    title: "Discover Nepal",
    description:
      "Explore popular destinations, hidden gems, local attractions, and experiences across Nepal—all in one place.",
  },
  {
    icon: <Wallet size={40} className="text-emerald-600" />,
    title: "Travel on Your Budget",
    description:
      "Understand estimated travel costs and discover options that match your budget, from affordable trips to comfortable experiences.",
  },
  {
    icon: <Compass size={40} className="text-emerald-600" />,
    title: "Plan With Confidence",
    description:
      "Get useful travel information about routes, transportation, places to visit, and things to consider before you go.",
  },
  {
    icon: <CloudSun size={40} className="text-emerald-600" />,
    title: "Travel Information",
    description:
      "Find helpful information about destinations, weather, activities, and other important details to make better travel decisions.",
  },
  {
    icon: <ShieldCheck size={40} className="text-emerald-600" />,
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
      <div className="pointer-events-none absolute -right-40 bottom-10 h-80 w-80 rounded-full bg-blue-50 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-6">
        {/* Section heading */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-3xl text-center"
        >
          <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-emerald-50 px-4 py-2 text-sm font-semibold text-emerald-700 ring-1 ring-emerald-100">
            <Compass className="h-4 w-4" />
            Your Nepal Travel Companion
          </div>

          <h2 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
            Why Choose Paila?
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-slate-500">
            From discovering destinations to getting practical travel advice,
            Paila helps you make smarter decisions for your journey across
            Nepal.
          </p>
        </motion.div>

        {/* Features */}
        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <motion.article
              key={feature.title}
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.5,
                delay: index * 0.08,
              }}
              whileHover={{ y: -6 }}
              className="group rounded-3xl border border-slate-200 bg-white p-8 shadow-sm transition-all duration-300 hover:border-emerald-200 hover:shadow-xl"
            >
              {/* Icon */}
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-50 transition-colors duration-300 group-hover:bg-emerald-100">
                {feature.icon}
              </div>

              {/* Content */}
              <h3 className="mt-6 text-xl font-bold text-slate-900">
                {feature.title}
              </h3>

              <p className="mt-3 text-[15px] leading-7 text-slate-600">
                {feature.description}
              </p>
            </motion.article>
          ))}
        </div>

        {/* Bottom statement */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mx-auto mt-14 max-w-3xl text-center"
        >
          <p className="text-sm leading-7 text-slate-500 sm:text-base">
            <span className="font-semibold text-slate-700">
              One place. Better decisions. More memorable journeys.
            </span>{" "}
            Paila is built to make exploring Nepal simpler, more accessible,
            and more enjoyable.
          </p>
        </motion.div>
      </div>
    </section>
  );
}