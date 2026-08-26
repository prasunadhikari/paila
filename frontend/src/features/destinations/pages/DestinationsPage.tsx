import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { destinations } from "../data/destinations";

const ITEMS_PER_PAGE = 12;

export default function DestinationsPage() {
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

  return (
    <main className="min-h-screen bg-slate-50">
      {/* HERO */}
      <section className="relative overflow-hidden bg-slate-950">
        <div className="absolute -left-32 -top-32 h-96 w-96 rounded-full bg-emerald-500/20 blur-3xl" />
        <div className="absolute -bottom-40 -right-20 h-96 w-96 rounded-full bg-cyan-500/20 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-6 pb-20 pt-32">
          <Link
            to="/"
            className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-5 py-2.5 text-sm font-medium text-white/80 backdrop-blur-md transition hover:bg-white/10 hover:text-white"
          >
            ← Back to Home
          </Link>

          <div className="mt-12 max-w-4xl">
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-emerald-400">
              Explore Nepal
            </p>

            <h1 className="mt-4 text-5xl font-black tracking-tight text-white md:text-7xl">
              Find your next
              <span className="block bg-gradient-to-r from-emerald-300 to-cyan-400 bg-clip-text text-transparent">
                adventure.
              </span>
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300 md:text-xl">
              Discover mountains, lakes, wildlife, heritage sites and hidden
              gems across Nepal.
            </p>
          </div>

          {/* SEARCH */}
          <div className="mt-10 max-w-3xl">
            <div className="flex items-center rounded-2xl border border-white/10 bg-white p-2 shadow-2xl">
              <div className="flex flex-1 items-center px-4">
                <span className="mr-3 text-xl">🔍</span>

                <input
                  type="text"
                  value={search}
                  onChange={(event) => handleSearch(event.target.value)}
                  placeholder="Search Pokhara, Mustang, Everest..."
                  className="w-full bg-transparent py-3 text-slate-900 outline-none placeholder:text-slate-400"
                />
              </div>

              <div className="hidden rounded-xl bg-slate-900 px-5 py-3 text-sm font-medium text-white md:block">
                {filteredDestinations.length} places
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CATEGORY FILTERS */}
      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl overflow-x-auto px-6 py-5">
          <div className="flex min-w-max gap-3">
            {categories.map((item: string) => {
              const active = category === item;

              return (
                <button
                  key={item}
                  onClick={() => handleCategory(item)}
                  className={`rounded-full px-5 py-2.5 text-sm font-semibold transition ${
                    active
                      ? "bg-emerald-600 text-white shadow-lg shadow-emerald-600/20"
                      : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                  }`}
                >
                  {item}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* DESTINATIONS */}
      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="mb-10 flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-600">
              Start Exploring
            </p>

            <h2 className="mt-2 text-4xl font-bold tracking-tight text-slate-900">
              Popular Destinations
            </h2>
          </div>

          <p className="max-w-md text-slate-500">
            {filteredDestinations.length} destinations found. Choose a place
            and start planning your Nepal adventure.
          </p>
        </div>

        {/* NO RESULTS */}
        {visibleDestinations.length === 0 && (
          <div className="rounded-3xl bg-white px-6 py-20 text-center shadow-sm">
            <div className="text-5xl">🏔️</div>

            <h3 className="mt-5 text-2xl font-bold text-slate-900">
              No destinations found
            </h3>

            <p className="mt-2 text-slate-500">
              Try another destination name or category.
            </p>

            <button
              onClick={clearFilters}
              className="mt-6 rounded-xl bg-emerald-600 px-6 py-3 font-semibold text-white transition hover:bg-emerald-700"
            >
              Clear Filters
            </button>
          </div>
        )}

        {/* DESTINATION CARDS */}
        {visibleDestinations.length > 0 && (
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {visibleDestinations.map((destination) => (
              <Link
                key={destination.slug}
                to={`/destinations/${destination.slug}`}
                className="group overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-slate-200/60 transition duration-500 hover:-translate-y-2 hover:shadow-2xl"
              >
                <div className="relative h-72 overflow-hidden bg-slate-200">
                  <img
                    src={destination.image}
                    alt={destination.name}
                    loading="lazy"
                    className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />

                  <div className="absolute left-5 top-5">
                    <span className="rounded-full bg-white/90 px-3 py-1.5 text-xs font-bold text-slate-700 shadow-sm backdrop-blur-md">
                      {destination.category}
                    </span>
                  </div>

                  <div className="absolute bottom-5 left-5 right-5">
                    <h3 className="text-3xl font-bold text-white">
                      {destination.name}
                    </h3>

                    <p className="mt-1 text-sm text-slate-200">
                      📍 {destination.location}
                    </p>
                  </div>
                </div>

                <div className="p-6">
                  <p className="line-clamp-2 min-h-[56px] leading-7 text-slate-500">
                    {destination.description}
                  </p>

                  <div className="mt-6 flex items-center justify-between border-t border-slate-100 pt-5">
                    <span className="font-semibold text-emerald-600">
                      Explore destination
                    </span>

                    <span className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-50 text-lg text-emerald-600 transition duration-300 group-hover:bg-emerald-600 group-hover:text-white">
                      →
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}

        {/* PAGINATION */}
        {totalPages > 1 && (
          <div className="mt-14 flex flex-wrap items-center justify-center gap-2">
            <button
              disabled={safePage === 1}
              onClick={() =>
                setCurrentPage((page) => Math.max(page - 1, 1))
              }
              className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-600 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-40"
            >
              ← Previous
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
                  onClick={() => setCurrentPage(page)}
                  className={`h-11 w-11 rounded-xl text-sm font-bold transition ${
                    safePage === page
                      ? "bg-emerald-600 text-white shadow-lg shadow-emerald-600/20"
                      : "border border-slate-200 bg-white text-slate-600 hover:bg-slate-100"
                  }`}
                >
                  {page}
                </button>
              ))}

            <button
              disabled={safePage === totalPages}
              onClick={() =>
                setCurrentPage((page) =>
                  Math.min(page + 1, totalPages)
                )
              }
              className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-600 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-40"
            >
              Next →
            </button>
          </div>
        )}
      </section>

      {/* AI CTA */}
      <section className="mx-auto max-w-7xl px-6 pb-20">
        <div className="relative overflow-hidden rounded-[2rem] bg-slate-950 px-8 py-14 md:px-12 md:py-16">
          <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-emerald-500/20 blur-3xl" />
          <div className="absolute -bottom-20 left-20 h-64 w-64 rounded-full bg-cyan-500/10 blur-3xl" />

          <div className="relative max-w-2xl">
            <p className="font-semibold text-emerald-400">
              ✨ Paila AI
            </p>

            <h2 className="mt-3 text-3xl font-bold text-white md:text-4xl">
              Still not sure where to go?
            </h2>

            <p className="mt-4 text-lg leading-8 text-slate-300">
              Tell Paila your budget, travel days and interests. We'll help
              you discover the right destination and build your trip.
            </p>

            <Link
              to="/planner"
              className="mt-7 inline-flex rounded-xl bg-emerald-500 px-6 py-3.5 font-semibold text-white shadow-lg shadow-emerald-500/20 transition hover:bg-emerald-600 hover:shadow-xl"
            >
              Plan My Trip →
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}