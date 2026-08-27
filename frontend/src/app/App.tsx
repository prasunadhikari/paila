import { Navigate, Route, Routes } from "react-router-dom";
import type { ReactNode } from "react";

import HomePage from "../features/home/pages/HomePage";
import LoginPage from "../features/auth/pages/LoginPage";
import RegisterPage from "../features/auth/pages/RegisterPage";

import DashboardPage from "../features/dashboard/pages/DashboardPage";

import TripPlannerPage from "../features/trip/pages/TripPlannerPage";
import LoadingPage from "../features/trip/pages/LoadingPage";
import ItineraryPage from "../features/trip/pages/ItineraryPage";

import DestinationsPage from "../features/destinations/pages/DestinationsPage";
import DestinationPage from "../features/destinations/pages/DestinationPage";

import { useAuth } from "../context/AuthContext";

function ProtectedRoute({
  children,
}: {
  children: ReactNode;
}) {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-950">
        <div className="text-center">
          <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-white/20 border-t-emerald-500" />

          <p className="mt-4 text-sm text-slate-400">
            Loading Paila...
          </p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
}

export default function App() {
  return (
    <Routes>
      {/* =========================
          Public Pages
      ========================== */}

      <Route path="/" element={<HomePage />} />

      <Route path="/login" element={<LoginPage />} />

      <Route path="/register" element={<RegisterPage />} />

      {/* Destinations are PUBLIC */}
      <Route
        path="/destinations"
        element={<DestinationsPage />}
      />

      <Route
        path="/destinations/:destination"
        element={<DestinationPage />}
      />

      {/* =========================
          Protected Pages
      ========================== */}

      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <DashboardPage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/planner"
        element={
          <ProtectedRoute>
            <TripPlannerPage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/loading"
        element={
          <ProtectedRoute>
            <LoadingPage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/itinerary"
        element={
          <ProtectedRoute>
            <ItineraryPage />
          </ProtectedRoute>
        }
      />

      {/* Unknown URL */}
      <Route
        path="*"
        element={<Navigate to="/" replace />}
      />
    </Routes>
  );
}