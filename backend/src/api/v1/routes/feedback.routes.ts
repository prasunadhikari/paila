import { Router } from "express";

import {
  createFeedbackController,
} from "../controllers/feedback.controller.js";

const router = Router();

router.post("/", createFeedbackController);

export default router;