import {
  useEffect,
  useRef,
  useState,
  type Dispatch,
  type ReactNode,
  type SetStateAction,
} from "react";
import {
  ArrowLeftRight,
  CalendarDays,
  ChevronDown,
  Clock3,
  ExternalLink,
  MapPin,
  Plane,
  Plus,
  Search,
  Users,
  X,
} from "lucide-react";

import Sidebar from "../../../components/layout/Sidebar";
import {
  getFlightBookingLinks,
  searchAirports,
  searchFlights,
  type Airport,
  type BookingLinksResponse,
  type FlightItinerary,
  type FlightLeg,
} from "../../../api/flights";

/* =========================================================
   HELPERS
========================================================= */

function getToday() {
  const date = new Date();

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

function formatDate(date?: string) {
  if (!date) return "";

  const parsed = new Date(`${date}T00:00:00`);

  return parsed.toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function formatTime(value?: string) {
  if (!value) return "--:--";

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return date.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
}

function formatDuration(minutes?: number) {
  if (!minutes) return "—";

  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;

  if (hours === 0) {
    return `${mins}m`;
  }

  if (mins === 0) {
    return `${hours}h`;
  }

  return `${hours}h ${mins}m`;
}

function formatPrice(
  amount?: number,
  currency = "USD"
) {
  if (typeof amount !== "number") {
    return "Price unavailable";
  }

  try {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency,
      maximumFractionDigits: 0,
    }).format(amount);
  } catch {
    return `${currency} ${amount}`;
  }
}

function getStops(leg?: FlightLeg) {
  if (!leg?.segments?.length) return 0;

  return Math.max(leg.segments.length - 1, 0);
}

function getStopsLabel(leg?: FlightLeg) {
  const stops = getStops(leg);

  if (stops === 0) return "Direct";
  if (stops === 1) return "1 stop";

  return `${stops} stops`;
}

function getCarrierName(leg?: FlightLeg) {
  if (!leg) return "Airline";

  if (leg.carrier) {
    return leg.carrier;
  }

  const firstSegment = leg.segments?.[0];

  return (
    firstSegment?.operating_carrier_name ||
    firstSegment?.marketing_carrier_code ||
    "Airline"
  );
}

/* =========================================================
   AIRPORT FIELD
========================================================= */

type AirportFieldProps = {
  label: string;
  value: Airport | null;
  placeholder: string;
  icon: ReactNode;
  onChange: (airport: Airport | null) => void;
};

