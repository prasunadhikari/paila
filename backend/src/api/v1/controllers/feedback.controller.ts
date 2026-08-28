import { Request, Response } from "express";
import Feedback from "../../../models/Feedback.js";
import { AuthRequest } from "../../../middleware/auth.middleware.js";

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
        approved: feedback.approved,
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

export async function getApprovedFeedbackController(
  _req: Request,
  res: Response
) {
  try {
    const feedback = await Feedback.find({
      approved: true,
    })
      .sort({ createdAt: -1 })
      .select("-__v");

    return res.status(200).json({
      success: true,
      feedback,
    });
  } catch (error) {
    console.error("Get approved feedback error:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to load feedback.",
    });
  }
}

export async function getAllFeedbackController(
  _req: AuthRequest,
  res: Response
) {
  try {
    const feedback = await Feedback.find()
      .sort({ createdAt: -1 })
      .select("-__v");

    return res.status(200).json({
      success: true,
      feedback,
    });
  } catch (error) {
    console.error("Get all feedback error:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to load feedback.",
    });
  }
}

export async function approveFeedbackController(
  req: AuthRequest,
  res: Response
) {
  try {
    const { id } = req.params;

    const feedback = await Feedback.findByIdAndUpdate(
      id,
      { approved: true },
      { new: true }
    );

    if (!feedback) {
      return res.status(404).json({
        success: false,
        message: "Feedback not found.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Feedback approved successfully.",
      feedback,
    });
  } catch (error) {
    console.error("Approve feedback error:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to approve feedback.",
    });
  }
}

export async function rejectFeedbackController(
  req: AuthRequest,
  res: Response
) {
  try {
    const { id } = req.params;

    const feedback = await Feedback.findByIdAndDelete(id);

    if (!feedback) {
      return res.status(404).json({
        success: false,
        message: "Feedback not found.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Feedback rejected successfully.",
    });
  } catch (error) {
    console.error("Reject feedback error:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to reject feedback.",
    });
  }
}