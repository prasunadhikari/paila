import { useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  ArrowLeft,
  CalendarDays,
  Check,
  Heart,
  MapPin,
  Minus,
  Plus,
  ShieldCheck,
  Star,
  Users,
} from "lucide-react";

import { hotels } from "../data/hotels";

const HotelDetailsPage = () => {
  const { hotel } = useParams<{ hotel: string }>();

  const hotelData = useMemo(() => {
    return hotels.find((item) => item.slug === hotel);
  }, [hotel]);

  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState(2);
  const [saved, setSaved] = useState(false);

  const nights = useMemo(() => {
    if (!checkIn || !checkOut) {
      return 1;
    }

    const start = new Date(checkIn);
    const end = new Date(checkOut);

    const difference = end.getTime() - start.getTime();

    const calculatedNights = Math.ceil(
      difference / (1000 * 60 * 60 * 24)
    );

    return calculatedNights > 0 ? calculatedNights : 1;
  }, [checkIn, checkOut]);

  if (!hotelData) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50 px-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-slate-900">
            Hotel not found
          </h1>

          <p className="mt-3 text-slate-500">
            The hotel you're looking for doesn't exist.
          </p>

          <Link
            to="/hotels"
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-sky-600 px-5 py-3 font-semibold text-white transition hover:bg-sky-700"
          >
            <ArrowLeft size={18} />
            Back to Hotels
          </Link>
        </div>
      </div>
    );
  }

  const price = hotelData.priceFrom ?? 0;

  const roomTotal = price * nights;

  const serviceFee = roomTotal * 0.05;

  const estimatedTotal = roomTotal + serviceFee;

  const formatPrice = (amount: number) => {
    if (hotelData.currency === "USD") {
      return `$${amount.toLocaleString(undefined, {
        maximumFractionDigits: 0,
      })}`;
    }

    return `NPR ${amount.toLocaleString()}`;
  };

  const handleReserve = () => {
    alert(
      `Reservation request for ${hotelData.name}\n\n` +
        `Check-in: ${checkIn || "Not selected"}\n` +
        `Check-out: ${checkOut || "Not selected"}\n` +
        `Guests: ${guests}`
    );
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* HEADER */}
      <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <Link
            to="/hotels"
            className="inline-flex items-center gap-2 text-sm font-semibold text-slate-700 transition hover:text-sky-600"
          >
            <ArrowLeft size={18} />
            Back to Hotels
          </Link>

          <button
            type="button"
            onClick={() => setSaved((value) => !value)}
            aria-label={saved ? "Remove from saved" : "Save hotel"}
            className={`flex h-10 w-10 items-center justify-center rounded-full border transition ${
              saved
                ? "border-red-200 bg-red-50 text-red-500"
                : "border-slate-200 bg-white text-slate-600 hover:border-red-200 hover:text-red-500"
            }`}
          >
            <Heart
              size={19}
              fill={saved ? "currentColor" : "none"}
            />
          </button>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        {/* HOTEL IMAGE */}
        <div className="overflow-hidden rounded-3xl bg-white shadow-sm">
          <img
            src={hotelData.image}
            alt={hotelData.name}
            className="h-[280px] w-full object-cover sm:h-[400px] lg:h-[500px]"
          />
        </div>

        {/* CONTENT */}
        <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_380px]">
          {/* LEFT SIDE */}
          <section>
            {/* BADGES */}
            <div className="flex flex-wrap items-center gap-3">
              <span className="rounded-full bg-sky-50 px-3 py-1 text-sm font-semibold text-sky-700">
                {hotelData.destination}
              </span>

              <div className="flex items-center gap-1 text-sm font-semibold text-slate-700">
                <Star
                  size={16}
                  className="fill-yellow-400 text-yellow-400"
                />
                {hotelData.rating}
              </div>

              <span className="text-sm text-slate-500">
                ({hotelData.reviews.toLocaleString()} reviews)
              </span>
            </div>

            {/* TITLE */}
            <h1 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              {hotelData.name}
            </h1>

            {/* ADDRESS */}
            <div className="mt-3 flex items-start gap-2 text-slate-500">
              <MapPin
                size={18}
                className="mt-0.5 shrink-0 text-sky-600"
              />

              <span>{hotelData.address}</span>
            </div>

            {/* DESCRIPTION */}
            <p className="mt-6 max-w-3xl leading-7 text-slate-600">
              {hotelData.description}
            </p>

            {/* AMENITIES */}
            <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-6">
              <h2 className="text-xl font-bold text-slate-900">
                Amenities
              </h2>

              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                {hotelData.amenities.map((amenity) => (
                  <div
                    key={amenity}
                    className="flex items-center gap-3 rounded-xl bg-slate-50 px-4 py-3"
                  >
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
                      <Check size={16} />
                    </div>

                    <span className="text-sm font-medium text-slate-700">
                      {amenity}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* LOCATION */}
            <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-6">
              <h2 className="text-xl font-bold text-slate-900">
                Location
              </h2>

              <div className="mt-4 flex items-start gap-3">
                <MapPin
                  size={20}
                  className="mt-1 shrink-0 text-sky-600"
                />

                <div>
                  <p className="font-semibold text-slate-800">
                    {hotelData.location}
                  </p>

                  <p className="mt-1 text-sm leading-6 text-slate-500">
                    {hotelData.address}
                  </p>
                </div>
              </div>
            </div>

            {/* OFFICIAL WEBSITE */}
            {hotelData.officialWebsite && (
              <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-6">
                <h2 className="text-xl font-bold text-slate-900">
                  Official Website
                </h2>

                <a
                  href={hotelData.officialWebsite}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 inline-flex font-semibold text-sky-600 hover:text-sky-700"
                >
                  Visit hotel website →
                </a>
              </div>
            )}
          </section>

          {/* BOOKING CARD */}
          <aside>
            <div className="sticky top-24 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              {/* PRICE HEADER */}
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm text-slate-500">
                    Starting from
                  </p>

                  {hotelData.priceFrom ? (
                    <>
                      <div className="mt-1 text-2xl font-bold text-slate-900">
                        {formatPrice(hotelData.priceFrom)}
                      </div>

                      <p className="text-sm text-slate-500">
                        per night
                      </p>
                    </>
                  ) : (
                    <div className="mt-1 text-lg font-bold text-slate-900">
                      Check current rate
                    </div>
                  )}
                </div>

                <div className="flex items-center gap-1 rounded-lg bg-yellow-50 px-2.5 py-1.5 text-sm font-semibold text-slate-700">
                  <Star
                    size={15}
                    className="fill-yellow-400 text-yellow-400"
                  />
                  {hotelData.rating}
                </div>
              </div>

              {/* DATES */}
              <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
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
              </div>

              {/* GUESTS */}
              <div className="mt-4">
                <span className="mb-2 block text-sm font-semibold text-slate-700">
                  Guests
                </span>

                <div className="flex items-center justify-between rounded-xl border border-slate-200 px-4 py-3">
                  <div className="flex items-center gap-3">
                    <Users
                      size={18}
                      className="text-slate-400"
                    />

                    <span className="text-sm font-medium text-slate-700">
                      {guests}{" "}
                      {guests === 1 ? "Guest" : "Guests"}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() =>
                        setGuests((value) =>
                          Math.max(1, value - 1)
                        )
                      }
                      className="flex h-8 w-8 items-center justify-center rounded-full border border-slate-200 text-slate-600 transition hover:bg-slate-50"
                    >
                      <Minus size={15} />
                    </button>

                    <button
                      type="button"
                      onClick={() =>
                        setGuests((value) =>
                          Math.min(10, value + 1)
                        )
                      }
                      className="flex h-8 w-8 items-center justify-center rounded-full border border-slate-200 text-slate-600 transition hover:bg-slate-50"
                    >
                      <Plus size={15} />
                    </button>
                  </div>
                </div>
              </div>

              {/* PRICE BREAKDOWN */}
              {hotelData.priceFrom ? (
                <div className="mt-6 border-t border-slate-100 pt-5">
                  <div className="flex items-center justify-between text-sm text-slate-600">
                    <span>
                      {formatPrice(price)} × {nights}{" "}
                      {nights === 1 ? "night" : "nights"}
                    </span>

                    <span>{formatPrice(roomTotal)}</span>
                  </div>

                  <div className="mt-3 flex items-center justify-between text-sm text-slate-600">
                    <span>Service fee</span>

                    <span>{formatPrice(serviceFee)}</span>
                  </div>

                  <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-4">
                    <span className="font-bold text-slate-900">
                      Estimated total
                    </span>

                    <span className="text-xl font-bold text-slate-900">
                      {formatPrice(estimatedTotal)}
                    </span>
                  </div>
                </div>
              ) : (
                <div className="mt-6 rounded-xl bg-slate-50 p-4 text-sm leading-6 text-slate-600">
                  Current room rates depend on your selected dates,
                  room type and availability.
                </div>
              )}

              {/* RESERVE */}
              <button
                type="button"
                onClick={handleReserve}
                className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-sky-600 px-5 py-3.5 font-semibold text-white transition hover:bg-sky-700"
              >
                Reserve Now
              </button>

              {/* DEMO NOTICE */}
              <div className="mt-4 flex items-center justify-center gap-2 text-xs text-slate-500">
                <ShieldCheck
                  size={15}
                  className="text-emerald-600"
                />

                <span>Demo booking — no payment is processed</span>
              </div>

              {/* PRICE SOURCE */}
              {hotelData.priceSource && (
                <p className="mt-4 text-center text-xs text-slate-400">
                  Price reference: {hotelData.priceSource}
                </p>
              )}
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
};

export default HotelDetailsPage;