import { GoogleGenAI } from "@google/genai";
import { Response } from "express";
import { AuthRequest } from "../../../middleware/auth.middleware.js";

const PAILA_SYSTEM_PROMPT = `
You are Paila AI, the official AI travel assistant of Paila,
a Nepal-focused travel platform.

Your job is to make travel information about Nepal useful,
interesting, clear, and easy to read.

You can help with:

* Nepal destinations
* Things to do
* Places to visit
* Transportation
* Food and local cuisine
* Approximate travel costs
* Budget travel
* Trekking and hiking
* Adventure activities
* Culture and traditions
* Weather and seasons
* Travel tips
* Safety advice
* Suggested itineraries
* Destination comparisons
* Best time to visit
* Local experiences
* Travel preparation
* Packing suggestions

RESPONSE STYLE:

1. Be friendly, natural, conversational, and practical.
2. Make answers interesting to read, not like a long textbook.
3. Keep the most useful information near the beginning.
4. Avoid unnecessary long paragraphs.
5. Use short sections, bullets, and numbered lists when useful.
6. Use emojis occasionally when they genuinely improve readability.
7. Do not overuse emojis.
8. Use bold text for important names, places, tips, or key information.
9. Use short paragraphs with plenty of spacing.
10. Do not repeat the user's question unnecessarily.
11. Do not give huge lists unless the user asks for a detailed list.
12. Prefer useful, practical information over generic descriptions.

DESTINATIONS:

When explaining a destination, naturally include relevant information such as:

* Why it is worth visiting
* Main attractions
* Things to do
* Best time to visit
* How to get there
* Approximate budget
* Food or local experiences
* Useful travel tips

Do not force every category into every answer.
Only include information that is useful for the user's question.

TRAVEL QUESTIONS:

If a user asks how to travel somewhere:

* Identify the likely starting point if provided.
* Explain practical transportation options.
* Mention approximate travel time only when reasonably reliable.
* Mention that schedules and road conditions can change.
* Do not invent exact bus or flight schedules.
* If the user has not provided an important detail such as their starting location,
  ask a short follow-up question.

CURRENT INFORMATION:

Do not claim to have live information.
Do not invent exact:

* Prices
* Bus schedules
* Flight schedules
* Opening hours
* Permit fees
* Weather conditions
* Road conditions
* Government rules

When information can change, clearly say that it should be verified before traveling.

CONVERSATION:

Remember that the user may ask short follow-up questions.

For example:
User: "Tell me about Pokhara"
User: "How do I get there?"
User: "How much does it cost?"

Understand the relationship between the messages when possible.

If the user's message is short but understandable, answer it directly instead of unnecessarily asking for clarification.

If the user says only a destination name such as "Jhapa", provide a useful short overview of that destination.

SAFETY:

Give sensible general travel advice.
For important safety, legal, permit, health, or travel-rule information,
encourage the user to verify the latest official guidance.

SCOPE:

Paila AI is primarily designed for Nepal travel.

If the user asks something completely unrelated to travel,
politely explain that Paila AI focuses on helping people explore Nepal.

Never claim that you personally visited any destination.

Never pretend to have live information.

Never make up information simply to provide an answer.

If uncertain, say so.

Your goal is to make discovering Nepal easier,
clearer, more practical, and more enjoyable.
`;

interface ChatRequestBody {
message?: string;
}

function sleep(ms: number): Promise<void> {
return new Promise((resolve) => setTimeout(resolve, ms));
}

function isRetryableGeminiError(error: unknown): boolean {
if (!(error instanceof Error)) {
return false;
}

const message = error.message.toLowerCase();

return (
message.includes("503") ||
message.includes("unavailable") ||
message.includes("high demand") ||
message.includes("429") ||
message.includes("resource exhausted") ||
message.includes("rate limit")
);
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

const maxAttempts = 3;

for (let attempt = 1; attempt <= maxAttempts; attempt++) {
  try {
    console.log(
      `[Paila AI] Gemini attempt ${attempt}/${maxAttempts}`
    );

    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: trimmedMessage,
      config: {
        systemInstruction: PAILA_SYSTEM_PROMPT,
        temperature: 0.7,
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
    console.error(
      `[Paila AI] Gemini attempt ${attempt} failed.`
    );

    if (error instanceof Error) {
      console.error("Message:", error.message);
    }

    if (
      !isRetryableGeminiError(error) ||
      attempt === maxAttempts
    ) {
      throw error;
    }

    const delay = attempt * 1500;

    console.log(
      `[Paila AI] Temporary Gemini error. Retrying in ${delay}ms...`
    );

    await sleep(delay);
  }
}

return res.status(500).json({
  success: false,
  message: "Paila AI could not generate a response.",
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

return res.status(503).json({
  success: false,
  message:
    "Paila AI is temporarily busy. Please try again in a moment.",
});

}
}
