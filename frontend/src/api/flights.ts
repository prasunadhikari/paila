import { apiRequest } from "./client";

/* =========================================================
   TYPES
========================================================= */

export type FlightSearchParams = {
  tripType: "round-trip" | "one-way";
  from: string;
  to: string;
  departure: string;
  returnDate?: string;
  adults: number;
  children: number;
};

export type Airport = {
  code: string;
  city: string;
  airport: string;
  country?: string;
};

export type FlightSegment = {
  marketing_carrier_code?: string;
  flight_number?: string;
  operating_carrier_name?: string;
  departure_airport: string;
  departure_time_local: string;
  arrival_airport: string;
  arrival_time_local: string;
  duration_minutes?: number;
  aircraft?: string;
};

export type FlightLeg = {
  carrier?: string;
  duration_minutes?: number;
  segments: FlightSegment[];
};

export type FlightItinerary = {
  price: {
    amount: number;
    currency: string;
    status?: string;
  };
  outbound: FlightLeg;
  inbound?: FlightLeg;
  cabin_class?: string;
  requires_self_transfer?: boolean;
  ignav_id: string;
};

export type FlightSearchResponse = {
  origin: string;
  destination: string;
  departure_date: string;
  return_date?: string;
  itineraries: FlightItinerary[];
};

export type BookingLink = {
  provider_name: string;
  provider_type: string;
  fare_name?: string;
  price?: {
    amount: number;
    currency: string;
    status?: string;
  };
  url: string;
};

export type BookingLinksResponse = {
  itinerary: FlightItinerary;
  booking_options: {
    legs: string[];
    links: BookingLink[];
  }[];
};

/* =========================================================
   SEARCH FLIGHTS
========================================================= */

export async function searchFlights(
  params: FlightSearchParams
): Promise<FlightSearchResponse> {
  return apiRequest<FlightSearchResponse>("/flights/search", {
    method: "POST",
    body: JSON.stringify(params),
  });
}

/* =========================================================
   SEARCH AIRPORTS
========================================================= */

export async function searchAirports(
  query: string
): Promise<Airport[]> {
  const normalizedQuery = query.trim();

  if (normalizedQuery.length < 2) {
    return [];
  }

  const response = await apiRequest<unknown>(
    `/flights/airports?q=${encodeURIComponent(
      normalizedQuery
    )}&limit=50`
  );

  const rawItems = extractAirportItems(response);

  const airports = rawItems
    .map(normalizeAirport)
    .filter(
      (airport): airport is Airport =>
        Boolean(airport && airport.code)
    );

  /*
   * Remove duplicate airports.
   */
  const uniqueAirports = new Map<string, Airport>();

  for (const airport of airports) {
    const key = airport.code.toUpperCase();

    if (!uniqueAirports.has(key)) {
      uniqueAirports.set(key, airport);
    }
  }

  return Array.from(uniqueAirports.values());
}

/* =========================================================
   BOOKING LINKS
========================================================= */

export async function getFlightBookingLinks(
  ignavId: string
): Promise<BookingLinksResponse> {
  return apiRequest<BookingLinksResponse>(
    "/flights/booking-links",
    {
      method: "POST",
      body: JSON.stringify({
        ignavId,
      }),
    }
  );
}

/* =========================================================
   AIRPORT RESPONSE PARSER
========================================================= */

function extractAirportItems(
  response: unknown
): unknown[] {
  if (Array.isArray(response)) {
    return response;
  }

  if (!isObject(response)) {
    return [];
  }

  /*
   * Handle common API response shapes:
   *
   * [
   *   ...
   * ]
   *
   * {
   *   data: [...]
   * }
   *
   * {
   *   airports: [...]
   * }
   *
   * {
   *   results: [...]
   * }
   *
   * {
   *   items: [...]
   * }
   *
   * {
   *   data: {
   *     airports: [...]
   *   }
   * }
   */

  const directArrays = [
    response.data,
    response.airports,
    response.results,
    response.items,
    response.locations,
  ];

  for (const value of directArrays) {
    if (Array.isArray(value)) {
      return value;
    }
  }

  if (isObject(response.data)) {
    const nestedArrays = [
      response.data.airports,
      response.data.results,
      response.data.items,
      response.data.locations,
    ];

    for (const value of nestedArrays) {
      if (Array.isArray(value)) {
        return value;
      }
    }
  }

  /*
   * Some APIs wrap the actual response inside
   * `result`.
   */
  if (isObject(response.result)) {
    const nestedArrays = [
      response.result.airports,
      response.result.results,
      response.result.items,
      response.result.locations,
      response.result.data,
    ];

    for (const value of nestedArrays) {
      if (Array.isArray(value)) {
        return value;
      }
    }
  }

  return [];
}

/* =========================================================
   HELPERS
========================================================= */

function isObject(
  value: unknown
): value is Record<string, any> {
  return (
    typeof value === "object" &&
    value !== null &&
    !Array.isArray(value)
  );
}

function normalizeAirport(
  item: unknown
): Airport | null {
  if (!isObject(item)) {
    return null;
  }

  const code = String(
    item.code ??
      item.iata_code ??
      item.iataCode ??
      item.iata ??
      item.iataCode3 ??
      ""
  )
    .trim()
    .toUpperCase();

  const city = String(
    item.city ??
      item.city_name ??
      item.cityName ??
      item.location ??
      item.municipality ??
      item.municipality_name ??
      ""
  ).trim();

  const airport = String(
    item.airport ??
      item.airport_name ??
      item.airportName ??
      item.facility_name ??
      item.title ??
      item.name ??
      ""
  ).trim();

  const country = String(
    item.country ??
      item.country_name ??
      item.countryName ??
      item.country_code ??
      ""
  ).trim();

  if (!code) {
    return null;
  }

  return {
    code,
    city: city || airport || code,
    airport: airport || city || code,
    country: country || undefined,
  };
}