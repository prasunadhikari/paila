import { useState } from "react";
import {
  ArrowRightLeft,
  CalendarDays,
  ChevronDown,
  Clock3,
  ExternalLink,
  Loader2,
  Plane,
  Search,
  Users,
} from "lucide-react";

import {
  getFlightBookingLinks,
  searchFlights,
  type BookingLink,
  type FlightItinerary,
  type FlightLeg,
} from "../../../api/flights";

type TripType = "round-trip" | "one-way";

const airports = [
  {
    code: "KTM",
    city: "Kathmandu",
    airport: "Tribhuvan International Airport",
  },
  {
    code: "PKR",
    city: "Pokhara",
    airport: "Pokhara International Airport",
  },
  {
    code: "BWA",
    city: "Bhairahawa",
    airport: "Gautam Buddha International Airport",
  },
  {
    code: "DEL",
    city: "Delhi",
    airport: "Indira Gandhi International Airport",
  },
  {
    code: "DXB",
    city: "Dubai",
    airport: "Dubai International Airport",
  },
  {
    code: "DOH",
    city: "Doha",
    airport: "Hamad International Airport",
  },
];

export default function FlightsPage() {
  const [tripType, setTripType] = useState<TripType>("round-trip");
  const [from, setFrom] = useState("KTM");
  const [to, setTo] = useState("PKR");
  const [departure, setDeparture] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  const [showPassengers, setShowPassengers] = useState(false);

  const [results, setResults] = useState<FlightItinerary[]>([]);
  const [searching, setSearching] = useState(false);
  const [searchError, setSearchError] = useState("");

  const [bookingLoadingId, setBookingLoadingId] = useState<string | null>(
    null
  );

  const [bookingOptions, setBookingOptions] = useState<
    Record<string, BookingLink[]>
  >({});

  const selectedFrom = airports.find((airport) => airport.code === from);
  const selectedTo = airports.find((airport) => airport.code === to);

  const swapAirports = () => {
    setFrom(to);
    setTo(from);
  };

  const handleSearch = async () => {
    setSearchError("");
    setResults([]);
    setBookingOptions({});

    if (!from || !to || !departure) {
      setSearchError(
        "Please select your departure, destination and departure date."
      );
      return;
    }

    if (from === to) {
      setSearchError("Departure and destination cannot be the same.");
      return;
    }

    if (tripType === "round-trip" && !returnDate) {
      setSearchError("Please select a return date for a round trip.");
      return;
    }

    if (
      tripType === "round-trip" &&
      returnDate &&
      returnDate < departure
    ) {
      setSearchError("Return date cannot be before the departure date.");
      return;
    }

    try {
      setSearching(true);

      const data = await searchFlights({
        tripType,
        from,
        to,
        departure,
        returnDate: tripType === "round-trip" ? returnDate : undefined,
        adults,
        children,
      });

      setResults(data.itineraries ?? []);

      if (!data.itineraries?.length) {
        setSearchError(
          "No flights were found for this route and date. Try another date or destination."
        );
      }
    } catch (error) {
      console.error("Flight search failed:", error);

      setSearchError(
        error instanceof Error
          ? error.message
          : "Unable to search flights right now."
      );
    } finally {
      setSearching(false);
    }
  };

  const handleBookFlight = async (itinerary: FlightItinerary) => {
    try {
      setBookingLoadingId(itinerary.ignav_id);
      setSearchError("");

      const data = await getFlightBookingLinks(itinerary.ignav_id);

      const links = (data.booking_options ?? []).flatMap(
        (option) => option.links ?? []
      );

      setBookingOptions((current) => ({
        ...current,
        [itinerary.ignav_id]: links,
      }));

      if (!links.length) {
        setSearchError(
          "No booking provider is currently available for this flight."
        );
      }
    } catch (error) {
      console.error("Booking link request failed:", error);

      setSearchError(
        error instanceof Error
          ? error.message
          : "Unable to get booking options right now."
      );
    } finally {
      setBookingLoadingId(null);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* HERO */}
      <section className="relative overflow-hidden bg-slate-950">
        <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-sky-500/20 blur-3xl" />
        <div className="absolute -bottom-32 -left-24 h-80 w-80 rounded-full bg-emerald-500/10 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-4 pb-36 pt-28 sm:px-6 lg:px-8 lg:pb-40 lg:pt-20">
          <div className="max-w-3xl">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-4 py-2 text-xs font-semibold text-sky-200 backdrop-blur-sm">
              <Plane className="h-4 w-4" />
              Flight Search
            </div>

            <h1 className="text-4xl font-black tracking-tight text-white sm:text-5xl lg:text-6xl">
              Fly to your next
              <span className="block text-sky-400">adventure.</span>
            </h1>

            <p className="mt-5 max-w-2xl text-sm leading-7 text-slate-300 sm:text-base">
              Search real flight options, compare prices and continue to a
              booking provider when you are ready.
            </p>
          </div>
        </div>
      </section>

      {/* SEARCH CARD */}
      <section className="relative z-10 mx-auto -mt-28 max-w-6xl px-4 pb-12 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-slate-200 bg-white p-4 shadow-2xl shadow-slate-900/10 sm:p-6">
          {/* TRIP TYPE */}
          <div className="mb-6 flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={() => setTripType("round-trip")}
              className={`rounded-full px-5 py-2.5 text-sm font-bold transition ${
                tripType === "round-trip"
                  ? "bg-slate-900 text-white shadow-sm"
                  : "bg-slate-100 text-slate-500 hover:bg-slate-200"
              }`}
            >
              Round Trip
            </button>

            <button
              type="button"
              onClick={() => {
                setTripType("one-way");
                setReturnDate("");
              }}
              className={`rounded-full px-5 py-2.5 text-sm font-bold transition ${
                tripType === "one-way"
                  ? "bg-slate-900 text-white shadow-sm"
                  : "bg-slate-100 text-slate-500 hover:bg-slate-200"
              }`}
            >
              One Way
            </button>
          </div>

          {/* ROUTE */}
          <div className="grid gap-3 lg:grid-cols-[1fr_auto_1fr]">
            <AirportSelect
              label="From"
              value={from}
              selectedAirport={selectedFrom}
              onChange={setFrom}
            />

            <div className="flex items-center justify-center lg:pt-5">
              <button
                type="button"
                onClick={swapAirports}
                aria-label="Swap airports"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-500 shadow-sm transition hover:border-sky-200 hover:bg-sky-50 hover:text-sky-600 active:scale-95"
              >
                <ArrowRightLeft className="h-4 w-4" />
              </button>
            </div>

            <AirportSelect
              label="To"
              value={to}
              selectedAirport={selectedTo}
              onChange={setTo}
            />
          </div>

          {/* DATE + PASSENGERS */}
          <div className="mt-3 grid gap-3 md:grid-cols-2 lg:grid-cols-3">
            <DateField
              label="Departure"
              value={departure}
              onChange={setDeparture}
            />

            <DateField
              label="Return"
              value={returnDate}
              onChange={setReturnDate}
              disabled={tripType === "one-way"}
              min={departure || undefined}
            />

            <div className="relative">
              <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-slate-400">
                Passengers
              </label>

              <button
                type="button"
                onClick={() => setShowPassengers((value) => !value)}
                className="flex h-[60px] w-full items-center justify-between rounded-2xl border border-slate-200 bg-white px-4 text-left transition hover:border-sky-300"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-sky-50 text-sky-600">
                    <Users className="h-4 w-4" />
                  </div>

                  <div>
                    <p className="text-sm font-bold text-slate-800">
                      {adults + children}{" "}
                      {adults + children === 1
                        ? "Passenger"
                        : "Passengers"}
                    </p>

                    <p className="text-xs text-slate-400">
                      {adults} Adult{adults !== 1 ? "s" : ""}
                      {children > 0
                        ? `, ${children} Child${
                            children !== 1 ? "ren" : ""
                          }`
                        : ""}
                    </p>
                  </div>
                </div>

                <ChevronDown
                  className={`h-4 w-4 text-slate-400 transition ${
                    showPassengers ? "rotate-180" : ""
                  }`}
                />
              </button>

              {showPassengers && (
                <PassengerDropdown
                  adults={adults}
                  children={children}
                  setAdults={setAdults}
                  setChildren={setChildren}
                  onDone={() => setShowPassengers(false)}
                />
              )}
            </div>
          </div>

          {/* ERROR */}
          {searchError && (
            <div className="mt-4 rounded-2xl border border-red-100 bg-red-50 px-4 py-3 text-sm font-medium text-red-600">
              {searchError}
            </div>
          )}

          {/* SEARCH */}
          <button
            type="button"
            onClick={handleSearch}
            disabled={searching}
            className="mt-5 flex w-full items-center justify-center gap-2 rounded-2xl bg-emerald-600 px-6 py-4 text-sm font-extrabold text-white shadow-lg shadow-emerald-600/20 transition hover:bg-emerald-700 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-70"
          >
            {searching ? (
              <>
                <Loader2 className="h-5 w-5 animate-spin" />
                Searching Flights...
              </>
            ) : (
              <>
                <Search className="h-5 w-5" />
                Search Flights
              </>
            )}
          </button>
        </div>
      </section>

      {/* RESULTS */}
      {results.length > 0 && (
        <section className="mx-auto max-w-6xl px-4 pb-12 sm:px-6 lg:px-8">
          <div className="mb-5 flex flex-col justify-between gap-2 sm:flex-row sm:items-end">
            <div>
              <p className="text-xs font-black uppercase tracking-widest text-emerald-600">
                Flight Results
              </p>

              <h2 className="mt-1 text-2xl font-black text-slate-900 sm:text-3xl">
                {from} → {to}
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                {results.length} flight option
                {results.length !== 1 ? "s" : ""} found
              </p>
            </div>

            <div className="rounded-full bg-white px-4 py-2 text-xs font-semibold text-slate-500 shadow-sm ring-1 ring-slate-200">
              {tripType === "round-trip" ? "Round trip" : "One way"}
            </div>
          </div>

          <div className="space-y-4">
            {results.map((itinerary) => (
              <FlightCard
                key={itinerary.ignav_id}
                itinerary={itinerary}
                bookingLinks={bookingOptions[itinerary.ignav_id]}
                bookingLoading={
                  bookingLoadingId === itinerary.ignav_id
                }
                onBook={() => handleBookFlight(itinerary)}
              />
            ))}
          </div>
        </section>
      )}

      {/* EMPTY / INFO */}
      {!searching && results.length === 0 && (
        <section className="mx-auto max-w-6xl px-4 pb-16 sm:px-6 lg:px-8">
          <div className="grid gap-4 md:grid-cols-3">
            <InfoCard
              number="01"
              title="Search"
              description="Choose your route, dates and passengers."
            />
            <InfoCard
              number="02"
              title="Compare"
              description="Review available flight options, prices and schedules."
            />
            <InfoCard
              number="03"
              title="Book"
              description="Choose a booking provider and continue to their website."
            />
          </div>
        </section>
      )}
    </div>
  );
}

