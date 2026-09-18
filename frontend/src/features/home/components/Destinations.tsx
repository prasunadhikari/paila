import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

import pokhara from "../../../assets/images/pokhara.jpg";
import mustang from "../../../assets/images/mustang.jpg";
import chitwan from "../../../assets/images/chitwan.jpg";

const places = [
  {
    name: "Pokhara",
    slug: "pokhara",
    image: pokhara,
    description:
      "Lakes, mountains and unforgettable adventures surrounded by the Himalayas.",
  },
  {
    name: "Mustang",
    slug: "mustang",
    image: mustang,
    description:
      "An ancient Himalayan kingdom shaped by dramatic landscapes and timeless culture.",
  },
  {
    name: "Chitwan",
    slug: "chitwan",
    image: chitwan,
    description:
      "Wildlife, jungles and unforgettable encounters in the heart of southern Nepal.",
  },
];

export default function Destinations() {
  return (
    <section className="relative z-20 -mt-5 overflow-hidden rounded-t-[32px] bg-[#f8fafc] py-14 sm:rounded-t-[42px] sm:py-16 lg:-mt-6 lg:py-20">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        {/* =========================
            SECTION INTRO
        ========================== */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7 }}
          className="border-b border-slate-200/80 pb-9 sm:pb-11"
        >
          <div className="grid gap-7 lg:grid-cols-[1fr_auto] lg:items-end">
            {/* Left content */}
            <div className="max-w-3xl">
              {/* Eyebrow */}
              <div className="mb-4 flex items-center gap-3">
                <span className="h-px w-9 bg-emerald-500 sm:w-10" />

                <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-emerald-600 sm:text-[11px]">
                  Discover Nepal
                </p>
              </div>

              {/* Heading */}
              <h2 className="max-w-3xl text-4xl font-medium leading-[0.98] tracking-[-0.045em] text-slate-900 sm:text-5xl lg:text-[4.3rem]">
                Places worth
                <span className="block font-light italic text-slate-400">
                  going somewhere for.
                </span>
              </h2>

              {/* Description */}
              <p className="mt-5 max-w-2xl text-sm leading-7 text-slate-500 sm:text-base sm:leading-8">
                From peaceful lakes and towering mountains to ancient kingdoms
                and wild jungles, discover the places that make Nepal
                unforgettable.
              </p>
            </div>

            {/* Desktop View All */}
            <Link
              to="/destinations"
              className="group hidden shrink-0 items-center gap-3 rounded-full border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-emerald-300 hover:text-emerald-600 hover:shadow-md sm:inline-flex"
            >
              View all destinations

              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 transition-all duration-300 group-hover:bg-emerald-50">
                <ArrowRight
                  size={15}
                  className="transition-transform duration-300 group-hover:translate-x-0.5"
                />
              </span>
            </Link>
          </div>
        </motion.div>

        {/* =========================
            DESTINATION CARDS
        ========================== */}
        <div className="mt-8 grid gap-5 sm:mt-10 lg:grid-cols-3 lg:gap-6">
          {places.map((place, index) => (
            <motion.article
              key={place.slug}
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{
                duration: 0.7,
                delay: index * 0.12,
              }}
              className="group relative overflow-hidden rounded-[24px] bg-slate-900 shadow-sm transition-all duration-500 hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-slate-900/15 sm:rounded-[28px]"
            >
              {/* Image */}
              <div className="relative aspect-[4/5] w-full overflow-hidden">
                <img
                  src={place.image}
                  alt={`${place.name}, Nepal`}
                  loading={index === 0 ? "eager" : "lazy"}
                  className="h-full w-full object-cover object-center transition-transform duration-1000 ease-out group-hover:scale-[1.07]"
                />

                {/* Main cinematic overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/25 to-black/0" />

                {/* Subtle color overlay */}
                <div className="absolute inset-0 bg-sky-950/5 transition-all duration-700 group-hover:bg-sky-950/15" />

                {/* Top shine */}
                <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-black/20 to-transparent opacity-70" />

                {/* Number */}
                <div className="absolute left-5 top-5 flex h-9 w-9 items-center justify-center rounded-full border border-white/25 bg-black/20 text-[11px] font-medium text-white backdrop-blur-md transition-all duration-300 group-hover:border-white/40 group-hover:bg-white/10">
                  0{index + 1}
                </div>

                {/* Content */}
                <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6 lg:p-7">
                  <div className="flex items-end justify-between gap-4">
                    <div className="min-w-0">
                      {/* Location */}
                      <p className="mb-2 text-[9px] font-semibold uppercase tracking-[0.26em] text-sky-200/70 sm:text-[10px]">
                        Nepal
                      </p>

                      {/* Name */}
                      <h3 className="text-3xl font-medium tracking-[-0.04em] text-white sm:text-4xl">
                        {place.name}
                      </h3>

                      {/* Description */}
                      <p className="mt-2.5 max-w-sm text-xs leading-5 text-white/65 sm:mt-3 sm:text-sm sm:leading-6">
                        {place.description}
                      </p>
                    </div>

                    {/* Explore Button */}
                    <Link
                      to={`/destinations/${place.slug}`}
                      aria-label={`Explore ${place.name}`}
                      className="group/button flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white text-slate-900 shadow-lg transition-all duration-300 hover:scale-105 hover:bg-emerald-500 hover:text-white sm:h-12 sm:w-12"
                    >
                      <ArrowRight
                        size={18}
                        className="transition-transform duration-300 group-hover/button:translate-x-0.5"
                      />
                    </Link>
                  </div>
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        {/* =========================
            MOBILE VIEW ALL
        ========================== */}
        <div className="mt-7 sm:hidden">
          <Link
            to="/destinations"
            className="group flex w-full items-center justify-between rounded-full border border-slate-200 bg-white px-5 py-3.5 text-sm font-semibold text-slate-700 shadow-sm transition-all duration-300 hover:border-emerald-300 hover:text-emerald-600"
          >
            <span>View all destinations</span>

            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 transition-all duration-300 group-hover:bg-emerald-50">
              <ArrowRight
                size={15}
                className="transition-transform duration-300 group-hover:translate-x-0.5"
              />
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
