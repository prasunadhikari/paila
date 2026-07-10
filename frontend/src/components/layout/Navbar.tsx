import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <header className="fixed top-0 left-0 z-50 w-full border-b border-white/10 bg-black/20 backdrop-blur-xl">
      <nav className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">

        {/* Logo */}
        <Link to="/" className="flex flex-col">
          <span className="text-4xl font-extrabold tracking-tight text-white">
            Paila
          </span>

          <span className="text-sm text-gray-300">
            Every journey starts with a step.
          </span>
        </Link>

        {/* Center Links */}
        <div className="hidden items-center gap-10 md:flex">
          <Link
            to="/"
            className="font-medium text-white transition hover:text-emerald-400"
          >
            Home
          </Link>

          <Link
            to="/destinations"
            className="font-medium text-white transition hover:text-emerald-400"
          >
            Destinations
          </Link>

          <Link
            to="/about"
            className="font-medium text-white transition hover:text-emerald-400"
          >
            About
          </Link>
        </div>

        {/* Right Buttons */}
        <div className="flex items-center gap-4">
          <Link
            to="/login"
            className="rounded-xl px-5 py-2.5 font-medium text-white transition hover:bg-white/10"
          >
            Sign In
          </Link>

          <Link
            to="/register"
            className="rounded-xl bg-emerald-500 px-5 py-2.5 font-semibold text-white shadow-lg shadow-emerald-500/30 transition hover:scale-105 hover:bg-emerald-600"
          >
            Sign Up
          </Link>
        </div>

      </nav>
    </header>
  );
}