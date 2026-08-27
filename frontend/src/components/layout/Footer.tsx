import { Link } from "react-router-dom";
import { MapPin, Mail, ArrowUpRight } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">

        {/* Main Footer */}
        <div className="grid gap-12 py-14 sm:grid-cols-2 lg:grid-cols-4 lg:gap-16">

          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <Link
              to="/"
              className="inline-block text-2xl font-bold tracking-tight text-slate-900 transition hover:text-slate-700"
            >
              Paila
            </Link>

            <p className="mt-3 text-sm font-medium leading-6 text-slate-700">
              Explore Nepal, one step at a time.
            </p>

            <p className="mt-4 max-w-xs text-sm leading-6 text-slate-500">
              Your companion for discovering Nepal&apos;s destinations,
              culture, nature, adventure, and hidden gems.
            </p>

            <div className="mt-6 flex items-center gap-2 text-sm text-slate-500">
              <MapPin className="h-4 w-4 shrink-0" />
              <span>Made for Nepal</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold text-slate-900">
              Quick Links
            </h3>

            <ul className="mt-5 space-y-3">

              {/* Home - stays accessible */}
              <li>
                <Link
                  to="/"
                  className="text-sm text-slate-500 transition hover:text-slate-900"
                >
                  Home
                </Link>
              </li>

              {/* Destinations - login required */}
              <li>
                <Link
                  to="/login"
                  className="text-sm text-slate-500 transition hover:text-slate-900"
                >
                  Destinations
                </Link>
              </li>

              {/* Planner - login required */}
              <li>
                <Link
                  to="/login"
                  className="text-sm text-slate-500 transition hover:text-slate-900"
                >
                  Plan Your Trip
                </Link>
              </li>

              {/* About - stays accessible */}
              <li>
                <Link
                  to="/about"
                  className="text-sm text-slate-500 transition hover:text-slate-900"
                >
                  About
                </Link>
              </li>

              {/* Contact - stays accessible */}
              <li>
                <Link
                  to="/contact"
                  className="text-sm text-slate-500 transition hover:text-slate-900"
                >
                  Contact
                </Link>
              </li>

            </ul>
          </div>

          {/* Explore */}
          <div>
            <h3 className="text-sm font-semibold text-slate-900">
              Explore
            </h3>

            <ul className="mt-5 space-y-3">

              {/* Popular Destinations */}
              <li>
                <Link
                  to="/login"
                  className="group flex items-center gap-1 text-sm text-slate-500 transition hover:text-slate-900"
                >
                  Popular Destinations
                  <ArrowUpRight className="h-3.5 w-3.5 opacity-0 transition group-hover:opacity-100" />
                </Link>
              </li>

              {/* Trekking */}
              <li>
                <Link
                  to="/login"
                  className="text-sm text-slate-500 transition hover:text-slate-900"
                >
                  Trekking
                </Link>
              </li>

              {/* Culture & Heritage */}
              <li>
                <Link
                  to="/login"
                  className="text-sm text-slate-500 transition hover:text-slate-900"
                >
                  Culture &amp; Heritage
                </Link>
              </li>

              {/* Nature & Wildlife */}
              <li>
                <Link
                  to="/login"
                  className="text-sm text-slate-500 transition hover:text-slate-900"
                >
                  Nature &amp; Wildlife
                </Link>
              </li>

              {/* Adventure */}
              <li>
                <Link
                  to="/login"
                  className="text-sm text-slate-500 transition hover:text-slate-900"
                >
                  Adventure
                </Link>
              </li>

            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-sm font-semibold text-slate-900">
              Contact
            </h3>

            <a
              href="mailto:support@paila.com"
              className="mt-5 flex w-fit items-center gap-3 text-sm text-slate-500 transition hover:text-slate-900"
            >
              <Mail className="h-4 w-4 shrink-0" />
              <span>support@paila.com</span>
            </a>

            {/* Follow Paila - unchanged */}
            <div className="mt-7">
              <p className="text-sm font-medium text-slate-700">
                Follow Paila
              </p>

              <div className="mt-4 grid grid-cols-2 gap-x-6 gap-y-3">

                <span className="cursor-default text-sm text-slate-500 transition hover:text-slate-900">
                  Instagram
                </span>

                <span className="cursor-default text-sm text-slate-500 transition hover:text-slate-900">
                  Facebook
                </span>

                <span className="cursor-default text-sm text-slate-500 transition hover:text-slate-900">
                  TikTok
                </span>

                <span className="cursor-default text-sm text-slate-500 transition hover:text-slate-900">
                  Twitter
                </span>

              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-slate-200 py-6">
          <div className="flex flex-col items-center justify-between gap-3 text-center sm:flex-row sm:text-left">

            <p className="text-sm text-slate-500">
              © Prasun | All right reserved
            </p>

            <p className="text-sm text-slate-500">
              Made with <span aria-label="love">❤️</span> for Nepal.
            </p>

          </div>
        </div>

      </div>
    </footer>
  );
}
