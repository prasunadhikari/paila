import { motion } from "framer-motion";
import { ArrowRight, MapPin, Star } from "lucide-react";
import { Link } from "react-router-dom";

import pokhara from "../../../assets/images/pokhara.jpg";
import chitwan from "../../../assets/images/chitwan.jpg";
import mustang from "../../../assets/images/mustang.jpg";

const hotels = [
  {
    name: "Lakeside Escape",
    location: "Pokhara, Nepal",
    image: pokhara,
    rating: "4.8",
    price: "From NPR 3,500",
    type: "Boutique Stay",
  },
  {
    name: "Jungle Retreat",
    location: "Chitwan, Nepal",
    image: chitwan,
    rating: "4.7",
    price: "From NPR 4,200",
    type: "Resort",
  },
  {
    name: "Mountain Haven",
    location: "Mustang, Nepal",
    image: mustang,
    rating: "4.9",
    price: "From NPR 3,800",
    type: "Mountain Stay",
  },
];

export default function Hotels() {
  return (
    <section className="relative overflow-hidden bg-[#05070a] px-6 py-24 text-white sm:px-8 lg:px-12">
      {/* Ambient glow */}
      <div className="pointer-events-none absolute -left-32 top-20 h-72 w-72 rounded-full bg-emerald-500/10 blur-3xl" />
      <div className="pointer-events-none absolute -right-32 bottom-20 h-80 w-80 rounded-full bg-cyan-500/10 blur-3xl" />

      <div className="relative mx-auto max-w-7xl">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7 }}
          className="mb-12 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between"
        >
          <div className="max-w-2xl">
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.25em] text-emerald-400">
              Stay in Nepal
            </p>

            <h2 className="text-4xl font-semibold tracking-tight sm:text-5xl">
              Places to stay,
              <br />
              <span className="italic text-white/40">
                made for your journey.
              </span>
            </h2>

            <p className="mt-5 max-w-xl text-base leading-7 text-white/55">
              From peaceful lakeside escapes to mountain retreats, discover
              comfortable stays that make every step of your journey better.
            </p>
          </div>

          <Link
            to="/hotels"
            className="group inline-flex w-fit items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-5 py-3 text-sm font-medium text-white transition-all duration-300 hover:border-emerald-400/30 hover:bg-emerald-400/10"
          >
            View all hotels
            <ArrowRight
              size={16}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </Link>
        </motion.div>

        {/* Hotel Cards */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {hotels.map((hotel, index) => (
            <motion.div
              key={hotel.name}
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{
                duration: 0.6,
                delay: index * 0.12,
              }}
              className="group"
            >
              <div className="overflow-hidden rounded-3xl border border-white/10 bg-[#080b0f] transition-all duration-500 hover:-translate-y-2 hover:border-emerald-400/20">
                {/* Image */}
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={hotel.image}
                    alt={hotel.name}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />

                  {/* Image overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                  {/* Type */}
                  <div className="absolute left-4 top-4 rounded-full border border-white/10 bg-black/40 px-3 py-1.5 text-xs font-medium text-white backdrop-blur-md">
                    {hotel.type}
                  </div>

                  {/* Rating */}
                  <div className="absolute right-4 top-4 flex items-center gap-1 rounded-full bg-white px-3 py-1.5 text-xs font-semibold text-black">
                    <Star size={13} className="fill-emerald-500 text-emerald-500" />
                    {hotel.rating}
                  </div>

                  {/* Bottom image text */}
                  <div className="absolute bottom-5 left-5 right-5">
                    <h3 className="text-2xl font-semibold text-white">
                      {hotel.name}
                    </h3>

                    <div className="mt-2 flex items-center gap-1.5 text-sm text-white/70">
                      <MapPin size={14} className="text-emerald-400" />
                      {hotel.location}
                    </div>
                  </div>
                </div>

                {/* Card bottom */}
                <div className="flex items-center justify-between gap-4 p-5">
                  <div>
                    <p className="text-xs uppercase tracking-wider text-white/35">
                      Stay from
                    </p>
                    <p className="mt-1 font-medium text-white">
                      {hotel.price}
                      <span className="ml-1 text-xs font-normal text-white/40">
                        / night
                      </span>
                    </p>
                  </div>

                  <Link
                    to="/hotels"
                    className="flex h-11 w-11 items-center justify-center rounded-full bg-white/[0.06] text-white transition-all duration-300 hover:bg-emerald-400 hover:text-black"
                    aria-label={`View ${hotel.name}`}
                  >
                    <ArrowRight
                      size={18}
                      className="transition-transform duration-300 group-hover:translate-x-0.5"
                    />
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mt-10 flex flex-col items-center justify-between gap-5 rounded-3xl border border-white/10 bg-white/[0.025] p-6 sm:flex-row sm:p-8"
        >
          <div>
            <h3 className="text-xl font-semibold">
              Planning your next stay?
            </h3>
            <p className="mt-1 text-sm text-white/45">
              Find a place that feels right for your journey.
            </p>
          </div>

          <Link
            to="/hotels"
            className="group inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-black transition-all duration-300 hover:bg-emerald-400"
          >
            Explore hotels
            <ArrowRight
              size={16}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}