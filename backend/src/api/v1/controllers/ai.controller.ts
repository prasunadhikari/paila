import { GoogleGenAI } from "@google/genai";
import { Response } from "express";
import { AuthRequest } from "../../../middleware/auth.middleware.js";

const PAILA_SYSTEM_PROMPT = `
You are Paila AI, the official AI travel assistant of Paila,
a Nepal-focused travel platform.

Your job is to make discovering Nepal easy, useful, and enjoyable.

You help with:
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

2. Make answers interesting and easy to read.

3. Do NOT write huge blocks of text.

4. Prefer short sections, bullets, and useful highlights.

5. Give the most useful information first.

6. When appropriate, use emojis sparingly to make sections easy to scan.

7. Avoid unnecessary repetition.

8. Do not make every answer follow the exact same template.

9. Adapt the answer to the user's question.

10. For simple questions, give a simple answer.
    Do not turn a simple question into a long travel guide.

11. For destination questions, naturally mention relevant things such as:
    - Why visit
    - Highlights
    - Things to do
    - How to get there
    - Best time
    - Approximate budget
    - Food
    - Useful tips

12. Do not include every category if it is not relevant.

13. Use short headings when they improve readability.

14. Keep most normal answers concise and useful.

15. For travel planning questions, provide practical next steps.

IMPORTANT ACCURACY RULES:

16. Do not invent exact prices.

17. Do not invent exact bus or flight schedules.

18. Do not invent opening hours.

19. Do not invent permit requirements or fees.

20. Do not invent current weather conditions.

21. Do not claim to have live information.

22. If information may change, clearly tell the user to verify
    the latest information before traveling.

23. Never claim that you personally visited a place.

24. If you are uncertain, say so instead of making something up.

25. For safety-related questions, provide sensible general advice
    and recommend checking official local guidance when appropriate.

NEPAL FOCUS:

26. Prefer Nepal-specific information.

27. If the user asks about a Nepal location, answer specifically
    about that location.

28. If the user asks about transportation between two places,
    explain realistic options without inventing exact schedules.

29. If the user gives a departure location and destination,
    do not ask for the same information again.

30. If the user asks a very simple geographic question such as
    "Where is Kathmandu?", answer directly and briefly.

OFF-TOPIC QUESTIONS:

31. If the question is unrelated to travel, politely explain that
    Paila AI is primarily designed to help with Nepal travel.

Your goal is to make Nepal travel information:
clear, practical, interesting, and enjoyable to read.
`;


interface ChatRequestBody {
  message?: string;
}


/*
|--------------------------------------------------------------------------
| Gemini models
|--------------------------------------------------------------------------
|
| These models currently have Free Tier pricing according to Google's
| official Gemini API pricing documentation.
|
| We use several models so that Paila can fall back when one model is
| temporarily unavailable or experiencing high demand.
|
*/

const GEMINI_MODELS = [
  "gemini-3.6-flash",
  "gemini-3.5-flash",
  "gemini-3.5-flash-lite",
  "gemini-3.1-flash-lite",
];


/*
|--------------------------------------------------------------------------
| Helper: wait
|--------------------------------------------------------------------------
*/

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}


/*
|--------------------------------------------------------------------------
| Helper: identify temporary Gemini errors
|--------------------------------------------------------------------------
*/

function isTemporaryGeminiError(error: unknown): boolean {
  if (!error) {
    return false;
  }

  const errorText =
    error instanceof Error
      ? error.message
      : JSON.stringify(error);

  return (
    errorText.includes("503") ||
    errorText.includes("UNAVAILABLE") ||
    errorText.includes("high demand") ||
    errorText.includes("429") ||
    errorText.includes("RESOURCE_EXHAUSTED") ||
    errorText.includes("Too Many Requests") ||
    errorText.includes("temporarily unavailable")
  );
}


/*
|--------------------------------------------------------------------------
| CHAT CONTROLLER
|--------------------------------------------------------------------------
*/

export async function chatWithAI(
  req: AuthRequest,
  res: Response
) {
  try {
    const { message } = req.body as ChatRequestBody;


    /*
    |--------------------------------------------------------------------------
    | Validate message
    |--------------------------------------------------------------------------
    */

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


    /*
    |--------------------------------------------------------------------------
    | Check Gemini API key
    |--------------------------------------------------------------------------
    */

    const apiKey =
      process.env.GEMINI_API_KEY ||
      process.env.GOOGLE_API_KEY;

    if (!apiKey) {
      console.error(
        "[Paila AI] GEMINI_API_KEY / GOOGLE_API_KEY is missing."
      );

      return res.status(500).json({
        success: false,
        message: "Paila AI is not configured correctly.",
      });
    }


    /*
    |--------------------------------------------------------------------------
    | Log request
    |--------------------------------------------------------------------------
    */

    console.log(
      `[Paila AI] Request from user ${
        req.userId ?? "unknown"
      }`
    );


    /*
    |--------------------------------------------------------------------------
    | Gemini client
    |--------------------------------------------------------------------------
    */

    const ai = new GoogleGenAI({
      apiKey,
    });


    /*
    |--------------------------------------------------------------------------
    | Try Gemini models in order
    |--------------------------------------------------------------------------
    */

    let lastError: unknown = null;

    for (let modelIndex = 0; modelIndex < GEMINI_MODELS.length; modelIndex++) {
      const model = GEMINI_MODELS[modelIndex];

      console.log(
        `[Paila AI] Trying model ${model} (${modelIndex + 1}/${GEMINI_MODELS.length})`
      );


      /*
      |--------------------------------------------------------------------------
      | Retry each model twice for temporary failures
      |--------------------------------------------------------------------------
      */

      for (let attempt = 1; attempt <= 2; attempt++) {
        try {
          console.log(
            `[Paila AI] ${model} attempt ${attempt}/2`
          );


          const response = await ai.models.generateContent({
            model,
            contents: trimmedMessage,
            config: {
              systemInstruction: PAILA_SYSTEM_PROMPT,
              temperature: 0.7,
              maxOutputTokens: 1200,
            },
          });


          const answer = response.text?.trim();


          /*
          |--------------------------------------------------------------------------
          | Empty response
          |--------------------------------------------------------------------------
          */

          if (!answer) {
            console.warn(
              `[Paila AI] ${model} returned an empty response.`
            );

            lastError = new Error(
              `${model} returned an empty response`
            );

            break;
          }


          /*
          |--------------------------------------------------------------------------
          | Success
          |--------------------------------------------------------------------------
          */

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
            `[Paila AI] ${model} attempt ${attempt} failed.`
          );


          /*
          |--------------------------------------------------------------------------
          | Temporary error
          |--------------------------------------------------------------------------
          */

          if (isTemporaryGeminiError(error)) {
            if (attempt === 1) {
              console.warn(
                `[Paila AI] Temporary error from ${model}. Retrying...`
              );

              await sleep(1200);
              continue;
            }

            console.warn(
              `[Paila AI] ${model} is unavailable. Moving to fallback model.`
            );

            break;
          }


          /*
          |--------------------------------------------------------------------------
          | Non-temporary error
          |--------------------------------------------------------------------------
          */

          console.error(
            `[Paila AI] Non-temporary error from ${model}.`
          );

          break;
        }
      }
    }


    /*
    |--------------------------------------------------------------------------
    | All models failed
    |--------------------------------------------------------------------------
    */

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
    /*
    |--------------------------------------------------------------------------
    | Unexpected server error
    |--------------------------------------------------------------------------
    */

    console.error("========================================");
    console.error("[Paila AI] Unexpected server error");

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