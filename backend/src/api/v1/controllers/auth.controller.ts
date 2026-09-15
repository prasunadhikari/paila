import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { parsePhoneNumberFromString } from "libphonenumber-js";

import User from "../../../models/User.js";
import EmailVerification from "../../../models/EmailVerification.js";
import { sendVerificationOtp } from "../../../services/email.service.js";
import { AuthRequest } from "../../../middleware/auth.middleware.js";

/* =========================================================
   REGISTER - SEND OTP
========================================================= */

export async function registerController(
  req: Request,
  res: Response
) {
  try {
    const { name, email, phone, password } = req.body;

    // Required fields
    if (!name || !email || !phone || !password) {
      return res.status(400).json({
        success: false,
        message:
          "Name, email, phone number and password are required",
      });
    }

    const cleanName = String(name).trim();
    const cleanEmail = String(email).toLowerCase().trim();
    const cleanPhone = String(phone).trim();

    // Name validation
    if (cleanName.length < 2) {
      return res.status(400).json({
        success: false,
        message: "Name must be at least 2 characters long",
      });
    }

    if (cleanName.length > 50) {
      return res.status(400).json({
        success: false,
        message: "Name cannot exceed 50 characters",
      });
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(cleanEmail)) {
      return res.status(400).json({
        success: false,
        message: "Please enter a valid email address",
      });
    }

    // Phone validation
    const phoneNumber = parsePhoneNumberFromString(cleanPhone);

    if (!phoneNumber || !phoneNumber.isValid()) {
      return res.status(400).json({
        success: false,
        message: "Please enter a valid contact number",
      });
    }

    const formattedPhone = phoneNumber.number;

    // Password validation
    if (password.length < 8) {
      return res.status(400).json({
        success: false,
        message:
          "Password must be at least 8 characters long",
      });
    }

    if (!/[A-Z]/.test(password)) {
      return res.status(400).json({
        success: false,
        message:
          "Password must contain at least one uppercase letter",
      });
    }

    if (!/[0-9]/.test(password)) {
      return res.status(400).json({
        success: false,
        message:
          "Password must contain at least one number",
      });
    }

    if (!/[^A-Za-z0-9]/.test(password)) {
      return res.status(400).json({
        success: false,
        message:
          "Password must contain at least one special character",
      });
    }

    // Check existing email
    const existingUser = await User.findOne({
      email: cleanEmail,
    });

    if (existingUser) {
      return res.status(409).json({
        success: false,
        message:
          "An account with this email already exists",
      });
    }

    // Remove any previous OTP request for this email
    await EmailVerification.deleteMany({
      email: cleanEmail,
    });

    // Generate secure 6-digit OTP
    const otp = Math.floor(
      100000 + Math.random() * 900000
    ).toString();

    // Hash password before temporarily storing it
    const hashedPassword = await bcrypt.hash(password, 12);

    // OTP expires in 10 minutes
    const expiresAt = new Date(
      Date.now() + 10 * 60 * 1000
    );

    await EmailVerification.create({
      name: cleanName,
      email: cleanEmail,
      phone: formattedPhone,
      password: hashedPassword,
      otp,
      expiresAt,
      attempts: 0,
    });

    // Send OTP email
    try {
      await sendVerificationOtp(cleanEmail, otp);
    } catch (emailError) {
      console.error("OTP email error:", emailError);

      await EmailVerification.deleteMany({
        email: cleanEmail,
      });

      return res.status(500).json({
        success: false,
        message:
          "Unable to send verification email. Please try again.",
      });
    }

    return res.status(200).json({
      success: true,
      message:
        "Verification code sent to your email",
      email: cleanEmail,
    });
  } catch (error) {
    console.error("Registration error:", error);

    return res.status(500).json({
      success: false,
      message:
        "Something went wrong while starting registration",
    });
  }
}

/* =========================================================
   VERIFY OTP
========================================================= */

