import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useState } from "react";
import {
  ArrowRight,
  Bus,
  CalendarDays,
  ChevronDown,
  Hotel,
  MapPin,
  Plane,
  Sparkles,
  Ticket,
} from "lucide-react";
import heroImage from "../../../assets/images/hero.jpg";

type SearchType = "flights" | "hotels" | "bus" | "experiences";

const searchTabs = [
  { id: "flights" as const, label: "Flights", icon: Plane },
  { id: "hotels" as const, label: "Hotels", icon: Hotel },
  { id: "bus" as const, label: "Bus", icon: Bus },
  { id: "experiences" as const, label: "Experiences", icon: Ticket },
];

const popularDestinations = [
  { name: "Pokhara", slug: "pokhara" },
  { name: "Mustang", slug: "mustang" },
  { name: "Chitwan", slug: "chitwan" },
  { name: "Kathmandu", slug: "kathmandu" },
];

const fieldClass =
  "rounded-2xl border border-slate-200 bg-slate-50/80 p-4 transition-all duration-200 focus-within:border-emerald-400 focus-within:bg-white focus-within:shadow-sm";

function SearchField({
  label,
  placeholder,
  type = "text",
  helper,
}: {
  label: string;
  placeholder?: string;
  type?: string;
  helper?: string;
}) {
  return (
    <div className={fieldClass}>
      <div className="flex items-center gap-2">
        {type === "date" ? (
          <CalendarDays className="h-4 w-4 text-emerald-600" />
        ) : (
          <MapPin className="h-4 w-4 text-emerald-600" />
        )}

        <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
          {label}
        </p>
      </div>

      <input
        type={type}
        placeholder={placeholder}
        className="mt-2 w-full bg-transparent text-[15px] font-semibold text-slate-800 outline-none placeholder:text-slate-400"
      />

      {helper && (
        <p className="mt-1 text-xs text-slate-400">{helper}</p>
      )}
    </div>
  );
}

