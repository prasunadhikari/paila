import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  CalendarDays,
  ChevronDown,
  Heart,
  MapPin,
  Search,
  Star,
  Users,
  X,
} from "lucide-react";

import { hotels } from "../data/hotels";

type SortOption = "recommended" | "price-low" | "price-high" | "rating";

const HotelsPage = () => {
  const [search, setSearch] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState(2);

  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [minRating, setMinRating] = useState("");

  const [sortBy, setSortBy] =
    useState<SortOption>("recommended");

  const [savedHotels, setSavedHotels] = useState<string[]>([]);

  const filteredHotels = useMemo(() => {
    const searchTerm = search.trim().toLowerCase();

    let result = hotels.filter((hotel) => {
      const matchesSearch =
        !searchTerm ||
        hotel.name.toLowerCase().includes(searchTerm) ||
        hotel.destination.toLowerCase().includes(searchTerm) ||
        hotel.location.toLowerCase().includes(searchTerm);

      const price = hotel.priceFrom ?? 0;

      const matchesMinPrice =
        !minPrice || price >= Number(minPrice);

      const matchesMaxPrice =
        !maxPrice || price <= Number(maxPrice);

      const matchesRating =
        !minRating ||
        hotel.rating >= Number(minRating);

      return (
        matchesSearch &&
        matchesMinPrice &&
        matchesMaxPrice &&
        matchesRating
      );
    });

    if (sortBy === "price-low") {
      result.sort(
        (a, b) =>
          (a.priceFrom ?? 0) - (b.priceFrom ?? 0)
      );
    }

    if (sortBy === "price-high") {
      result.sort(
        (a, b) =>
          (b.priceFrom ?? 0) - (a.priceFrom ?? 0)
      );
    }

    if (sortBy === "rating") {
      result.sort((a, b) => b.rating - a.rating);
    }

    if (sortBy === "recommended") {
      result.sort((a, b) => {
        if (Boolean(b.featured) !== Boolean(a.featured)) {
          return Number(Boolean(b.featured)) -
            Number(Boolean(a.featured));
        }

        return b.rating - a.rating;
      });
    }

    return result;
  }, [
    search,
    minPrice,
    maxPrice,
    minRating,
    sortBy,
  ]);

  const toggleSave = (hotelId: string) => {
    setSavedHotels((current) =>
      current.includes(hotelId)
        ? current.filter((id) => id !== hotelId)
        : [...current, hotelId]
    );
  };

  const clearFilters = () => {
    setSearch("");
    setCheckIn("");
    setCheckOut("");
    setGuests(2);
    setMinPrice("");
    setMaxPrice("");
    setMinRating("");
    setSortBy("recommended");
  };

  const formatPrice = (
    price: number | undefined,
    currency: "NPR" | "USD"
  ) => {
    if (price === undefined) {
      return "Check current rate";
    }

    if (currency === "USD") {
      return `$${price.toLocaleString()}`;
    }

    return `NPR ${price.toLocaleString()}`;
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* HEADER */}
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-5 sm:px-6 lg:px-8">
          <div>
            <Link
              to="/dashboard"
              className="text-sm font-semibold text-sky-600 hover:text-sky-700"
            >
              ← Back to Dashboard
            </Link>

            <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-900">
              Hotels in Nepal
            </h1>

            <p className="mt-1 text-sm text-slate-500">
              Find a comfortable stay for your next journey.
            </p>
          </div>

          <div className="hidden rounded-full bg-sky-50 px-4 py-2 text-sm font-semibold text-sky-700 sm:block">
            {hotels.length}+ stays
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        {/* SEARCH BOX */}
        <section className="rounded-3xl bg-white p-4 shadow-sm ring-1 ring-slate-200 sm:p-6">
          <div className="grid gap-4 lg:grid-cols-[1.5fr_1fr_1fr_0.8fr_auto]">
            {/* DESTINATION */}
            <label className="block">
              <span className="mb-2 block text-sm font-semibold text-slate-700">
                Destination
              </span>

              <div className="relative">
                <Search
                  size={18}
                  className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <input
                  type="text"
                  value={search}
                  onChange={(event) =>
                    setSearch(event.target.value)
                  }
                  placeholder="Kathmandu, Pokhara..."
                  className="w-full rounded-xl border border-slate-200 bg-white py-3 pl-10 pr-4 text-sm outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-100"
                />
              </div>
            </label>

            {/* CHECK IN */}
            <label className="block">
              <span className="mb-2 block text-sm font-semibold text-slate-700">
                Check-in
              </span>

              <div className="relative">
                <CalendarDays
                  size={17}
                  className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <input
                  type="date"
                  value={checkIn}
                  onChange={(event) =>
                    setCheckIn(event.target.value)
                  }
                  className="w-full rounded-xl border border-slate-200 bg-white py-3 pl-10 pr-3 text-sm outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-100"
                />
              </div>
            </label>

            {/* CHECK OUT */}
            <label className="block">
              <span className="mb-2 block text-sm font-semibold text-slate-700">
                Check-out
              </span>

              <div className="relative">
                <CalendarDays
                  size={17}
                  className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <input
                  type="date"
                  value={checkOut}
                  onChange={(event) =>
                    setCheckOut(event.target.value)
                  }
                  className="w-full rounded-xl border border-slate-200 bg-white py-3 pl-10 pr-3 text-sm outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-100"
                />
              </div>
            </label>

            {/* GUESTS */}
            <label className="block">
              <span className="mb-2 block text-sm font-semibold text-slate-700">
                Guests
              </span>

              <div className="flex items-center justify-between rounded-xl border border-slate-200 px-3 py-2.5">
                <div className="flex items-center gap-2">
                  <Users
                    size={17}
                    className="text-slate-400"
                  />

                  <span className="text-sm font-medium text-slate-700">
                    {guests}
                  </span>
                </div>

                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    onClick={() =>
                      setGuests((value) =>
                        Math.max(1, value - 1)
                      )
                    }
                    className="flex h-7 w-7 items-center justify-center rounded-full border border-slate-200 text-slate-600 hover:bg-slate-50"
                  >
                    −
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      setGuests((value) =>
                        Math.min(10, value + 1)
                      )
                    }
                    className="flex h-7 w-7 items-center justify-center rounded-full border border-slate-200 text-slate-600 hover:bg-slate-50"
                  >
                    +
                  </button>
                </div>
              </div>
            </label>

            {/* SEARCH BUTTON */}
            <button
              type="button"
              className="self-end rounded-xl bg-sky-600 px-6 py-3 font-semibold text-white transition hover:bg-sky-700"
            >
              Search
            </button>
          </div>
        </section>

        {/* FILTERS */}
        <section className="mt-5 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
          <div className="flex flex-col gap-4 xl:flex-row xl:items-end xl:justify-between">
            <div className="grid gap-4 sm:grid-cols-3">
              {/* MIN PRICE */}
              <label>
                <span className="mb-2 block text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Min price
                </span>

                <input
                  type="number"
                  min="0"
                  value={minPrice}
                  onChange={(event) =>
                    setMinPrice(event.target.value)
                  }
                  placeholder="Any"
                  className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-100"
                />
              </label>

              {/* MAX PRICE */}
              <label>
                <span className="mb-2 block text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Max price
                </span>

                <input
                  type="number"
                  min="0"
                  value={maxPrice}
                  onChange={(event) =>
                    setMaxPrice(event.target.value)
                  }
                  placeholder="Any"
                  className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-100"
                />
              </label>

              {/* RATING */}
              <label>
                <span className="mb-2 block text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Minimum rating
                </span>

                <select
                  value={minRating}
                  onChange={(event) =>
                    setMinRating(event.target.value)
                  }
                  className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-100"
                >
                  <option value="">Any rating</option>
                  <option value="4.5">4.5+</option>
                  <option value="4">4.0+</option>
                  <option value="3.5">3.5+</option>
                  <option value="3">3.0+</option>
                </select>
              </label>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              {/* SORT */}
              <label className="relative">
                <span className="sr-only">Sort hotels</span>

                <select
                  value={sortBy}
                  onChange={(event) =>
                    setSortBy(
                      event.target.value as SortOption
                    )
                  }
                  className="appearance-none rounded-xl border border-slate-200 bg-white py-2.5 pl-4 pr-10 text-sm font-medium text-slate-700 outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-100"
                >
                  <option value="recommended">
                    Recommended
                  </option>
                  <option value="price-low">
                    Price: Low to High
                  </option>
                  <option value="price-high">
                    Price: High to Low
                  </option>
                  <option value="rating">
                    Highest Rated
                  </option>
                </select>

                <ChevronDown
                  size={16}
                  className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
                />
              </label>

              {/* CLEAR */}
              <button
                type="button"
                onClick={clearFilters}
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-600 transition hover:bg-slate-50"
              >
                <X size={16} />
                Clear filters
              </button>
            </div>
          </div>
        </section>

        {/* RESULT COUNT */}
        <div className="mt-7 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-slate-900">
              Available stays
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              {filteredHotels.length}{" "}
              {filteredHotels.length === 1
                ? "hotel"
                : "hotels"}{" "}
              found
            </p>
          </div>
        </div>

        {/* HOTEL GRID */}
        {filteredHotels.length > 0 ? (
          <div className="mt-5 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredHotels.map((hotel) => {
              const isSaved = savedHotels.includes(hotel.id);

              return (
                <article
                  key={hotel.id}
                  className="group overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg"
                >
                  {/* IMAGE */}
                  <div className="relative">
                    <Link
                      to={`/hotels/${hotel.slug}`}
                      className="block"
                    >
                      <img
                        src={hotel.image}
                        alt={hotel.name}
                        className="h-56 w-full object-cover transition duration-500 group-hover:scale-105"
                      />
                    </Link>

                    {hotel.featured && (
                      <span className="absolute left-4 top-4 rounded-full bg-white/95 px-3 py-1.5 text-xs font-bold text-sky-700 shadow-sm">
                        Featured
                      </span>
                    )}

                    <button
                      type="button"
                      onClick={() => toggleSave(hotel.id)}
                      aria-label={
                        isSaved
                          ? "Remove hotel from saved"
                          : "Save hotel"
                      }
                      className={`absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full shadow-sm backdrop-blur transition ${
                        isSaved
                          ? "bg-red-50 text-red-500"
                          : "bg-white/95 text-slate-600 hover:text-red-500"
                      }`}
                    >
                      <Heart
                        size={19}
                        fill={
                          isSaved
                            ? "currentColor"
                            : "none"
                        }
                      />
                    </button>
                  </div>

                  {/* CONTENT */}
                  <div className="p-5">
                    <div className="flex items-center justify-between gap-3">
                      <span className="rounded-full bg-sky-50 px-3 py-1 text-xs font-semibold text-sky-700">
                        {hotel.destination}
                      </span>

                      <div className="flex items-center gap-1 text-sm font-semibold text-slate-700">
                        <Star
                          size={15}
                          className="fill-yellow-400 text-yellow-400"
                        />
                        {hotel.rating}
                      </div>
                    </div>

                    <Link
                      to={`/hotels/${hotel.slug}`}
                      className="mt-3 block"
                    >
                      <h3 className="line-clamp-1 text-lg font-bold text-slate-900 transition group-hover:text-sky-600">
                        {hotel.name}
                      </h3>
                    </Link>

                    <div className="mt-2 flex items-start gap-2 text-sm text-slate-500">
                      <MapPin
                        size={16}
                        className="mt-0.5 shrink-0 text-sky-500"
                      />

                      <span className="line-clamp-1">
                        {hotel.location}
                      </span>
                    </div>

                    <div className="mt-4 flex items-end justify-between gap-3 border-t border-slate-100 pt-4">
                      <div>
                        <p className="text-xs text-slate-400">
                          Starting from
                        </p>

                        <p className="mt-1 text-lg font-bold text-slate-900">
                          {formatPrice(
                            hotel.priceFrom,
                            hotel.currency
                          )}
                        </p>

                        {hotel.priceFrom && (
                          <p className="text-xs text-slate-400">
                            per night
                          </p>
                        )}
                      </div>

                      <Link
                        to={`/hotels/${hotel.slug}`}
                        className="rounded-xl bg-sky-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-sky-700"
                      >
                        View Hotel
                      </Link>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        ) : (
          /* EMPTY STATE */
          <div className="mt-6 rounded-3xl border border-dashed border-slate-300 bg-white px-6 py-16 text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-sky-50 text-sky-600">
              <Search size={24} />
            </div>

            <h3 className="mt-5 text-xl font-bold text-slate-900">
              No hotels found
            </h3>

            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">
              Try changing your destination, price range or
              rating filters.
            </p>

            <button
              type="button"
              onClick={clearFilters}
              className="mt-6 rounded-xl bg-sky-600 px-5 py-3 font-semibold text-white transition hover:bg-sky-700"
            >
              Clear Filters
            </button>
          </div>
        )}
      </main>
    </div>
  );
};

export default HotelsPage;