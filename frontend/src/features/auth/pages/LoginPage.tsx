import {
  useEffect,
  useState,
} from "react";
import type { FormEvent } from "react";
import {
  Link,
  useLocation,
  useNavigate,
} from "react-router-dom";
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

interface LoginLocationState {
  email?: string;
  password?: string;
  verified?: boolean;
}

export default function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();

  const { login, isAuthenticated } = useAuth();

  const loginState =
    (location.state as LoginLocationState | null) ||
    null;

  const [email, setEmail] = useState(
    loginState?.email ?? ""
  );

  const [password, setPassword] = useState(
    loginState?.password ?? ""
  );

  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] =
    useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [googleMessage, setGoogleMessage] =
    useState(
      loginState?.verified
        ? "Email verified successfully. Please sign in to continue."
        : ""
    );

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
    <div className="relative min-h-[100dvh] overflow-hidden bg-slate-950">
      {/* Background */}

      <div
        className="fixed inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${heroImage})`,
        }}
      />

      <div className="fixed inset-0 bg-slate-950/70" />

      <div className="fixed inset-0 bg-gradient-to-br from-emerald-950/50 via-slate-950/20 to-slate-950/85" />

      {/* Page */}

      <div className="relative z-10 flex min-h-[100dvh] items-center justify-center px-3 py-3 sm:px-5 sm:py-5">
        <div className="w-full max-w-md">
          {/* Login Card */}

          <div className="rounded-3xl border border-white/15 bg-slate-950/40 shadow-2xl backdrop-blur-2xl">
            {/* Header */}

            <div className="px-5 pt-5 text-center sm:px-7 sm:pt-6">
              <div className="mx-auto mb-2.5 flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/20 ring-1 ring-emerald-400/30 sm:h-11 sm:w-11">
                <MapPin className="h-5 w-5 text-emerald-400 sm:h-6 sm:w-6" />
              </div>

              <h1 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
                Welcome back
              </h1>

              <p className="mt-1 text-xs text-slate-300 sm:text-sm">
                Sign in to continue your journey with Paila.
              </p>
            </div>

            {/* Error */}

            {error && (
              <div className="mx-5 mt-4 rounded-xl border border-red-400/30 bg-red-500/10 px-3 py-2 text-center text-xs leading-4 text-red-300 sm:mx-7">
                {error}
              </div>
            )}

            {/* Success / Information */}

            {googleMessage && (
              <div className="mx-5 mt-4 rounded-xl border border-emerald-400/20 bg-emerald-500/10 px-3 py-2 text-center text-xs leading-4 text-emerald-300 sm:mx-7">
                {googleMessage}
              </div>
            )}

            {/* Form */}

            <form
              onSubmit={handleSubmit}
              className="space-y-4 px-5 pb-5 pt-4 sm:px-7 sm:pb-6"
            >
              {/* Email */}

              <div>
                <label
                  htmlFor="email"
                  className="mb-1.5 block text-xs font-medium text-slate-200 sm:text-sm"
                >
                  Email Address
                </label>

                <div className="relative">
                  <Mail className={iconClass} />

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
                    className={inputClass}
                  />
                </div>
              </div>

              {/* Password */}

              <div>
                <div className="mb-1.5 flex items-center justify-between">
                  <label
                    htmlFor="password"
                    className="block text-xs font-medium text-slate-200 sm:text-sm"
                  >
                    Password
                  </label>

                  <button
                    type="button"
                    onClick={handleForgotPassword}
                    disabled={loading}
                    className="text-[10px] font-medium text-emerald-400 transition hover:text-emerald-300 disabled:cursor-not-allowed disabled:opacity-50 sm:text-xs"
                  >
                    Forgot Password?
                  </button>
                </div>

                <div className="relative">
                  <LockKeyhole className={iconClass} />

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
                    className={`${inputClass} pr-11`}
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowPassword(
                        (value) => !value
                      )
                    }
                    disabled={loading}
                    className={eyeButtonClass}
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
                      <EyeOff className="h-4.5 w-4.5" />
                    ) : (
                      <Eye className="h-4.5 w-4.5" />
                    )}
                  </button>
                </div>
              </div>

              {/* Remember Me / Security */}

              <div className="flex items-center justify-between pt-0.5">
                <label className="flex cursor-pointer items-center gap-2">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(event) =>
                      setRememberMe(
                        event.target.checked
                      )
                    }
                    disabled={loading}
                    className="h-3.5 w-3.5 cursor-pointer rounded border-white/20 bg-white/10 accent-emerald-500 disabled:cursor-not-allowed"
                  />

                  <span className="text-xs text-slate-300">
                    Remember me
                  </span>
                </label>

                <div className="flex items-center gap-1 text-[10px] text-slate-400 sm:text-xs">
                  <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" />
                  Secure login
                </div>
              </div>

              {/* Sign In */}

              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-xl bg-emerald-500 py-2.5 text-sm font-semibold text-white shadow-lg shadow-emerald-950/30 transition hover:bg-emerald-600 hover:shadow-emerald-500/10 disabled:cursor-not-allowed disabled:opacity-60 sm:py-3"
              >
                {loading
                  ? "Signing you in..."
                  : "Sign In"}
              </button>
            </form>

            {/* Divider */}

            <div className="flex items-center gap-3 px-5 sm:px-7">
              <div className="h-px flex-1 bg-white/10" />

              <span className="text-[10px] text-slate-500">
                OR
              </span>

              <div className="h-px flex-1 bg-white/10" />
            </div>

            {/* Google */}

            <div className="px-5 pt-4 sm:px-7">
              <button
                type="button"
                onClick={handleGoogleLogin}
                disabled={loading}
                className="flex w-full items-center justify-center gap-2.5 rounded-xl border border-white/15 bg-white/10 py-2.5 text-sm font-semibold text-white transition hover:bg-white/[0.15] disabled:cursor-not-allowed disabled:opacity-60"
              >
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-white text-[10px] font-bold text-slate-700">
                  G
                </span>

                Continue with Google
              </button>
            </div>

            {/* Register */}

            <div className="mt-5 border-t border-white/10 px-5 py-3.5 text-center sm:px-7 sm:py-4">
              <p className="text-xs text-slate-300 sm:text-sm">
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

          <p className="mt-2 text-center text-[10px] text-slate-400 sm:text-xs">
            Your journey starts here. 🌍
          </p>
        </div>
      </div>
    </div>
  );
}

/* =========================================
   Shared Styles
   ========================================= */

const inputClass =
  "w-full rounded-xl border border-white/15 bg-white/10 py-2.5 pl-11 pr-4 text-sm text-white outline-none transition placeholder:text-slate-400 focus:border-emerald-400 focus:bg-white/[0.13] focus:ring-2 focus:ring-emerald-400/20 disabled:cursor-not-allowed disabled:opacity-60 sm:py-3";

const iconClass =
  "pointer-events-none absolute left-3.5 top-1/2 z-10 h-4.5 w-4.5 -translate-y-1/2 text-slate-400";

const eyeButtonClass =
  "absolute right-2.5 top-1/2 z-10 -translate-y-1/2 rounded-lg p-1.5 text-slate-400 transition hover:bg-white/10 hover:text-white disabled:cursor-not-allowed disabled:opacity-50";