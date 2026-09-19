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
      tripType,
    });

    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "X-Api-Key": apiKey,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const responseText = await response.text();

    console.log("Ignav response status:", response.status);
    console.log("Ignav response body:", responseText);

    let data: unknown;

    try {
      data = JSON.parse(responseText);
    } catch {
      data = {
        raw: responseText,
      };
    }

    if (!response.ok) {
      return res.status(response.status).json({
        message: "Unable to search flights.",
        ignavStatus: response.status,
        details: data,
      });
    }

    return res.status(200).json(data);
  } catch (error) {
    console.error("Flight search request failed:", error);

    return res.status(500).json({
      message: "Flight search request failed.",
      error: error instanceof Error ? error.message : String(error),
    });
  }
}

export async function getFlightBookingLinks(
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
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ignav_id: ignavId,
        }),
      }
    );

    const responseText = await response.text();

    console.log("Ignav booking-links status:", response.status);
    console.log("Ignav booking-links response:", responseText);

    let data: unknown;

    try {
      data = JSON.parse(responseText);
    } catch {
      data = {
        raw: responseText,
      };
    }

    if (!response.ok) {
      return res.status(response.status).json({
        message: "Unable to generate booking links.",
        ignavStatus: response.status,
        details: data,
      });
    }

    return res.status(200).json(data);
  } catch (error) {
    console.error("Booking-link request failed:", error);

    return res.status(500).json({
      message: "Booking-link request failed.",
      error: error instanceof Error ? error.message : String(error),
    });
  }
}