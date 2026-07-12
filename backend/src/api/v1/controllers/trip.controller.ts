import { Request, Response } from "express";
import { generateTrip } from "../../../services/gemini.service.js";

export async function generateTripController(
  req: Request,
  res: Response
) {
  try {
    // ==========================
    // DEBUG: Incoming request
    // ==========================
    console.log("=========== REQUEST BODY ===========");
    console.log(req.body);
    console.log("====================================");

    const {
      startingFrom,
      destination,
      days,
      budget,
      travelers,
      hotel,
      transport,
      interests,
    } = req.body;

    const prompt = `
You are an expert travel planner for Nepal.

VERY IMPORTANT RULES:

- NEVER change the destination.
- NEVER change the starting location.
- Use EXACTLY the destination provided by the user.
- Use EXACTLY the starting location provided by the user.
- Every itinerary MUST be based ONLY on those places.
- Never substitute another destination.

Return ONLY valid JSON.
Do NOT use markdown.
Do NOT use triple backticks.
Do NOT explain anything.

Generate exactly this structure:

{
  "summary": {
    "destination": "",
    "startingFrom": "",
    "days": 0,
    "budget": "",
    "weather": ""
  },
  "days": [
    {
      "day": 1,
      "location": "",
      "travelTime": "",
      "weather": "",
      "budget": "",
      "activities": [
        "",
        "",
        ""
      ]
    }
  ],
  "hotels": [
    {
      "name": "",
      "price": "",
      "rating": ""
    }
  ],
  "foods": [
    "",
    "",
    ""
  ],
  "tips": [
    "",
    "",
    ""
  ]
}

USER INPUT

Starting Location: ${startingFrom}

Destination: ${destination}

Number of Days: ${days}

Budget: ${budget}

Travelers: ${travelers}

Hotel Preference: ${hotel}

Transport: ${transport}

Interests: ${interests?.join(", ")}

Remember:

summary.destination MUST be exactly "${destination}"

summary.startingFrom MUST be exactly "${startingFrom}"

All day locations, hotels, foods, weather and tips must belong to "${destination}".
`;

    const trip = await generateTrip(prompt);

    // ==========================
    // DEBUG: Gemini response
    // ==========================
    console.log("========== GEMINI RAW RESPONSE ==========");
    console.log(trip);
    console.log("=========================================");

    const parsedTrip = JSON.parse(trip);

    res.json({
      success: true,
      trip: parsedTrip,
    });
  } catch (error) {
    console.error(error);

    if (error instanceof Error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }

    return res.status(500).json({
      success: false,
      message: "Failed to generate trip.",
    });
  }
}