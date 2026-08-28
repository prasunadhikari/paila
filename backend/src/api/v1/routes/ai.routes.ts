import { Router } from "express";
import { chatWithAI } from "../controllers/ai.controller.js";
import { authenticate } from "../../../middleware/auth.middleware";

const router = Router();

/* =========================
   PAILA AI CHAT
========================= */

/*
 * Protected route:
 * Only authenticated users can use Paila AI.
 *
 * POST /api/v1/ai/chat
 */
router.post(
  "/chat",
  authenticate,
  chatWithAI
);

export default router;
