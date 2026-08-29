
import { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  Compass,
  MapPin,
  Search,
  Sparkles,
} from "lucide-react";

import { destinations } from "../data/destinations";
import Sidebar from "../../../components/layout/Sidebar";

const ITEMS_PER_PAGE = 12;

export default function DestinationsPage() {
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);

  const categories = useMemo<string[]>(() => {
    const uniqueCategories = Array.from(
      new Set(destinations.map((destination) => destination.category))
    ).sort((a, b) => a.localeCompare(b));

    return ["All", ...uniqueCategories];
  }, []);

  const filteredDestinations = useMemo(() => {
    const query = search.toLowerCase().trim();

    return destinations.filter((destination) => {
      const matchesSearch =
        destination.name.toLowerCase().includes(query) ||
        destination.location.toLowerCase().includes(query) ||
        destination.province.toLowerCase().includes(query) ||
        destination.category.toLowerCase().includes(query);

      const matchesCategory =
        category === "All" || destination.category === category;

      return matchesSearch && matchesCategory;
    });
  }, [search, category]);

  const totalPages = Math.ceil(
    filteredDestinations.length / ITEMS_PER_PAGE
  );

  const safePage = Math.min(currentPage, Math.max(totalPages, 1));

  const visibleDestinations = filteredDestinations.slice(
    (safePage - 1) * ITEMS_PER_PAGE,
    safePage * ITEMS_PER_PAGE
  );

  const handleSearch = (value: string) => {
    setSearch(value);
    setCurrentPage(1);
  };

  const handleCategory = (value: string) => {
    setCategory(value);
    setCurrentPage(1);
  };

  const clearFilters = () => {
    setSearch("");
    setCategory("All");
    setCurrentPage(1);
  };

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      {/* =========================================================
          SIDEBAR
      ========================================================== */}
      <Sidebar />

      {/* =========================================================
          PAGE CONTENT
      ========================================================== */}
      <div className="ml-64">
        <main>
          {/* =====================================================
              PAGE HEADER
          ====================================================== */}
          <section className="border-b border-slate-200 bg-white">
            <div className="mx-auto max-w-7xl px-6 pb-12 pt-10 lg:px-8">
              {/* Back */}
              <button
                type="button"
                onClick={handleBack}
                className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-600 shadow-sm transition hover:border-slate-300 hover:bg-slate-50 hover:text-slate-900"
              >
                <ArrowLeft className="h-4 w-4" />
                Back
              </button>

              {/* Heading */}
              <div className="mt-10 max-w-3xl">
                <div className="inline-flex items-center gap-2 rounded-full border border-emerald-100 bg-emerald-50 px-3.5 py-2 text-xs font-semibold text-emerald-700">
                  <Compass className="h-3.5 w-3.5" />
                  Explore Nepal
                </div>

                <h1 className="mt-5 text-4xl font-extrabold tracking-tight text-slate-950 sm:text-5xl lg:text-6xl">
                  Discover places
                  <span className="text-emerald-500"> worth visiting.</span>
                </h1>

                <p className="mt-5 max-w-2xl text-base leading-7 text-slate-500 sm:text-lg">
                  Explore Nepal's mountains, lakes, heritage towns, wildlife
                  destinations and hidden gems — all in one place.
                </p>
              </div>

              {/* Search */}
              <div className="mt-9 flex max-w-4xl flex-col gap-3 sm:flex-row">
                <div className="flex flex-1 items-center rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3.5 shadow-sm transition focus-within:border-emerald-300 focus-within:bg-white focus-within:ring-4 focus-within:ring-emerald-500/10">
                  <Search className="h-5 w-5 shrink-0 text-slate-400" />

                  <input
                    type="text"
                    value={search}
                    onChange={(event) =>
                      handleSearch(event.target.value)
                    }
                    placeholder="Search Pokhara, Mustang, Everest..."
                    className="ml-3 w-full bg-transparent text-sm text-slate-900 outline-none placeholder:text-slate-400"
                  />

                  {search && (
                    <button
                      type="button"
                      onClick={() => handleSearch("")}
                      className="ml-2 rounded-lg px-2 py-1 text-xs font-semibold text-slate-400 transition hover:bg-slate-200 hover:text-slate-700"
                    >
                      Clear
                    </button>
                  )}
                </div>

                <div className="flex items-center justify-center rounded-2xl border border-slate-200 bg-white px-6 py-3.5 shadow-sm">
                  <span className="text-sm font-semibold text-slate-900">
                    {filteredDestinations.length}
                  </span>

                  <span className="ml-1.5 text-sm text-slate-500">
                    {filteredDestinations.length === 1
                      ? "destination"
                      : "destinations"}
                  </span>
                </div>
              </div>
            </div>
          </section>

          {/* =====================================================
              CATEGORY FILTERS
          ====================================================== */}
          <section className="border-b border-slate-200 bg-white">
            <div className="mx-auto max-w-7xl px-6 py-5 lg:px-8">
              <div className="flex items-center gap-3 overflow-x-auto pb-1">
                <span className="mr-1 shrink-0 text-sm font-semibold text-slate-500">
                  Explore by:
                </span>

                {categories.map((item) => {
                  const active = category === item;

                  return (
                    <button
                      key={item}
                      type="button"
                      onClick={() => handleCategory(item)}
                      className={`shrink-0 rounded-xl px-4 py-2.5 text-sm font-semibold transition ${
                        active
                          ? "bg-emerald-500 text-white shadow-md shadow-emerald-500/20"
                          : "bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900"
                      }`}
                    >
                      {item}
                    </button>
                  );
                })}
              </div>
            </div>
          </section>

          {/* =====================================================
              DESTINATIONS
          ====================================================== */}
          <section className="mx-auto max-w-7xl px-6 py-14 lg:px-8 lg:py-16">
            {/* Section Heading */}
            <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-emerald-600">
                  Start Exploring
                </p>

                <h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
                  Popular destinations
                </h2>
              </div>

              <p className="max-w-md text-sm leading-6 text-slate-500 sm:text-right">
                {filteredDestinations.length > 0
                  ? `${filteredDestinations.length} ${
                      filteredDestinations.length === 1
                        ? "destination"
                        : "destinations"
                    } available to explore.`
                  : "No destinations match your search."}
              </p>
            </div>

            {/* =================================================
                NO RESULTS
            ================================================== */}
            {visibleDestinations.length === 0 && (
              <div className="mt-10 rounded-3xl border border-slate-200 bg-white px-6 py-20 text-center shadow-sm">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-50">
                  <Search className="h-7 w-7 text-emerald-500" />
                </div>

                <h3 className="mt-5 text-2xl font-bold text-slate-900">
                  No destinations found
                </h3>

                <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">
                  Try searching for another destination or choose a different
                  category.
                </p>

                <button
                  type="button"
                  onClick={clearFilters}
                  className="mt-6 inline-flex items-center gap-2 rounded-xl bg-emerald-500 px-5 py-3 text-sm font-semibold text-white shadow-md shadow-emerald-500/20 transition hover:bg-emerald-600"
                >
                  Clear filters
                </button>
              </div>
            )}

            {/* =================================================
                DESTINATION CARDS
            ================================================== */}
            {visibleDestinations.length > 0 && (
              <div className="mt-9 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {visibleDestinations.map((destination) => (
                  <Link
                    key={destination.slug}
                    to={`/destinations/${destination.slug}`}
                    className="group overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:border-slate-300 hover:shadow-xl"
                  >
                    {/* Image */}
                    <div className="relative aspect-[4/3] overflow-hidden bg-slate-200">
                      <img
                        src={destination.image}
                        alt={`${destination.name}, Nepal`}
                        loading="lazy"
                        className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                      />

                      {/* Image overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/5 to-transparent" />

                      {/* Category */}
                      <div className="absolute left-4 top-4">
                        <span className="inline-flex rounded-full border border-white/20 bg-white/90 px-3 py-1.5 text-xs font-semibold text-slate-700 shadow-sm backdrop-blur-md">
                          {destination.category}
                        </span>
                      </div>

                      {/* Location */}
                      <div className="absolute bottom-4 left-4 right-4">
                        <div className="flex items-center gap-1.5 text-sm font-medium text-white">
                          <MapPin className="h-4 w-4" />
                          {destination.location}
                        </div>

                        <h3 className="mt-1 text-2xl font-bold text-white">
                          {destination.name}
                        </h3>
                      </div>
                    </div>

                    {/* Card Content */}
                    <div className="p-5">
                      <p className="line-clamp-2 min-h-[48px] text-sm leading-6 text-slate-500">
                        {destination.description}
                      </p>

                      <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-4">
                        <span className="text-sm font-semibold text-emerald-600">
                          Explore destination
                        </span>

                        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-emerald-50 text-emerald-600 transition duration-300 group-hover:bg-emerald-500 group-hover:text-white">
                          <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
                        </span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}

            {/* =================================================
                PAGINATION
            ================================================== */}
            {totalPages > 1 && (
              <div className="mt-12 flex flex-wrap items-center justify-center gap-2">
                <button
                  type="button"
                  disabled={safePage === 1}
                  onClick={() =>
                    setCurrentPage((page) => Math.max(page - 1, 1))
                  }
                  className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-600 shadow-sm transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Previous
                </button>

                {Array.from(
                  { length: totalPages },
                  (_, index) => index + 1
                )
                  .slice(
                    Math.max(0, safePage - 3),
                    Math.min(totalPages, safePage + 2)
                  )
                  .map((page) => (
                    <button
                      key={page}
                      type="button"
                      onClick={() => setCurrentPage(page)}
                      className={`h-11 w-11 rounded-xl text-sm font-bold transition ${
                        safePage === page
                          ? "bg-emerald-500 text-white shadow-md shadow-emerald-500/20"
                          : "border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                      }`}
                    >
                      {page}
                    </button>
                  ))}

                <button
                  type="button"
                  disabled={safePage === totalPages}
                  onClick={() =>
                    setCurrentPage((page) =>
                      Math.min(page + 1, totalPages)
                    )
                  }
                  className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-600 shadow-sm transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  Next
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            )}
          </section>

          {/* =====================================================
              PAILA AI CTA
          ====================================================== */}
          <section className="mx-auto max-w-7xl px-6 pb-16 lg:px-8 lg:pb-20">
            <div className="relative overflow-hidden rounded-[2rem] border border-emerald-100 bg-gradient-to-br from-emerald-50 via-white to-cyan-50">
              {/* Decorative elements */}
              <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-emerald-200/30 blur-3xl" />

              <div className="absolute -bottom-24 left-20 h-64 w-64 rounded-full bg-cyan-200/20 blur-3xl" />

              <div className="relative grid items-center gap-10 p-8 sm:p-10 lg:grid-cols-[1fr_auto] lg:p-14">
                <div className="max-w-2xl">
                  <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-white/80 px-3.5 py-2 text-xs font-semibold text-emerald-700 shadow-sm">
                    <Sparkles className="h-3.5 w-3.5" />
                    Paila AI
                  </div>

                  <h2 className="mt-5 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
                    Not sure where to go next?
                  </h2>

                  <p className="mt-4 max-w-xl text-base leading-7 text-slate-600">
                    Tell Paila about your travel style, budget and interests.
                    Discover destinations that fit your next Nepal adventure.
                  </p>

                  <div className="mt-7 flex flex-wrap gap-3">
                    <Link
                      to="/ai"
                      className="inline-flex items-center gap-2 rounded-xl bg-emerald-500 px-5 py-3.5 text-sm font-semibold text-white shadow-lg shadow-emerald-500/20 transition hover:-translate-y-0.5 hover:bg-emerald-600"
                    >
                      Plan My Trip
                      <ArrowRight className="h-4 w-4" />
                    </Link>

                    <Link
                      to="/"
                      className="inline-flex items-center rounded-xl border border-slate-200 bg-white px-5 py-3.5 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50"
                    >
                      Back to Dashboard
                    </Link>
                  </div>
                </div>

                {/* Decorative compass */}
                <div className="hidden lg:flex lg:pr-8">
                  <div className="flex h-40 w-40 items-center justify-center rounded-full border border-emerald-200 bg-white/70 shadow-sm">
                    <div className="flex h-24 w-24 items-center justify-center rounded-full border border-emerald-100 bg-emerald-50">
                      <Compass className="h-10 w-10 text-emerald-500" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>

        {/* =======================================================
            FOOTER
        ======================================================== */}
        <footer className="border-t border-slate-200 bg-white">
          <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-6 py-6 text-center sm:flex-row sm:text-left lg:px-8">
            <p className="text-sm text-slate-400">
              © {new Date().getFullYear()} Paila. Made for Nepal.
            </p>

            <p className="text-sm text-slate-400">
              Every journey starts with a step. 🇳🇵
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
}