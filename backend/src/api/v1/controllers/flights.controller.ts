import { Request, Response } from "express";

const IGNAV_BASE_URL = "https://ignav.com/api";

type FlightSearchBody = {
  tripType?: "round-trip" | "one-way";
  from?: string;
  to?: string;
  departure?: string;
  returnDate?: string;
  adults?: number;
  children?: number;
};

type Airport = {
  code: string;
  city: string;
  airport: string;
  country?: string;
};

/* =========================================================
   HELPERS
========================================================= */

function isObject(value: unknown): value is Record<string, any> {
  return (
    typeof value === "object" &&
    value !== null &&
    !Array.isArray(value)
  );
}

function getFirstString(
  item: Record<string, any>,
  keys: string[]
): string {
  for (const key of keys) {
    const value = item[key];

    if (
      typeof value === "string" &&
      value.trim()
    ) {
      return value.trim();
    }

    if (
      typeof value === "number" &&
      Number.isFinite(value)
    ) {
      return String(value);
    }
  }

  return "";
}

/* =========================================================
   NORMALIZE AIRPORT
========================================================= */

function normalizeAirport(item: unknown): Airport | null {
  if (!isObject(item)) {
    return null;
  }

  const code = getFirstString(item, [
    "code",
    "iata_code",
    "iata",
    "iataCode",
    "airport_code",
    "airportCode",
    "iata_airport_code",
  ]).toUpperCase();

  const city = getFirstString(item, [
    "city",
    "city_name",
    "cityName",
    "municipality",
    "location",
  ]);

  const airport = getFirstString(item, [
    "airport",
    "airport_name",
    "airportName",
    "name",
    "display_name",
    "displayName",
  ]);

  const country = getFirstString(item, [
    "country",
    "country_name",
    "countryName",
    "country_code",
    "countryCode",
  ]);

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

/* =========================================================
   EXTRACT AIRPORT ARRAY
========================================================= */

function extractAirportItems(data: unknown): unknown[] {
  if (Array.isArray(data)) {
    return data;
  }

  if (!isObject(data)) {
    return [];
  }

  const possibleArrays = [
    data.airports,
    data.data,
    data.results,
    data.items,
    data.locations,
  ];

  for (const value of possibleArrays) {
    if (Array.isArray(value)) {
      return value;
    }
  }

  /*
   * Handle nested structures such as:
   *
   * {
   *   data: {
   *     airports: [...]
   *   }
   * }
   */
  if (isObject(data.data)) {
    const nestedArrays = [
      data.data.airports,
      data.data.results,
      data.data.items,
      data.data.locations,
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
   SEARCH FLIGHTS
========================================================= */

export async function searchFlights(req: Request, res: Response) {
  try {
    const apiKey = process.env.IGNAV_API_KEY;

    if (!apiKey) {
      console.error("IGNAV_API_KEY is missing");

      return res.status(500).json({
        message: "Flight API is not configured.",
      });
    }

    const {
      tripType = "round-trip",
      from,
      to,
      departure,
      returnDate,
      adults = 1,
      children = 0,
    } = req.body as FlightSearchBody;

    if (!from || !to || !departure) {
      return res.status(400).json({
        message: "From, destination and departure date are required.",
      });
    }

    if (from === to) {
      return res.status(400).json({
        message: "Departure and destination cannot be the same.",
      });
    }

    if (tripType === "round-trip" && !returnDate) {
      return res.status(400).json({
        message: "Return date is required for a round trip.",
      });
    }

    if (
      tripType === "round-trip" &&
      returnDate &&
      returnDate < departure
    ) {
      return res.status(400).json({
        message: "Return date cannot be before departure date.",
      });
    }

    if (adults < 1 || children < 0) {
      return res.status(400).json({
        message: "Invalid passenger count.",
      });
    }

    const endpoint =
      tripType === "round-trip"
        ? `${IGNAV_BASE_URL}/fares/round-trip`
        : `${IGNAV_BASE_URL}/fares/one-way`;

    const payload: Record<string, unknown> = {
      origin: from,
      destination: to,
      departure_date: departure,
      adults,
      children,
      cabin_class: "economy",
      market: "NP",
    };

    if (tripType === "round-trip") {
      payload.return_date = returnDate;
    }

    console.log("Ignav flight search:", {
      endpoint,
      origin: from,
      destination: to,
      departure,
      returnDate,
      tripType,
    });

    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "X-Api-Key": apiKey,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(payload),
    });

    const responseText = await response.text();

    console.log(
      "Ignav flight response status:",
      response.status
    );

    let data: unknown;

    try {
      data = JSON.parse(responseText);
    } catch {
      data = {
        raw: responseText,
      };
    }

    if (!response.ok) {
      console.error(
        "Ignav flight search error:",
        data
      );

      return res.status(response.status).json({
        message: "Unable to search flights.",
        ignavStatus: response.status,
        details: data,
      });
    }

    return res.status(200).json(data);
  } catch (error) {
    console.error(
      "Flight search request failed:",
      error
    );

    return res.status(500).json({
      message: "Flight search request failed.",
      error:
        error instanceof Error
          ? error.message
          : String(error),
    });
  }
}

/* =========================================================
   AIRPORT SEARCH
========================================================= */

export async function searchAirports(
  req: Request,
  res: Response
) {
  try {
    const apiKey = process.env.IGNAV_API_KEY;

    if (!apiKey) {
      console.error("IGNAV_API_KEY is missing");

      return res.status(500).json({
        message: "Flight API is not configured.",
      });
    }

    const query = String(
      req.query.q || ""
    ).trim();

    if (query.length < 2) {
      return res.status(200).json([]);
    }

    /*
     * IMPORTANT:
     * Ignav's /airports endpoint rejects the `limit`
     * query parameter with a 400 error.
     *
     * Therefore we only send `q`.
     */
    const url = new URL(
      `${IGNAV_BASE_URL}/airports`
    );

    url.searchParams.set("q", query);

    console.log(
      "Ignav airport search:",
      url.toString()
    );

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "X-Api-Key": apiKey,
        Accept: "application/json",
      },
    });

    const responseText = await response.text();

    console.log(
      "Ignav airport response status:",
      response.status
    );

    let data: unknown;

    try {
      data = JSON.parse(responseText);
    } catch {
      data = {
        raw: responseText,
      };
    }

    /*
     * Keep the raw response in the server log while
     * debugging the Ignav airport API.
     */
    console.log(
      "Ignav airport response:",
      JSON.stringify(data)
    );

    if (!response.ok) {
      console.error(
        "Ignav airport search error:",
        data
      );

      return res.status(response.status).json({
        message: "Unable to search airports.",
        ignavStatus: response.status,
        details: data,
      });
    }

    /*
     * Convert Ignav's response into a predictable
     * airport array for the Paila frontend.
     */
    const rawAirports =
      extractAirportItems(data);

    const airports = rawAirports
      .map(normalizeAirport)
      .filter(
        (airport): airport is Airport =>
          Boolean(
            airport &&
            airport.code
          )
      );

    /*
     * Remove duplicate airport codes.
     */
    const uniqueAirports = Array.from(
      new Map(
        airports.map((airport) => [
          airport.code,
          airport,
        ])
      ).values()
    );

    console.log(
      `Normalized ${uniqueAirports.length} airports for "${query}".`
    );

    return res.status(200).json(
      uniqueAirports
    );
  } catch (error) {
    console.error(
      "Airport search error:",
      error
    );

    return res.status(500).json({
      message:
        "Something went wrong while searching airports.",
      error:
        error instanceof Error
          ? error.message
          : String(error),
    });
  }
}