export async function verifyOtpController(
  req: Request,
  res: Response
) {
  try {
    const { email, otp } = req.body;

    if (!email || !otp) {
      return res.status(400).json({
        success: false,
        message: "Email and verification code are required",
      });
    }

    const cleanEmail = String(email).toLowerCase().trim();
    const cleanOtp = String(otp).trim();

    if (!/^\d{6}$/.test(cleanOtp)) {
      return res.status(400).json({
        success: false,
        message: "Verification code must be 6 digits",
      });
    }

    const verification = await EmailVerification.findOne({
      email: cleanEmail,
    });

    if (!verification) {
      return res.status(404).json({
        success: false,
        message:
          "Verification request not found. Please register again.",
      });
    }

    // Check expiration
    if (verification.expiresAt.getTime() < Date.now()) {
      await EmailVerification.deleteOne({
        _id: verification._id,
      });

      return res.status(410).json({
        success: false,
        message:
          "Verification code has expired. Please register again.",
      });
    }

    // Limit incorrect attempts
    if (verification.attempts >= 5) {
      await EmailVerification.deleteOne({
        _id: verification._id,
      });

      return res.status(429).json({
        success: false,
        message:
          "Too many incorrect attempts. Please register again.",
      });
    }

    // Check OTP
    if (verification.otp !== cleanOtp) {
      verification.attempts += 1;
      await verification.save();

      return res.status(400).json({
        success: false,
        message: "Incorrect verification code",
      });
    }

    // Double-check email wasn't registered meanwhile
    const existingUser = await User.findOne({
      email: cleanEmail,
    });

    if (existingUser) {
      await EmailVerification.deleteOne({
        _id: verification._id,
      });

      return res.status(409).json({
        success: false,
        message:
          "An account with this email already exists",
      });
    }

    // Create the actual account only after OTP verification
    const user = await User.create({
      name: verification.name,
      email: verification.email,
      phone: verification.phone,
      password: verification.password,
      emailVerified: true,
    });

    // OTP cannot be reused
    await EmailVerification.deleteOne({
      _id: verification._id,
    });

    // Create JWT
    const jwtSecret = process.env.JWT_SECRET;

    if (!jwtSecret) {
      throw new Error(
        "JWT_SECRET is not defined in .env"
      );
    }

    const token = jwt.sign(
      {
        userId: user._id.toString(),
      },
      jwtSecret,
      {
        expiresIn: "7d",
      }
    );

    return res.status(201).json({
      success: true,
      message:
        "Email verified and account created successfully",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("OTP verification error:", error);

    return res.status(500).json({
      success: false,
      message:
        "Something went wrong while verifying your email",
    });
  }
}

/* =========================================================
   LOGIN
========================================================= */

export async function loginController(
  req: Request,
  res: Response
) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required",
      });
    }

    const cleanEmail = email.toLowerCase().trim();

    const user = await User.findOne({
      email: cleanEmail,
    });

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    const passwordMatches = await bcrypt.compare(
      password,
      user.password
    );

    if (!passwordMatches) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    const jwtSecret = process.env.JWT_SECRET;

    if (!jwtSecret) {
      throw new Error(
        "JWT_SECRET is not defined in .env"
      );
    }

    const token = jwt.sign(
      {
        userId: user._id.toString(),
      },
      jwtSecret,
      {
        expiresIn: "7d",
      }
    );

    return res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Login error:", error);

    return res.status(500).json({
      success: false,
      message:
        "Something went wrong while logging in",
    });
  }
}

/* =========================================================
   CURRENT USER
========================================================= */

export async function meController(
  req: AuthRequest,
  res: Response
) {
  try {
    if (!req.userId) {
      return res.status(401).json({
        success: false,
        message: "Authentication required",
      });
    }

    const user = await User.findById(req.userId).select(
      "-password"
    );

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    return res.status(200).json({
      success: true,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Get current user error:", error);

    return res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
}

/* =========================================================
   UPDATE PROFILE
========================================================= */

export async function updateProfileController(
  req: AuthRequest,
  res: Response
) {
  try {
    if (!req.userId) {
      return res.status(401).json({
        success: false,
        message: "Authentication required",
      });
    }

    const { name, phone } = req.body;

    if (!name || !phone) {
      return res.status(400).json({
        success: false,
        message: "Name and phone number are required",
      });
    }

    const cleanName = name.trim();
    const cleanPhone = phone.trim();

    if (cleanName.length < 2) {
      return res.status(400).json({
        success: false,
        message: "Name must be at least 2 characters long",
      });
    }

    if (cleanName.length > 50) {
      return res.status(400).json({
        success: false,
        message: "Name cannot exceed 50 characters",
      });
    }

    const phoneNumber =
      parsePhoneNumberFromString(cleanPhone);

    if (!phoneNumber || !phoneNumber.isValid()) {
      return res.status(400).json({
        success: false,
        message: "Please enter a valid contact number",
      });
    }

    const user = await User.findById(req.userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    user.name = cleanName;
    user.phone = phoneNumber.number;

    await user.save();

    return res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Update profile error:", error);

    return res.status(500).json({
      success: false,
      message:
        "Something went wrong while updating your profile",
    });
  }
}