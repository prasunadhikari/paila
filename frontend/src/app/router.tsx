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

    // Scroll the browser window
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant",
    });

    // Scroll document elements
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;

    // Also reset any scrollable containers
    const scrollableElements = document.querySelectorAll(
      "main, section, div"
    );

    scrollableElements.forEach((element) => {
      const el = element as HTMLElement;

      if (el.scrollTop > 0) {
        el.scrollTop = 0;
      }
    });
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