export default function Hero() {
  const [searchType, setSearchType] = useState<SearchType>("flights");

  return (
    <section className="relative min-h-screen overflow-hidden bg-slate-950">
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${heroImage})` }}
      />

      {/* Overlays */}
      <div className="absolute inset-0 bg-slate-950/45" />
      <div className="absolute inset-0 bg-gradient-to-r from-slate-950/80 via-slate-950/45 to-slate-950/20" />
      <div className="absolute inset-x-0 bottom-0 h-72 bg-gradient-to-t from-slate-950/80 to-transparent" />

      {/* Decorative glow */}
      <div className="absolute left-1/2 top-32 h-72 w-72 -translate-x-1/2 rounded-full bg-emerald-400/10 blur-3xl" />

      {/* Main content */}
      <div className="relative z-10 mx-auto flex min-h-screen max-w-7xl items-center px-4 pb-14 pt-32 sm:px-6 sm:pb-20 sm:pt-36 lg:px-8">
        <motion.div
          className="w-full"
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          {/* Hero copy */}
          <div className="max-w-4xl">
            <motion.div
              className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-semibold text-emerald-200 backdrop-blur-md"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Sparkles className="h-4 w-4" />
              Your Nepal Travel Companion
            </motion.div>

            <h1 className="max-w-4xl text-5xl font-black leading-[0.98] tracking-tight text-white sm:text-6xl md:text-7xl lg:text-8xl">
              Explore Nepal.
              <span className="mt-2 block bg-gradient-to-r from-emerald-300 via-cyan-300 to-sky-300 bg-clip-text text-transparent">
                Your journey starts here.
              </span>
            </h1>

            <p className="mt-6 max-w-2xl text-base leading-7 text-white/80 sm:text-lg sm:leading-8 md:text-xl">
              Discover destinations, find places to stay, explore experiences,
              and plan your next journey across Nepal.
            </p>
          </div>

          {/* Search panel */}
          <motion.div
            className="mt-8 w-full overflow-hidden rounded-3xl border border-white/20 bg-white shadow-2xl shadow-black/20 sm:mt-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {/* Tabs */}
            <div className="border-b border-slate-100 px-2 pt-2 sm:px-3 sm:pt-3">
              <div className="flex overflow-x-auto scrollbar-hide">
                {searchTabs.map((tab) => {
                  const Icon = tab.icon;
                  const active = searchType === tab.id;

                  return (
                    <button
                      key={tab.id}
                      type="button"
                      onClick={() => setSearchType(tab.id)}
                      className={`flex shrink-0 items-center gap-2 rounded-t-2xl px-4 py-3.5 text-sm font-bold transition sm:px-6 ${
                        active
                          ? "bg-emerald-50 text-emerald-700"
                          : "text-slate-500 hover:bg-slate-50 hover:text-slate-800"
                      }`}
                    >
                      <Icon className="h-4 w-4" />
                      {tab.label}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="p-3 sm:p-5">
              {/* Flights */}
              {searchType === "flights" && (
                <div>
                  <div className="mb-4 flex flex-wrap items-center gap-5">
                    <label className="flex cursor-pointer items-center gap-2 text-sm font-semibold text-slate-700">
                      <input
                        type="radio"
                        name="tripType"
                        defaultChecked
                        className="h-4 w-4 accent-emerald-600"
                      />
                      One Way
                    </label>

                    <label className="flex cursor-pointer items-center gap-2 text-sm font-semibold text-slate-700">
                      <input
                        type="radio"
                        name="tripType"
                        className="h-4 w-4 accent-emerald-600"
                      />
                      Round Trip
                    </label>
                  </div>

                  <div className="grid gap-3 md:grid-cols-4">
                    <SearchField
                      label="From"
                      placeholder="Kathmandu"
                      helper="City or airport"
                    />

                    <SearchField
                      label="To"
                      placeholder="Pokhara"
                      helper="City or airport"
                    />

                    <SearchField
                      label="Departure"
                      type="date"
                      helper="Select your date"
                    />

                    <Link
                      to="/login"
                      className="group flex min-h-[88px] items-center justify-center gap-2 rounded-2xl bg-emerald-600 px-6 font-bold text-white shadow-lg shadow-emerald-600/20 transition hover:bg-emerald-700 hover:shadow-xl active:scale-[0.98]"
                    >
                      Search Flights
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </div>
                </div>
              )}

              {/* Hotels */}
              {searchType === "hotels" && (
                <div className="grid gap-3 md:grid-cols-4">
                  <SearchField
                    label="Destination"
                    placeholder="Pokhara"
                    helper="Where are you staying?"
                  />

                  <SearchField
                    label="Check-in"
                    type="date"
                    helper="Select your date"
                  />

                  <SearchField
                    label="Check-out"
                    type="date"
                    helper="Select your date"
                  />

                  <Link
                    to="/login"
                    className="group flex min-h-[88px] items-center justify-center gap-2 rounded-2xl bg-emerald-600 px-6 font-bold text-white shadow-lg shadow-emerald-600/20 transition hover:bg-emerald-700 hover:shadow-xl active:scale-[0.98]"
                  >
                    Search Hotels
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              )}

              {/* Bus */}
              {searchType === "bus" && (
                <div className="grid gap-3 md:grid-cols-4">
                  <SearchField
                    label="From"
                    placeholder="Kathmandu"
                    helper="Departure city"
                  />

                  <SearchField
                    label="To"
                    placeholder="Pokhara"
                    helper="Arrival city"
                  />

                  <SearchField
                    label="Travel Date"
                    type="date"
                    helper="Select your date"
                  />

                  <Link
                    to="/login"
                    className="group flex min-h-[88px] items-center justify-center gap-2 rounded-2xl bg-emerald-600 px-6 font-bold text-white shadow-lg shadow-emerald-600/20 transition hover:bg-emerald-700 hover:shadow-xl active:scale-[0.98]"
                  >
                    Search Buses
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              )}

              {/* Experiences */}
              {searchType === "experiences" && (
                <div className="grid gap-3 md:grid-cols-3">
                  <SearchField
                    label="Destination"
                    placeholder="Where do you want to explore?"
                  />

                  <div className={fieldClass}>
                    <div className="flex items-center gap-2">
                      <Ticket className="h-4 w-4 text-emerald-600" />
                      <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                        Experience
                      </p>
                    </div>

                    <div className="relative mt-2">
                      <select className="w-full appearance-none bg-transparent pr-6 text-[15px] font-semibold text-slate-800 outline-none">
                        <option>Adventure</option>
                        <option>Trekking</option>
                        <option>Culture</option>
                        <option>Food</option>
                        <option>Nature</option>
                        <option>Family</option>
                      </select>

                      <ChevronDown className="pointer-events-none absolute right-0 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                    </div>
                  </div>

                  <Link
                    to="/login"
                    className="group flex min-h-[88px] items-center justify-center gap-2 rounded-2xl bg-emerald-600 px-6 font-bold text-white shadow-lg shadow-emerald-600/20 transition hover:bg-emerald-700 hover:shadow-xl active:scale-[0.98]"
                  >
                    Explore Experiences
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              )}
            </div>
          </motion.div>

          {/* Popular destinations */}
          <div className="mt-6 flex flex-wrap items-center gap-2.5 sm:mt-7">
            <span className="mr-1 text-sm font-semibold text-white/70">
              Popular:
            </span>

            {popularDestinations.map((destination) => (
              <Link
                key={destination.slug}
                to={`/destinations/${destination.slug}`}
                className="rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-medium text-white backdrop-blur-md transition hover:border-emerald-300/50 hover:bg-white/20 hover:text-emerald-200 active:scale-95"
              >
                {destination.name}
              </Link>
            ))}
          </div>

          {/* AI CTA */}
          <div className="mt-7">
            <Link
              to="/ai"
              className="group inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2.5 text-sm font-semibold text-white/90 backdrop-blur-md transition hover:border-emerald-300/40 hover:bg-white/15 hover:text-emerald-200"
            >
              <Sparkles className="h-4 w-4 text-emerald-300" />
              Ask Paila AI about your trip
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}