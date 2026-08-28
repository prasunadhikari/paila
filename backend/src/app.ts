import express from "express";
import cors from "cors";

import authRoutes from "./api/v1/routes/auth.routes.js";
import feedbackRoutes from "./api/v1/routes/feedback.routes.js";
import aiRoutes from "./api/v1/routes/ai.routes.js";

const app = express();

app.use(cors());
app.use(express.json());

/* =========================
   HEALTH CHECK
========================= */

app.get("/", (_req, res) => {
  res.json({
    success: true,
    message: "Paila Backend Running 🚀",
  });
});

/* =========================
   API ROUTES
========================= */

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/feedback", feedbackRoutes);
app.use("/api/v1/ai", aiRoutes);

export default app;