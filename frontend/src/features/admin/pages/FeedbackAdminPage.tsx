import { useEffect, useState } from "react";
import {
  Check,
  Loader2,
  MessageSquare,
  Star,
  Trash2,
} from "lucide-react";

import { apiRequest } from "../../../api/client";
import { useAuth } from "../../../context/AuthContext";

interface Feedback {
  _id: string;
  name: string;
  location: string;
  rating: number;
  message: string;
  approved: boolean;
  createdAt: string;
}

interface FeedbackResponse {
  success: boolean;
  feedback: Feedback[];
}

export default function FeedbackAdminPage() {
  const { user, loading: authLoading } = useAuth();

  const [feedback, setFeedback] = useState<Feedback[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [actionId, setActionId] = useState<string | null>(null);

  /*
   * Get the same token used by AuthContext.
   *
   * AuthContext stores the token in either:
   * - localStorage.paila_token
   * - sessionStorage.paila_token
   */
  function getToken(): string | null {
    return (
      localStorage.getItem("paila_token") ||
      sessionStorage.getItem("paila_token")
    );
  }

  async function loadFeedback() {
    const token = getToken();

    if (!token) {
      setError("Authentication required");
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError("");

      const data = await apiRequest<FeedbackResponse>(
        "/feedback/admin",
        {
          token,
        }
      );

      setFeedback(data.feedback);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Unable to load feedback."
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (!authLoading) {
      loadFeedback();
    }
  }, [authLoading]);

  async function approveFeedback(id: string) {
    const token = getToken();

    if (!token) {
      setError("Authentication required");
      return;
    }

    try {
      setActionId(id);

      await apiRequest(
        `/feedback/admin/${id}/approve`,
        {
          method: "PATCH",
          token,
        }
      );

      setFeedback((current) =>
        current.map((item) =>
          item._id === id
            ? { ...item, approved: true }
            : item
        )
      );
    } catch (err) {
      alert(
        err instanceof Error
          ? err.message
          : "Unable to approve feedback."
      );
    } finally {
      setActionId(null);
    }
  }

  async function rejectFeedback(id: string) {
    const confirmed = window.confirm(
      "Are you sure you want to reject this feedback?"
    );

    if (!confirmed) return;

    const token = getToken();

    if (!token) {
      setError("Authentication required");
      return;
    }

    try {
      setActionId(id);

      await apiRequest(
        `/feedback/admin/${id}`,
        {
          method: "DELETE",
          token,
        }
      );

      setFeedback((current) =>
        current.filter(
          (item) => item._id !== id
        )
      );
    } catch (err) {
      alert(
        err instanceof Error
          ? err.message
          : "Unable to reject feedback."
      );
    } finally {
      setActionId(null);
    }
  }

  const pendingCount = feedback.filter(
    (item) => !item.approved
  ).length;

  /*
   * Wait for authentication to finish.
   */
  if (authLoading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-50">
        <div className="text-center">
          <Loader2 className="mx-auto h-8 w-8 animate-spin text-emerald-600" />

          <p className="mt-3 text-sm text-slate-500">
            Verifying admin access...
          </p>
        </div>
      </main>
    );
  }

  /*
   * User must be logged in.
   */
  if (!user) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-50 px-6">
        <div className="w-full max-w-md rounded-3xl bg-white p-8 text-center shadow-sm ring-1 ring-slate-200">
          <MessageSquare className="mx-auto h-10 w-10 text-slate-300" />

          <h1 className="mt-4 text-xl font-bold text-slate-900">
            Authentication required
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            Please log in to access the admin feedback panel.
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50 px-6 py-12">
      <div className="mx-auto max-w-6xl">

        {/* Header */}

        <div className="mb-10">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm ring-1 ring-slate-200">
            <MessageSquare className="h-4 w-4 text-emerald-600" />
            Paila Admin
          </div>

          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <h1 className="text-4xl font-bold tracking-tight text-slate-900">
                Feedback Management
              </h1>

              <p className="mt-2 text-slate-500">
                Review traveler feedback before it appears publicly.
              </p>
            </div>

            {!loading && !error && (
              <div className="rounded-2xl bg-white px-5 py-3 shadow-sm ring-1 ring-slate-200">
                <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                  Pending
                </p>

                <p className="mt-1 text-2xl font-bold text-slate-900">
                  {pendingCount}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Loading */}

        {loading && (
          <div className="flex min-h-64 items-center justify-center rounded-3xl bg-white shadow-sm ring-1 ring-slate-200">
            <div className="text-center">
              <Loader2 className="mx-auto h-8 w-8 animate-spin text-emerald-600" />

              <p className="mt-3 text-sm text-slate-500">
                Loading feedback...
              </p>
            </div>
          </div>
        )}

        {/* Error */}

        {!loading && error && (
          <div className="rounded-3xl border border-red-200 bg-red-50 p-8 text-center">
            <h2 className="text-lg font-bold text-red-800">
              Unable to access feedback
            </h2>

            <p className="mt-2 text-sm text-red-600">
              {error}
            </p>

            <button
              type="button"
              onClick={loadFeedback}
              className="mt-5 rounded-xl bg-red-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-red-700"
            >
              Try Again
            </button>
          </div>
        )}

        {/* Empty */}

        {!loading && !error && feedback.length === 0 && (
          <div className="rounded-3xl bg-white p-12 text-center shadow-sm ring-1 ring-slate-200">
            <MessageSquare className="mx-auto h-10 w-10 text-slate-300" />

            <h2 className="mt-4 text-xl font-bold text-slate-900">
              No feedback yet
            </h2>

            <p className="mt-2 text-slate-500">
              New feedback submissions will appear here.
            </p>
          </div>
        )}

        {/* Feedback */}

        {!loading && !error && feedback.length > 0 && (
          <div className="space-y-5">
            {feedback.map((item) => (
              <article
                key={item._id}
                className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200 sm:p-8"
              >
                <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">

                  <div className="min-w-0 flex-1">

                    {/* Status */}

                    <div className="mb-4 flex flex-wrap items-center gap-2">
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-bold ${
                          item.approved
                            ? "bg-emerald-50 text-emerald-700"
                            : "bg-amber-50 text-amber-700"
                        }`}
                      >
                        {item.approved
                          ? "Approved"
                          : "Pending"}
                      </span>

                      <span className="text-xs text-slate-400">
                        {new Date(
                          item.createdAt
                        ).toLocaleDateString()}
                      </span>
                    </div>

                    {/* Rating */}

                    <div className="flex items-center gap-1">
                      {Array.from({
                        length: 5,
                      }).map((_, index) => (
                        <Star
                          key={index}
                          className={`h-4 w-4 ${
                            index < item.rating
                              ? "fill-amber-400 text-amber-400"
                              : "text-slate-200"
                          }`}
                        />
                      ))}
                    </div>

                    {/* Message */}

                    <p className="mt-5 text-lg leading-8 text-slate-700">
                      “{item.message}”
                    </p>

                    {/* User */}

                    <div className="mt-6">
                      <p className="font-semibold text-slate-900">
                        {item.name}
                      </p>

                      <p className="mt-1 text-sm text-slate-500">
                        {item.location}
                      </p>
                    </div>
                  </div>

                  {/* Actions */}

                  <div className="flex shrink-0 gap-3 lg:flex-col">

                    {!item.approved && (
                      <button
                        type="button"
                        onClick={() =>
                          approveFeedback(item._id)
                        }
                        disabled={
                          actionId === item._id
                        }
                        className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        {actionId === item._id ? (
                          <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                          <Check className="h-4 w-4" />
                        )}

                        Approve
                      </button>
                    )}

                    <button
                      type="button"
                      onClick={() =>
                        rejectFeedback(item._id)
                      }
                      disabled={
                        actionId === item._id
                      }
                      className="inline-flex items-center justify-center gap-2 rounded-xl border border-red-200 bg-red-50 px-5 py-3 text-sm font-semibold text-red-700 transition hover:bg-red-100 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      {actionId === item._id ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <Trash2 className="h-4 w-4" />
                      )}

                      Reject
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}

      </div>
    </main>
  );
}