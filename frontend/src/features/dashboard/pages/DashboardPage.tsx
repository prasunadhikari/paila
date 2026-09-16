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
    slug: "pokhara",
    location: "Gandaki Province",
    image: pokharaImage,
    description: "Lakes, mountains & peaceful escapes",
  },
  {
    name: "Mustang",
    slug: "mustang",
    location: "Gandaki Province",
    image: mustangImage,
    description: "Wild landscapes & Himalayan adventure",
  },
  {
    name: "Chitwan",
    slug: "chitwan",
    location: "Bagmati Province",
    image: chitwanImage,
    description: "Jungle, wildlife & unforgettable moments",
  },
  {
    name: "Everest",
    slug: "everest",
    location: "Solukhumbu",
    image: everestImage,
    description: "The world's highest mountain",
  },
];

export default function DashboardPage() {
  const { user } = useAuth();

  const firstName = user?.name?.split(" ")[0] || "Traveler";

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <Sidebar />

      <div className="min-w-0 lg:ml-64">
        <main>
          {/* =====================================================
              WELCOME HERO
          ====================================================== */}

          <section className="relative overflow-hidden bg-white pt-24 lg:pt-0">
            <div className="pointer-events-none absolute -right-40 -top-40 h-96 w-96 rounded-full bg-emerald-100/70 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-40 left-1/3 h-80 w-80 rounded-full bg-cyan-100/40 blur-3xl" />

            <div className="relative mx-auto max-w-7xl px-4 pb-12 pt-8 sm:px-6 sm:pb-16 sm:pt-10 lg:px-10 lg:pb-20 lg:pt-16">
              <div className="grid items-center gap-12 lg:grid-cols-[1fr_0.78fr] lg:gap-16">
                {/* LEFT */}

                <div className="min-w-0">
                  <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-emerald-100 bg-emerald-50 px-3.5 py-2 text-xs font-bold text-emerald-700 sm:mb-6 sm:text-sm">
                    <Sparkles className="h-4 w-4" />
                    Discover Nepal, your way
                  </div>

                  <h1 className="max-w-3xl text-4xl font-black leading-[1.05] tracking-[-0.045em] text-slate-950 sm:text-5xl lg:text-6xl">
                    Welcome back,{" "}
                    <span className="bg-gradient-to-r from-emerald-500 to-cyan-500 bg-clip-text text-transparent">
                      {firstName}
                    </span>
                  </h1>

                  <p className="mt-5 max-w-xl text-sm leading-7 text-slate-500 sm:text-base lg:text-lg">
                    Find your next destination, discover places worth seeing,
                    and make every journey across Nepal memorable.
                  </p>

                  {/* SEARCH */}

                  <div className="mt-7 flex w-full max-w-2xl flex-col gap-2 rounded-2xl border border-slate-200 bg-white p-1.5 shadow-[0_12px_35px_rgba(15,23,42,0.07)] sm:mt-8 sm:flex-row sm:items-center">
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
                      className="group inline-flex min-h-[48px] w-full shrink-0 items-center justify-center gap-2 rounded-xl bg-emerald-600 px-5 py-3 text-sm font-bold text-white shadow-sm transition-all duration-200 hover:bg-emerald-700 hover:shadow-md active:scale-[0.98] sm:w-auto"
                    >
                      Explore
                      <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
                    </Link>
                  </div>

                  {/* Small hint */}

                  <p className="mt-4 text-xs text-slate-400">
                    Explore destinations, experiences and hidden gems across
                    Nepal.
                  </p>
                </div>

                {/* RIGHT VISUAL */}

                <div className="relative hidden lg:block">
                  <div className="absolute -inset-4 rounded-[2.5rem] bg-gradient-to-br from-emerald-100/60 to-cyan-100/40 blur-2xl" />

                  <div className="relative mx-auto h-[370px] max-w-[410px] overflow-hidden rounded-[2rem] bg-slate-200 shadow-2xl shadow-slate-900/10">
                    <img
                      src={pokharaImage}
                      alt="Pokhara, Nepal"
                      className="h-full w-full object-cover transition duration-700 hover:scale-105"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />

                    <div className="absolute right-5 top-5 flex items-center gap-2 rounded-full border border-white/20 bg-white/15 px-3.5 py-2 text-xs font-bold text-white shadow-lg backdrop-blur-md">
                      <Star className="h-3.5 w-3.5 fill-current text-amber-300" />
                      Featured
                    </div>

                    <div className="absolute bottom-6 left-6 right-6">
                      <div className="flex items-center gap-2 text-xs font-medium text-white/80">
                        <MapPin className="h-3.5 w-3.5" />
                        Gandaki Province
                      </div>

                      <h2 className="mt-1 text-3xl font-black text-white">
                        Pokhara
                      </h2>

                      <p className="mt-1 text-sm text-white/75">
                        Lakes, mountains & peaceful escapes
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* =====================================================
              QUICK STATS
          ====================================================== */}

          <section className="border-y border-slate-200 bg-white">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
              <div className="grid grid-cols-2 md:grid-cols-4">
                <DashboardStat
                  icon={<Compass className="h-5 w-5" />}
                  value="77"
                  label="Districts to explore"
                  iconClass="bg-emerald-50 text-emerald-600"
                />

                <DashboardStat
                  icon={<Star className="h-5 w-5" />}
                  value="8"
                  label="Featured destinations"
                  iconClass="bg-amber-50 text-amber-500"
                />

                <DashboardStat
                  icon={<Map className="h-5 w-5" />}
                  value="1"
                  label="Country to discover"
                  iconClass="bg-cyan-50 text-cyan-600"
                />

                <DashboardStat
                  icon={<Heart className="h-5 w-5" />}
                  value="Nepal"
                  label="Made for explorers"
                  iconClass="bg-rose-50 text-rose-500"
                />
              </div>
            </div>
          </section>

          {/* =====================================================
              DESTINATIONS
          ====================================================== */}

          <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-16 lg:px-10 lg:py-20">
            <div className="flex items-end justify-between gap-6">
              <div className="min-w-0">
                <div className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-bold uppercase tracking-[0.16em] text-emerald-700">
                  <Compass className="h-3.5 w-3.5" />
                  Explore Nepal
                </div>

                <h2 className="mt-4 text-2xl font-black tracking-tight text-slate-950 sm:text-3xl lg:text-4xl">
                  Places worth the journey
                </h2>

                <p className="mt-3 max-w-xl text-sm leading-6 text-slate-500 sm:text-base">
                  From peaceful lakes and lush jungles to dramatic Himalayan
                  landscapes, discover somewhere new.
                </p>
              </div>

              <Link
                to="/destinations"
                className="group hidden shrink-0 items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-bold text-slate-700 shadow-sm transition hover:border-emerald-200 hover:text-emerald-600 hover:shadow-md sm:inline-flex"
              >
                View all
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>

            <div className="mt-8 grid gap-5 sm:mt-10 sm:grid-cols-2 lg:grid-cols-4">
              {destinations.map((destination) => (
                <Link
                  key={destination.name}
                  to={`/destinations/${destination.slug}`}
                  className="group"
                >
                  <article className="relative aspect-[4/5] overflow-hidden rounded-[1.5rem] bg-slate-200 shadow-sm transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-xl sm:aspect-[3/4]">
                    <img
                      src={destination.image}
                      alt={destination.name}
                      loading="lazy"
                      className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />

                    <div className="absolute left-4 top-4 flex max-w-[calc(100%-2rem)] items-center gap-1.5 rounded-full border border-white/10 bg-black/20 px-3 py-1.5 text-[10px] font-semibold text-white backdrop-blur-md sm:left-5 sm:top-5 sm:text-[11px]">
                      <MapPin className="h-3 w-3 shrink-0" />
                      <span className="truncate">
                        {destination.location}
                      </span>
                    </div>

                    <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-5">
                      <h3 className="text-xl font-black text-white sm:text-2xl">
                        {destination.name}
                      </h3>

                      <p className="mt-1.5 text-xs leading-5 text-white/75">
                        {destination.description}
                      </p>

                      <div className="mt-4 inline-flex items-center gap-2 text-xs font-bold text-white">
                        Explore destination
                        <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-1" />
                      </div>
                    </div>

                    <div className="absolute bottom-0 left-0 h-1 w-0 bg-emerald-500 transition-all duration-500 group-hover:w-full" />
                  </article>
                </Link>
              ))}
            </div>

            <Link
              to="/destinations"
              className="mt-6 flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-bold text-emerald-600 shadow-sm transition hover:border-emerald-200 hover:bg-emerald-50 sm:hidden"
            >
              View all destinations
              <ArrowRight className="h-4 w-4" />
            </Link>
          </section>

          {/* =====================================================
              PLAN YOUR TRIP
          ====================================================== */}

          <section className="mx-auto max-w-7xl px-4 pb-14 sm:px-6 sm:pb-16 lg:px-10 lg:pb-20">
            <div className="relative overflow-hidden rounded-[1.5rem] bg-slate-950 shadow-xl sm:rounded-[2rem]">
              <div className="pointer-events-none absolute -right-24 -top-32 h-80 w-80 rounded-full bg-emerald-500/15 blur-3xl" />
              <div className="pointer-events-none absolute -bottom-40 left-1/3 h-80 w-80 rounded-full bg-cyan-500/10 blur-3xl" />

              <div className="relative flex flex-col items-start gap-8 px-6 py-9 sm:px-10 sm:py-11 lg:flex-row lg:items-center lg:justify-between lg:px-14 lg:py-12">
                <div className="max-w-2xl">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-500/10 ring-1 ring-emerald-400/10">
                    <Wallet className="h-5 w-5 text-emerald-400" />
                  </div>

                  <h2 className="mt-5 text-2xl font-black tracking-tight text-white sm:text-3xl">
                    Your next journey starts here.
                  </h2>

                  <p className="mt-3 max-w-xl text-sm leading-7 text-slate-400 sm:text-base">
                    Explore destinations, discover new experiences, and let
                    Paila help you find your way around Nepal.
                  </p>
                </div>

                <Link
                  to="/ai"
                  className="group inline-flex min-h-[50px] w-full shrink-0 items-center justify-center gap-2 rounded-xl bg-emerald-500 px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-emerald-500/10 transition-all duration-200 hover:-translate-y-0.5 hover:bg-emerald-400 hover:shadow-xl sm:w-auto"
                >
                  Plan a Trip
                  <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
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
            <p className="text-xs text-slate-500 sm:text-sm">
              © {new Date().getFullYear()}{" "}
              <span className="font-semibold text-slate-700">
                Prasun Adhikari
              </span>
              . All rights reserved.
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

/* =========================================================
   DASHBOARD STAT
========================================================= */

function DashboardStat({
  icon,
  value,
  label,
  iconClass,
}: {
  icon: React.ReactNode;
  value: string;
  label: string;
  iconClass: string;
}) {
  return (
    <div className="flex min-w-0 items-center gap-3 border-r border-slate-200 px-3 py-5 last:border-r-0 sm:gap-4 sm:px-5 sm:py-7 md:px-6">
      <div
        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl sm:h-11 sm:w-11 ${iconClass}`}
      >
        {icon}
      </div>

      <div className="min-w-0">
        <p className="truncate text-xl font-black text-slate-900 sm:text-2xl">
          {value}
        </p>

        <p className="text-[11px] leading-4 text-slate-500 sm:text-xs">
          {label}
        </p>
      </div>
    </div>
  );
}