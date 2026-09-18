
import { useMemo } from "react";
import { Link, useParams } from "react-router-dom";
import {
  ArrowLeft,
  CalendarDays,
  Check,
  Clock,
  MapPin,
  Star,
  Users,
  Wifi,
} from "lucide-react";

import Sidebar from "../../../components/layout/Sidebar";
import { hotels } from "../data/hotels";

export default function HotelDetailsPage() {
  const { hotel } = useParams<{ hotel: string }>();

  const hotelData = useMemo(() => {
    return hotels.find((item) => item.slug === hotel);
  }, [hotel]);

  if (!hotelData) {
    return (
      <div className="min-h-screen bg-slate-50">
        <Sidebar />

        <main className="lg:ml-72">
          <div className="mx-auto flex min-h-[70vh] max-w-4xl items-center justify-center px-4 py-12">
            <div className="w-full rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-sm sm:p-12">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-sky-50">
                <MapPin className="h-7 w-7 text-sky-500" />
              </div>

              <h1 className="mt-5 text-2xl font-bold text-slate-900">
                Hotel not found
              </h1>

              <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">
                We couldn't find the hotel you're looking for. It may have
                been removed or the link may be incorrect.
              </p>

              <Link
                to="/hotels"
                className="mt-6 inline-flex items-center gap-2 rounded-xl bg-sky-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-sky-600"
              >
                <ArrowLeft className="h-4 w-4" />
                Back to Hotels
              </Link>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <Sidebar />

      <main className="lg:ml-72">
        {/* Top Navigation */}
        <div className="border-b border-slate-200 bg-white">
          <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
            <Link
              to="/hotels"
              className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500 transition hover:text-sky-600"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Hotels
            </Link>
          </div>
        </div>

        {/* Main Content */}
        <section className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          {/* Hotel Heading */}
          <div className="mb-6 flex flex-col justify-between gap-4 lg:flex-row lg:items-end">
            <div>
              {hotelData.featured && (
                <span className="mb-3 inline-flex rounded-full bg-sky-50 px-3 py-1 text-xs font-bold text-sky-600">
                  Featured Stay
                </span>
              )}

              <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                {hotelData.name}
              </h1>

              <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-slate-500">
                <span className="inline-flex items-center gap-1.5">
                  <MapPin className="h-4 w-4 text-sky-500" />
                  {hotelData.location}
                </span>

                <span className="inline-flex items-center gap-1.5">
                  <Star className="h-4 w-4 fill-current text-amber-500" />
                  <strong className="text-slate-700">
                    {hotelData.rating}
                  </strong>
                  <span>
                    ({hotelData.reviews.toLocaleString()} reviews)
                  </span>
                </span>
              </div>
            </div>
          </div>

          {/* Image */}
          <div className="overflow-hidden rounded-3xl bg-slate-200 shadow-sm">
            <div className="relative h-[280px] sm:h-[420px] lg:h-[500px]">
              <img
                src={hotelData.image}
                alt={hotelData.name}
                className="h-full w-full object-cover"
              />

              <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black/50 to-transparent" />

              <div className="absolute bottom-5 left-5 rounded-xl bg-white/95 px-4 py-2.5 shadow-lg backdrop-blur-sm">
                <p className="text-xs font-medium text-slate-400">
                  Located in
                </p>

                <p className="text-sm font-bold text-slate-900">
                  {hotelData.destination}
                </p>
              </div>
            </div>
          </div>

          {/* Content Grid */}
          <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_360px]">
            {/* Left */}
            <div className="space-y-8">
              {/* Overview */}
              <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <h2 className="text-xl font-bold text-slate-900">
                  About this hotel
                </h2>

                <p className="mt-3 text-sm leading-7 text-slate-600">
                  {hotelData.description}
                </p>
              </section>

              {/* Amenities */}
              <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <h2 className="text-xl font-bold text-slate-900">
                  Amenities
                </h2>

                <div className="mt-5 grid gap-3 sm:grid-cols-2">
                  {hotelData.amenities.map((amenity) => (
                    <div
                      key={amenity}
                      className="flex items-center gap-3 rounded-xl bg-slate-50 px-4 py-3"
                    >
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-sky-50">
                        <Check className="h-4 w-4 text-sky-500" />
                      </div>

                      <span className="text-sm font-medium text-slate-700">
                        {amenity}
                      </span>
                    </div>
                  ))}
                </div>
              </section>

              {/* Stay Information */}
              <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <h2 className="text-xl font-bold text-slate-900">
                  Stay information
                </h2>

                <div className="mt-5 grid gap-4 sm:grid-cols-2">
                  <div className="flex gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-sky-50">
                      <Clock className="h-5 w-5 text-sky-500" />
                    </div>

                    <div>
                      <p className="text-sm font-semibold text-slate-800">
                        Check-in
                      </p>
                      <p className="mt-1 text-sm text-slate-500">
                        From 2:00 PM
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-sky-50">
                      <Clock className="h-5 w-5 text-sky-500" />
                    </div>

                    <div>
                      <p className="text-sm font-semibold text-slate-800">
                        Check-out
                      </p>
                      <p className="mt-1 text-sm text-slate-500">
                        Until 12:00 PM
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-sky-50">
                      <Wifi className="h-5 w-5 text-sky-500" />
                    </div>

                    <div>
                      <p className="text-sm font-semibold text-slate-800">
                        Internet
                      </p>
                      <p className="mt-1 text-sm text-slate-500">
                        Free Wi-Fi available
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-sky-50">
                      <Users className="h-5 w-5 text-sky-500" />
                    </div>

                    <div>
                      <p className="text-sm font-semibold text-slate-800">
                        Guests
                      </p>
                      <p className="mt-1 text-sm text-slate-500">
                        Suitable for families and groups
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              {/* Location */}
              <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <h2 className="text-xl font-bold text-slate-900">
                  Location
                </h2>

                <div className="mt-4 flex min-h-36 items-center justify-center rounded-2xl bg-slate-100">
                  <div className="text-center">
                    <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-sm">
                      <MapPin className="h-5 w-5 text-sky-500" />
                    </div>

                    <p className="mt-3 text-sm font-semibold text-slate-700">
                      {hotelData.location}
                    </p>

                    <p className="mt-1 text-xs text-slate-400">
                      {hotelData.destination}, Nepal
                    </p>
                  </div>
                </div>
              </section>
            </div>

            {/* Booking Card */}
            <aside className="lg:sticky lg:top-6 lg:self-start">
              <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-lg shadow-slate-200/50">
                <p className="text-xs font-medium text-slate-400">
                  Starting from
                </p>

                <div className="mt-1 flex items-end gap-2">
                  <span className="text-3xl font-bold text-slate-900">
                    NPR {hotelData.pricePerNight.toLocaleString()}
                  </span>

                  <span className="pb-1 text-sm text-slate-400">
                    / night
                  </span>
                </div>

                <div className="mt-5 space-y-3">
                  <div>
                    <label
                      htmlFor="details-check-in"
                      className="mb-1.5 block text-xs font-semibold text-slate-500"
                    >
                      Check-in
                    </label>

                    <div className="relative">
                      <CalendarDays className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

                      <input
                        id="details-check-in"
                        type="date"
                        min={new Date(
                          Date.now() + 86400000,
                        )
                          .toISOString()
                          .split("T")[0]}
                        className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50 pl-10 pr-3 text-sm text-slate-800 outline-none transition focus:border-sky-400 focus:bg-white focus:ring-4 focus:ring-sky-100"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="details-check-out"
                      className="mb-1.5 block text-xs font-semibold text-slate-500"
                    >
                      Check-out
                    </label>

                    <div className="relative">
                      <CalendarDays className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

                      <input
                        id="details-check-out"
                        type="date"
                        min={new Date(
                          Date.now() + 2 * 86400000,
                        )
                          .toISOString()
                          .split("T")[0]}
                        className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50 pl-10 pr-3 text-sm text-slate-800 outline-none transition focus:border-sky-400 focus:bg-white focus:ring-4 focus:ring-sky-100"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="details-guests"
                      className="mb-1.5 block text-xs font-semibold text-slate-500"
                    >
                      Guests
                    </label>

                    <div className="relative">
                      <Users className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

                      <select
                        id="details-guests"
                        defaultValue="2"
                        className="h-11 w-full appearance-none rounded-xl border border-slate-200 bg-slate-50 pl-10 pr-8 text-sm text-slate-800 outline-none transition focus:border-sky-400 focus:bg-white focus:ring-4 focus:ring-sky-100"
                      >
                        <option value="1">1 Guest</option>
                        <option value="2">2 Guests</option>
                        <option value="3">3 Guests</option>
                        <option value="4">4 Guests</option>
                        <option value="5">5 Guests</option>
                        <option value="6">6+ Guests</option>
                      </select>
                    </div>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() =>
                    alert(
                      "Hotel booking will be available in a future Paila update.",
                    )
                  }
                  className="mt-5 flex w-full items-center justify-center rounded-xl bg-sky-500 px-5 py-3.5 text-sm font-bold text-white shadow-md shadow-sky-200 transition hover:bg-sky-600 active:scale-[0.98]"
                >
                  Book Now
                </button>

                <p className="mt-3 text-center text-xs text-slate-400">
                  You won't be charged yet
                </p>

                <div className="mt-5 border-t border-slate-100 pt-5">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-500">
                      Guest rating
                    </span>

                    <span className="flex items-center gap-1 font-semibold text-slate-800">
                      <Star className="h-4 w-4 fill-current text-amber-500" />
                      {hotelData.rating}/5
                    </span>
                  </div>

                  <div className="mt-3 flex items-center justify-between text-sm">
                    <span className="text-slate-500">
                      Reviews
                    </span>

                    <span className="font-semibold text-slate-800">
                      {hotelData.reviews.toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </section>
      </main>
    </div>
  );
}