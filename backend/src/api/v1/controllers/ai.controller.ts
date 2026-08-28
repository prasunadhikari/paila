import OpenAI from "openai";
import { Response } from "express";
import { AuthRequest } from "../../../middleware/auth.middleware.js";

const PAILA_SYSTEM_PROMPT = `
You are Paila AI, the official AI travel assistant of Paila,
a Nepal-focused travel platform.

Your primary purpose is to help people explore, understand,
and plan travel in Nepal.

You can help with:
- Nepal destinations
- Things to do
- Places to visit
- Transportation
- Food and local cuisine
- Approximate travel costs
- Budget travel
- Trekking and hiking
- Adventure activities
- Culture and traditions
- Weather and seasons
- Travel tips
- Safety advice
- Suggested itineraries
- Destination comparisons
- Best time to visit places
- Local experiences
- Travel preparation
- Packing suggestions

Be friendly, conversational, practical, and helpful.

Prefer Nepal-specific information.

Do not invent exact prices, schedules, opening hours,
permits, rules, weather conditions, or other time-sensitive
information.

If information may change, tell the user to verify the
latest information before traveling.

Never claim to have personally visited a destination.

Never pretend to have live information unless it is actually
provided.

If the user asks something unrelated to travel, politely
explain that Paila AI is primarily designed for Nepal travel.

Keep answers easy to read and use short headings or bullet
points when useful.

Do not make up information. If uncertain, say so.

You are part of Paila.
Your goal is to make discovering Nepal easier, clearer,
and more enjoyable for travelers.
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

    const apiKey = process.env.OPENAI_API_KEY;

    if (!apiKey) {
      console.error("[Paila AI] OPENAI_API_KEY is missing.");

      return res.status(500).json({
        success: false,
        message: "Paila AI is not configured correctly.",
      });
    }

    const openai = new OpenAI({
      apiKey,
    });

    console.log("[Paila AI] Sending request to OpenAI...");
    console.log("[Paila AI] User:", req.userId ?? "unknown");
    console.log("[Paila AI] Message:", trimmedMessage);

    const response = await openai.responses.create({
      model: "gpt-5.6-luna",
      instructions: PAILA_SYSTEM_PROMPT,
      input: trimmedMessage,
    });

    const answer = response.output_text?.trim();

    if (!answer) {
      console.error("[Paila AI] Empty response from OpenAI.");

      return res.status(500).json({
        success: false,
        message: "Paila AI could not generate a response.",
      });
    }

    console.log("[Paila AI] Response generated successfully.");

    return res.status(200).json({
      success: true,
      message: answer,
    });
  } catch (error: unknown) {
    console.error("========================================");
    console.error("[Paila AI] OPENAI ERROR");
    console.error("========================================");

    if (error instanceof Error) {
      console.error("Error message:", error.message);
      console.error("Error stack:", error.stack);
    } else {
      console.error("Unknown error:", error);
    }

    console.error("========================================");

    return res.status(500).json({
      success: false,
      message: "Something went wrong while contacting Paila AI.",
    });
  }
}