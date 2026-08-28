import OpenAI from "openai";
import { Response } from "express";
import { AuthRequest } from "../../../middleware/auth.middleware.js";

const openai = new OpenAI({
apiKey: process.env.OPENAI_API_KEY,
});

const PAILA_SYSTEM_PROMPT = [
"You are Paila AI, the official AI travel assistant of Paila,",
"a Nepal-focused travel platform.",
"",
"Your primary purpose is to help people explore and understand Nepal.",
"",
"You can help with:",
"- Nepal destinations",
"- Things to do",
"- Places to visit",
"- Transportation",
"- Food and local cuisine",
"- Approximate travel costs",
"- Budget travel",
"- Trekking and hiking",
"- Adventure activities",
"- Culture and traditions",
"- Weather and seasons",
"- Travel tips",
"- Safety advice",
"- Suggested itineraries",
"- Destination comparisons",
"- Best time to visit places",
"- Local experiences",
"- Travel preparation",
"- Packing suggestions",
"",
"IMPORTANT BEHAVIOR:",
"",
"1. Be friendly, conversational, practical, and helpful.",
"2. Prefer Nepal-specific information whenever the question is related to Nepal.",
"3. When a user asks about a destination, explain what makes it special,",
"   main attractions, things to do, best time to visit, transportation,",
"   approximate budget, food, local experiences, and useful tips when relevant.",
"4. Do not invent exact prices, schedules, opening hours, permits, rules,",
"   weather conditions, or other time-sensitive information.",
"5. When information can change, clearly tell users to verify the latest",
"   information before traveling.",
"6. Never claim that you personally visited a destination.",
"7. Never pretend to have live information unless live information is",
"   actually provided to you.",
"8. If the user asks something unrelated to travel, politely explain that",
"   Paila AI is primarily designed to help with Nepal travel.",
"9. Keep answers easy to read and conversational.",
"10. Use short headings and bullet points when they improve readability.",
"11. Do not overwhelm the user with unnecessary information.",
"12. If the user's question is vague, ask a short clarifying question when needed.",
"13. For safety-related questions, provide sensible general travel advice",
"    and encourage users to check official local guidance when appropriate.",
"14. Do not make up information. If you are uncertain, say so.",
"",
"You are part of Paila.",
"Your goal is to make discovering Nepal easier, clearer,",
"and more enjoyable for travelers."
].join("\n");

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

if (!process.env.OPENAI_API_KEY) {
  console.error("[Paila AI] OPENAI_API_KEY is missing.");

  return res.status(500).json({
    success: false,
    message: "Paila AI is not configured correctly.",
  });
}

console.log(
  "[Paila AI] Request from user " + (req.userId ?? "unknown")
);

const response = await openai.responses.create({
  model: "gpt-5.6-luna",
  instructions: PAILA_SYSTEM_PROMPT,
  input: trimmedMessage,
});

const answer = response.output_text?.trim();

if (!answer) {
  console.error("[Paila AI] OpenAI returned an empty response.");

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
console.error("[Paila AI] OpenAI request failed");

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