function AirportField({
  label,
  value,
  placeholder,
  icon,
  onChange,
}: AirportFieldProps) {
  const [query, setQuery] = useState(
    value
      ? `${value.city} (${value.code})`
      : ""
  );

  const [results, setResults] = useState<Airport[]>(
    []
  );

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setQuery(
      value
        ? `${value.city} (${value.code})`
        : ""
    );
  }, [value]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(
          event.target as Node
        )
      ) {
        setOpen(false);
      }
    };

    document.addEventListener(
      "mousedown",
      handleClickOutside
    );

    return () => {
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
    };
  }, []);

  useEffect(() => {
    if (query.trim().length < 2) {
      setResults([]);
      return;
    }

    const timeout = window.setTimeout(
      async () => {
        try {
          setLoading(true);

          const airports =
            await searchAirports(query);

          setResults(airports);
          setOpen(true);
        } catch (error) {
          console.error(
            "Airport search failed:",
            error
          );

          setResults([]);
        } finally {
          setLoading(false);
        }
      },
      350
    );

    return () => {
      window.clearTimeout(timeout);
    };
  }, [query]);

  const handleInputChange = (
    nextValue: string
  ) => {
    setQuery(nextValue);

    if (value) {
      onChange(null);
    }

    if (nextValue.length >= 2) {
      setOpen(true);
    } else {
      setOpen(false);
    }
  };

  return (
    <div
      ref={containerRef}
      className="relative flex-1"
    >
      <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">
        {label}
      </label>

      <div className="relative">
        <div className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
          {icon}
        </div>

        <input
          value={query}
          onChange={(event) =>
            handleInputChange(event.target.value)
          }
          onFocus={() => {
            if (query.length >= 2) {
              setOpen(true);
            }
          }}
          placeholder={placeholder}
          autoComplete="off"
          className="h-14 w-full rounded-2xl border border-slate-200 bg-slate-50 pl-11 pr-10 text-sm font-medium text-slate-900 outline-none transition focus:border-slate-400 focus:bg-white focus:ring-4 focus:ring-slate-100"
        />

        {query && (
          <button
            type="button"
            onClick={() => {
              setQuery("");
              onChange(null);
              setResults([]);
              setOpen(false);
            }}
            className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-1 text-slate-400 transition hover:bg-slate-200 hover:text-slate-700"
          >
            <X size={16} />
          </button>
        )}
      </div>

      {open && (
        <div className="absolute left-0 right-0 top-[calc(100%+8px)] z-50 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl">
          {loading ? (
            <div className="flex items-center gap-3 px-4 py-5 text-sm text-slate-500">
              <div className="h-4 w-4 animate-spin rounded-full border-2 border-slate-300 border-t-slate-900" />
              Searching airports...
            </div>
          ) : results.length > 0 ? (
            <div className="max-h-72 overflow-y-auto py-2">
              {results.map((airport) => (
                <button
                  key={`${airport.code}-${airport.airport}`}
                  type="button"
                  onClick={() => {
                    onChange(airport);
                    setQuery(
                      `${airport.city} (${airport.code})`
                    );
                    setOpen(false);
                  }}
                  className="flex w-full items-center gap-3 px-4 py-3 text-left transition hover:bg-slate-50"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-slate-600">
                    <Plane size={17} />
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-slate-900">
                        {airport.code}
                      </span>

                      <span className="truncate text-sm font-medium text-slate-700">
                        {airport.city}
                      </span>
                    </div>

                    <p className="truncate text-xs text-slate-500">
                      {airport.airport}
                      {airport.country
                        ? ` • ${airport.country}`
                        : ""}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          ) : query.length >= 2 ? (
            <div className="px-4 py-5 text-center text-sm text-slate-500">
              No airports found.
            </div>
          ) : null}
        </div>
      )}
    </div>
  );
}

/* =========================================================
   DATE FIELD
========================================================= */

type DateFieldProps = {
  label: string;
  value: string;
  min: string;
  disabled?: boolean;
  onChange: (value: string) => void;
};

function DateField({
  label,
  value,
  min,
  disabled = false,
  onChange,
}: DateFieldProps) {
  return (
    <div className="flex-1">
      <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">
        {label}
      </label>

      <div className="relative">
        <CalendarDays
          size={18}
          className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
        />

        <input
          type="date"
          value={value}
          min={min}
          disabled={disabled}
          onChange={(event) =>
            onChange(event.target.value)
          }
          className="h-14 w-full rounded-2xl border border-slate-200 bg-slate-50 pl-11 pr-4 text-sm font-semibold text-slate-900 outline-none transition focus:border-slate-400 focus:bg-white focus:ring-4 focus:ring-slate-100 disabled:cursor-not-allowed disabled:opacity-50"
        />
      </div>

      {value && (
        <p className="mt-1.5 pl-1 text-xs text-slate-400">
          {formatDate(value)}
        </p>
      )}
    </div>
  );
}

/* =========================================================
   PASSENGER SELECTOR
========================================================= */

type PassengerSelectorProps = {
  adults: number;
  children: number;
  setAdults: Dispatch<SetStateAction<number>>;
  setChildren: Dispatch<SetStateAction<number>>;
};

function PassengerSelector({
  adults,
  children,
  setAdults,
  setChildren,
}: PassengerSelectorProps) {
  const [open, setOpen] = useState(false);

  const totalPassengers =
    adults + children;

  return (
    <div className="relative">
      <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">
        Passengers
      </label>

      <button
        type="button"
        onClick={() => setOpen((current) => !current)}
        className="flex h-14 w-full items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 text-left transition hover:bg-white focus:border-slate-400 focus:ring-4 focus:ring-slate-100"
      >
        <Users
          size={18}
          className="shrink-0 text-slate-400"
        />

        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-semibold text-slate-900">
            {totalPassengers}{" "}
            {totalPassengers === 1
              ? "passenger"
              : "passengers"}
          </p>

          <p className="text-xs text-slate-400">
            Economy
          </p>
        </div>

        <ChevronDown
          size={17}
          className={`text-slate-400 transition ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      {open && (
        <div className="absolute right-0 top-[calc(100%+8px)] z-50 w-full min-w-[280px] rounded-2xl border border-slate-200 bg-white p-4 shadow-2xl">
          <PassengerRow
            label="Adults"
            description="12+ years"
            value={adults}
            min={1}
            onChange={setAdults}
          />

          <PassengerRow
            label="Children"
            description="2–11 years"
            value={children}
            min={0}
            onChange={setChildren}
          />

          <button
            type="button"
            onClick={() => setOpen(false)}
            className="mt-4 w-full rounded-xl bg-slate-900 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800"
          >
            Done
          </button>
        </div>
      )}
    </div>
  );
}

type PassengerRowProps = {
  label: string;
  description: string;
  value: number;
  min: number;
  onChange: Dispatch<SetStateAction<number>>;
};

function PassengerRow({
  label,
  description,
  value,
  min,
  onChange,
}: PassengerRowProps) {
  return (
    <div className="flex items-center justify-between py-3">
      <div>
        <p className="text-sm font-semibold text-slate-900">
          {label}
        </p>

        <p className="text-xs text-slate-400">
          {description}
        </p>
      </div>

      <div className="flex items-center gap-3">
        <button
          type="button"
          disabled={value <= min}
          onClick={() =>
            onChange((current) =>
              Math.max(min, current - 1)
            )
          }
          className="flex h-8 w-8 items-center justify-center rounded-full border border-slate-200 text-slate-600 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-30"
        >
          −
        </button>

        <span className="w-5 text-center text-sm font-bold text-slate-900">
          {value}
        </span>

        <button
          type="button"
          onClick={() =>
            onChange((current) => current + 1)
          }
          className="flex h-8 w-8 items-center justify-center rounded-full border border-slate-200 text-slate-600 transition hover:bg-slate-100"
        >
          <Plus size={15} />
        </button>
      </div>
    </div>
  );
}

/* =========================================================
   FLIGHT LEG
========================================================= */

function FlightLegView({
  label,
  leg,
}: {
  label: string;
  leg?: FlightLeg;
}) {
  const firstSegment = leg?.segments?.[0];
  const lastSegment =
    leg?.segments?.[leg.segments.length - 1];

  if (!firstSegment || !lastSegment) {
    return null;
  }

  return (
    <div className="rounded-2xl border border-slate-100 bg-slate-50 p-4">
      <div className="mb-4 flex items-center justify-between">
        <span className="text-xs font-bold uppercase tracking-[0.12em] text-slate-400">
          {label}
        </span>

        <span className="text-xs font-medium text-slate-500">
          {getStopsLabel(leg)}
        </span>
      </div>

      <div className="flex items-center gap-4">
        <div className="w-16 shrink-0">
          <p className="text-lg font-bold text-slate-900">
            {formatTime(
              firstSegment.departure_time_local
            )}
          </p>

          <p className="mt-1 text-xs font-bold text-slate-500">
            {firstSegment.departure_airport}
          </p>
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <div className="h-px flex-1 bg-slate-200" />

            <Plane
              size={15}
              className="shrink-0 rotate-90 text-slate-400"
            />

            <div className="h-px flex-1 bg-slate-200" />
          </div>

          <p className="mt-1 text-center text-[11px] text-slate-400">
            {formatDuration(leg.duration_minutes)}
          </p>
        </div>

        <div className="w-16 shrink-0 text-right">
          <p className="text-lg font-bold text-slate-900">
            {formatTime(
              lastSegment.arrival_time_local
            )}
          </p>

          <p className="mt-1 text-xs font-bold text-slate-500">
            {lastSegment.arrival_airport}
          </p>
        </div>
      </div>

      <div className="mt-3 flex items-center gap-2 text-xs text-slate-400">
        <span>
          {getCarrierName(leg)}
        </span>

        {firstSegment.flight_number && (
          <>
            <span>•</span>
            <span>
              {firstSegment.flight_number}
            </span>
          </>
        )}

        {firstSegment.aircraft && (
          <>
            <span>•</span>
            <span>
              {firstSegment.aircraft}
            </span>
          </>
        )}
      </div>
    </div>
  );
}

/* =========================================================
   FLIGHT CARD
========================================================= */

type FlightCardProps = {
  itinerary: FlightItinerary;
  onBook: (
    itinerary: FlightItinerary
  ) => Promise<void>;
  bookingLoading: boolean;
};

function FlightCard({
  itinerary,
  onBook,
  bookingLoading,
}: FlightCardProps) {
  const outboundCarrier =
    getCarrierName(itinerary.outbound);

  return (
    <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg">
      <div className="border-b border-slate-100 px-5 py-4 sm:px-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-900 text-white">
              <Plane size={19} />
            </div>

            <div>
              <p className="font-bold text-slate-900">
                {outboundCarrier}
              </p>

              <p className="text-xs text-slate-400">
                {itinerary.cabin_class ||
                  "Economy"}
              </p>
            </div>
          </div>

          {itinerary.requires_self_transfer && (
            <span className="rounded-full bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-700">
              Self-transfer
            </span>
          )}
        </div>
      </div>

      <div className="space-y-3 p-5 sm:p-6">
        <FlightLegView
          label="Outbound"
          leg={itinerary.outbound}
        />

        {itinerary.inbound && (
          <FlightLegView
            label="Return"
            leg={itinerary.inbound}
          />
        )}
      </div>

      <div className="flex flex-col gap-4 border-t border-slate-100 px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <div>
          <p className="text-xs font-medium text-slate-400">
            From
          </p>

          <p className="text-2xl font-black text-slate-900">
            {formatPrice(
              itinerary.price?.amount,
              itinerary.price?.currency
            )}
          </p>

          <p className="mt-0.5 text-xs text-slate-400">
            Flight fare
          </p>
        </div>

        <button
          type="button"
          disabled={bookingLoading}
          onClick={() => onBook(itinerary)}
          className="inline-flex h-12 items-center justify-center gap-2 rounded-2xl bg-slate-900 px-6 text-sm font-bold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {bookingLoading ? (
            <>
              <div className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
              Finding booking options...
            </>
          ) : (
            <>
              Book this flight
              <ExternalLink size={16} />
            </>
          )}
        </button>
      </div>
    </div>
  );
}

/* =========================================================
   MAIN PAGE
========================================================= */

export default function FlightsPage() {
  const today = getToday();

  const [tripType, setTripType] = useState<
    "round-trip" | "one-way"
  >("round-trip");

  const [from, setFrom] =
    useState<Airport | null>(null);

  const [to, setTo] =
    useState<Airport | null>(null);

  const [departure, setDeparture] =
    useState(today);

  const [returnDate, setReturnDate] =
    useState("");

  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);

  const [results, setResults] =
    useState<FlightItinerary[]>([]);

  const [searching, setSearching] =
    useState(false);

  const [bookingId, setBookingId] =
    useState<string | null>(null);

  const [error, setError] =
    useState("");

  const [searched, setSearched] =
    useState(false);

  const [bookingOptions, setBookingOptions] =
    useState<BookingLinksResponse | null>(
      null
    );

  /* -------------------------------------------------------
     RETURN DATE VALIDATION
  ------------------------------------------------------- */

  useEffect(() => {
    if (
      returnDate &&
      departure &&
      returnDate < departure
    ) {
      setReturnDate(departure);
    }
  }, [departure, returnDate]);

  /* -------------------------------------------------------
     SWAP AIRPORTS
  ------------------------------------------------------- */

  const handleSwap = () => {
    setFrom(to);
    setTo(from);
  };

  /* -------------------------------------------------------
     SEARCH
  ------------------------------------------------------- */

  const handleSearch = async () => {
    setError("");
    setBookingOptions(null);

    if (!from?.code) {
      setError(
        "Please select a departure airport."
      );
      return;
    }

    if (!to?.code) {
      setError(
        "Please select a destination airport."
      );
      return;
    }

    if (from.code === to.code) {
      setError(
        "Departure and destination cannot be the same."
      );
      return;
    }

    if (!departure) {
      setError(
        "Please select a departure date."
      );
      return;
    }

    if (
      tripType === "round-trip" &&
      !returnDate
    ) {
      setError(
        "Please select a return date."
      );
      return;
    }

    if (
      tripType === "round-trip" &&
      returnDate < departure
    ) {
      setError(
        "Return date cannot be before departure date."
      );
      return;
    }

    try {
      setSearching(true);
      setSearched(true);
      setResults([]);

      const response = await searchFlights({
        tripType,
        from: from.code,
        to: to.code,
        departure,
        ...(tripType === "round-trip"
          ? {
              returnDate,
            }
          : {}),
        adults,
        children,
      });

      setResults(
        Array.isArray(response?.itineraries)
          ? response.itineraries
          : []
      );
    } catch (searchError) {
      console.error(
        "Flight search failed:",
        searchError
      );

      setError(
        searchError instanceof Error
          ? searchError.message
          : "Unable to search flights."
      );
    } finally {
      setSearching(false);
    }
  };

  /* -------------------------------------------------------
     BOOKING
  ------------------------------------------------------- */

  const handleBook = async (
    itinerary: FlightItinerary
  ) => {
    try {
      setError("");
      setBookingId(itinerary.ignav_id);

      const response =
        await getFlightBookingLinks(
          itinerary.ignav_id
        );

      setBookingOptions(response);

      const firstLink =
        response?.booking_options?.[0]?.links?.[0]
          ?.url;

      if (firstLink) {
        window.open(
          firstLink,
          "_blank",
          "noopener,noreferrer"
        );
      } else {
        setError(
          "No booking provider was available for this flight."
        );
      }
    } catch (bookingError) {
      console.error(
        "Booking links failed:",
        bookingError
      );

      setError(
        bookingError instanceof Error
          ? bookingError.message
          : "Unable to get booking options."
      );
    } finally {
      setBookingId(null);
    }
  };

  /* -------------------------------------------------------
     PAGE
  ------------------------------------------------------- */

  return (
    <div className="min-h-screen bg-slate-50">
      <Sidebar />

      <main className="min-h-screen lg:ml-64">
        {/* =================================================
            HERO
        ================================================= */}

        <section className="relative overflow-visible bg-slate-950">
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -right-24 -top-32 h-96 w-96 rounded-full bg-white/5 blur-3xl" />

            <div className="absolute -left-20 bottom-0 h-72 w-72 rounded-full bg-slate-700/20 blur-3xl" />
          </div>

          <div className="relative mx-auto max-w-7xl px-4 pb-36 pt-12 sm:px-6 lg:px-8">
            <div className="max-w-3xl">
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-semibold text-slate-300">
                <Plane size={14} />
                Paila Flights
              </div>

              <h1 className="text-4xl font-black tracking-tight text-white sm:text-5xl lg:text-6xl">
                Find your next
                <span className="block text-slate-300">
                  journey.
                </span>
              </h1>

              <p className="mt-5 max-w-2xl text-base leading-7 text-slate-400 sm:text-lg">
                Search real flight fares and compare
                available options for your next trip.
              </p>
            </div>
          </div>
        </section>

        {/* =================================================
            SEARCH PANEL
        ================================================= */}

        <section className="relative z-20 mx-auto -mt-28 max-w-7xl px-4 pb-12 sm:px-6 lg:px-8">
          <div className="rounded-[28px] border border-slate-200 bg-white p-4 shadow-2xl sm:p-6 lg:p-7">
            {/* Trip type */}

            <div className="mb-6 flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={() =>
                  setTripType("round-trip")
                }
                className={`rounded-full px-4 py-2 text-sm font-bold transition ${
                  tripType === "round-trip"
                    ? "bg-slate-900 text-white"
                    : "bg-slate-100 text-slate-500 hover:bg-slate-200"
                }`}
              >
                Round trip
              </button>

              <button
                type="button"
                onClick={() =>
                  setTripType("one-way")
                }
                className={`rounded-full px-4 py-2 text-sm font-bold transition ${
                  tripType === "one-way"
                    ? "bg-slate-900 text-white"
                    : "bg-slate-100 text-slate-500 hover:bg-slate-200"
                }`}
              >
                One way
              </button>
            </div>

            {/* Airport row */}

            <div className="flex flex-col gap-3 lg:flex-row lg:items-end">
              <AirportField
                label="From"
                value={from}
                placeholder="City or airport"
                icon={<MapPin size={18} />}
                onChange={setFrom}
              />

              <div className="flex shrink-0 justify-center lg:pb-0">
                <button
                  type="button"
                  onClick={handleSwap}
                  disabled={!from && !to}
                  title="Swap airports"
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-500 shadow-sm transition hover:bg-slate-50 hover:text-slate-900 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  <ArrowLeftRight
                    size={18}
                  />
                </button>
              </div>

              <AirportField
                label="To"
                value={to}
                placeholder="City or airport"
                icon={<MapPin size={18} />}
                onChange={setTo}
              />
            </div>

            {/* Dates and passengers */}

            <div className="mt-5 grid gap-3 lg:grid-cols-[1fr_1fr_1fr_auto]">
              <DateField
                label="Departure"
                value={departure}
                min={today}
                onChange={setDeparture}
              />

              <DateField
                label="Return"
                value={returnDate}
                min={departure || today}
                disabled={
                  tripType === "one-way"
                }
                onChange={(value) => {
                  if (
                    value &&
                    departure &&
                    value < departure
                  ) {
                    setReturnDate(departure);
                    return;
                  }

                  setReturnDate(value);
                }}
              />

              <PassengerSelector
                adults={adults}
                children={children}
                setAdults={setAdults}
                setChildren={setChildren}
              />

              <div className="flex items-end">
                <button
                  type="button"
                  onClick={handleSearch}
                  disabled={searching}
                  className="flex h-14 w-full items-center justify-center gap-2 rounded-2xl bg-slate-900 px-7 text-sm font-bold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60 lg:w-auto"
                >
                  {searching ? (
                    <>
                      <div className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                      Searching
                    </>
                  ) : (
                    <>
                      <Search size={18} />
                      Search flights
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Error */}

            {error && (
              <div className="mt-5 rounded-2xl border border-red-100 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
                {error}
              </div>
            )}

            {/* Booking options */}

            {(bookingOptions?.booking_options?.length ?? 0) >
              0 && (
              <div className="mt-5 rounded-2xl border border-emerald-100 bg-emerald-50 p-4">
                <div className="mb-3">
                  <p className="font-bold text-emerald-900">
                    Booking options
                  </p>

                  <p className="text-xs text-emerald-700">
                    Choose a provider to continue
                    your booking.
                  </p>
                </div>

                <div className="flex flex-wrap gap-2">
                  {bookingOptions?.booking_options
                    ?.flatMap(
                      (option) => option.links
                    )
                    .map((link, index) => (
                      <a
                        key={`${link.url}-${index}`}
                        href={link.url}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 rounded-xl bg-white px-4 py-2.5 text-sm font-bold text-slate-900 shadow-sm transition hover:shadow-md"
                      >
                        {link.provider_name ||
                          "Book flight"}

                        <ExternalLink
                          size={14}
                        />
                      </a>
                    ))}
                </div>
              </div>
            )}
          </div>
        </section>

        {/* =================================================
            RESULTS
        ================================================= */}

        <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
          {searching && (
            <div className="space-y-4">
              {[1, 2, 3].map((item) => (
                <div
                  key={item}
                  className="animate-pulse rounded-3xl border border-slate-200 bg-white p-6"
                >
                  <div className="h-6 w-40 rounded bg-slate-100" />

                  <div className="mt-6 h-28 rounded-2xl bg-slate-100" />

                  <div className="mt-4 h-12 rounded-xl bg-slate-100" />
                </div>
              ))}
            </div>
          )}

          {!searching &&
            searched &&
            results.length === 0 && (
              <div className="rounded-3xl border border-slate-200 bg-white px-6 py-16 text-center">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-100">
                  <Plane
                    size={26}
                    className="text-slate-400"
                  />
                </div>

                <h2 className="mt-5 text-xl font-black text-slate-900">
                  No flights found
                </h2>

                <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">
                  Try different dates, airports or
                  passenger settings and search again.
                </p>
              </div>
            )}

          {!searching &&
            !searched && (
              <div className="grid gap-4 md:grid-cols-3">
                <InfoCard
                  icon={<Search size={19} />}
                  title="Search real fares"
                  text="Compare available flight options using real-time fare data."
                />

                <InfoCard
                  icon={<Clock3 size={19} />}
                  title="Flexible dates"
                  text="Choose your departure and return dates directly from the search panel."
                />

                <InfoCard
                  icon={<ExternalLink size={19} />}
                  title="Book externally"
                  text="Select a flight and continue securely with an available booking provider."
                />
              </div>
            )}

          {!searching &&
            searched &&
            results.length > 0 && (
              <div>
                <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
                  <div>
                    <p className="text-sm font-semibold text-slate-500">
                      {results.length}{" "}
                      {results.length === 1
                        ? "flight"
                        : "flights"}{" "}
                      found
                    </p>

                    <h2 className="text-2xl font-black text-slate-900">
                      Available flights
                    </h2>
                  </div>

                  <div className="text-sm text-slate-400">
                    {from?.code} → {to?.code}
                  </div>
                </div>

                <div className="space-y-4">
                  {results.map(
                    (itinerary, index) => (
                      <FlightCard
                        key={
                          itinerary.ignav_id ||
                          `${index}-${itinerary.price?.amount}`
                        }
                        itinerary={itinerary}
                        onBook={handleBook}
                        bookingLoading={
                          bookingId ===
                          itinerary.ignav_id
                        }
                      />
                    )
                  )}
                </div>
              </div>
            )}
        </section>
      </main>
    </div>
  );
}

/* =========================================================
   INFO CARD
========================================================= */

function InfoCard({
  icon,
  title,
  text,
}: {
  icon: ReactNode;
  title: string;
  text: string;
}) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6">
      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-slate-700">
        {icon}
      </div>

      <h3 className="mt-5 font-bold text-slate-900">
        {title}
      </h3>

      <p className="mt-2 text-sm leading-6 text-slate-500">
        {text}
      </p>
    </div>
  );
}