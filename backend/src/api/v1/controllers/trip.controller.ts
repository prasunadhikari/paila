import { Request, Response } from "express";
import { generateTrip } from "../../../services/gemini.service.js";

export async function generateTripController(
  req: Request,
  res: Response
) {
  try {
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
You are an expert Nepal travel planner.

Return ONLY valid JSON.

Do NOT write markdown.
Do NOT use triple backticks.
Do NOT explain anything.

Generate this exact structure:

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

Trip Details:

Starting From: ${startingFrom}
Destination: ${destination}
Days: ${days}
Budget: ${budget}
Travelers: ${travelers}
Hotel: ${hotel}
Transport: ${transport}
Interests: ${interests?.join(",")}
`;

   const trip = await generateTrip(prompt);

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