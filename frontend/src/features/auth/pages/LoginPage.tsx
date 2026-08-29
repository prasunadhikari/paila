import { useEffect, useState } from "react";
import type { FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Eye,
  EyeOff,
  LockKeyhole,
  Mail,
  MapPin,
  ShieldCheck,
} from "lucide-react";

import heroImage from "../../../assets/images/hero.jpg";
import { useAuth } from "../../../context/AuthContext";

export default function LoginPage() {
  const navigate = useNavigate();
  const { login, isAuthenticated } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [googleMessage, setGoogleMessage] = useState("");

  // If the user is already logged in,
  // don't allow them to stay on the login page.
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/", { replace: true });
    }
  }, [isAuthenticated, navigate]);

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    setError("");
    setGoogleMessage("");

    const trimmedEmail = email.trim();

    if (!trimmedEmail) {
      setError("Please enter your email address.");
      return;
    }

    if (!password) {
      setError("Please enter your password.");
      return;
    }

    setLoading(true);

    try {
      await login(
        trimmedEmail,
        password,
        rememberMe
      );

      // Login successful → user dashboard
    navigate("/", { replace: true });
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Unable to sign in. Please check your credentials and try again."
      );
    } finally {
      setLoading(false);
    }
  }

  function handleForgotPassword() {
    setError("");
    setGoogleMessage(
      "Password reset will be available soon."
    );
  }

  function handleGoogleLogin() {
    setError("");
    setGoogleMessage(
      "Google sign-in will be available soon."
    );
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-950">

      {/* =========================
          Background
      ========================== */}
      <div
        className="fixed inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${heroImage})`,
        }}
      />

      {/* Dark overlay */}
      <div className="fixed inset-0 bg-slate-950/75" />

      {/* Emerald gradient */}
      <div className="fixed inset-0 bg-gradient-to-br from-emerald-950/40 via-transparent to-slate-950/80" />

      {/* =========================
          Page
      ========================== */}
      <div className="relative z-10 flex min-h-screen items-center justify-center px-4 py-10 sm:px-6">

        <div className="w-full max-w-lg">

          {/* =========================
              Login Card
          ========================== */}
          <div className="rounded-3xl border border-white/15 bg-white/[0.08] p-6 shadow-2xl backdrop-blur-2xl sm:p-8">

            {/* Header */}
            <div className="mb-8 text-center">

              {/* Icon */}
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-500/20 ring-1 ring-emerald-400/30">
                <MapPin className="h-7 w-7 text-emerald-400" />
              </div>

              <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                Welcome back
              </h1>

              <p className="mt-2 text-sm text-slate-300 sm:text-base">
                Sign in to continue your journey with Paila.
              </p>

            </div>

            {/* =========================
                Error Message
            ========================== */}
            {error && (
              <div className="mb-5 rounded-xl border border-red-400/30 bg-red-500/10 px-4 py-3 text-sm leading-5 text-red-300">
                {error}
              </div>
            )}

            {/* =========================
                Information Message
            ========================== */}
            {googleMessage && (
              <div className="mb-5 rounded-xl border border-emerald-400/20 bg-emerald-500/10 px-4 py-3 text-center text-sm leading-5 text-emerald-300">
                {googleMessage}
              </div>
            )}

            {/* =========================
                Login Form
            ========================== */}
            <form
              onSubmit={handleSubmit}
              className="space-y-5"
            >

              {/* Email */}
              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-medium text-slate-200"
                >
                  Email Address
                </label>

                <div className="relative">

                  <Mail className="pointer-events-none absolute left-4 top-1/2 z-10 h-5 w-5 -translate-y-1/2 text-slate-400" />

                  <input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(event) => {
                      setEmail(event.target.value);
                      setError("");
                    }}
                    required
                    autoComplete="email"
                    disabled={loading}
                    className="w-full rounded-xl border border-white/15 bg-white/10 py-3.5 pl-12 pr-4 text-white outline-none transition placeholder:text-slate-400 focus:border-emerald-400 focus:bg-white/[0.13] focus:ring-2 focus:ring-emerald-400/20 disabled:cursor-not-allowed disabled:opacity-60"
                  />

                </div>
              </div>

              {/* Password */}
              <div>

                <div className="mb-2 flex items-center justify-between">

                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-slate-200"
                  >
                    Password
                  </label>

                  <button
                    type="button"
                    onClick={handleForgotPassword}
                    disabled={loading}
                    className="text-xs font-medium text-emerald-400 transition hover:text-emerald-300 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    Forgot Password?
                  </button>

                </div>

                <div className="relative">

                  <LockKeyhole className="pointer-events-none absolute left-4 top-1/2 z-10 h-5 w-5 -translate-y-1/2 text-slate-400" />

                  <input
                    id="password"
                    type={
                      showPassword
                        ? "text"
                        : "password"
                    }
                    placeholder="Enter your password"
                    value={password}
                    onChange={(event) => {
                      setPassword(event.target.value);
                      setError("");
                    }}
                    required
                    autoComplete="current-password"
                    disabled={loading}
                    className="w-full rounded-xl border border-white/15 bg-white/10 py-3.5 pl-12 pr-12 text-white outline-none transition placeholder:text-slate-400 focus:border-emerald-400 focus:bg-white/[0.13] focus:ring-2 focus:ring-emerald-400/20 disabled:cursor-not-allowed disabled:opacity-60"
                  />

                  {/* Show / Hide Password */}
                  <button
                    type="button"
                    onClick={() =>
                      setShowPassword(
                        (value) => !value
                      )
                    }
                    disabled={loading}
                    className="absolute right-3 top-1/2 z-10 -translate-y-1/2 rounded-lg p-2 text-slate-400 transition hover:bg-white/10 hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
                    aria-label={
                      showPassword
                        ? "Hide password"
                        : "Show password"
                    }
                    title={
                      showPassword
                        ? "Hide password"
                        : "Show password"
                    }
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                  </button>

                </div>
              </div>

              {/* Remember Me */}
              <div className="flex items-center justify-between pt-1">

                <label className="flex cursor-pointer items-center gap-3">

                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(event) =>
                      setRememberMe(
                        event.target.checked
                      )
                    }
                    disabled={loading}
                    className="h-4 w-4 cursor-pointer rounded border-white/20 bg-white/10 accent-emerald-500 disabled:cursor-not-allowed"
                  />

                  <span className="text-sm text-slate-300">
                    Remember me
                  </span>

                </label>

                <div className="flex items-center gap-1.5 text-xs text-slate-400">
                  <ShieldCheck className="h-4 w-4 text-emerald-400" />
                  Secure login
                </div>

              </div>

              {/* Sign In */}
              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-xl bg-emerald-500 py-3.5 font-semibold text-white shadow-lg shadow-emerald-950/30 transition hover:bg-emerald-600 hover:shadow-emerald-500/10 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading
                  ? "Signing you in..."
                  : "Sign In"}
              </button>

            </form>

            {/* =========================
                Divider
            ========================== */}
            <div className="my-6 flex items-center gap-4">

              <div className="h-px flex-1 bg-white/10" />

              <span className="text-xs text-slate-500">
                OR
              </span>

              <div className="h-px flex-1 bg-white/10" />

            </div>

            {/* =========================
                Google Login
            ========================== */}
            <button
              type="button"
              onClick={handleGoogleLogin}
              disabled={loading}
              className="flex w-full items-center justify-center gap-3 rounded-xl border border-white/15 bg-white/10 py-3.5 font-semibold text-white transition hover:bg-white/[0.15] disabled:cursor-not-allowed disabled:opacity-60"
            >

              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-white text-xs font-bold text-slate-700">
                G
              </span>

              Continue with Google

            </button>

            {/* =========================
                Register
            ========================== */}
            <div className="mt-7 border-t border-white/10 pt-6 text-center">

              <p className="text-sm text-slate-300">

                Don't have an account?{" "}

                <Link
                  to="/register"
                  className="font-semibold text-emerald-400 transition hover:text-emerald-300"
                >
                  Create Account
                </Link>

              </p>

            </div>

          </div>

          {/* Footer */}
          <p className="mt-5 text-center text-xs text-slate-400">
            Your journey starts here. 🌍
          </p>

        </div>

      </div>

    </div>
  );
}