import { useState, type FormEvent } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ArrowLeft, Mail, ShieldCheck } from "lucide-react";

import { useAuth } from "../../../context/AuthContext";
import { verifyOtp } from "../../../api/auth";

export default function VerifyOtpPage() {
  const navigate = useNavigate();
  const location = useLocation();

  const { authenticateWithToken } = useAuth();

  const email =
    (location.state as { email?: string } | null)?.email || "";

  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setError("");

    if (!email) {
      setError(
        "Verification email was not found. Please sign up again."
      );
      return;
    }

    if (!/^\d{6}$/.test(otp)) {
      setError("Please enter the 6-digit verification code.");
      return;
    }

    try {
      setLoading(true);

      const response = await verifyOtp(email, otp);

      if (!response.token || !response.user) {
        throw new Error(
          "Authentication information was not received."
        );
      }

      authenticateWithToken(response.token, response.user);

      navigate("/dashboard", {
        replace: true,
      });
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Invalid or expired verification code."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-md">
        <div className="rounded-3xl bg-white p-8 shadow-xl border border-slate-200">
          <div className="flex justify-center mb-6">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-sky-100 text-sky-600">
              <ShieldCheck size={32} />
            </div>
          </div>

          <div className="text-center">
            <h1 className="text-2xl font-bold text-slate-900">
              Verify your email
            </h1>

            <p className="mt-2 text-sm text-slate-500">
              We sent a 6-digit verification code to
            </p>

            <div className="mt-2 flex items-center justify-center gap-2 text-sm font-medium text-sky-600 break-all">
              <Mail size={16} />
              <span>{email || "your email address"}</span>
            </div>
          </div>

          {error && (
            <div className="mt-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="mt-7 space-y-5">
            <div>
              <label
                htmlFor="otp"
                className="mb-2 block text-sm font-medium text-slate-700"
              >
                Verification code
              </label>

              <input
                id="otp"
                name="otp"
                type="text"
                inputMode="numeric"
                autoComplete="one-time-code"
                maxLength={6}
                value={otp}
                onChange={(event) =>
                  setOtp(
                    event.target.value
                      .replace(/\D/g, "")
                      .slice(0, 6)
                  )
                }
                placeholder="Enter 6-digit code"
                className="w-full rounded-xl border border-slate-300 px-4 py-3 text-center text-2xl tracking-[0.5em] text-slate-900 outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-100"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl bg-sky-500 px-5 py-3.5 font-semibold text-white transition hover:bg-sky-600 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "Verifying..." : "Verify email"}
            </button>
          </form>

          <div className="mt-6 text-center">
            <Link
              to="/register"
              className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 transition hover:text-sky-600"
            >
              <ArrowLeft size={16} />
              Back to signup
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}