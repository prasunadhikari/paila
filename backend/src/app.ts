import express from "express";
import cors from "cors";

import authRoutes from "./api/v1/routes/auth.routes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (_req, res) => {
  res.json({
    success: true,
    message: "Paila Backend Running 🚀",
  });
});

app.use("/api/v1/auth", authRoutes);

export default app;