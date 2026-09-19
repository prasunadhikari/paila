import { Router } from "express";

import {
  searchFlights,
  getFlightBookingLinks,
  searchAirports,
} from "../controllers/flights.controller.js";

const router = Router();

/*
 * Airport autocomplete
 * GET /api/v1/flights/airports?q=kathmandu&limit=8
 */
router.get("/airports", searchAirports);

/*
 * Flight search
 * POST /api/v1/flights/search
 */
router.post("/search", searchFlights);

/*
 * Generate external booking links
 * POST /api/v1/flights/booking-links
 */
router.post("/booking-links", getFlightBookingLinks);

export default router;