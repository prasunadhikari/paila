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
    <div className="min-h-screen bg-slate-50 text-slate-900">

      {/* =========================
          Navigation
      ========================== */}
      <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/90 backdrop-blur-xl">
        <nav className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 sm:px-6 lg:px-8">

          {/* Logo */}
          <Link to="/" className="group flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500 shadow-lg shadow-emerald-500/20 transition group-hover:scale-105">
              <MapPin className="h-5 w-5 text-white" />
            </div>

            <div>
              <span className="block text-xl font-extrabold tracking-tight text-slate-900">
                Paila
              </span>

              <span className="hidden text-[10px] font-medium text-slate-400 sm:block">
                EVERY JOURNEY STARTS WITH A STEP
              </span>
            </div>
          </Link>

          {/* Navigation */}
          <div className="hidden items-center gap-8 md:flex">
            <Link
              to="/dashboard"
              className="font-medium text-emerald-600"
            >
              Home
            </Link>

            <Link
              to="/destinations"
              className="font-medium text-slate-500 transition hover:text-slate-900"
            >
              Destinations
            </Link>

            <Link
              to="/ai"
              className="font-medium text-slate-500 transition hover:text-slate-900"
            >
              Plan a Trip
            </Link>
          </div>

          {/* User */}
          <div className="flex items-center gap-3">
            <div className="hidden text-right sm:block">
              <p className="text-sm font-semibold text-slate-900">
                {user?.name}
              </p>

              <p className="text-xs text-slate-400">
                Traveler
              </p>
            </div>

            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-100 text-sm font-bold text-emerald-700 ring-4 ring-emerald-50">
              {firstName.charAt(0).toUpperCase()}
            </div>
          </div>
        </nav>
      </header>

      {/* =========================
          Main
      ========================== */}
      <main>

        {/* Hero */}
        <section className="border-b border-slate-200 bg-white">
          <div className="mx-auto max-w-7xl px-5 pb-12 pt-12 sm:px-6 lg:px-8 lg:pb-16 lg:pt-16">

            <div className="grid items-center gap-10 lg:grid-cols-[1.15fr_0.85fr]">

              {/* Welcome */}
              <div>
                <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-emerald-100 bg-emerald-50 px-3.5 py-2 text-xs font-semibold text-emerald-700">
                  <Sparkles className="h-3.5 w-3.5" />
                  Your Nepal adventure starts here
                </div>

                <h1 className="max-w-2xl text-4xl font-extrabold tracking-tight text-slate-950 sm:text-5xl lg:text-6xl">
                  Welcome back,{" "}
                  <span className="text-emerald-500">
                    {firstName}
                  </span>
                  .
                </h1>

                <p className="mt-5 max-w-xl text-base leading-7 text-slate-500 sm:text-lg">
                  Discover beautiful places, plan unforgettable journeys,
                  and explore Nepal one step at a time.
                </p>

                {/* Search */}
                <div className="mt-8 flex max-w-2xl flex-col gap-3 sm:flex-row">
                  <div className="flex flex-1 items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3.5 shadow-sm">
                    <Search className="h-5 w-5 shrink-0 text-slate-400" />

                    <input
                      type="text"
                      placeholder="Where do you want to go?"
                      className="w-full bg-transparent text-sm text-slate-900 outline-none placeholder:text-slate-400"
                    />
                  </div>

                  <Link
                    to="/destinations"
                    className="inline-flex items-center justify-center gap-2 rounded-2xl bg-emerald-500 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-emerald-500/20 transition hover:-translate-y-0.5 hover:bg-emerald-600"
                  >
                    Explore
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>

              {/* Stats / Quick Actions */}
              <div className="grid grid-cols-2 gap-4">

                <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-100">
                    <Compass className="h-5 w-5 text-emerald-600" />
                  </div>

                  <p className="mt-6 text-3xl font-bold text-slate-900">
                    77
                  </p>

                  <p className="mt-1 text-sm text-slate-500">
                    Districts to explore
                  </p>
                </div>

                <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-amber-100">
                    <Star className="h-5 w-5 text-amber-600" />
                  </div>

                  <p className="mt-6 text-3xl font-bold text-slate-900">
                    8
                  </p>

                  <p className="mt-1 text-sm text-slate-500">
                    Featured places
                  </p>
                </div>

                <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-100">
                    <Map className="h-5 w-5 text-blue-600" />
                  </div>

                  <p className="mt-6 text-3xl font-bold text-slate-900">
                    1
                  </p>

                  <p className="mt-1 text-sm text-slate-500">
                    Country. Endless stories.
                  </p>
                </div>

                <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-rose-100">
                    <Heart className="h-5 w-5 text-rose-500" />
                  </div>

                  <p className="mt-6 text-3xl font-bold text-slate-900">
                    Nepal
                  </p>

                  <p className="mt-1 text-sm text-slate-500">
                    Made for explorers
                  </p>
                </div>

              </div>
            </div>
          </div>
        </section>

        {/* Popular Destinations */}
        <section className="mx-auto max-w-7xl px-5 py-14 sm:px-6 lg:px-8 lg:py-20">

          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">

            <div>
              <p className="text-sm font-semibold uppercase tracking-wider text-emerald-600">
                Discover Nepal
              </p>

              <h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
                Places worth exploring
              </h2>

              <p className="mt-3 max-w-xl text-slate-500">
                From peaceful lakes to dramatic Himalayan landscapes,
                discover some of Nepal's most unforgettable destinations.
              </p>
            </div>

            <Link
              to="/destinations"
              className="inline-flex items-center gap-2 text-sm font-semibold text-emerald-600 transition hover:text-emerald-700"
            >
              View all destinations
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          {/* Cards */}
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">

            {destinations.map((destination) => (
              <Link
                key={destination.name}
                to={`/destinations/${destination.name.toLowerCase()}`}
                className="group overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl"
              >

                <div className="relative aspect-[4/3] overflow-hidden">
                  <img
                    src={destination.image}
                    alt={destination.name}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

                  <div className="absolute bottom-4 left-4 flex items-center gap-1.5 text-xs font-medium text-white">
                    <MapPin className="h-3.5 w-3.5" />
                    {destination.location}
                  </div>
                </div>

                <div className="p-5">
                  <h3 className="text-lg font-bold text-slate-900">
                    {destination.name}
                  </h3>

                  <p className="mt-1 text-sm leading-5 text-slate-500">
                    {destination.description}
                  </p>

                  <div className="mt-4 flex items-center gap-2 text-sm font-semibold text-emerald-600">
                    Explore
                    <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                  </div>
                </div>

              </Link>
            ))}

          </div>
        </section>

        {/* Plan Trip CTA */}
        <section className="mx-auto max-w-7xl px-5 pb-16 sm:px-6 lg:px-8 lg:pb-20">

          <div className="overflow-hidden rounded-[2rem] bg-slate-950">

            <div className="grid items-center lg:grid-cols-[1fr_auto]">

              <div className="p-8 sm:p-10 lg:p-14">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-500/15 ring-1 ring-emerald-400/20">
                  <Wallet className="h-6 w-6 text-emerald-400" />
                </div>

                <h2 className="mt-6 max-w-xl text-3xl font-bold tracking-tight text-white sm:text-4xl">
                  Ready to plan your next adventure?
                </h2>

                <p className="mt-4 max-w-xl text-sm leading-6 text-slate-400 sm:text-base">
                  Tell Paila where you want to go, what you love doing,
                  and how much you want to spend. Your journey starts with
                  a single step.
                </p>

                <Link
                  to="/ai"
                  className="mt-7 inline-flex items-center gap-2 rounded-xl bg-emerald-500 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-emerald-950/40 transition hover:bg-emerald-600"
                >
                  Plan a Trip
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>

              <div className="hidden px-10 lg:block">
                <div className="flex h-44 w-44 items-center justify-center rounded-full border border-emerald-400/20 bg-emerald-400/5">
                  <div className="flex h-28 w-28 items-center justify-center rounded-full border border-emerald-400/20 bg-emerald-400/10">
                    <Compass className="h-12 w-12 text-emerald-400" />
                  </div>
                </div>
              </div>

            </div>
          </div>

        </section>

      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-5 py-6 text-center sm:flex-row sm:px-6 sm:text-left lg:px-8">
          <p className="text-sm text-slate-400">
            © {new Date().getFullYear()} Paila. Made for Nepal.
          </p>

          <p className="text-sm text-slate-400">
            Every journey starts with a step. 🇳🇵
          </p>
        </div>
      </footer>

    </div>
  );
}