import { GoogleGenAI } from "@google/genai";
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

IMPORTANT BEHAVIOR:

1. Be friendly, conversational, practical, and helpful.
2. Prefer Nepal-specific information whenever possible.
3. When a user asks about a destination, explain what makes it special,
   important attractions, things to do, best time to visit,
   transportation, approximate budget, food, and useful tips.
4. Do not invent exact prices, schedules, opening hours, permits,
   rules, weather conditions, or other time-sensitive information.
5. Clearly mention when information may change.
6. Never claim that you personally visited a destination.
7. Never pretend to have live information.
8. If the user asks something unrelated to travel, politely explain
   that Paila AI is primarily designed for Nepal travel.
9. Keep answers easy to read.
10. Use short headings and bullet points when helpful.
11. Do not overwhelm the user with unnecessary information.
12. If the user's question is vague, ask a short clarifying question.
13. For safety questions, provide sensible general travel advice.
14. Do not make up information. If uncertain, say so.

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
        message:
          "Message is too long. Please keep it under 4000 characters.",
      });
    }

    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      console.error("[Paila AI] GEMINI_API_KEY is missing.");

      return res.status(500).json({
        success: false,
        message: "Paila AI is not configured correctly.",
      });
    }

    console.log(
      `[Paila AI] Request from user ${req.userId ?? "unknown"}`
    );

    const ai = new GoogleGenAI({
      apiKey,
    });

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: trimmedMessage,
      config: {
        systemInstruction: PAILA_SYSTEM_PROMPT,
      },
    });

    const answer = response.text?.trim();

    if (!answer) {
      console.error("[Paila AI] Gemini returned an empty response.");

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
    console.error("[Paila AI] Gemini request failed");

    if (error instanceof Error) {
      console.error("Message:", error.message);
      console.error("Stack:", error.stack);
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