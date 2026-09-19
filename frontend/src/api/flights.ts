import { apiRequest } from "./client";

export type FlightSearchParams = {
  tripType: "round-trip" | "one-way";
  from: string;
  to: string;
  departure: string;
  returnDate?: string;
  adults: number;
  children: number;
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

export async function searchFlights(
  params: FlightSearchParams
): Promise<FlightSearchResponse> {
  return apiRequest<FlightSearchResponse>("/flights/search", {
    method: "POST",
    body: JSON.stringify(params),
  });
}

export async function getFlightBookingLinks(
  ignavId: string
): Promise<BookingLinksResponse> {
  return apiRequest<BookingLinksResponse>("/flights/booking-links", {
    method: "POST",
    body: JSON.stringify({
      ignavId,
    }),
  });
}