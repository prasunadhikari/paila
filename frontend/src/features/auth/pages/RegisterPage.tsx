import { useState } from "react";
import type { FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  CheckCircle2,
  Eye,
  EyeOff,
  LockKeyhole,
  Mail,
  MapPin,
  User,
} from "lucide-react";

import {
  PhoneInput,
  defaultCountries,
} from "react-international-phone";

import "react-international-phone/style.css";

import heroImage from "../../../assets/images/hero.jpg";
import { register } from "../../../api/auth";

/*
 * IMPORTANT:
 * Keep defaultCountries so the complete country list
 * provided by react-international-phone is available.
 */
const countries = defaultCountries;

export default function RegisterPage() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);

  const [agreeTerms, setAgreeTerms] = useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const passwordChecks = {
    length: password.length >= 8,
    uppercase: /[A-Z]/.test(password),
    number: /[0-9]/.test(password),
    special: /[^A-Za-z0-9]/.test(password),
  };

  const passwordStrength =
    Object.values(passwordChecks).filter(Boolean).length;

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    setError("");

    if (name.trim().length < 2) {
      setError("Please enter your full name.");
      return;
    }

    if (!email.trim()) {
      setError("Please enter your email address.");
      return;
    }

    if (
      !phone ||
      phone.replace(/\D/g, "").length < 7
    ) {
      setError("Please enter a valid contact number.");
      return;
    }

    if (password.length < 8) {
      setError(
        "Password must contain at least 8 characters."
      );
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (passwordStrength < 3) {
      setError(
        "Please choose a stronger password with uppercase letters, numbers, or special characters."
      );
      return;
    }

    if (!agreeTerms) {
      setError(
        "Please agree to the Terms of Service and Privacy Policy."
      );
      return;
    }

    setLoading(true);

    try {
      /*
       * Current backend accepts:
       * name, email, password
       *
       * Phone will be connected to the backend later.
       */
      await register(
  name.trim(),
  email.trim(),
  phone.trim(),
  password
);

      navigate("/login");
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Unable to create your account. Please try again."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-950">

      {/* =========================================
          BACKGROUND
          ========================================= */}

      <div
        className="fixed inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${heroImage})`,
        }}
      />

      <div className="fixed inset-0 bg-slate-950/75" />

      <div className="fixed inset-0 bg-gradient-to-br from-emerald-950/40 via-transparent to-slate-950/80" />


      {/* =========================================
          PAGE
          ========================================= */}

      <div className="relative z-10 flex min-h-screen items-center justify-center px-4 py-10 sm:px-6">

        <div className="w-full max-w-lg">


          {/* =========================================
              REGISTER CARD
              ========================================= */}

          <div className="rounded-3xl border border-white/15 bg-white/[0.08] p-6 shadow-2xl backdrop-blur-2xl sm:p-8">


            {/* =========================================
                HEADER
                ========================================= */}

            <div className="mb-8 text-center">

              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-500/20 ring-1 ring-emerald-400/30">

                <MapPin className="h-7 w-7 text-emerald-400" />

              </div>

              <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                Create your account
              </h1>

              <p className="mt-2 text-sm text-slate-300 sm:text-base">
                Join Paila and start planning your next journey.
              </p>

            </div>


            {/* =========================================
                ERROR MESSAGE
                ========================================= */}

            {error && (
              <div className="mb-6 rounded-xl border border-red-400/30 bg-red-500/10 px-4 py-3 text-sm text-red-300">
                {error}
              </div>
            )}


            {/* =========================================
                FORM
                ========================================= */}

            <form
              onSubmit={handleSubmit}
              className="space-y-5"
            >


              {/* =========================================
                  FULL NAME
                  ========================================= */}

              <div>

                <label
                  htmlFor="name"
                  className="mb-2 block text-sm font-medium text-slate-200"
                >
                  Full Name
                </label>

                <div className="relative">

                  <User className="pointer-events-none absolute left-4 top-1/2 z-10 h-5 w-5 -translate-y-1/2 text-slate-400" />

                  <input
                    id="name"
                    type="text"
                    placeholder="Enter your full name"
                    value={name}
                    onChange={(event) =>
                      setName(event.target.value)
                    }
                    required
                    autoComplete="name"
                    className="w-full rounded-xl border border-white/15 bg-white/10 py-3.5 pl-12 pr-4 text-white outline-none transition placeholder:text-slate-400 focus:border-emerald-400 focus:bg-white/[0.13] focus:ring-2 focus:ring-emerald-400/20"
                  />

                </div>

              </div>


              {/* =========================================
                  EMAIL
                  ========================================= */}

              <div>

                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-medium text-slate-200"
                >
                  Email Address
                </label>

                <div className="relative">

                  <Mail className="pointer-events-none absolute left-4 top-1/2 z-10 h-5 w-5 -translate-y-1/2 text-slate-400" />

                  <input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(event) =>
                      setEmail(event.target.value)
                    }
                    required
                    autoComplete="email"
                    className="w-full rounded-xl border border-white/15 bg-white/10 py-3.5 pl-12 pr-4 text-white outline-none transition placeholder:text-slate-400 focus:border-emerald-400 focus:bg-white/[0.13] focus:ring-2 focus:ring-emerald-400/20"
                  />

                </div>

              </div>


              {/* =========================================
                  PHONE
                  ========================================= */}

              <div>

                <label
                  htmlFor="phone"
                  className="mb-2 block text-sm font-medium text-slate-200"
                >
                  Contact Number
                </label>


                <div className="paila-phone">

                  <PhoneInput
                    defaultCountry="np"
                    value={phone}
                    onChange={(value) => {
                      setPhone(value);
                    }}

                    /*
                     * IMPORTANT:
                     * defaultCountries keeps ALL available
                     * countries in the dropdown.
                     */
                    countries={countries}

                    className="paila-phone-container"

                    inputClassName="paila-phone-input"

                    countrySelectorStyleProps={{
                      buttonClassName:
                        "paila-country-button",

                      dropdownStyleProps: {
                        listItemClassName:
                          "paila-country-item",
                      },
                    }}

                    inputProps={{
                      id: "phone",
                      name: "phone",
                      required: true,
                      autoComplete: "tel",
                      placeholder:
                        "Enter your contact number",
                    }}
                  />

                </div>


                <p className="mt-2 text-xs text-slate-400">
                  Select your country and enter your contact number.
                </p>

              </div>


              {/* =========================================
                  PASSWORD
                  ========================================= */}

              <div>

                <label
                  htmlFor="password"
                  className="mb-2 block text-sm font-medium text-slate-200"
                >
                  Password
                </label>


                <div className="relative">

                  <LockKeyhole className="pointer-events-none absolute left-4 top-1/2 z-10 h-5 w-5 -translate-y-1/2 text-slate-400" />


                  <input
                    id="password"
                    type={
                      showPassword
                        ? "text"
                        : "password"
                    }
                    placeholder="Create a strong password"
                    value={password}
                    onChange={(event) =>
                      setPassword(event.target.value)
                    }
                    required
                    minLength={8}
                    autoComplete="new-password"
                    className="w-full rounded-xl border border-white/15 bg-white/10 py-3.5 pl-12 pr-12 text-white outline-none transition placeholder:text-slate-400 focus:border-emerald-400 focus:bg-white/[0.13] focus:ring-2 focus:ring-emerald-400/20"
                  />


                  <button
                    type="button"
                    onClick={() =>
                      setShowPassword(
                        (value) => !value
                      )
                    }
                    className="absolute right-3 top-1/2 z-10 -translate-y-1/2 rounded-lg p-2 text-slate-400 transition hover:bg-white/10 hover:text-white"
                    aria-label={
                      showPassword
                        ? "Hide password"
                        : "Show password"
                    }
                  >

                    {showPassword ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}

                  </button>

                </div>


                {/* Password Strength */}

                {password.length > 0 && (

                  <div className="mt-3">

                    <div className="mb-2 flex gap-1">

                      {[1, 2, 3, 4].map(
                        (level) => (
                          <div
                            key={level}
                            className={`h-1.5 flex-1 rounded-full transition ${
                              level <=
                              passwordStrength
                                ? "bg-emerald-400"
                                : "bg-white/10"
                            }`}
                          />
                        )
                      )}

                    </div>


                    <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-xs">

                      <PasswordRequirement
                        valid={
                          passwordChecks.length
                        }
                        text="8+ characters"
                      />

                      <PasswordRequirement
                        valid={
                          passwordChecks.uppercase
                        }
                        text="Uppercase letter"
                      />

                      <PasswordRequirement
                        valid={
                          passwordChecks.number
                        }
                        text="Number"
                      />

                      <PasswordRequirement
                        valid={
                          passwordChecks.special
                        }
                        text="Special character"
                      />

                    </div>

                  </div>

                )}

              </div>


              {/* =========================================
                  CONFIRM PASSWORD
                  ========================================= */}

              <div>

                <label
                  htmlFor="confirmPassword"
                  className="mb-2 block text-sm font-medium text-slate-200"
                >
                  Confirm Password
                </label>


                <div className="relative">

                  <LockKeyhole className="pointer-events-none absolute left-4 top-1/2 z-10 h-5 w-5 -translate-y-1/2 text-slate-400" />


                  <input
                    id="confirmPassword"
                    type={
                      showConfirmPassword
                        ? "text"
                        : "password"
                    }
                    placeholder="Re-enter your password"
                    value={confirmPassword}
                    onChange={(event) =>
                      setConfirmPassword(
                        event.target.value
                      )
                    }
                    required
                    autoComplete="new-password"
                    className={`w-full rounded-xl border bg-white/10 py-3.5 pl-12 pr-12 text-white outline-none transition placeholder:text-slate-400 focus:ring-2 ${
                      confirmPassword &&
                      password !==
                        confirmPassword
                        ? "border-red-400/50 focus:border-red-400 focus:ring-red-400/20"
                        : "border-white/15 focus:border-emerald-400 focus:ring-emerald-400/20"
                    }`}
                  />


                  <button
                    type="button"
                    onClick={() =>
                      setShowConfirmPassword(
                        (value) => !value
                      )
                    }
                    className="absolute right-3 top-1/2 z-10 -translate-y-1/2 rounded-lg p-2 text-slate-400 transition hover:bg-white/10 hover:text-white"
                    aria-label={
                      showConfirmPassword
                        ? "Hide confirm password"
                        : "Show confirm password"
                    }
                  >

                    {showConfirmPassword ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}

                  </button>

                </div>


                {confirmPassword &&
                  password ===
                    confirmPassword && (

                    <p className="mt-2 flex items-center gap-1.5 text-xs text-emerald-400">

                      <CheckCircle2 className="h-4 w-4" />

                      Passwords match

                    </p>

                  )}

              </div>


              {/* =========================================
                  TERMS
                  ========================================= */}

              <label className="flex cursor-pointer items-start gap-3 pt-1">

                <input
                  type="checkbox"
                  checked={agreeTerms}
                  onChange={(event) =>
                    setAgreeTerms(
                      event.target.checked
                    )
                  }
                  className="mt-0.5 h-4 w-4 rounded border-white/20 bg-white/10 accent-emerald-500"
                />

                <span className="text-xs leading-5 text-slate-300">

                  I agree to Paila's{" "}

                  <Link
                    to="/terms"
                    className="font-medium text-emerald-400 hover:text-emerald-300"
                  >
                    Terms of Service
                  </Link>{" "}

                  and{" "}

                  <Link
                    to="/privacy"
                    className="font-medium text-emerald-400 hover:text-emerald-300"
                  >
                    Privacy Policy
                  </Link>
                  .

                </span>

              </label>


              {/* =========================================
                  SUBMIT
                  ========================================= */}

              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-xl bg-emerald-500 py-3.5 font-semibold text-white shadow-lg shadow-emerald-950/30 transition hover:bg-emerald-600 disabled:cursor-not-allowed disabled:opacity-60"
              >

                {loading
                  ? "Creating your account..."
                  : "Create Account"}

              </button>

            </form>


            {/* =========================================
                LOGIN LINK
                ========================================= */}

            <div className="mt-7 border-t border-white/10 pt-6 text-center">

              <p className="text-sm text-slate-300">

                Already have an account?{" "}

                <Link
                  to="/login"
                  className="font-semibold text-emerald-400 transition hover:text-emerald-300"
                >
                  Sign In
                </Link>

              </p>

            </div>

          </div>


          {/* Footer */}

          <p className="mt-5 text-center text-xs text-slate-400">
            Your journey starts here. 🌍
          </p>

        </div>

      </div>


      {/* =========================================
          PHONE INPUT CUSTOM STYLING
          ========================================= */}

      <style>{`

        /* Main wrapper */
        .paila-phone {
          position: relative;
          width: 100%;
          z-index: 30;
        }

        .paila-phone-container {
          width: 100%;
          position: relative;
        }


        /* =========================================
           PHONE INPUT
           ========================================= */

        .paila-phone .react-international-phone-input {
          width: 100% !important;
          height: 54px !important;

          padding-left: 58px !important;
          padding-right: 14px !important;

          border-radius: 12px !important;

          border: 1px solid rgba(255,255,255,0.15) !important;

          background: rgba(255,255,255,0.10) !important;

          color: white !important;

          font-size: 15px !important;

          outline: none !important;

          box-shadow: none !important;

          transition:
            border-color 0.2s ease,
            background 0.2s ease,
            box-shadow 0.2s ease !important;
        }


        .paila-phone .react-international-phone-input::placeholder {
          color: rgb(148 163 184) !important;
        }


        .paila-phone .react-international-phone-input:focus {
          border-color: rgb(52 211 153) !important;

          background: rgba(255,255,255,0.13) !important;

          box-shadow:
            0 0 0 3px rgba(52,211,153,0.10) !important;
        }


        /* =========================================
           COUNTRY BUTTON
           ========================================= */

        .paila-phone .paila-country-button {
          width: 52px !important;
          height: 52px !important;

          display: flex !important;

          align-items: center !important;
          justify-content: center !important;

          padding: 0 !important;

          margin: 0 !important;

          border: none !important;

          border-radius: 12px 0 0 12px !important;

          background: transparent !important;

          cursor: pointer !important;

          transition:
            background 0.2s ease !important;
        }


        .paila-phone .paila-country-button:hover {
          background: rgba(255,255,255,0.08) !important;
        }


        .paila-phone .paila-country-button:focus {
          outline: none !important;

          background: rgba(255,255,255,0.08) !important;
        }


        /* =========================================
           FLAG
           ========================================= */

        .paila-phone
        .react-international-phone-country-selector-button__flag-emoji {
          font-size: 21px !important;

          line-height: 1 !important;

          display: block !important;
        }


        /* =========================================
           DROPDOWN
           ========================================= */

        .paila-phone
        .react-international-phone-country-selector-dropdown {
          position: absolute !important;

          top: calc(100% + 8px) !important;

          left: 0 !important;

          width: 100% !important;

          min-width: 300px !important;

          max-width: 360px !important;

          max-height: 330px !important;

          padding: 6px !important;

          overflow-y: auto !important;

          overflow-x: hidden !important;

          border: 1px solid rgba(255,255,255,0.14) !important;

          border-radius: 16px !important;

          background:
            rgba(15,23,42,0.98) !important;

          backdrop-filter: blur(18px) !important;

          -webkit-backdrop-filter: blur(18px) !important;

          box-shadow:
            0 24px 60px rgba(0,0,0,0.45),
            0 0 0 1px rgba(255,255,255,0.03) !important;

          z-index: 9999 !important;
        }


        /* =========================================
           DROPDOWN SCROLLBAR
           ========================================= */

        .paila-phone
        .react-international-phone-country-selector-dropdown::-webkit-scrollbar {
          width: 6px !important;
        }


        .paila-phone
        .react-international-phone-country-selector-dropdown::-webkit-scrollbar-track {
          background: transparent !important;
        }


        .paila-phone
        .react-international-phone-country-selector-dropdown::-webkit-scrollbar-thumb {
          background: rgba(148,163,184,0.30) !important;

          border-radius: 999px !important;
        }


        .paila-phone
        .react-international-phone-country-selector-dropdown::-webkit-scrollbar-thumb:hover {
          background: rgba(148,163,184,0.50) !important;
        }


        /* =========================================
           COUNTRY LIST ITEM
           ========================================= */

        .paila-phone .paila-country-item {
          min-height: 44px !important;

          display: flex !important;

          align-items: center !important;

          padding: 9px 10px !important;

          margin: 2px 0 !important;

          border-radius: 10px !important;

          color: rgb(226 232 240) !important;

          background: transparent !important;

          font-size: 14px !important;

          cursor: pointer !important;

          transition:
            background 0.15s ease,
            color 0.15s ease !important;
        }


        .paila-phone .paila-country-item:hover {
          background:
            rgba(255,255,255,0.08) !important;

          color: white !important;
        }


        /* Selected country */

        .paila-phone
        .paila-country-item.highlight {
          background:
            rgba(16,185,129,0.15) !important;

          color: white !important;
        }


        /* =========================================
           DROPDOWN FLAGS
           ========================================= */

        .paila-phone
        .paila-country-item
        .react-international-phone-country-selector-dropdown__list-item-flag-emoji {
          width: 24px !important;

          min-width: 24px !important;

          margin-right: 10px !important;

          font-size: 20px !important;

          line-height: 1 !important;
        }


        /* =========================================
           COUNTRY NAME
           ========================================= */

        .paila-phone
        .paila-country-item
        .react-international-phone-country-selector-dropdown__list-item-country-name {
          flex: 1 !important;

          color: rgb(226 232 240) !important;

          white-space: nowrap !important;

          overflow: hidden !important;

          text-overflow: ellipsis !important;
        }


        /* =========================================
           DIAL CODE
           ========================================= */

        .paila-phone
        .paila-country-item
        .react-international-phone-country-selector-dropdown__list-item-dial-code {
          margin-left: 12px !important;

          color: rgb(148 163 184) !important;

          white-space: nowrap !important;
        }


        /* =========================================
           MOBILE
           ========================================= */

        @media (max-width: 640px) {

          .paila-phone
          .react-international-phone-country-selector-dropdown {
            width: 100% !important;

            min-width: 0 !important;

            max-width: calc(100vw - 48px) !important;

            max-height: 300px !important;
          }

        }

      `}</style>

    </div>
  );
}


/* =========================================
   PASSWORD REQUIREMENT
   ========================================= */

function PasswordRequirement({
  valid,
  text,
}: {
  valid: boolean;
  text: string;
}) {
  return (
    <span
      className={`flex items-center gap-1.5 ${
        valid
          ? "text-emerald-400"
          : "text-slate-500"
      }`}
    >
      <CheckCircle2 className="h-3.5 w-3.5" />

      {text}

    </span>
  );
}