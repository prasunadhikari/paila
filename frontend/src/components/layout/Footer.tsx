import { Link } from "react-router-dom";
import {
  ArrowUpRight,
  Mail,
  MapPin,
  Sparkles,
} from "lucide-react";

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-slate-200 bg-white">
      {/* Decorative background */}
      <div className="pointer-events-none absolute -left-32 top-10 h-64 w-64 rounded-full bg-emerald-100/50 blur-3xl" />
      <div className="pointer-events-none absolute -right-32 bottom-10 h-64 w-64 rounded-full bg-cyan-100/40 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        {/* =====================================================
            MAIN FOOTER
        ====================================================== */}

        <div className="grid gap-12 py-14 sm:grid-cols-2 lg:grid-cols-4 lg:gap-14 lg:py-16">
          {/* ===================================================
              BRAND
          ==================================================== */}

          <div className="sm:col-span-2 lg:col-span-1">
            <Link
              to="/"
              className="group inline-flex items-center gap-2"
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-600 text-white shadow-lg shadow-emerald-600/20 transition-transform duration-300 group-hover:-rotate-3 group-hover:scale-105">
                <Sparkles className="h-5 w-5" />
              </span>

              <span className="text-2xl font-black tracking-tight text-slate-950 transition-colors group-hover:text-emerald-600">
                Paila
              </span>
            </Link>

            <p className="mt-5 text-sm font-bold text-slate-800">
              Every journey starts with a step.
            </p>

            <p className="mt-3 max-w-sm text-sm leading-7 text-slate-500">
              Your companion for discovering Nepal&apos;s destinations,
              culture, nature, adventure, and hidden gems.
            </p>

            <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-emerald-100 bg-emerald-50 px-3.5 py-2 text-xs font-bold text-emerald-700">
              <MapPin className="h-3.5 w-3.5" />
              Made for Nepal 🇳🇵
            </div>
          </div>

          {/* ===================================================
              QUICK LINKS
          ==================================================== */}

          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900">
              Quick Links
            </h3>

            <ul className="mt-5 space-y-3.5">
              <FooterLink to="/" label="Home" />

              <FooterLink
                to="/destinations"
                label="Destinations"
              />

              <FooterLink
                to="/ai"
                label="Plan Your Trip"
              />

              <FooterLink
                to="/feedback"
                label="Feedback"
              />
            </ul>
          </div>

          {/* ===================================================
              EXPLORE
          ==================================================== */}

          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900">
              Explore
            </h3>

            <ul className="mt-5 space-y-3.5">
              <FooterLink
                to="/destinations"
                label="Popular Destinations"
              />

              <FooterLink
                to="/destinations"
                label="Trekking"
              />

              <FooterLink
                to="/destinations"
                label="Culture & Heritage"
              />

              <FooterLink
                to="/destinations"
                label="Nature & Wildlife"
              />

              <FooterLink
                to="/destinations"
                label="Adventure"
              />
            </ul>
          </div>

          {/* ===================================================
              CONTACT
          ==================================================== */}

          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900">
              Contact
            </h3>

            <a
              href="mailto:support@paila.com.np"
              className="group mt-5 flex w-fit items-center gap-3 text-sm text-slate-500 transition-colors hover:text-emerald-600"
            >
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-50 transition-all duration-200 group-hover:bg-emerald-50 group-hover:text-emerald-600">
                <Mail className="h-4 w-4" />
              </span>

              <span>support@paila.com.np</span>
            </a>

            {/* Social Media */}

            <div className="mt-8">
              <p className="text-sm font-bold text-slate-800">
                Follow Paila
              </p>

              <div className="mt-4 grid grid-cols-2 gap-x-5 gap-y-3">
                <SocialLink
                  href="https://instagram.com/"
                  label="Instagram"
                />

                <SocialLink
                  href="https://facebook.com/"
                  label="Facebook"
                />

                <SocialLink
                  href="https://tiktok.com/"
                  label="TikTok"
                />

                <SocialLink
                  href="https://x.com/"
                  label="X"
                />
              </div>
            </div>
          </div>
        </div>

        {/* =====================================================
            BOTTOM BAR
        ====================================================== */}

        <div className="border-t border-slate-200 py-6">
          <div className="flex flex-col gap-3 text-center sm:flex-row sm:items-center sm:justify-between sm:text-left">
            <p className="text-xs text-slate-500 sm:text-sm">
              © {new Date().getFullYear()}{" "}
              <span className="font-semibold text-slate-700">
                Prasun Adhikari
              </span>
              . All rights reserved.
            </p>

            <p className="text-xs text-slate-500 sm:text-sm">
              Made with <span aria-label="love">❤️</span> for Nepal.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

/* =========================================================
   FOOTER LINK
========================================================= */

function FooterLink({
  to,
  label,
}: {
  to: string;
  label: string;
}) {
  return (
    <li>
      <Link
        to={to}
        className="group inline-flex items-center gap-1.5 text-sm text-slate-500 transition-colors hover:text-emerald-600"
      >
        <span>{label}</span>

        <ArrowUpRight className="h-3.5 w-3.5 translate-y-0.5 opacity-0 transition-all duration-200 group-hover:translate-x-0.5 group-hover:translate-y-0 group-hover:opacity-100" />
      </Link>
    </li>
  );
}

/* =========================================================
   SOCIAL LINK
========================================================= */

function SocialLink({
  href,
  label,
}: {
  href: string;
  label: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group inline-flex w-fit items-center gap-1.5 text-sm text-slate-500 transition-colors hover:text-emerald-600"
    >
      <span>{label}</span>

      <ArrowUpRight className="h-3.5 w-3.5 opacity-0 transition-all duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100" />
    </a>
  );
}