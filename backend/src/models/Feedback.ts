import mongoose, { Schema, Document } from "mongoose";

export interface IFeedback extends Document {
  name: string;
  location: string;
  rating: number;
  message: string;
  approved: boolean;
  createdAt: Date;
}

const feedbackSchema = new Schema<IFeedback>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      maxlength: 80,
    },
    location: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
    },
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },
    message: {
      type: String,
      required: true,
      trim: true,
      maxlength: 500,
    },
    approved: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<IFeedback>("Feedback", feedbackSchema);