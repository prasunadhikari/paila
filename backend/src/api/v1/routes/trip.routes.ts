import { Router } from "express";
import { generateTripController } from "../controllers/trip.controller.js";

const router = Router();

router.post("/generate", generateTripController);

export default router;