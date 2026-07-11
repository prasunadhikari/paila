const API_URL = "http://localhost:5000/api/v1/trip";

export async function generateTrip(data: any) {
  const response = await fetch(`${API_URL}/generate`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Failed to generate trip");
  }

  return response.json();
}