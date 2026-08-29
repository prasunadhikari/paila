
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
      <Sidebar />

      <div className="ml-64">
        <main>
          {/* =====================================================
              HERO / WELCOME
          ====================================================== */}
          <section className="relative overflow-hidden bg-white">
            {/* Decorative background */}
            <div className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full bg-emerald-100/60 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-40 left-1/3 h-80 w-80 rounded-full bg-amber-50 blur-3xl" />

            <div className="relative mx-auto max-w-7xl px-8 pb-14 pt-14 lg:px-10 lg:pb-16 lg:pt-16">
              <div className="grid items-center gap-14 lg:grid-cols-[1fr_0.8fr]">
                {/* Left */}
                <div>
                  <div className="mb-6 flex items-center gap-2 text-sm font-semibold text-emerald-600">
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-50">
                      <Sparkles className="h-4 w-4" />
                    </span>

                    Discover Nepal, your way
                  </div>

                  <h1 className="max-w-3xl text-5xl font-bold leading-[1.08] tracking-[-0.04em] text-slate-950 lg:text-6xl">
                    Welcome back,{" "}
                    <span className="text-emerald-500">{firstName}</span>
                  </h1>

                  <p className="mt-6 max-w-xl text-base leading-7 text-slate-500 lg:text-lg">
                    Find your next destination, discover places worth seeing,
                    and make every journey across Nepal memorable.
                  </p>

                  {/* Search */}
                  <div className="mt-8 flex max-w-2xl items-center rounded-2xl border border-slate-200 bg-white p-1.5 shadow-[0_8px_30px_rgba(15,23,42,0.06)]">
                    <div className="flex min-w-0 flex-1 items-center gap-3 px-4">
                      <Search className="h-5 w-5 shrink-0 text-slate-400" />

                      <input
                        type="text"
                        placeholder="Search a destination..."
                        className="w-full bg-transparent py-3 text-sm text-slate-900 outline-none placeholder:text-slate-400"
                      />
                    </div>

                    <Link
                      to="/destinations"
                      className="inline-flex shrink-0 items-center gap-2 rounded-xl bg-emerald-500 px-5 py-3 text-sm font-semibold text-white transition-all duration-200 hover:bg-emerald-600"
                    >
                      Explore
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                </div>

                {/* Right visual */}
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
            <div className="mx-auto max-w-7xl px-8 lg:px-10">
              <div className="grid grid-cols-2 divide-x divide-slate-200 md:grid-cols-4">
                {/* Stat */}
                <div className="flex items-center gap-4 px-4 py-7 first:pl-0">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-emerald-50">
                    <Compass className="h-5 w-5 text-emerald-600" />
                  </div>

                  <div>
                    <p className="text-2xl font-bold text-slate-900">77</p>
                    <p className="text-xs text-slate-500">
                      Districts to explore
                    </p>
                  </div>
                </div>

                {/* Stat */}
                <div className="flex items-center gap-4 px-4 py-7">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-amber-50">
                    <Star className="h-5 w-5 text-amber-500" />
                  </div>

                  <div>
                    <p className="text-2xl font-bold text-slate-900">8</p>
                    <p className="text-xs text-slate-500">
                      Featured destinations
                    </p>
                  </div>
                </div>

                {/* Stat */}
                <div className="flex items-center gap-4 px-4 py-7">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-50">
                    <Map className="h-5 w-5 text-blue-500" />
                  </div>

                  <div>
                    <p className="text-2xl font-bold text-slate-900">1</p>
                    <p className="text-xs text-slate-500">
                      Country to discover
                    </p>
                  </div>
                </div>

                {/* Stat */}
                <div className="flex items-center gap-4 px-4 py-7 last:pr-0">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-rose-50">
                    <Heart className="h-5 w-5 text-rose-500" />
                  </div>

                  <div>
                    <p className="text-2xl font-bold text-slate-900">Nepal</p>
                    <p className="text-xs text-slate-500">
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
          <section className="mx-auto max-w-7xl px-8 py-16 lg:px-10 lg:py-20">
            {/* Heading */}
            <div className="flex items-end justify-between gap-6">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-emerald-600">
                  Explore Nepal
                </p>

                <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-950 lg:text-4xl">
                  Places worth the journey
                </h2>

                <p className="mt-3 max-w-xl text-sm leading-6 text-slate-500">
                  From peaceful lakes and lush jungles to dramatic Himalayan
                  landscapes, discover somewhere new.
                </p>
              </div>

              <Link
                to="/destinations"
                className="hidden items-center gap-2 text-sm font-semibold text-slate-700 transition hover:text-emerald-600 sm:flex"
              >
                View all
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            {/* Destination Grid */}
            <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {destinations.map((destination) => (
                <Link
                  key={destination.name}
                  to={`/destinations/${destination.name.toLowerCase()}`}
                  className="group"
                >
                  <div className="relative aspect-[3/4] overflow-hidden rounded-[1.5rem] bg-slate-200">
                    <img
                      src={destination.image}
                      alt={destination.name}
                      className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                    />

                    {/* Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />

                    {/* Location */}
                    <div className="absolute left-5 top-5 flex items-center gap-1.5 rounded-full bg-black/20 px-3 py-1.5 text-[11px] font-medium text-white backdrop-blur-sm">
                      <MapPin className="h-3 w-3" />
                      {destination.location}
                    </div>

                    {/* Content */}
                    <div className="absolute bottom-0 left-0 right-0 p-5">
                      <h3 className="text-2xl font-bold text-white">
                        {destination.name}
                      </h3>

                      <p className="mt-1.5 text-xs leading-5 text-white/75">
                        {destination.description}
                      </p>

                      <div className="mt-4 flex items-center gap-2 text-xs font-semibold text-white">
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
              className="mt-6 flex items-center justify-center gap-2 text-sm font-semibold text-emerald-600 sm:hidden"
            >
              View all destinations
              <ArrowRight className="h-4 w-4" />
            </Link>
          </section>

          {/* =====================================================
              PLAN YOUR TRIP
          ====================================================== */}
          <section className="mx-auto max-w-7xl px-8 pb-16 lg:px-10 lg:pb-20">
            <div className="relative overflow-hidden rounded-[2rem] bg-slate-900">
              {/* Decorative circles */}
              <div className="absolute -right-20 -top-32 h-80 w-80 rounded-full bg-emerald-500/10 blur-2xl" />
              <div className="absolute -bottom-40 left-1/3 h-80 w-80 rounded-full bg-emerald-500/10 blur-2xl" />

              <div className="relative flex flex-col items-start justify-between gap-10 px-8 py-10 sm:px-10 lg:flex-row lg:items-center lg:px-14 lg:py-12">
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
                  className="inline-flex shrink-0 items-center gap-2 rounded-xl bg-emerald-500 px-6 py-3.5 text-sm font-semibold text-white transition-all duration-200 hover:bg-emerald-600"
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
          <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-8 py-7 text-center sm:flex-row sm:text-left lg:px-10">
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