import { useEffect, useRef, useState, type FormEvent } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  CheckCircle2,
  Loader2,
  LockKeyhole,
  Mail,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

import { verifyOtp } from "../../../api/auth";

interface VerifyLocationState {
  email?: string;
  password?: string;
}

export default function VerifyOtpPage() {
  const navigate = useNavigate();
  const location = useLocation();

  const state =
    (location.state as VerifyLocationState | null) || null;

  const email = state?.email || "";
  const password = state?.password || "";

  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const otpInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    otpInputRef.current?.focus();
  }, []);

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>
  ) {
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
      otpInputRef.current?.focus();
      return;
    }

    try {
      setLoading(true);

      // Backend verifies the OTP and creates the account.
      // It does NOT log the user in.
      await verifyOtp(email, otp);

      // Send the user to Login with the signup credentials.
      navigate("/login", {
        replace: true,
        state: {
          email,
          password,
          verified: true,
        },
      });
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Invalid or expired verification code."
      );

      // Clear incorrect OTP so the user can enter it again.
      setOtp("");

      setTimeout(() => {
        otpInputRef.current?.focus();
      }, 0);
    } finally {
      setLoading(false);
    }
  }

  function handleOtpChange(value: string) {
    const cleanValue = value
      .replace(/\D/g, "")
      .slice(0, 6);

    setOtp(cleanValue);

    if (error) {
      setError("");
    }
  }

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-br from-sky-50 via-white to-cyan-50 px-4 py-4 sm:px-6">
      {/* Background decoration */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-24 -top-24 h-56 w-56 rounded-full bg-sky-200/30 blur-3xl sm:h-72 sm:w-72" />

        <div className="absolute -bottom-24 -right-24 h-64 w-64 rounded-full bg-cyan-200/30 blur-3xl sm:h-80 sm:w-80" />
      </div>

      <div className="relative z-10 w-full max-w-md">
        {/* Brand */}
        <div className="mb-4 flex justify-center sm:mb-5">
          <Link
            to="/"
            className="group inline-flex items-center gap-2 rounded-full border border-sky-100 bg-white/80 px-4 py-2 shadow-sm backdrop-blur transition hover:border-sky-200 hover:shadow-md"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-sky-500 text-white shadow-sm">
              <Sparkles className="h-4 w-4" />
            </div>

            <span className="text-lg font-bold tracking-tight text-sky-600">
              Paila
            </span>
          </Link>
        </div>

        {/* Card */}
        <section className="rounded-3xl border border-white/80 bg-white/95 p-5 shadow-xl shadow-sky-100/60 backdrop-blur sm:p-7">
          {/* Icon */}
          <div className="mb-4 flex justify-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-sky-50 text-sky-600 ring-8 ring-sky-50/70">
              <ShieldCheck className="h-7 w-7" />
            </div>
          </div>

          {/* Heading */}
          <div className="text-center">
            <h1 className="text-xl font-bold text-slate-900 sm:text-2xl">
              Verify your email
            </h1>

            <p className="mx-auto mt-2 max-w-sm text-sm leading-5 text-slate-500">
              We sent a 6-digit verification code to your email.
            </p>
          </div>

          {/* Email */}
          <div className="mt-4 flex items-center gap-3 rounded-2xl border border-sky-100 bg-sky-50/70 px-4 py-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white text-sky-600 shadow-sm">
              <Mail className="h-4 w-4" />
            </div>

            <div className="min-w-0">
              <p className="text-[11px] font-medium uppercase tracking-wide text-slate-400">
                Verification email
              </p>

              <p className="truncate text-sm font-semibold text-slate-700">
                {email || "Email not found"}
              </p>
            </div>
          </div>

          {/* Form */}
          <form
            onSubmit={handleSubmit}
            className="mt-5 space-y-4"
          >
            <div>
              <label
                htmlFor="otp"
                className="mb-2 block text-sm font-semibold text-slate-700"
              >
                Verification code
              </label>

              <input
                ref={otpInputRef}
                id="otp"
                name="otp"
                type="text"
                inputMode="numeric"
                autoComplete="one-time-code"
                maxLength={6}
                value={otp}
                onChange={(event) =>
                  handleOtpChange(event.target.value)
                }
                placeholder="••••••"
                disabled={loading}
                className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-center text-xl font-bold tracking-[0.45em] text-slate-900 outline-none transition placeholder:text-slate-300 focus:border-sky-400 focus:ring-4 focus:ring-sky-100 disabled:cursor-not-allowed disabled:bg-slate-50 sm:py-3.5"
              />
            </div>

            {/* Error */}
            {error && (
              <div className="flex items-start gap-3 rounded-2xl border border-red-100 bg-red-50 px-4 py-3">
                <LockKeyhole className="mt-0.5 h-4 w-4 shrink-0 text-red-500" />

                <p className="text-sm leading-5 text-red-600">
                  {error}
                </p>
              </div>
            )}

            {/* Verify button */}
            <button
              type="submit"
              disabled={loading}
              className="flex w-full items-center justify-center gap-2 rounded-2xl bg-sky-500 px-4 py-3.5 text-sm font-semibold text-white shadow-lg shadow-sky-200 transition hover:bg-sky-600 hover:shadow-sky-300 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Verifying...
                </>
              ) : (
                <>
                  <CheckCircle2 className="h-4 w-4" />
                  Verify Email
                </>
              )}
            </button>
          </form>

          {/* Security note */}
          <div className="mt-4 flex items-start gap-2 rounded-2xl bg-slate-50 px-3.5 py-3">
            <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-sky-500" />

            <p className="text-xs leading-4 text-slate-500">
              Your verification code expires after 10 minutes.
              You have a limited number of attempts.
            </p>
          </div>

          {/* Back */}
          <div className="mt-4 text-center">
            <Link
              to="/register"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-500 transition hover:text-sky-600"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Sign Up
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}