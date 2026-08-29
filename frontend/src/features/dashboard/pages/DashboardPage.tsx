import {
  ArrowRight,
  Compass,
  Heart,
  Map,
  MapPin,
  Search,
  Sparkles,
  Star,
  Wallet,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";
import Sidebar from "../../../components/layout/Sidebar";

import pokharaImage from "../../../assets/destinations/pokhara.jpg";
import mustangImage from "../../../assets/destinations/mustang.jpg";
import chitwanImage from "../../../assets/destinations/chitwan.jpg";
import everestImage from "../../../assets/destinations/everest.jpg";

const destinations = [
  {
    name: "Pokhara",
    location: "Gandaki Province",
    image: pokharaImage,
    description: "Lakes, mountains & peaceful escapes",
  },
  {
    name: "Mustang",
    location: "Gandaki Province",
    image: mustangImage,
    description: "Wild landscapes & Himalayan adventure",
  },
  {
    name: "Chitwan",
    location: "Bagmati Province",
    image: chitwanImage,
    description: "Jungle, wildlife & unforgettable moments",
  },
  {
    name: "Everest",
    location: "Solukhumbu",
    image: everestImage,
    description: "The world's highest mountain",
  },
];

export default function DashboardPage() {
  const { user } = useAuth();

  const firstName = user?.name?.split(" ")[0] || "Traveler";

  return (
    <div className="min-h-screen bg-[#f8f8f6] text-slate-900">
      {/* =====================================================
          SIDEBAR
      ====================================================== */}
      <Sidebar />

      {/* =====================================================
          MAIN CONTENT
      ====================================================== */}
      <div className="min-w-0 lg:ml-64">
        <main>
          {/* =====================================================
              HERO / WELCOME
          ====================================================== */}
          <section className="relative overflow-hidden bg-white pt-24 lg:pt-0">
            {/* Decorative background */}
            <div className="pointer-events-none absolute -right-32 -top-32 h-72 w-72 rounded-full bg-emerald-100/60 blur-3xl sm:h-96 sm:w-96" />

            <div className="pointer-events-none absolute -bottom-40 left-1/3 h-72 w-72 rounded-full bg-amber-50 blur-3xl sm:h-80 sm:w-80" />

            <div className="relative mx-auto max-w-7xl px-4 pb-12 pt-8 sm:px-6 sm:pb-14 sm:pt-10 lg:px-10 lg:pb-16 lg:pt-16">
              <div className="grid items-center gap-10 lg:grid-cols-[1fr_0.8fr] lg:gap-14">
                {/* =================================================
                    LEFT CONTENT
                ================================================== */}
                <div className="min-w-0">
                  {/* Badge */}
                  <div className="mb-5 flex items-center gap-2 text-sm font-semibold text-emerald-600 sm:mb-6">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-emerald-50">
                      <Sparkles className="h-4 w-4" />
                    </span>

                    <span>Discover Nepal, your way</span>
                  </div>

                  {/* Heading */}
                  <h1 className="max-w-3xl text-4xl font-bold leading-[1.08] tracking-[-0.04em] text-slate-950 sm:text-5xl lg:text-6xl">
                    Welcome back,{" "}
                    <span className="text-emerald-500">{firstName}</span>
                  </h1>

                  {/* Description */}
                  <p className="mt-5 max-w-xl text-sm leading-6 text-slate-500 sm:mt-6 sm:text-base sm:leading-7 lg:text-lg">
                    Find your next destination, discover places worth seeing,
                    and make every journey across Nepal memorable.
                  </p>

                  {/* =================================================
                      SEARCH
                  ================================================== */}
                  <div className="mt-7 flex w-full max-w-2xl flex-col gap-1.5 rounded-2xl border border-slate-200 bg-white p-1.5 shadow-[0_8px_30px_rgba(15,23,42,0.06)] sm:mt-8 sm:flex-row sm:items-center">
                    <div className="flex min-w-0 flex-1 items-center gap-3 px-3 sm:px-4">
                      <Search className="h-5 w-5 shrink-0 text-slate-400" />

                      <input
                        type="text"
                        placeholder="Search a destination..."
                        className="w-full min-w-0 bg-transparent py-3 text-sm text-slate-900 outline-none placeholder:text-slate-400"
                      />
                    </div>

                    <Link
                      to="/destinations"
                      className="inline-flex min-h-[48px] w-full shrink-0 items-center justify-center gap-2 rounded-xl bg-emerald-500 px-5 py-3 text-sm font-semibold text-white transition-all duration-200 hover:bg-emerald-600 active:scale-[0.98] sm:w-auto"
                    >
                      Explore
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                </div>

                {/* =================================================
                    RIGHT VISUAL
                ================================================== */}
                <div className="relative hidden lg:block">
                  <div className="relative mx-auto h-[330px] max-w-[390px] overflow-hidden rounded-[2rem] shadow-2xl shadow-slate-900/10">
                    <img
                      src={pokharaImage}
                      alt="Pokhara, Nepal"
                      className="h-full w-full object-cover"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/5 to-transparent" />

                    <div className="absolute bottom-6 left-6 right-6">
                      <div className="flex items-center gap-2 text-xs font-medium text-white/80">
                        <MapPin className="h-3.5 w-3.5" />
                        Gandaki Province
                      </div>

                      <h2 className="mt-1 text-3xl font-bold text-white">
                        Pokhara
                      </h2>

                      <p className="mt-1 text-sm text-white/75">
                        Lakes, mountains & peaceful escapes
                      </p>
                    </div>

                    {/* Floating badge */}
                    <div className="absolute right-5 top-5 flex items-center gap-2 rounded-full border border-white/20 bg-white/15 px-3 py-2 text-xs font-semibold text-white backdrop-blur-md">
                      <Star className="h-3.5 w-3.5 fill-current" />
                      Featured
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* =====================================================
              QUICK STATS
          ====================================================== */}
          <section className="border-b border-slate-200 bg-white">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
              <div className="grid grid-cols-2 divide-x divide-slate-200 md:grid-cols-4">
                {/* Stat 1 */}
                <div className="flex min-w-0 items-center gap-3 px-3 py-5 sm:gap-4 sm:px-4 sm:py-7 md:first:pl-0">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-50 sm:h-11 sm:w-11">
                    <Compass className="h-5 w-5 text-emerald-600" />
                  </div>

                  <div className="min-w-0">
                    <p className="text-xl font-bold text-slate-900 sm:text-2xl">
                      77
                    </p>

                    <p className="text-[11px] leading-4 text-slate-500 sm:text-xs">
                      Districts to explore
                    </p>
                  </div>
                </div>

                {/* Stat 2 */}
                <div className="flex min-w-0 items-center gap-3 px-3 py-5 sm:gap-4 sm:px-4 sm:py-7">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-50 sm:h-11 sm:w-11">
                    <Star className="h-5 w-5 text-amber-500" />
                  </div>

                  <div className="min-w-0">
                    <p className="text-xl font-bold text-slate-900 sm:text-2xl">
                      8
                    </p>

                    <p className="text-[11px] leading-4 text-slate-500 sm:text-xs">
                      Featured destinations
                    </p>
                  </div>
                </div>

                {/* Stat 3 */}
                <div className="flex min-w-0 items-center gap-3 px-3 py-5 sm:gap-4 sm:px-4 sm:py-7">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 sm:h-11 sm:w-11">
                    <Map className="h-5 w-5 text-blue-500" />
                  </div>

                  <div className="min-w-0">
                    <p className="text-xl font-bold text-slate-900 sm:text-2xl">
                      1
                    </p>

                    <p className="text-[11px] leading-4 text-slate-500 sm:text-xs">
                      Country to discover
                    </p>
                  </div>
                </div>

                {/* Stat 4 */}
                <div className="flex min-w-0 items-center gap-3 px-3 py-5 sm:gap-4 sm:px-4 sm:py-7 md:last:pr-0">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-rose-50 sm:h-11 sm:w-11">
                    <Heart className="h-5 w-5 text-rose-500" />
                  </div>

                  <div className="min-w-0">
                    <p className="truncate text-xl font-bold text-slate-900 sm:text-2xl">
                      Nepal
                    </p>

                    <p className="text-[11px] leading-4 text-slate-500 sm:text-xs">
                      Made for explorers
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* =====================================================
              DESTINATIONS
          ====================================================== */}
          <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-10 lg:py-20">
            {/* Heading */}
            <div className="flex items-end justify-between gap-6">
              <div className="min-w-0">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-emerald-600">
                  Explore Nepal
                </p>

                <h2 className="mt-2 text-2xl font-bold tracking-tight text-slate-950 sm:mt-3 sm:text-3xl lg:text-4xl">
                  Places worth the journey
                </h2>

                <p className="mt-3 max-w-xl text-sm leading-6 text-slate-500">
                  From peaceful lakes and lush jungles to dramatic Himalayan
                  landscapes, discover somewhere new.
                </p>
              </div>

              {/* Desktop View All */}
              <Link
                to="/destinations"
                className="hidden shrink-0 items-center gap-2 text-sm font-semibold text-slate-700 transition hover:text-emerald-600 sm:flex"
              >
                View all
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            {/* Destination Grid */}
            <div className="mt-8 grid gap-4 sm:mt-10 sm:grid-cols-2 sm:gap-5 lg:grid-cols-4">
              {destinations.map((destination) => (
                <Link
                  key={destination.name}
                  to={`/destinations/${destination.name.toLowerCase()}`}
                  className="group"
                >
                  <div className="relative aspect-[4/5] overflow-hidden rounded-[1.5rem] bg-slate-200 sm:aspect-[3/4]">
                    <img
                      src={destination.image}
                      alt={destination.name}
                      loading="lazy"
                      className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                    />

                    {/* Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />

                    {/* Location */}
                    <div className="absolute left-4 top-4 flex max-w-[calc(100%-2rem)] items-center gap-1.5 rounded-full bg-black/20 px-3 py-1.5 text-[10px] font-medium text-white backdrop-blur-sm sm:left-5 sm:top-5 sm:text-[11px]">
                      <MapPin className="h-3 w-3 shrink-0" />
                      <span className="truncate">
                        {destination.location}
                      </span>
                    </div>

                    {/* Content */}
                    <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-5">
                      <h3 className="text-xl font-bold text-white sm:text-2xl">
                        {destination.name}
                      </h3>

                      <p className="mt-1.5 text-xs leading-5 text-white/75">
                        {destination.description}
                      </p>

                      <div className="mt-3 flex items-center gap-2 text-xs font-semibold text-white sm:mt-4">
                        Explore destination

                        <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-1" />
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {/* Mobile View All */}
            <Link
              to="/destinations"
              className="mt-6 flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-emerald-600 shadow-sm transition hover:bg-emerald-50 sm:hidden"
            >
              View all destinations
              <ArrowRight className="h-4 w-4" />
            </Link>
          </section>

          {/* =====================================================
              PLAN YOUR TRIP
          ====================================================== */}
          <section className="mx-auto max-w-7xl px-4 pb-12 sm:px-6 sm:pb-16 lg:px-10 lg:pb-20">
            <div className="relative overflow-hidden rounded-[1.5rem] bg-slate-900 sm:rounded-[2rem]">
              {/* Decorative circles */}
              <div className="absolute -right-20 -top-32 h-72 w-72 rounded-full bg-emerald-500/10 blur-2xl sm:h-80 sm:w-80" />

              <div className="absolute -bottom-40 left-1/3 h-72 w-72 rounded-full bg-emerald-500/10 blur-2xl sm:h-80 sm:w-80" />

              <div className="relative flex flex-col items-start gap-8 px-6 py-8 sm:px-10 sm:py-10 lg:flex-row lg:items-center lg:justify-between lg:gap-10 lg:px-14 lg:py-12">
                <div className="max-w-2xl">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-500/10">
                    <Wallet className="h-5 w-5 text-emerald-400" />
                  </div>

                  <h2 className="mt-5 text-2xl font-bold tracking-tight text-white sm:text-3xl">
                    Your next journey starts here.
                  </h2>

                  <p className="mt-3 max-w-xl text-sm leading-6 text-slate-400">
                    Explore destinations, discover new experiences, and let
                    Paila help you find your way around Nepal.
                  </p>
                </div>

                <Link
                  to="/ai"
                  className="inline-flex min-h-[50px] w-full shrink-0 items-center justify-center gap-2 rounded-xl bg-emerald-500 px-6 py-3.5 text-sm font-semibold text-white transition-all duration-200 hover:bg-emerald-600 active:scale-[0.98] sm:w-auto"
                >
                  Plan a Trip
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </section>
        </main>

        {/* =====================================================
            FOOTER
        ====================================================== */}
        <footer className="border-t border-slate-200 bg-white">
          <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-4 py-6 text-center sm:flex-row sm:px-6 sm:py-7 sm:text-left lg:px-10">
            <p className="text-xs text-slate-400 sm:text-sm">
              © {new Date().getFullYear()} Paila. Made for Nepal.
            </p>

            <p className="text-xs text-slate-400 sm:text-sm">
              Every journey starts with a step. 🇳🇵
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
}