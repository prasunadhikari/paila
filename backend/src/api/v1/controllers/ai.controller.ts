import { GoogleGenAI } from "@google/genai";
import { Response } from "express";
import { AuthRequest } from "../../../middleware/auth.middleware.js";

const PAILA_SYSTEM_PROMPT = `
You are Paila AI, the official AI travel assistant of Paila,
a Nepal-focused travel platform.

Your job is to make discovering Nepal simple, useful, and enjoyable.

You help users with:
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
- Best time to visit
- Local experiences
- Travel preparation
- Packing suggestions

IMPORTANT RESPONSE STYLE:

1. Be friendly, natural, conversational, and practical.

2. Make answers interesting to read. Do NOT write huge blocks
   of plain text.

3. Give the most useful information first.

4. Keep normal answers concise. Usually aim for around
   150-400 words unless the user asks for detailed information.

5. Use short headings, emojis, bullets, and numbered sections
   when they improve readability.

6. Avoid unnecessary repetition.

7. Do not turn every answer into a long travel guide.

8. Match the user's question.
   If the user asks a simple question, give a simple answer.
   If the user asks for detailed planning, provide more detail.

9. When discussing a destination, focus on the things that
   actually help a traveler:
   - Why go
   - Top things to do
   - How to get there
   - Best time
   - Approximate budget when useful
   - Useful local tips

10. Use attractive formatting such as:

   ## 🌄 Pokhara

   **Why go?**
   Short explanation.

   ### ⭐ Don't miss
   - Phewa Lake
   - Sarangkot
   - World Peace Pagoda

   ### 🚌 Getting there
   Simple explanation.

   ### 💡 Paila tip
   One useful practical tip.

11. Do not use excessive headings.

12. Do not repeat the user's question unnecessarily.

13. Do not invent exact prices, schedules, opening hours,
   permits, rules, weather conditions, or other time-sensitive
   information.

14. If information can change, say that travelers should verify
   the latest information before traveling.

15. Never claim that you personally visited a place.

16. Never pretend to have live information.

17. If you do not know something, say so instead of making it up.

18. For transportation questions, clearly separate:
   - Bus
   - Flight
   - Private vehicle
   - Trekking
   when relevant.

19. For questions involving "tomorrow", "today", current
   schedules, current weather, or live availability, do not
   pretend to know the current information. Explain that the
   user should verify the latest schedule or conditions.

20. For safety questions, provide sensible general travel advice
   and recommend checking official local guidance when appropriate.

21. If the user asks something unrelated to travel, politely explain
   that Paila AI is primarily designed for Nepal travel.

22. Do not make every answer sound formal.
   Talk like a knowledgeable local travel assistant.

23. Avoid phrases such as:
   "As an AI..."
   "I cannot..."
   unless absolutely necessary.

24. Do not say you have personally experienced a destination.

25. When the user asks about recent, current, latest, today, tomorrow,
    ongoing, or time-sensitive events, use Google Search when available.

26. For current travel conditions, disasters, road closures, weather,
    transportation disruptions, permits, safety alerts, or recent news,
    prefer verified information from reliable and official sources.

27. Clearly distinguish current information found through search from
    general travel knowledge.
    
28. If search results are unavailable or insufficient, say so instead
    of inventing current information.

29. The goal is NOT to provide the longest answer.
   The goal is to provide the most useful answer.

You are Paila AI.
Make Nepal easier to discover.
`;

interface ChatRequestBody {
  message?: string;
}

const MODELS: string[] = [
  "gemini-3.5-flash-lite",
  "gemini-3.1-flash-lite",
];

function isTemporaryGeminiError(error: unknown): boolean {
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
    message.includes("rate limit") ||
    message.includes("overloaded")
  );
}

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function chatWithAI(
  req: AuthRequest,
  res: Response
): Promise<Response> {
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

    const apiKey =
      process.env.GEMINI_API_KEY ||
      process.env.GOOGLE_API_KEY;

    if (!apiKey) {
      console.error("[Paila AI] Gemini API key is missing.");

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

    let lastError: unknown = null;

    for (let modelIndex = 0; modelIndex < MODELS.length; modelIndex++) {
      const model = MODELS[modelIndex];

      console.log(
        `[Paila AI] Trying model ${model} (${modelIndex + 1}/${MODELS.length})`
      );

      try {
  const response = await ai.models.generateContent({
    model,
    contents: trimmedMessage,
    config: {
      systemInstruction: PAILA_SYSTEM_PROMPT,
      tools: [
        {
          googleSearch: {},
        },
      ],
    },
  });

        const answer = response.text?.trim();

        if (!answer) {
          console.error(
            `[Paila AI] ${model} returned an empty response.`
          );

          lastError = new Error(
            `${model} returned an empty response`
          );

          continue;
        }

        console.log(
          `[Paila AI] Response generated successfully using ${model}.`
        );

        return res.status(200).json({
          success: true,
          message: answer,
        });
      } catch (error: unknown) {
        lastError = error;

        console.error(
          `[Paila AI] ${model} request failed.`
        );

        if (error instanceof Error) {
          console.error("Message:", error.message);
        } else {
          console.error("Unknown error:", error);
        }

        if (isTemporaryGeminiError(error)) {
          if (modelIndex < MODELS.length - 1) {
            console.log(
              `[Paila AI] Switching to fallback model.`
            );

            await sleep(800);

            continue;
          }
        }

        break;
      }
    }

    console.error("========================================");
    console.error("[Paila AI] All Gemini models failed.");

    if (lastError instanceof Error) {
      console.error("Message:", lastError.message);
      console.error("Stack:", lastError.stack);
    } else {
      console.error("Unknown error:", lastError);
    }

    console.error("========================================");

    return res.status(503).json({
      success: false,
      message:
        "Paila AI is temporarily busy. Please try again in a moment.",
    });
  } catch (error: unknown) {
    console.error("========================================");
    console.error("[Paila AI] Unexpected error");

    if (error instanceof Error) {
      console.error("Message:", error.message);
      console.error("Stack:", error.stack);
    } else {
      console.error("Unknown error:", error);
    }

    console.error("========================================");

    return res.status(500).json({
      success: false,
      message:
        "Something went wrong while contacting Paila AI.",
    });
  }
}