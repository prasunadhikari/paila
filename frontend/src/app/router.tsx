
import { useLayoutEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";

import HomePage from "../features/home/pages/HomePage";
import LoginPage from "../features/auth/pages/LoginPage";
import RegisterPage from "../features/auth/pages/RegisterPage";

import DestinationsPage from "../features/destinations/pages/DestinationsPage";
import DestinationPage from "../features/destinations/pages/DestinationPage";

import AllFeedbackPage from "../features/home/pages/AllFeedbackPage";

import DashboardPage from "../features/dashboard/pages/DashboardPage";
import FeedbackAdminPage from "../features/admin/pages/FeedbackAdminPage";

import ProtectedRoute from "../components/ProtectedRoute";
import PailaAIPage from "../features/ai/pages/PailaAIPage";

/* =========================
   SCROLL TO TOP
========================= */

function ScrollToTop() {
  const { pathname } = useLocation();

  useLayoutEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }

    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant",
    });

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

        {/* Landing Page */}
        <Route
          path="/"
          element={<HomePage />}
        />

        {/* Authentication */}
        <Route
          path="/login"
          element={<LoginPage />}
        />

        <Route
          path="/register"
          element={<RegisterPage />}
        />

        {/* Feedback
            Available to everyone */}
        <Route
          path="/feedback"
          element={<AllFeedbackPage />}
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

          {/* Destinations */}
<Route element={<ProtectedRoute />}>
  <Route path="/destinations" element={<DestinationsPage />} />
  <Route path="/destinations/:destination" element={<DestinationPage />} />
  <Route path="/dashboard" element={<DashboardPage />} />
  <Route path="/ai" element={<PailaAIPage />} />
  <Route path="/admin/feedback" element={<FeedbackAdminPage />} />
</Route>

          {/* Destination Details */}
          <Route
            path="/destinations/:destination"
            element={<DestinationPage />}
          />

          {/* Paila AI */}
          <Route
            path="/ai"
            element={<PailaAIPage />}
          />

          {/* Admin Feedback */}
          <Route
            path="/admin/feedback"
            element={<FeedbackAdminPage />}
          />
        </Route>
      </Routes>
    </>
  );
}