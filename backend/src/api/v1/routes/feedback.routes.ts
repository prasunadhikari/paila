import { Router } from "express";

import {
  createFeedbackController,
  getApprovedFeedbackController,
  getAllFeedbackController,
  approveFeedbackController,
  rejectFeedbackController,
} from "../controllers/feedback.controller.js";

import { authenticate } from "../../../middleware/auth.middleware.js";
import { requireAdmin } from "../../../middleware/admin.middleware.js";

const router = Router();

// Public
router.post("/", createFeedbackController);
router.get("/approved", getApprovedFeedbackController);

// Admin
router.get(
  "/admin",
  authenticate,
  requireAdmin,
  getAllFeedbackController
);

router.patch(
  "/admin/:id/approve",
  authenticate,
  requireAdmin,
  approveFeedbackController
);

router.delete(
  "/admin/:id",
  authenticate,
  requireAdmin,
  rejectFeedbackController
);

export default router;