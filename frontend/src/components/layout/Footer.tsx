import { Link } from "react-router-dom";
import {
  ArrowUpRight,
  Mail,
  MapPin,
  Sparkles,
} from "lucide-react";
import { motion } from "framer-motion";

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-slate-950 text-white">
      {/* Floating background glow */}
      <motion.div
        animate={{
          x: [0, 35, 0],
          y: [0, -20, 0],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="pointer-events-none absolute -left-40 top-10 h-80 w-80 rounded-full bg-emerald-500/10 blur-3xl"
      />

      <motion.div
        animate={{
          x: [0, -30, 0],
          y: [0, 25, 0],
        }}
        transition={{
          duration: 14,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="pointer-events-none absolute -right-40 bottom-10 h-80 w-80 rounded-full bg-cyan-500/10 blur-3xl"
      />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        {/* =====================================================
            INTRO
        ====================================================== */}

        <div className="border-b border-white/10 py-16 sm:py-20 lg:py-24">
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="max-w-4xl"
          >
            <div className="mb-6 flex items-center gap-3">
              <span className="h-px w-10 bg-emerald-400" />

              <span className="text-xs font-semibold uppercase tracking-[0.25em] text-emerald-300">
                Paila · Nepal
              </span>
            </div>

            <h2 className="text-4xl font-medium leading-[1.05] tracking-[-0.04em] text-white sm:text-5xl lg:text-7xl">
              Your next journey
              <span className="block font-light italic text-white/45">
                starts here.
              </span>
            </h2>

            <p className="mt-6 max-w-2xl text-sm leading-7 text-white/55 sm:text-base sm:leading-8">
              Discover destinations, stays, experiences, and travel ideas
              across Nepal — all in one place.
            </p>
          </motion.div>
        </div>

        {/* =====================================================
            MAIN FOOTER
        ====================================================== */}

        <div className="grid gap-12 py-14 sm:grid-cols-2 sm:py-16 lg:grid-cols-4 lg:gap-14">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <Link
              to="/"
              className="group inline-flex items-center gap-3"
            >
              <motion.span
                whileHover={{ rotate: -5, scale: 1.05 }}
                className="flex h-11 w-11 items-center justify-center rounded-full bg-white text-slate-950 transition-colors duration-300 group-hover:bg-emerald-400"
              >
                <Sparkles className="h-5 w-5" />
              </motion.span>

              <span className="text-2xl font-medium tracking-tight text-white">
                Paila
              </span>
            </Link>

            <p className="mt-6 max-w-sm text-sm font-medium leading-6 text-white/80">
              Every journey starts with a step.
            </p>

            <p className="mt-3 max-w-sm text-sm leading-7 text-white/45">
              A travel platform built to help you discover Nepal with
              confidence, curiosity, and ease.
            </p>

            <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3.5 py-2 text-xs font-medium text-white/60">
              <MapPin className="h-3.5 w-3.5 text-emerald-400" />
              Made for Nepal 🇳🇵
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-white/70">
              Explore
            </h3>

            <ul className="mt-6 space-y-4">
              <FooterLink to="/" label="Home" />
              <FooterLink to="/destinations" label="Destinations" />
              <FooterLink to="/hotels" label="Hotels" />
              <FooterLink to="/ai" label="Paila AI" />
              <FooterLink to="/feedback" label="Feedback" />
            </ul>
          </div>

          {/* Discover */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-white/70">
              Discover
            </h3>

            <ul className="mt-6 space-y-4">
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

          {/* Contact */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-white/70">
              Stay connected
            </h3>

            <a
              href="mailto:paila.travel.nepal@gmail.com"
              className="group mt-6 flex w-fit items-center gap-3 text-sm text-white/50 transition-colors hover:text-white"
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 transition-all duration-300 group-hover:border-emerald-400/40 group-hover:bg-emerald-400/10 group-hover:text-emerald-300">
                <Mail className="h-4 w-4" />
              </span>

              <span className="break-all">
                paila.travel.nepal@gmail.com
              </span>
            </a>

            {/* Social */}
            <div className="mt-8">
              <p className="text-sm font-medium text-white/80">
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

        <div className="border-t border-white/10 py-6">
          <div className="flex flex-col gap-3 text-center sm:flex-row sm:items-center sm:justify-between sm:text-left">
            <p className="text-xs text-white/35 sm:text-sm">
              © {new Date().getFullYear()}{" "}
              <span className="text-white/60">Prasun Adhikari</span>
              . All rights reserved.
            </p>

            <div className="flex items-center justify-center gap-5 text-xs text-white/35 sm:justify-end sm:text-sm">
              <Link
                to="/legal"
                className="transition-colors hover:text-white"
              >
                Legal
              </Link>

              <span className="h-1 w-1 rounded-full bg-white/20" />

              <span>
                Made with <span aria-label="love">❤️</span> for Nepal.
              </span>
            </div>
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
        className="group inline-flex items-center gap-2 text-sm text-white/45 transition-colors duration-300 hover:text-white"
      >
        <span>{label}</span>

        <ArrowUpRight
          className="h-3.5 w-3.5 translate-y-0.5 opacity-0 transition-all duration-300 group-hover:translate-x-0.5 group-hover:translate-y-0 group-hover:opacity-100"
        />
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
      className="group inline-flex w-fit items-center gap-2 text-sm text-white/45 transition-colors duration-300 hover:text-white"
    >
      <span>{label}</span>

      <ArrowUpRight
        className="h-3.5 w-3.5 opacity-0 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100"
      />
    </a>
  );
}