/* =========================================================
   BOOKING LINKS
========================================================= */

export async function getFlightBookingLinks(
  req: Request,
  res: Response
) {
  try {
    const apiKey =
      process.env.IGNAV_API_KEY;

    if (!apiKey) {
      console.error(
        "IGNAV_API_KEY is missing"
      );

      return res.status(500).json({
        message:
          "Flight API is not configured.",
      });
    }

    const { ignavId } = req.body;

    if (!ignavId) {
      return res.status(400).json({
        message: "ignavId is required.",
      });
    }

    const response = await fetch(
      `${IGNAV_BASE_URL}/fares/booking-links`,
      {
        method: "POST",
        headers: {
          "X-Api-Key": apiKey,
          "Content-Type":
            "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          ignav_id: ignavId,
        }),
      }
    );

    const responseText =
      await response.text();

    let data: unknown;

    try {
      data = JSON.parse(
        responseText
      );
    } catch {
      data = {
        raw: responseText,
      };
    }

    if (!response.ok) {
      console.error(
        "Ignav booking-links error:",
        data
      );

      return res.status(
        response.status
      ).json({
        message:
          "Unable to generate booking links.",
        ignavStatus:
          response.status,
        details: data,
      });
    }

    return res.status(200).json(data);
  } catch (error) {
    console.error(
      "Booking-link request failed:",
      error
    );

    return res.status(500).json({
      message:
        "Booking-link request failed.",
      error:
        error instanceof Error
          ? error.message
          : String(error),
    });
  }
}