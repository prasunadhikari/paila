import { Link } from "react-router-dom";
import heroImage from "../../../assets/images/hero.jpg";

export default function LoginPage() {
  return (
    <div
      className="relative flex min-h-screen items-center justify-center bg-cover bg-center px-6"
      style={{ backgroundImage: `url(${heroImage})` }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/60"></div>

      {/* Card */}
      <div className="relative z-10 w-full max-w-md rounded-3xl border border-white/20 bg-white/10 p-8 shadow-2xl backdrop-blur-xl">
        <h1 className="text-center text-4xl font-bold text-white">
          Welcome Back 
        </h1>

        <p className="mt-3 text-center text-slate-300">
          Sign in to continue your journey with Paila.
        </p>

        <form className="mt-8 space-y-5">
          <input
            type="email"
            placeholder="Email"
            className="w-full rounded-xl border border-white/20 bg-white/10 p-4 text-white placeholder:text-slate-300 focus:border-emerald-400 focus:outline-none"
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full rounded-xl border border-white/20 bg-white/10 p-4 text-white placeholder:text-slate-300 focus:border-emerald-400 focus:outline-none"
          />

          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center gap-2 text-slate-300">
              <input type="checkbox" />
              Remember me
            </label>

            <a href="#" className="text-emerald-400 hover:text-emerald-300">
              Forgot Password?
            </a>
          </div>

          <button
            type="submit"
            className="w-full rounded-xl bg-emerald-500 py-4 font-semibold text-white transition hover:bg-emerald-600"
          >
            Sign In
          </button>

          <button
            type="button"
            className="w-full rounded-xl border border-white/20 bg-white/10 py-4 font-semibold text-white transition hover:bg-white/20"
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