import mongoose, { Document, Schema } from "mongoose";

export interface IEmailVerification extends Document {
  email: string;
  name: string;
  phone: string;
  password: string;
  otp: string;
  expiresAt: Date;
  attempts: number;
  createdAt: Date;
}

const emailVerificationSchema =
  new Schema<IEmailVerification>(
    {
      email: {
        type: String,
        required: true,
        lowercase: true,
        trim: true,
      },

      name: {
        type: String,
        required: true,
        trim: true,
      },

      phone: {
        type: String,
        required: true,
        trim: true,
      },

      password: {
        type: String,
        required: true,
      },

      otp: {
        type: String,
        required: true,
      },

      expiresAt: {
        type: Date,
        required: true,
        index: true,
      },

      attempts: {
        type: Number,
        default: 0,
      },
    },
    {
      timestamps: true,
    }
  );

// Automatically remove expired verification records
emailVerificationSchema.index(
  { expiresAt: 1 },
  { expireAfterSeconds: 0 }
);

const EmailVerification =
  mongoose.model<IEmailVerification>(
    "EmailVerification",
    emailVerificationSchema
  );

export default EmailVerification;