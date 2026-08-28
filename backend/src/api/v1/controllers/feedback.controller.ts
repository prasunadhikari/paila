import { Request, Response } from "express";
import Feedback from "../../../models/Feedback.js";

export async function createFeedbackController(
  req: Request,
  res: Response
) {
  try {
    const { name, location, rating, message } = req.body;

    if (!name || !location || !rating || !message) {
      return res.status(400).json({
        success: false,
        message: "All fields are required.",
      });
    }

    if (typeof rating !== "number" || rating < 1 || rating > 5) {
      return res.status(400).json({
        success: false,
        message: "Rating must be between 1 and 5.",
      });
    }

    const feedback = await Feedback.create({
      name,
      location,
      rating,
      message,
    });

    return res.status(201).json({
      success: true,
      message: "Thank you for your feedback!",
      feedback: {
        id: feedback._id,
        name: feedback.name,
        location: feedback.location,
        rating: feedback.rating,
        message: feedback.message,
      },
    });
  } catch (error) {
    console.error("Create feedback error:", error);

    return res.status(500).json({
      success: false,
      message: "Something went wrong while submitting your feedback.",
    });
  }
}