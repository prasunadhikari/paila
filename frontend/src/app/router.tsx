import { useLayoutEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";

import HomePage from "../features/home/pages/HomePage";
import LoginPage from "../features/auth/pages/LoginPage";
import RegisterPage from "../features/auth/pages/RegisterPage";

import TripPlannerPage from "../features/trip/pages/TripPlannerPage";
import LoadingPage from "../features/trip/pages/LoadingPage";
import ItineraryPage from "../features/trip/pages/ItineraryPage";

import DestinationsPage from "../features/destinations/pages/DestinationsPage";
import DestinationPage from "../features/destinations/pages/DestinationPage";

import DashboardPage from "../features/dashboard/pages/DashboardPage";
import FeedbackAdminPage from "../features/admin/pages/FeedbackAdminPage";

import ProtectedRoute from "../components/ProtectedRoute";

/* =========================
   SCROLL TO TOP
========================= */

function ScrollToTop() {
  const { pathname } = useLocation();

  useLayoutEffect(() => {
    // Disable browser's automatic scroll restoration
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }

    // Scroll the main browser window to the top
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant",
    });

    // Reset document scroll position
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }, [pathname]);

  return null;
}

/* =========================
   ROUTER
========================= */

export default function AppRouter() {
  return (
    <>
      <ScrollToTop />

      <Routes>
        {/* =========================
            PUBLIC ROUTES
        ========================== */}

        <Route
          path="/"
          element={<HomePage />}
        />

        <Route
          path="/login"
          element={<LoginPage />}
        />

        <Route
          path="/register"
          element={<RegisterPage />}
        />

        {/* Public destination listing */}
        <Route
          path="/destinations"
          element={<DestinationsPage />}
        />

        {/* =========================
            PROTECTED ROUTES
        ========================== */}

        <Route element={<ProtectedRoute />}>
          {/* Dashboard */}
          <Route
            path="/dashboard"
            element={<DashboardPage />}
          />

          {/* Admin feedback management */}
          <Route
            path="/admin/feedback"
            element={<FeedbackAdminPage />}
          />

          {/* Destination details */}
          <Route
            path="/destinations/:destination"
            element={<DestinationPage />}
          />

          {/* Planner */}
          <Route
            path="/planner"
            element={<TripPlannerPage />}
          />

          {/* Loading */}
          <Route
            path="/loading"
            element={<LoadingPage />}
          />

          {/* Itinerary */}
          <Route
            path="/itinerary"
            element={<ItineraryPage />}
          />
        </Route>
      </Routes>
    </>
  );
}