import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-16 md:grid-cols-3">
        {/* Logo */}
        <div>
          <h2 className="text-3xl font-bold text-emerald-400">Paila</h2>
          <p className="mt-4 text-slate-400">
            AI-powered travel planner helping you explore Nepal smarter.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="mb-4 text-xl font-semibold">Quick Links</h3>

          <div className="flex flex-col gap-3">
            <Link to="/" className="text-slate-400 hover:text-emerald-400">
              Home
            </Link>

            <Link
              to="/destinations"
              className="text-slate-400 hover:text-emerald-400"
            >
              Destinations
            </Link>

            <Link
              to="/login"
              className="text-slate-400 hover:text-emerald-400"
            >
              Sign In
            </Link>
          </div>
        </div>

        {/* Contact */}
        <div>
          <h3 className="mb-4 text-xl font-semibold">Contact</h3>

          <p className="text-slate-400">Kathmandu, Nepal 🇳🇵</p>
          <p className="mt-2 text-slate-400">hello@paila.app</p>
        </div>
      </div>

      <div className="border-t border-slate-800 py-6 text-center text-slate-500">
        © 2026 Paila. All rights reserved.
      </div>
    </footer>
  );
}