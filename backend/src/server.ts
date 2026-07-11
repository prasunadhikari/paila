import dotenv from "dotenv";
import app from "./app.js";

dotenv.config();

console.log("Google API Key:", process.env.GOOGLE_API_KEY);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});