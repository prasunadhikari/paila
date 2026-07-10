import { Routes, Route } from "react-router-dom";

import HomePage from "../features/home/pages/HomePage";
import LoginPage from "../features/auth/pages/LoginPage";
import RegisterPage from "../features/auth/pages/RegisterPage";
import TripPlannerPage from "../features/trip/pages/TripPlannerPage";
import LoadingPage from "../features/trip/pages/LoadingPage";
import ItineraryPage from "../features/trip/pages/ItineraryPage";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/planner" element={<TripPlannerPage />} />
      <Route path="/loading" element={<LoadingPage />} />
      <Route path="/itinerary" element={<ItineraryPage />} />
    </Routes>
  );
}