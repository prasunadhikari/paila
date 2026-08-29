import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useState } from "react";
import heroImage from "../../../assets/images/hero.jpg";

type SearchType = "flights" | "hotels" | "bus" | "experiences";

export default function Hero() {
  const [searchType, setSearchType] = useState<SearchType>("flights");

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
      <div className="relative z-10 mx-auto flex min-h-screen max-w-7xl items-center px-4 pb-20 pt-36 sm:px-6 sm:pb-28 sm:pt-40 lg:px-8 lg:pb-32 lg:pt-32">
        <motion.div
          className="w-full max-w-5xl"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Badge */}
          <motion.p
            className="mb-4 text-base font-semibold text-emerald-300 sm:mb-5 sm:text-lg"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Your Nepal Travel Companion
          </motion.p>

          {/* Heading */}
          <h1 className="max-w-4xl text-4xl font-black leading-[0.98] tracking-tight text-white sm:text-5xl md:text-7xl lg:text-8xl">
            Explore Nepal.
            <span className="mt-1 block bg-gradient-to-r from-emerald-300 to-cyan-400 bg-clip-text text-transparent sm:mt-0">
              Your journey starts here.
            </span>
          </h1>

          {/* Description */}
          <p className="mt-5 max-w-2xl text-base leading-7 text-gray-200 sm:mt-7 sm:text-lg sm:leading-8 md:text-xl">
            Search flights, hotels, buses and experiences — all in one place.
          </p>

          {/* Travel Search */}
          <div className="mt-7 w-full max-w-5xl overflow-hidden rounded-2xl bg-white shadow-2xl sm:mt-10 sm:rounded-3xl">
            {/* Search Tabs */}
            <div className="flex overflow-x-auto border-b border-slate-200 px-2 pt-2 scrollbar-hide sm:px-3 sm:pt-3">
              <button
                type="button"
                onClick={() => setSearchType("flights")}
                className={`flex min-w-fit shrink-0 items-center gap-2 rounded-t-xl px-4 py-3 text-sm font-semibold transition sm:rounded-t-2xl sm:px-5 ${
                  searchType === "flights"
                    ? "bg-emerald-50 text-emerald-700"
                    : "text-slate-500 hover:bg-slate-50"
                }`}
              >
                ✈️ Flights
              </button>

              <button
                type="button"
                onClick={() => setSearchType("hotels")}
                className={`flex min-w-fit shrink-0 items-center gap-2 rounded-t-xl px-4 py-3 text-sm font-semibold transition sm:rounded-t-2xl sm:px-5 ${
                  searchType === "hotels"
                    ? "bg-emerald-50 text-emerald-700"
                    : "text-slate-500 hover:bg-slate-50"
                }`}
              >
                🏨 Hotels
              </button>

              <button
                type="button"
                onClick={() => setSearchType("bus")}
                className={`flex min-w-fit shrink-0 items-center gap-2 rounded-t-xl px-4 py-3 text-sm font-semibold transition sm:rounded-t-2xl sm:px-5 ${
                  searchType === "bus"
                    ? "bg-emerald-50 text-emerald-700"
                    : "text-slate-500 hover:bg-slate-50"
                }`}
              >
                🚌 Bus
              </button>

              <button
                type="button"
                onClick={() => setSearchType("experiences")}
                className={`flex min-w-fit shrink-0 items-center gap-2 rounded-t-xl px-4 py-3 text-sm font-semibold transition sm:rounded-t-2xl sm:px-5 ${
                  searchType === "experiences"
                    ? "bg-emerald-50 text-emerald-700"
                    : "text-slate-500 hover:bg-slate-50"
                }`}
              >
                🎟️ Experiences
              </button>
            </div>

            {/* Search Content */}
            <div className="p-3 sm:p-4 md:p-5">
              {/* Flights */}
              {searchType === "flights" && (
                <div>
                  {/* Trip Type */}
                  <div className="mb-4 flex flex-wrap gap-x-5 gap-y-3">
                    <label className="flex cursor-pointer items-center gap-2 text-sm font-medium text-slate-700">
                      <input
                        type="radio"
                        name="tripType"
                        defaultChecked
                        className="accent-emerald-600"
                      />
                      One Way
                    </label>

                    <label className="flex cursor-pointer items-center gap-2 text-sm font-medium text-slate-700">
                      <input
                        type="radio"
                        name="tripType"
                        className="accent-emerald-600"
                      />
                      Round Trip
                    </label>
                  </div>

                  <div className="grid gap-3 md:grid-cols-4">
                    {/* From */}
                    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 transition focus-within:border-emerald-500 focus-within:bg-white">
                      <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                        From
                      </p>

                      <input
                        type="text"
                        placeholder="Kathmandu"
                        className="mt-1 w-full bg-transparent text-base font-semibold text-slate-800 outline-none placeholder:text-slate-400"
                      />

                      <p className="mt-1 text-xs text-slate-400">
                        City or airport
                      </p>
                    </div>

                    {/* To */}
                    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 transition focus-within:border-emerald-500 focus-within:bg-white">
                      <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                        To
                      </p>

                      <input
                        type="text"
                        placeholder="Pokhara"
                        className="mt-1 w-full bg-transparent text-base font-semibold text-slate-800 outline-none placeholder:text-slate-400"
                      />

                      <p className="mt-1 text-xs text-slate-400">
                        City or airport
                      </p>
                    </div>

                    {/* Date */}
                    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 transition focus-within:border-emerald-500 focus-within:bg-white">
                      <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                        Departure
                      </p>

                      <input
                        type="date"
                        className="mt-1 w-full bg-transparent text-base font-semibold text-slate-800 outline-none"
                      />

                      <p className="mt-1 text-xs text-slate-400">
                        Select date
                      </p>
                    </div>

                    {/* Search */}
                    <Link
                      to="/login"
                      className="flex min-h-[72px] items-center justify-center rounded-2xl bg-emerald-600 px-6 font-bold text-white shadow-lg shadow-emerald-600/20 transition hover:bg-emerald-700 hover:shadow-xl active:scale-[0.98] md:min-h-[88px]"
                    >
                      Search Flights
                    </Link>
                  </div>
                </div>
              )}

              {/* Hotels */}
              {searchType === "hotels" && (
                <div className="grid gap-3 md:grid-cols-4">
                  {/* Destination */}
                  <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 transition focus-within:border-emerald-500 focus-within:bg-white">
                    <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                      Destination
                    </p>

                    <input
                      type="text"
                      placeholder="Pokhara"
                      className="mt-1 w-full bg-transparent text-base font-semibold text-slate-800 outline-none placeholder:text-slate-400"
                    />

                    <p className="mt-1 text-xs text-slate-400">
                      Where are you staying?
                    </p>
                  </div>

                  {/* Check In */}
                  <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 transition focus-within:border-emerald-500 focus-within:bg-white">
                    <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                      Check-in
                    </p>

                    <input
                      type="date"
                      className="mt-1 w-full bg-transparent text-base font-semibold text-slate-800 outline-none"
                    />

                    <p className="mt-1 text-xs text-slate-400">
                      Select date
                    </p>
                  </div>

                  {/* Check Out */}
                  <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 transition focus-within:border-emerald-500 focus-within:bg-white">
                    <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                      Check-out
                    </p>

                    <input
                      type="date"
                      className="mt-1 w-full bg-transparent text-base font-semibold text-slate-800 outline-none"
                    />

                    <p className="mt-1 text-xs text-slate-400">
                      Select date
                    </p>
                  </div>

                  {/* Search */}
                  <Link
                    to="/login"
                    className="flex min-h-[72px] items-center justify-center rounded-2xl bg-emerald-600 px-6 font-bold text-white shadow-lg shadow-emerald-600/20 transition hover:bg-emerald-700 hover:shadow-xl active:scale-[0.98] md:min-h-[88px]"
                  >
                    Search Hotels
                  </Link>
                </div>
              )}

              {/* Bus */}
              {searchType === "bus" && (
                <div className="grid gap-3 md:grid-cols-4">
                  {/* From */}
                  <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 transition focus-within:border-emerald-500 focus-within:bg-white">
                    <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                      From
                    </p>

                    <input
                      type="text"
                      placeholder="Kathmandu"
                      className="mt-1 w-full bg-transparent text-base font-semibold text-slate-800 outline-none placeholder:text-slate-400"
                    />

                    <p className="mt-1 text-xs text-slate-400">
                      Departure city
                    </p>
                  </div>

                  {/* To */}
                  <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 transition focus-within:border-emerald-500 focus-within:bg-white">
                    <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                      To
                    </p>

                    <input
                      type="text"
                      placeholder="Pokhara"
                      className="mt-1 w-full bg-transparent text-base font-semibold text-slate-800 outline-none placeholder:text-slate-400"
                    />

                    <p className="mt-1 text-xs text-slate-400">
                      Arrival city
                    </p>
                  </div>

                  {/* Date */}
                  <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 transition focus-within:border-emerald-500 focus-within:bg-white">
                    <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                      Travel Date
                    </p>

                    <input
                      type="date"
                      className="mt-1 w-full bg-transparent text-base font-semibold text-slate-800 outline-none"
                    />

                    <p className="mt-1 text-xs text-slate-400">
                      Select date
                    </p>
                  </div>

                  {/* Search */}
                  <Link
                    to="/login"
                    className="flex min-h-[72px] items-center justify-center rounded-2xl bg-emerald-600 px-6 font-bold text-white shadow-lg shadow-emerald-600/20 transition hover:bg-emerald-700 hover:shadow-xl active:scale-[0.98] md:min-h-[88px]"
                  >
                    Search Buses
                  </Link>
                </div>
              )}

              {/* Experiences */}
              {searchType === "experiences" && (
                <div className="grid gap-3 md:grid-cols-3">
                  {/* Destination */}
                  <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 transition focus-within:border-emerald-500 focus-within:bg-white">
                    <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                      Destination
                    </p>

                    <input
                      type="text"
                      placeholder="Where do you want to explore?"
                      className="mt-1 w-full bg-transparent text-base font-semibold text-slate-800 outline-none placeholder:text-slate-400"
                    />
                  </div>

                  {/* Experience */}
                  <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 transition focus-within:border-emerald-500 focus-within:bg-white">
                    <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                      Experience
                    </p>

                    <select className="mt-1 w-full bg-transparent text-base font-semibold text-slate-800 outline-none">
                      <option>Adventure</option>
                      <option>Trekking</option>
                      <option>Culture</option>
                      <option>Food</option>
                      <option>Nature</option>
                      <option>Family</option>
                    </select>
                  </div>

                  {/* Search */}
                  <Link
                    to="/login"
                    className="flex min-h-[72px] items-center justify-center rounded-2xl bg-emerald-600 px-6 font-bold text-white shadow-lg shadow-emerald-600/20 transition hover:bg-emerald-700 hover:shadow-xl active:scale-[0.98] md:min-h-[88px]"
                  >
                    Explore Experiences
                  </Link>
                </div>
              )}
            </div>
          </div>

          {/* Popular Destinations */}
          <div className="mt-6 flex flex-wrap items-center gap-2.5 sm:mt-7 sm:gap-3">
            <span className="w-full text-sm font-medium text-white/70 sm:w-auto">
              Popular:
            </span>

            <Link
              to="/login"
              className="rounded-full border border-white/30 bg-white/10 px-3.5 py-2 text-sm text-white backdrop-blur-md transition hover:bg-white/20 active:scale-95 sm:px-4"
            >
              Pokhara
            </Link>

            <Link
              to="/login"
              className="rounded-full border border-white/30 bg-white/10 px-3.5 py-2 text-sm text-white backdrop-blur-md transition hover:bg-white/20 active:scale-95 sm:px-4"
            >
              Mustang
            </Link>

            <Link
              to="/login"
              className="rounded-full border border-white/30 bg-white/10 px-3.5 py-2 text-sm text-white backdrop-blur-md transition hover:bg-white/20 active:scale-95 sm:px-4"
            >
              Chitwan
            </Link>

            <Link
              to="/login"
              className="rounded-full border border-white/30 bg-white/10 px-3.5 py-2 text-sm text-white backdrop-blur-md transition hover:bg-white/20 active:scale-95 sm:px-4"
            >
              Kathmandu
            </Link>
          </div>

          {/* AI Chat */}
          <div className="mt-6 sm:mt-8">
            <Link
              to="/ai"
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