import { MapPinned, Sparkles, Wallet } from "lucide-react";
import { motion } from "framer-motion";

const features = [
  {
    icon: <Sparkles size={42} className="text-emerald-600" />,
    title: "AI Powered Planning",
    description: "Generate personalized itineraries in seconds.",
  },
  {
    icon: <Wallet size={42} className="text-emerald-600" />,
    title: "Budget Friendly",
    description: "Travel smarter with accurate budget estimation.",
  },
  {
    icon: <MapPinned size={42} className="text-emerald-600" />,
    title: "Explore Nepal",
    description: "Discover hidden gems and famous destinations.",
  },
];

export default function WhyPaila() {
  return (
    <section className="bg-white py-24">
      <div className="mx-auto max-w-7xl px-6">
        <h2 className="text-center text-5xl font-bold text-slate-900">
          Why Choose Paila?
        </h2>

        <p className="mx-auto mt-4 max-w-2xl text-center text-lg text-slate-500">
          Everything you need to plan your perfect Nepal adventure in one place.
        </p>

        <div className="mt-16 grid gap-8 md:grid-cols-3">
          {features.map((feature) => (
            <motion.div
  key={feature.title}
  initial={{ opacity: 0, y: 50 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  transition={{ duration: 0.6 }}
  className="rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-md transition-all duration-300 hover:-translate-y-3 hover:border-emerald-500 hover:shadow-2xl"
>
  <div className="mb-6 flex justify-center">
    {feature.icon}
  </div>

  <h3 className="text-2xl font-bold text-slate-900">
    {feature.title}
  </h3>

  <p className="mt-4 leading-7 text-slate-600">
    {feature.description}
  </p>
</motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}