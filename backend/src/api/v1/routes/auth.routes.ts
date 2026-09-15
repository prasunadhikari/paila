import { Router } from "express";

import {
  registerController,
  verifyOtpController,
  loginController,
  meController,
  updateProfileController,
} from "../controllers/auth.controller.js";

import { authenticate } from "../../../middleware/auth.middleware.js";

const router = Router();

router.post("/register", registerController);

router.post("/verify-otp", verifyOtpController);

router.post("/login", loginController);

router.get("/me", authenticate, meController);

router.put("/profile", authenticate, updateProfileController);

export default router;