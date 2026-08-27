import { useState } from "react";
import type { FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import heroImage from "../../../assets/images/hero.jpg";
import { login } from "../../../api/auth";

export default function LoginPage() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setError("");
    setLoading(true);

    try {
      const response = await login(email, password);

      if (!response.token) {
        throw new Error("Login token was not received");
      }

      if (rememberMe) {
        localStorage.setItem("paila_token", response.token);
      } else {
        sessionStorage.setItem("paila_token", response.token);
      }

      navigate("/");
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Unable to login. Please try again."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      className="relative flex min-h-screen items-center justify-center bg-cover bg-center px-6"
      style={{ backgroundImage: `url(${heroImage})` }}
    >
      <div className="absolute inset-0 bg-black/60"></div>

      <div className="relative z-10 w-full max-w-md rounded-3xl border border-white/20 bg-white/10 p-8 shadow-2xl backdrop-blur-xl">
        <h1 className="text-center text-4xl font-bold text-white">
          Welcome Back
        </h1>

        <p className="mt-3 text-center text-slate-300">
          Sign in to continue your journey with Paila.
        </p>

        {error && (
          <div className="mt-5 rounded-xl border border-red-400/30 bg-red-500/10 p-3 text-center text-sm text-red-300">
            {error}
          </div>
        )}

        <form
          className="mt-8 space-y-5"
          onSubmit={handleSubmit}
        >
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
            className="w-full rounded-xl border border-white/20 bg-white/10 p-4 text-white placeholder:text-slate-300 focus:border-emerald-400 focus:outline-none"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
            className="w-full rounded-xl border border-white/20 bg-white/10 p-4 text-white placeholder:text-slate-300 focus:border-emerald-400 focus:outline-none"
          />

          <div className="flex items-center justify-between text-sm">
            <label className="flex cursor-pointer items-center gap-2 text-slate-300">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(event) =>
                  setRememberMe(event.target.checked)
                }
              />
              Remember me
            </label>

            <button
              type="button"
              className="text-emerald-400 hover:text-emerald-300"
              onClick={() =>
                setError("Password reset will be available soon.")
              }
            >
              Forgot Password?
            </button>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-emerald-500 py-4 font-semibold text-white transition hover:bg-emerald-600 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "Signing In..." : "Sign In"}
          </button>

          <button
            type="button"
            disabled
            className="w-full cursor-not-allowed rounded-xl border border-white/20 bg-white/10 py-4 font-semibold text-white opacity-60"
          >
            Continue with Google
          </button>
        </form>

        <p className="mt-8 text-center text-slate-300">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="font-semibold text-emerald-400 hover:text-emerald-300"
          >
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}