import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import tripRoutes from "./api/v1/routes/trip.routes.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (_req, res) => {
  res.json({
    success: true,
    message: "Paila Backend Running 🚀",
  });
});

app.use("/api/v1/trip", tripRoutes);

export default app;