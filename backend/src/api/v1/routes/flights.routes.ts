import { Router } from "express";

import {
  searchFlights,
  getFlightBookingLinks,
} from "../controllers/flights.controller";

const router = Router();

router.post("/search", searchFlights);
router.post("/booking-links", getFlightBookingLinks);

export default router;