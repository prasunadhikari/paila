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

  const otpInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    otpInputRef.current?.focus();
  }, []);

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
      otpInputRef.current?.focus();
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

  function handleOtpChange(value: string) {
    const cleanValue = value.replace(/\D/g, "").slice(0, 6);

    setOtp(cleanValue);

    if (error) {
      setError("");
    }
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-gradient-to-br from-sky-50 via-white to-cyan-50 px-4 py-6 sm:px-6 sm:py-10">
      {/* Decorative background */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-24 -top-24 h-72 w-72 rounded-full bg-sky-200/40 blur-3xl" />
        <div className="absolute -bottom-32 -right-20 h-80 w-80 rounded-full bg-cyan-200/40 blur-3xl" />
        <div className="absolute left-1/2 top-1/4 h-40 w-40 -translate-x-1/2 rounded-full bg-white/70 blur-3xl" />
      </div>

      <div className="relative z-10 flex min-h-[calc(100vh-3rem)] items-center justify-center">
        <div className="w-full max-w-lg">
          {/* Top brand */}
          <div className="mb-5 flex justify-center sm:mb-7">
            <Link
              to="/"
              className="group inline-flex items-center gap-2 rounded-full border border-sky-100 bg-white/80 px-4 py-2 shadow-sm backdrop-blur transition hover:-translate-y-0.5 hover:shadow-md"
            >
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-sky-500 text-white">
                <Sparkles size={14} />
              </div>

              <span className="text-sm font-bold tracking-wide text-sky-600">
                Paila
              </span>
            </Link>
          </div>

          {/* Card */}
          <section className="overflow-hidden rounded-[2rem] border border-white/80 bg-white/90 shadow-[0_20px_70px_-25px_rgba(14,165,233,0.35)] backdrop-blur-xl">
            {/* Top accent */}
            <div className="h-1.5 w-full bg-gradient-to-r from-sky-400 via-cyan-400 to-sky-500" />

            <div className="p-5 sm:p-8 md:p-10">
              {/* Icon */}
              <div className="flex justify-center">
                <div className="relative">
                  <div className="absolute inset-0 rounded-3xl bg-sky-200/50 blur-xl" />

                  <div className="relative flex h-20 w-20 items-center justify-center rounded-3xl border border-sky-100 bg-gradient-to-br from-sky-50 to-cyan-50 text-sky-500 shadow-sm sm:h-24 sm:w-24">
                    <ShieldCheck
                      size={42}
                      strokeWidth={1.8}
                      className="sm:h-12 sm:w-12"
                    />

                    <div className="absolute -right-1 -top-1 flex h-7 w-7 items-center justify-center rounded-full border-4 border-white bg-sky-500 text-white shadow-sm">
                      <LockKeyhole size={12} />
                    </div>
                  </div>
                </div>
              </div>

              {/* Heading */}
              <div className="mt-6 text-center">
                <div className="mb-2 inline-flex items-center gap-1.5 rounded-full bg-sky-50 px-3 py-1 text-xs font-semibold text-sky-600">
                  <CheckCircle2 size={13} />
                  Almost there
                </div>

                <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                  Verify your email
                </h1>

                <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-slate-500 sm:text-base">
                  Enter the 6-digit code we sent to your email to
                  securely continue to Paila.
                </p>
              </div>

              {/* Email */}
              <div className="mx-auto mt-6 flex max-w-md items-center gap-3 rounded-2xl border border-sky-100 bg-sky-50/70 px-4 py-3.5">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-sky-500 shadow-sm">
                  <Mail size={19} />
                </div>

                <div className="min-w-0 text-left">
                  <p className="text-[11px] font-medium uppercase tracking-wider text-slate-400">
                    Verification email
                  </p>

                  <p className="mt-0.5 truncate text-sm font-semibold text-slate-700">
                    {email || "your email address"}
                  </p>
                </div>
              </div>

              {/* Error */}
              {error && (
                <div
                  role="alert"
                  className="mt-5 flex items-start gap-3 rounded-2xl border border-red-200 bg-red-50 px-4 py-3.5 text-sm text-red-600"
                >
                  <div className="mt-0.5 shrink-0">
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <circle cx="12" cy="12" r="10" />
                      <line x1="12" y1="8" x2="12" y2="12" />
                      <line x1="12" y1="16" x2="12.01" y2="16" />
                    </svg>
                  </div>

                  <p>{error}</p>
                </div>
              )}

              {/* Form */}
              <form onSubmit={handleSubmit} className="mt-7">
                <label
                  htmlFor="otp"
                  className="mb-3 block text-center text-sm font-semibold text-slate-700"
                >
                  Enter verification code
                </label>

                {/* OTP input */}
                <div className="relative">
                  <input
                    ref={otpInputRef}
                    id="otp"
                    name="otp"
                    type="text"
                    inputMode="numeric"
                    autoComplete="one-time-code"
                    autoCorrect="off"
                    spellCheck={false}
                    maxLength={6}
                    value={otp}
                    onChange={(event) =>
                      handleOtpChange(event.target.value)
                    }
                    aria-label="6-digit verification code"
                    className="w-full rounded-2xl border-2 border-slate-200 bg-slate-50/70 px-3 py-5 text-center text-3xl font-bold tracking-[0.45em] text-slate-800 outline-none transition duration-200 placeholder:text-slate-300 focus:border-sky-400 focus:bg-white focus:ring-4 focus:ring-sky-100 sm:text-4xl sm:tracking-[0.55em]"
                    placeholder="••••••"
                  />

                  {otp.length === 6 && (
                    <div className="pointer-events-none absolute right-3 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-emerald-100 text-emerald-500">
                      <CheckCircle2 size={18} />
                    </div>
                  )}
                </div>

                <p className="mt-3 text-center text-xs text-slate-400">
                  Enter all 6 digits to continue
                </p>

                {/* Verify button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="group mt-6 flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-sky-500 to-cyan-500 px-5 py-4 font-semibold text-white shadow-lg shadow-sky-200/60 transition duration-200 hover:-translate-y-0.5 hover:from-sky-600 hover:to-cyan-600 hover:shadow-xl hover:shadow-sky-200/70 active:translate-y-0 disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:translate-y-0"
                >
                  {loading ? (
                    <>
                      <Loader2 size={19} className="animate-spin" />
                      Verifying your email...
                    </>
                  ) : (
                    <>
                      Verify email
                      <ArrowLeft
                        size={18}
                        className="rotate-180 transition-transform group-hover:translate-x-1"
                      />
                    </>
                  )}
                </button>
              </form>

              {/* Security note */}
              <div className="mt-6 flex items-center justify-center gap-2 text-xs text-slate-400">
                <LockKeyhole size={13} />
                <span>Your verification code is secure and expires soon.</span>
              </div>

              {/* Back */}
              <div className="mt-7 border-t border-slate-100 pt-6 text-center">
                <Link
                  to="/register"
                  className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold text-slate-500 transition hover:bg-slate-50 hover:text-sky-600"
                >
                  <ArrowLeft size={16} />
                  Back to signup
                </Link>
              </div>
            </div>
          </section>

          {/* Footer */}
          <p className="mt-5 text-center text-xs text-slate-400">
            Every journey starts with a step.
          </p>
        </div>
      </div>
    </main>
  );
}