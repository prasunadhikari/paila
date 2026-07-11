import { Router } from "express";
import { generateTripController } from "../controllers/trip.controller";

const router = Router();

router.post("/generate", generateTripController);

export default router;