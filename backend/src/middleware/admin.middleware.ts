import { NextFunction, Response } from "express";
import User from "../models/User.js";
import { AuthRequest } from "./auth.middleware.js";

export async function requireAdmin(
  req: AuthRequest,
  res: Response,
  next: NextFunction
) {
  try {
    if (!req.userId) {
      return res.status(401).json({
        success: false,
        message: "Authentication required",
      });
    }

    const user = await User.findById(req.userId).select("email");

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User not found",
      });
    }

    const adminEmail = process.env.ADMIN_EMAIL?.toLowerCase().trim();

    if (!adminEmail || user.email !== adminEmail) {
      return res.status(403).json({
        success: false,
        message: "Admin access required",
      });
    }

    next();
  } catch (error) {
    console.error("Admin authorization error:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to verify admin access",
    });
  }
}