function FlightCard({
  itinerary,
  bookingLinks,
  bookingLoading,
  onBook,
}: {
  itinerary: FlightItinerary;
  bookingLinks?: BookingLink[];
  bookingLoading: boolean;
  onBook: () => void;
}) {
  const outbound = itinerary.outbound;
  const inbound = itinerary.inbound;

  return (
    <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition hover:shadow-lg">
      <div className="p-5 sm:p-6">
        <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-center">
          <div className="min-w-0">
            <FlightLegView
              label="Outbound"
              leg={outbound}
              priceCurrency={itinerary.price.currency}
            />

            {inbound && (
              <>
                <div className="my-5 h-px bg-slate-100" />

                <FlightLegView
                  label="Return"
                  leg={inbound}
                  priceCurrency={itinerary.price.currency}
                />
              </>
            )}
          </div>

          <div className="border-t border-slate-100 pt-5 lg:min-w-[190px] lg:border-l lg:border-t-0 lg:pl-6 lg:pt-0">
            <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
              From
            </p>

            <div className="mt-1 flex items-baseline gap-2">
              <span className="text-2xl font-black text-slate-900">
                {formatPrice(
                  itinerary.price.amount,
                  itinerary.price.currency
                )}
              </span>
            </div>

            <p className="mt-1 text-[11px] text-slate-400">
              {itinerary.price.status === "verified"
                ? "Verified fare"
                : "Search price"}
            </p>

            {itinerary.requires_self_transfer && (
              <div className="mt-3 rounded-xl bg-amber-50 px-3 py-2 text-xs font-semibold text-amber-700">
                Self-transfer may be required
              </div>
            )}

            {!bookingLinks?.length ? (
              <button
                type="button"
                onClick={onBook}
                disabled={bookingLoading}
                className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-slate-900 px-4 py-3 text-sm font-bold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {bookingLoading ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Finding booking options...
                  </>
                ) : (
                  <>
                    <ExternalLink className="h-4 w-4" />
                    Book Flight
                  </>
                )}
              </button>
            ) : (
              <div className="mt-4 space-y-2">
                <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Choose provider
                </p>

                {bookingLinks.map((link, index) => (
                  <a
                    key={`${link.url}-${index}`}
                    href={normalizeUrl(link.url)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-bold text-slate-800 transition hover:border-emerald-300 hover:bg-emerald-50"
                  >
                    <span className="min-w-0">
                      <span className="block truncate">
                        {link.provider_name}
                      </span>

                      {link.price && (
                        <span className="mt-0.5 block text-xs font-semibold text-slate-400">
                          {formatPrice(
                            link.price.amount,
                            link.price.currency
                          )}
                        </span>
                      )}
                    </span>

                    <ExternalLink className="h-4 w-4 shrink-0 text-emerald-600" />
                  </a>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function FlightLegView({
  label,
  leg,
}: {
  label: string;
  leg: FlightLeg;
  priceCurrency?: string;
}) {
  const firstSegment = leg.segments?.[0];
  const lastSegment = leg.segments?.[leg.segments.length - 1];

  if (!firstSegment || !lastSegment) {
    return null;
  }

  const stops = Math.max(0, leg.segments.length - 1);

  return (
    <div>
      <div className="mb-4 flex items-center justify-between gap-3">
        <span className="rounded-full bg-sky-50 px-3 py-1 text-xs font-bold text-sky-600">
          {label}
        </span>

        <span className="text-xs font-semibold text-slate-400">
          {leg.carrier || "Airline"}
        </span>
      </div>

      <div className="grid gap-4 sm:grid-cols-[1fr_auto_1fr] sm:items-center">
        <AirportTime
          code={firstSegment.departure_airport}
          time={firstSegment.departure_time_local}
          align="left"
        />

        <div className="flex min-w-[120px] flex-col items-center">
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-400">
            <Clock3 className="h-3.5 w-3.5" />
            {formatDuration(leg.duration_minutes)}
          </div>

          <div className="my-2 flex w-full items-center gap-2">
            <div className="h-px flex-1 bg-slate-200" />
            <Plane className="h-4 w-4 rotate-90 text-sky-500" />
            <div className="h-px flex-1 bg-slate-200" />
          </div>

          <span className="text-xs font-bold text-slate-500">
            {stops === 0
              ? "Nonstop"
              : `${stops} stop${stops > 1 ? "s" : ""}`}
          </span>
        </div>

        <AirportTime
          code={lastSegment.arrival_airport}
          time={lastSegment.arrival_time_local}
          align="right"
        />
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {leg.segments.map((segment, index) => (
          <span
            key={`${segment.flight_number}-${index}`}
            className="rounded-full bg-slate-100 px-3 py-1.5 text-[11px] font-bold text-slate-500"
          >
            {segment.marketing_carrier_code || "FL"}
            {segment.flight_number || ""}
          </span>
        ))}
      </div>
    </div>
  );
}

function AirportTime({
  code,
  time,
  align,
}: {
  code: string;
  time: string;
  align: "left" | "right";
}) {
  return (
    <div className={align === "right" ? "text-right" : "text-left"}>
      <p className="text-2xl font-black tracking-tight text-slate-900 sm:text-3xl">
        {formatTime(time)}
      </p>

      <p className="mt-1 text-sm font-black text-slate-600">{code}</p>

      <p className="mt-0.5 text-xs text-slate-400">
        {formatDateTime(time)}
      </p>
    </div>
  );
}

function AirportSelect({
  label,
  value,
  selectedAirport,
  onChange,
}: {
  label: string;
  value: string;
  selectedAirport?: (typeof airports)[number];
  onChange: (value: string) => void;
}) {
  return (
    <div>
      <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-slate-400">
        {label}
      </label>

      <div className="relative">
        <div className="pointer-events-none absolute left-4 top-1/2 z-10 -translate-y-1/2">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-sky-50 text-sky-600">
            <Plane className="h-4 w-4" />
          </div>
        </div>

        <select
          value={value}
          onChange={(event) => onChange(event.target.value)}
          className="h-[60px] w-full appearance-none rounded-2xl border border-slate-200 bg-white pl-16 pr-10 text-sm font-bold text-slate-800 outline-none transition hover:border-sky-300 focus:border-sky-400 focus:ring-4 focus:ring-sky-100"
        >
          {airports.map((airport) => (
            <option key={airport.code} value={airport.code}>
              {airport.city} ({airport.code})
            </option>
          ))}
        </select>

        <ChevronDown className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
      </div>

      <p className="mt-1.5 pl-1 text-[11px] text-slate-400">
        {selectedAirport?.airport}
      </p>
    </div>
  );
}

function DateField({
  label,
  value,
  onChange,
  disabled = false,
  min,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
  min?: string;
}) {
  const today = new Date().toISOString().split("T")[0];

  return (
    <div>
      <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-slate-400">
        {label}
      </label>

      <div className="relative">
        <div className="pointer-events-none absolute left-4 top-1/2 z-10 -translate-y-1/2">
          <div
            className={`flex h-9 w-9 items-center justify-center rounded-xl ${
              disabled
                ? "bg-slate-100 text-slate-300"
                : "bg-sky-50 text-sky-600"
            }`}
          >
            <CalendarDays className="h-4 w-4" />
          </div>
        </div>

        <input
          type="date"
          value={value}
          onChange={(event) => onChange(event.target.value)}
          disabled={disabled}
          min={min || today}
          className="h-[60px] w-full rounded-2xl border border-slate-200 bg-white pl-16 pr-4 text-sm font-bold text-slate-800 outline-none transition hover:border-sky-300 focus:border-sky-400 focus:ring-4 focus:ring-sky-100 disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-300"
        />
      </div>
    </div>
  );
}

function PassengerDropdown({
  adults,
  children,
  setAdults,
  setChildren,
  onDone,
}: {
  adults: number;
  children: number;
  setAdults: React.Dispatch<React.SetStateAction<number>>;
  setChildren: React.Dispatch<React.SetStateAction<number>>;
  onDone: () => void;
}) {
  return (
    <div className="absolute left-0 right-0 top-[82px] z-30 rounded-2xl border border-slate-200 bg-white p-4 shadow-2xl shadow-slate-900/10">
      <PassengerRow
        label="Adults"
        description="12+ years"
        value={adults}
        min={1}
        onDecrease={() =>
          setAdults((value) => Math.max(1, value - 1))
        }
        onIncrease={() => setAdults((value) => value + 1)}
      />

      <div className="my-3 h-px bg-slate-100" />

      <PassengerRow
        label="Children"
        description="2–11 years"
        value={children}
        min={0}
        onDecrease={() =>
          setChildren((value) => Math.max(0, value - 1))
        }
        onIncrease={() => setChildren((value) => value + 1)}
      />

      <button
        type="button"
        onClick={onDone}
        className="mt-4 w-full rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-bold text-white transition hover:bg-slate-800"
      >
        Done
      </button>
    </div>
  );
}

function PassengerRow({
  label,
  description,
  value,
  min,
  onDecrease,
  onIncrease,
}: {
  label: string;
  description: string;
  value: number;
  min: number;
  onDecrease: () => void;
  onIncrease: () => void;
}) {
  return (
    <div className="flex items-center justify-between gap-4">
      <div>
        <p className="text-sm font-bold text-slate-800">{label}</p>
        <p className="mt-0.5 text-xs text-slate-400">
          {description}
        </p>
      </div>

      <div className="flex items-center gap-3">
        <button
          type="button"
          disabled={value <= min}
          onClick={onDecrease}
          className="flex h-8 w-8 items-center justify-center rounded-full border border-slate-200 text-slate-600 transition hover:border-sky-300 hover:text-sky-600 disabled:cursor-not-allowed disabled:opacity-40"
        >
          −
        </button>

        <span className="w-5 text-center text-sm font-bold text-slate-800">
          {value}
        </span>

        <button
          type="button"
          onClick={onIncrease}
          className="flex h-8 w-8 items-center justify-center rounded-full border border-slate-200 text-slate-600 transition hover:border-sky-300 hover:text-sky-600"
        >
          +
        </button>
      </div>
    </div>
  );
}

function InfoCard({
  number,
  title,
  description,
}: {
  number: string;
  title: string;
  description: string;
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5">
      <span className="text-xs font-black tracking-widest text-emerald-600">
        {number}
      </span>

      <h3 className="mt-3 text-lg font-black text-slate-900">
        {title}
      </h3>

      <p className="mt-1 text-sm leading-6 text-slate-500">
        {description}
      </p>
    </div>
  );
}

function formatTime(value?: string) {
  if (!value) return "--:--";

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return value.slice(11, 16) || value;
  }

  return new Intl.DateTimeFormat("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).format(date);
}

function formatDateTime(value?: string) {
  if (!value) return "";

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return value.slice(0, 10);
  }

  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
  }).format(date);
}

function formatDuration(minutes?: number) {
  if (minutes === undefined || minutes === null) {
    return "--";
  }

  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;

  if (hours === 0) {
    return `${remainingMinutes}m`;
  }

  return `${hours}h ${remainingMinutes}m`;
}

function formatPrice(amount: number, currency: string) {
  try {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency,
      maximumFractionDigits: 0,
    }).format(amount);
  } catch {
    return `${currency} ${amount.toLocaleString()}`;
  }
}

function normalizeUrl(url: string) {
  if (url.startsWith("http://") || url.startsWith("https://")) {
    return url;
  }

  return `https://${url}`;
}