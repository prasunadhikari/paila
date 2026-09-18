import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  CalendarDays,
  ChevronDown,
  MapPin,
  Search,
  Star,
  Users,
} from "lucide-react";

import Sidebar from "../../../components/layout/Sidebar";
import { hotels } from "../data/hotels";

export default function HotelsPage() {
  const [destination, setDestination] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState("2");
  const [showGuests, setShowGuests] = useState(false);
  const [searched, setSearched] = useState(false);

  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);

  const minDate = tomorrow.toISOString().split("T")[0];

  const filteredHotels = useMemo(() => {
    const query = destination.trim().toLowerCase();

    if (!query) {
      return hotels;
    }

    return hotels.filter(
      (hotel) =>
        hotel.name.toLowerCase().includes(query) ||
        hotel.destination.toLowerCase().includes(query) ||
        hotel.location.toLowerCase().includes(query),
    );
  }, [destination]);

  const handleSearch = () => {
    setSearched(true);
    setShowGuests(false);
  };

  const clearSearch = () => {
    setDestination("");
    setCheckIn("");
    setCheckOut("");
    setGuests("2");
    setSearched(false);
    setShowGuests(false);
  };

  const guestLabel =
    guests === "1" ? "1 Guest" : `${guests} Guests`;

  const checkOutMin = checkIn
    ? (() => {
        const nextDay = new Date(`${checkIn}T00:00:00`);
        nextDay.setDate(nextDay.getDate() + 1);

        return nextDay.toISOString().split("T")[0];
      })()
    : minDate;

  return (
    <div className="min-h-screen bg-slate-50">
      <Sidebar />

      <main className="lg:ml-72">
        {/* Header */}
        <section className="border-b border-slate-200 bg-white">
          <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
            <div className="mb-6">
              <p className="mb-2 text-sm font-semibold text-sky-600">
                STAY WITH PAILA
              </p>

              <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                Find your perfect stay
              </h1>

              <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500 sm:text-base">
                Discover comfortable hotels and resorts across Nepal for your
                next journey.
              </p>
            </div>

            {/* Search Box */}
            <div className="rounded-2xl border border-slate-200 bg-white p-3 shadow-lg shadow-slate-200/50">
              <div className="grid gap-3 lg:grid-cols-[1.5fr_1fr_1fr_0.8fr_auto]">
                {/* Destination */}
                <div>
                  <label
                    htmlFor="hotel-destination"
                    className="mb-1.5 block px-1 text-xs font-semibold text-slate-500"
                  >
                    Destination
                  </label>

                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

                    <input
                      id="hotel-destination"
                      type="text"
                      value={destination}
                      onChange={(event) =>
                        setDestination(event.target.value)
                      }
                      placeholder="Where do you want to stay?"
                      className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50 pl-10 pr-3 text-sm text-slate-800 outline-none transition focus:border-sky-400 focus:bg-white focus:ring-4 focus:ring-sky-100"
                    />
                  </div>
                </div>

                {/* Check-in */}
                <div>
                  <label
                    htmlFor="hotel-check-in"
                    className="mb-1.5 block px-1 text-xs font-semibold text-slate-500"
                  >
                    Check-in
                  </label>

                  <div className="relative">
                    <CalendarDays className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

                    <input
                      id="hotel-check-in"
                      type="date"
                      min={minDate}
                      value={checkIn}
                      onChange={(event) => {
                        const value = event.target.value;

                        setCheckIn(value);

                        if (checkOut && value >= checkOut) {
                          setCheckOut("");
                        }
                      }}
                      className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50 pl-10 pr-3 text-sm text-slate-800 outline-none transition focus:border-sky-400 focus:bg-white focus:ring-4 focus:ring-sky-100"
                    />
                  </div>
                </div>

                {/* Check-out */}
                <div>
                  <label
                    htmlFor="hotel-check-out"
                    className="mb-1.5 block px-1 text-xs font-semibold text-slate-500"
                  >
                    Check-out
                  </label>

                  <div className="relative">
                    <CalendarDays className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

                    <input
                      id="hotel-check-out"
                      type="date"
                      min={checkOutMin}
                      value={checkOut}
                      onChange={(event) =>
                        setCheckOut(event.target.value)
                      }
                      className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50 pl-10 pr-3 text-sm text-slate-800 outline-none transition focus:border-sky-400 focus:bg-white focus:ring-4 focus:ring-sky-100"
                    />
                  </div>
                </div>

                {/* Guests */}
                <div className="relative">
                  <label className="mb-1.5 block px-1 text-xs font-semibold text-slate-500">
                    Guests
                  </label>

                  <button
                    type="button"
                    onClick={() =>
                      setShowGuests((value) => !value)
                    }
                    className="flex h-12 w-full items-center justify-between rounded-xl border border-slate-200 bg-slate-50 px-3 text-sm text-slate-800 transition hover:border-slate-300"
                  >
                    <span className="flex items-center gap-2">
                      <Users className="h-4 w-4 text-slate-400" />
                      {guestLabel}
                    </span>

                    <ChevronDown
                      className={`h-4 w-4 text-slate-400 transition ${
                        showGuests ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  {showGuests && (
                    <div className="absolute left-0 right-0 top-[76px] z-30 rounded-xl border border-slate-200 bg-white p-2 shadow-xl">
                      {["1", "2", "3", "4", "5", "6+"].map(
                        (option) => (
                          <button
                            key={option}
                            type="button"
                            onClick={() => {
                              setGuests(option);
                              setShowGuests(false);
                            }}
                            className={`flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-sm transition ${
                              guests === option
                                ? "bg-sky-50 font-semibold text-sky-600"
                                : "text-slate-700 hover:bg-slate-50"
                            }`}
                          >
                            <span>
                              {option === "1"
                                ? "1 Guest"
                                : `${option} Guests`}
                            </span>

                            {guests === option && (
                              <span className="text-sky-500">
                                ✓
                              </span>
                            )}
                          </button>
                        ),
                      )}
                    </div>
                  )}
                </div>

                {/* Search */}
                <div className="flex items-end">
                  <button
                    type="button"
                    onClick={handleSearch}
                    className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-sky-500 px-5 text-sm font-semibold text-white shadow-md shadow-sky-200 transition hover:bg-sky-600 active:scale-[0.98] lg:w-auto"
                  >
                    <Search className="h-4 w-4" />
                    Search
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Results */}
        <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="mb-6 flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
            <div>
              <h2 className="text-xl font-bold text-slate-900">
                {searched && destination
                  ? `Hotels in ${destination}`
                  : "Popular stays in Nepal"}
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                {filteredHotels.length}{" "}
                {filteredHotels.length === 1
                  ? "hotel"
                  : "hotels"}{" "}
                available
              </p>
            </div>

            {(destination || checkIn || checkOut) && (
              <button
                type="button"
                onClick={clearSearch}
                className="w-fit text-sm font-semibold text-sky-600 transition hover:text-sky-700"
              >
                Clear search
              </button>
            )}
          </div>

          {filteredHotels.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-16 text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-sky-50">
                <Search className="h-6 w-6 text-sky-500" />
              </div>

              <h3 className="mt-4 text-lg font-bold text-slate-900">
                No hotels found
              </h3>

              <p className="mx-auto mt-2 max-w-md text-sm text-slate-500">
                Try searching for another destination such as Kathmandu,
                Pokhara, or Chitwan.
              </p>

              <button
                type="button"
                onClick={clearSearch}
                className="mt-5 rounded-xl bg-sky-500 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-sky-600"
              >
                View all hotels
              </button>
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {filteredHotels.map((hotel) => (
                <Link
                  key={hotel.id}
                  to={`/hotels/${hotel.slug}`}
                  className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl"
                >
                  {/* Image */}
                  <div className="relative h-56 overflow-hidden">
                    <img
                      src={hotel.image}
                      alt={hotel.name}
                      className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                    />

                    <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/60 to-transparent" />

                    {hotel.featured && (
                      <span className="absolute left-4 top-4 rounded-full bg-white px-3 py-1.5 text-xs font-bold text-sky-600 shadow-md">
                        Featured
                      </span>
                    )}

                    <div className="absolute bottom-4 left-4 flex items-center gap-1 text-white">
                      <MapPin className="h-3.5 w-3.5" />

                      <span className="text-xs font-medium">
                        {hotel.location}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-5">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <h3 className="text-lg font-bold text-slate-900 transition group-hover:text-sky-600">
                          {hotel.name}
                        </h3>

                        <p className="mt-1 text-sm text-slate-500">
                          {hotel.destination}
                        </p>
                      </div>

                      <div className="flex shrink-0 items-center gap-1 rounded-lg bg-amber-50 px-2 py-1 text-sm font-bold text-amber-600">
                        <Star className="h-3.5 w-3.5 fill-current" />
                        {hotel.rating}
                      </div>
                    </div>

                    <p className="mt-3 text-xs text-slate-400">
                      {hotel.reviews.toLocaleString()} reviews
                    </p>

                    <div className="mt-4 flex flex-wrap gap-2">
                      {hotel.amenities.slice(0, 3).map(
                        (amenity) => (
                          <span
                            key={amenity}
                            className="rounded-full bg-slate-100 px-2.5 py-1 text-[11px] font-medium text-slate-600"
                          >
                            {amenity}
                          </span>
                        ),
                      )}

                      {hotel.amenities.length > 3 && (
                        <span className="rounded-full bg-slate-100 px-2.5 py-1 text-[11px] font-medium text-slate-500">
                          +{hotel.amenities.length - 3}
                        </span>
                      )}
                    </div>

                    <div className="mt-5 flex items-end justify-between border-t border-slate-100 pt-4">
                      <div>
                        <p className="text-xs text-slate-400">
                          Starting from
                        </p>

                        <p className="mt-0.5 text-xl font-bold text-slate-900">
                          NPR{" "}
                          {hotel.pricePerNight.toLocaleString()}
                        </p>

                        <p className="text-xs text-slate-400">
                          per night
                        </p>
                      </div>

                      <span className="text-sm font-semibold text-sky-600 transition group-hover:translate-x-0.5">
                        View Hotel →
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}