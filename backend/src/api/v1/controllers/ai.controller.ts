import OpenAI from "openai";
import { Response } from "express";
import { AuthRequest } from "../../../middleware/auth.middleware.js";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

/* =========================
   PAILA AI SYSTEM PROMPT
========================= */

const PAILA_SYSTEM_PROMPT = `
You are Paila AI, a friendly and knowledgeable travel assistant
focused on Nepal.

Your job is to help travelers discover and understand Nepal.

You can help with:
- Nepal destinations
- Things to do
- Places to visit
- Transportation
- Food and local cuisine
- Approximate travel costs
- Budget travel
- Trekking and adventure
- Culture and traditions
- Weather and seasons
- Travel tips
- Safety advice
- Suggested itineraries
- Comparing destinations
- Best time to visit places

Important rules:
1. Give practical and easy-to-understand answers.
2. Prefer Nepal-specific information.
3. If the user asks about a destination, explain what makes it special,
   things to do, best time to visit, approximate cost, transportation,
   and useful tips when relevant.
4. Do not invent exact prices, opening hours, transportation schedules,
   permits, or other time-sensitive information.
5. Clearly say when information may change.
6. If the user asks something unrelated to travel, politely explain that
   Paila AI is primarily designed for Nepal travel.
7. Keep responses conversational and helpful.
8. Do not claim to have personally visited any place.
9. Do not pretend to have live information unless it is actually provided.
10. When appropriate, organize information using short headings and bullet points.

You are part of Paila, a Nepal-focused travel platform.
`;

interface ChatRequestBody {
  message?: string;
}

export async function chatWithAI(
  req: AuthRequest,
  res: Response
) {
  try {
    const { message } = req.body as ChatRequestBody;

    /* =========================
       VALIDATE MESSAGE
    ========================== */

    if (!message || typeof message !== "string") {
      return res.status(400).json({
        success: false,
        message: "Please provide a message.",
      });
    }

    const trimmedMessage = message.trim();

    if (!trimmedMessage) {
      return res.status(400).json({
        success: false,
        message: "Please enter a message.",
      });
    }

    if (trimmedMessage.length > 4000) {
      return res.status(400).json({
        success: false,
        message: "Message is too long. Please keep it under 4000 characters.",
      });
    }

    /* =========================
       CHECK API KEY
    ========================== */

    if (!process.env.OPENAI_API_KEY) {
      console.error("OPENAI_API_KEY is not configured.");

      return res.status(500).json({
        success: false,
        message: "Paila AI is not configured correctly.",
      });
    }

    /* =========================
       OPENAI REQUEST
    ========================== */

    const response = await openai.responses.create({
      model: "gpt-5.6-luna",
      instructions: PAILA_SYSTEM_PROMPT,
      input: trimmedMessage,
    });

    const answer = response.output_text?.trim();

    if (!answer) {
      return res.status(500).json({
        success: false,
        message: "Paila AI could not generate a response.",
      });
    }

    /* =========================
       RESPONSE
    ========================== */

    return res.status(200).json({
      success: true,
      message: answer,
    });
  } catch (error) {
    console.error("Paila AI error:", error);

    return res.status(500).json({
      success: false,
      message: "Something went wrong while contacting Paila AI.",
    });
  }
}