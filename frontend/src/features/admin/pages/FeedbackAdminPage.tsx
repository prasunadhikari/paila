import { useEffect, useState } from "react";
import {
  Check,
  Loader2,
  MessageSquare,
  Star,
  Trash2,
} from "lucide-react";
import { apiRequest } from "../../../api/client";

interface Feedback {
  _id: string;
  name: string;
  location: string;
  rating: number;
  message: string;
  approved: boolean;
  createdAt: string;
}

export default function FeedbackAdminPage() {
  const [feedback, setFeedback] = useState<Feedback[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [actionId, setActionId] = useState<string | null>(null);

  const token = localStorage.getItem("token");

  async function loadFeedback() {
    try {
      setLoading(true);
      setError("");

      const data = await apiRequest<{ success: boolean; feedback: Feedback[] }>(
        "/feedback/admin",
        {
          token: token || undefined,
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
    loadFeedback();
  }, []);

  async function approveFeedback(id: string) {
    try {
      setActionId(id);

      await apiRequest(`/feedback/admin/${id}/approve`, {
        method: "PATCH",
        token: token || undefined,
      });

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

    try {
      setActionId(id);

      await apiRequest(`/feedback/admin/${id}`, {
        method: "DELETE",
        token: token || undefined,
      });

      setFeedback((current) =>
        current.filter((item) => item._id !== id)
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

            {!loading && (
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
                        {item.approved ? "Approved" : "Pending"}
                      </span>

                      <span className="text-xs text-slate-400">
                        {new Date(item.createdAt).toLocaleDateString()}
                      </span>
                    </div>

                    {/* Rating */}
                    <div className="flex items-center gap-1">
                      {Array.from({ length: 5 }).map((_, index) => (
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
                      <p className="font-bold text-slate-900">
                        {item.name}
                      </p>

                      <p className="text-sm text-slate-500">
                        {item.location}
                      </p>
                    </div>
                  </div>

                  {/* Actions */}
                  {!item.approved && (
                    <div className="flex shrink-0 flex-col gap-3 sm:flex-row lg:flex-col">
                      <button
                        type="button"
                        disabled={actionId === item._id}
                        onClick={() => approveFeedback(item._id)}
                        className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-600 px-5 py-3 text-sm font-bold text-white transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-60"
                      >
                        {actionId === item._id ? (
                          <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                          <Check className="h-4 w-4" />
                        )}
                        Approve
                      </button>

                      <button
                        type="button"
                        disabled={actionId === item._id}
                        onClick={() => rejectFeedback(item._id)}
                        className="inline-flex items-center justify-center gap-2 rounded-xl border border-red-200 bg-white px-5 py-3 text-sm font-bold text-red-600 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-60"
                      >
                        <Trash2 className="h-4 w-4" />
                        Reject
                      </button>
                    </div>
                  )}
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}