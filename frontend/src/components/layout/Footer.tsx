import { Link } from "react-router-dom";
import {
  ArrowUpRight,
  Mail,
  MapPin,
} from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">

        {/* =====================================================
            MAIN FOOTER
        ====================================================== */}

        <div className="grid gap-10 py-12 sm:grid-cols-2 lg:grid-cols-4 lg:gap-12 lg:py-14">

          {/* ===================================================
              BRAND
          ==================================================== */}

          <div className="sm:col-span-2 lg:col-span-1">
            <Link
              to="/"
              className="inline-flex items-center text-2xl font-bold tracking-tight text-slate-950 transition hover:text-emerald-600"
            >
              Paila
            </Link>

            <p className="mt-3 text-sm font-semibold text-slate-800">
              Explore Nepal, one step at a time.
            </p>

            <p className="mt-3 max-w-sm text-sm leading-6 text-slate-500">
              Your companion for discovering Nepal&apos;s destinations,
              culture, nature, adventure, and hidden gems.
            </p>

            <div className="mt-5 inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-2 text-xs font-semibold text-emerald-700">
              <MapPin className="h-3.5 w-3.5" />
              Made for Nepal 🇳🇵
            </div>
          </div>

          {/* ===================================================
              QUICK LINKS
          ==================================================== */}

          <div>
            <h3 className="text-sm font-bold text-slate-900">
              Quick Links
            </h3>

            <ul className="mt-5 space-y-3.5">

              <FooterLink
                to="/"
                label="Home"
              />

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
            <h3 className="text-sm font-bold text-slate-900">
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
            <h3 className="text-sm font-bold text-slate-900">
              Contact
            </h3>

            <a
              href="mailto:support@paila.com.np"
              className="group mt-5 flex w-fit items-center gap-3 text-sm text-slate-500 transition hover:text-emerald-600"
            >
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-50 transition group-hover:bg-emerald-50">
                <Mail className="h-4 w-4" />
              </span>

              <span>support@paila.com.np</span>
            </a>

            {/* Social Media */}

            <div className="mt-7">
              <p className="text-sm font-semibold text-slate-800">
                Follow Paila
              </p>

              <div className="mt-4 grid grid-cols-2 gap-x-5 gap-y-3">

                {/* Instagram */}

                <SocialLink
                  href="https://instagram.com/"
                  label="Instagram"
                />

                {/* Facebook */}

                <SocialLink
                  href="https://facebook.com/"
                  label="Facebook"
                />

                {/* TikTok */}

                <SocialLink
                  href="https://tiktok.com/"
                  label="TikTok"
                />

                {/* X / Twitter */}

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
              © {new Date().getFullYear()} Paila. All rights reserved.
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
        className="group inline-flex items-center gap-1.5 text-sm text-slate-500 transition hover:text-emerald-600"
      >
        <span>{label}</span>

        <ArrowUpRight className="h-3.5 w-3.5 translate-y-0.5 opacity-0 transition-all group-hover:translate-x-0.5 group-hover:translate-y-0 group-hover:opacity-100" />
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
      className="group inline-flex w-fit items-center gap-1.5 text-sm text-slate-500 transition hover:text-emerald-600"
    >
      <span>{label}</span>

      <ArrowUpRight className="h-3.5 w-3.5 opacity-0 transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100" />
    </a>
  );
}