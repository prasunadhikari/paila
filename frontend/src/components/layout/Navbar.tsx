import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function Navbar() {
  const { user, isAuthenticated, logout } = useAuth();

  return (
    <header className="fixed left-0 top-0 z-50 w-full border-b border-white/10 bg-black/20 backdrop-blur-xl">
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

          {/* Home */}
          <Link
            to="/"
            className="font-medium text-white transition hover:text-emerald-400"
          >
            Home
          </Link>

          {/* Destinations → Login */}
          <Link
            to="/login"
            className="font-medium text-white transition hover:text-emerald-400"
          >
            Destinations
          </Link>

          {/* About */}
          <Link
            to="/about"
            className="font-medium text-white transition hover:text-emerald-400"
          >
            About
          </Link>

        </div>

        {/* Right Side */}
        <div className="flex items-center gap-4">

          {isAuthenticated && user ? (
            <>
              {/* User Name */}
              <span className="hidden text-sm font-medium text-white sm:block">
                Hi, {user.name}
              </span>

              {/* Logout */}
              <button
                type="button"
                onClick={logout}
                className="rounded-xl border border-white/15 bg-white/10 px-5 py-2.5 font-medium text-white transition hover:bg-white/15"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              {/* Sign In */}
              <Link
                to="/login"
                className="rounded-xl px-5 py-2.5 font-medium text-white transition hover:bg-white/10"
              >
                Sign In
              </Link>

              {/* Sign Up */}
              <Link
                to="/register"
                className="rounded-xl bg-emerald-500 px-5 py-2.5 font-semibold text-white shadow-lg shadow-emerald-500/30 transition hover:scale-105 hover:bg-emerald-600"
              >
                Sign Up
              </Link>
            </>
          )}

        </div>

      </nav>
    </header>
  );
}