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
  const response = await register(
    name.trim(),
    email.trim(),
    phone.trim(),
    password
  );

  navigate("/verify-otp", {
    state: {
      email: response.email || email.trim(),
      password,
    },
  });
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

return ( <div className="relative min-h-[100dvh] overflow-hidden bg-slate-950">
{/* Background */}

  <div
    className="fixed inset-0 bg-cover bg-center"
    style={{
      backgroundImage: `url(${heroImage})`,
    }}
  />

  <div className="fixed inset-0 bg-slate-950/70" />

  <div className="fixed inset-0 bg-gradient-to-br from-emerald-950/50 via-slate-950/20 to-slate-950/85" />

  {/* Page */}

  <div className="relative z-10 flex min-h-[100dvh] items-center justify-center px-3 py-3 sm:px-5 sm:py-5 lg:px-8">
    <div className="w-full max-w-4xl">
      {/* Card */}

      <div className="overflow-visible rounded-3xl border border-white/15 bg-slate-950/40 shadow-2xl backdrop-blur-2xl">
        {/* Header */}

        <div className="px-5 pt-5 text-center sm:px-7 sm:pt-6">
          <div className="mx-auto mb-2.5 flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/20 ring-1 ring-emerald-400/30 sm:h-11 sm:w-11">
            <MapPin className="h-5 w-5 text-emerald-400 sm:h-6 sm:w-6" />
          </div>

          <h1 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
            Create your account
          </h1>

          <p className="mt-1 text-xs text-slate-300 sm:text-sm">
            Join Paila and start planning your next journey.
          </p>
        </div>

        {/* Error */}

        {error && (
          <div className="mx-5 mt-4 rounded-xl border border-red-400/30 bg-red-500/10 px-3 py-2 text-center text-xs leading-4 text-red-300 sm:mx-7">
            {error}
          </div>
        )}

        {/* Form */}

        <form
          onSubmit={handleSubmit}
          className="px-5 pb-5 pt-4 sm:px-7 sm:pb-6"
        >
          <div className="grid gap-x-5 gap-y-3.5 md:grid-cols-2">
            {/* Full Name */}

            <FormField
              label="Full Name"
              htmlFor="name"
              icon={<User />}
            >
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
                disabled={loading}
                className={inputClass}
              />
            </FormField>

            {/* Email */}

            <FormField
              label="Email Address"
              htmlFor="email"
              icon={<Mail />}
            >
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
                disabled={loading}
                className={inputClass}
              />
            </FormField>

            {/* Phone */}

            <div>
              <label
                htmlFor="phone"
                className="mb-1.5 block text-xs font-medium text-slate-200 sm:text-sm"
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
            </div>

            {/* Password */}

            <div>
              <label
                htmlFor="password"
                className="mb-1.5 block text-xs font-medium text-slate-200 sm:text-sm"
              >
                Password
              </label>

              <div className="relative">
                <LockKeyhole className={iconClass} />

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
                  disabled={loading}
                  className={`${inputClass} pr-11`}
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowPassword(
                      (value) => !value
                    )
                  }
                  disabled={loading}
                  className={eyeButtonClass}
                  aria-label={
                    showPassword
                      ? "Hide password"
                      : "Show password"
                  }
                >
                  {showPassword ? (
                    <EyeOff className="h-4.5 w-4.5" />
                  ) : (
                    <Eye className="h-4.5 w-4.5" />
                  )}
                </button>
              </div>

              {/* Password strength */}

              {password.length > 0 && (
                <div className="mt-1.5">
                  <div className="mb-1.5 flex gap-1">
                    {[1, 2, 3, 4].map(
                      (level) => (
                        <div
                          key={level}
                          className={`h-1 flex-1 rounded-full transition ${
                            level <=
                            passwordStrength
                              ? "bg-emerald-400"
                              : "bg-white/10"
                          }`}
                        />
                      )
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-x-2 text-[10px] leading-4 sm:text-[11px]">
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
                      text="Uppercase"
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

            {/* Confirm Password */}

            <div>
              <label
                htmlFor="confirmPassword"
                className="mb-1.5 block text-xs font-medium text-slate-200 sm:text-sm"
              >
                Confirm Password
              </label>

              <div className="relative">
                <LockKeyhole className={iconClass} />

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
                  disabled={loading}
                  className={`w-full rounded-xl border bg-white/10 py-2.5 pl-11 pr-11 text-sm text-white outline-none transition placeholder:text-slate-400 focus:ring-2 sm:py-3 ${
                    confirmPassword &&
                    password !== confirmPassword
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
                  disabled={loading}
                  className={eyeButtonClass}
                  aria-label={
                    showConfirmPassword
                      ? "Hide confirm password"
                      : "Show confirm password"
                  }
                >
                  {showConfirmPassword ? (
                    <EyeOff className="h-4.5 w-4.5" />
                  ) : (
                    <Eye className="h-4.5 w-4.5" />
                  )}
                </button>
              </div>

              {confirmPassword &&
                password === confirmPassword && (
                  <p className="mt-1 flex items-center gap-1 text-[10px] text-emerald-400">
                    <CheckCircle2 className="h-3.5 w-3.5" />
                    Passwords match
                  </p>
                )}
            </div>

            {/* Terms */}

            <label className="flex cursor-pointer items-start gap-2 pt-1 md:col-span-2">
              <input
                type="checkbox"
                checked={agreeTerms}
                onChange={(event) =>
                  setAgreeTerms(
                    event.target.checked
                  )
                }
                disabled={loading}
                className="mt-0.5 h-3.5 w-3.5 shrink-0 rounded border-white/20 bg-white/10 accent-emerald-500"
              />

              <span className="text-[10px] leading-4 text-slate-300 sm:text-xs">
                I agree to Paila's{" "}
                <Link
                  to="/legal#terms"
                  className="font-medium text-emerald-400 hover:text-emerald-300"
                >
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link
                  to="/legal#privacy"
                  className="font-medium text-emerald-400 hover:text-emerald-300"
                >
                  Privacy Policy
                </Link>
                .
              </span>
            </label>

            {/* Submit */}

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl bg-emerald-500 py-2.5 text-sm font-semibold text-white shadow-lg shadow-emerald-950/30 transition hover:bg-emerald-600 disabled:cursor-not-allowed disabled:opacity-60 md:col-span-2 sm:py-3"
            >
              {loading
                ? "Sending verification code..."
                : "Create Account"}
            </button>
          </div>
        </form>

        {/* Login */}

        <div className="border-t border-white/10 px-5 py-3.5 text-center sm:px-7 sm:py-4">
          <p className="text-xs text-slate-300 sm:text-sm">
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

      <p className="mt-2 text-center text-[10px] text-slate-400 sm:text-xs">
        Your journey starts here. 🌍
      </p>
    </div>
  </div>

  {/* Phone styles */}

  <style>{`
    .paila-phone {
      position: relative;
      width: 100%;
      z-index: 30;
    }

    .paila-phone-container {
      width: 100%;
      position: relative;
    }

    .paila-phone .react-international-phone-input {
      width: 100% !important;
      height: 42px !important;
      padding-left: 56px !important;
      padding-right: 12px !important;
      border-radius: 12px !important;
      border: 1px solid rgba(255,255,255,0.15) !important;
      background: rgba(255,255,255,0.10) !important;
      color: white !important;
      font-size: 14px !important;
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
      box-shadow: 0 0 0 3px rgba(52,211,153,0.10) !important;
    }

    .paila-phone .paila-country-button {
      width: 50px !important;
      height: 40px !important;
      display: flex !important;
      align-items: center !important;
      justify-content: center !important;
      padding: 0 !important;
      margin: 0 !important;
      border: none !important;
      border-radius: 12px 0 0 12px !important;
      background: transparent !important;
      cursor: pointer !important;
    }

    .paila-phone .paila-country-button:hover {
      background: rgba(255,255,255,0.08) !important;
    }

    .paila-phone
    .react-international-phone-country-selector-button__flag-emoji {
      font-size: 19px !important;
      line-height: 1 !important;
    }

    .paila-phone
    .react-international-phone-country-selector-dropdown {
      position: absolute !important;
      top: calc(100% + 7px) !important;
      left: 0 !important;
      width: 100% !important;
      min-width: 280px !important;
      max-width: 360px !important;
      max-height: 280px !important;
      padding: 5px !important;
      overflow-y: auto !important;
      overflow-x: hidden !important;
      border: 1px solid rgba(255,255,255,0.14) !important;
      border-radius: 14px !important;
      background: rgba(15,23,42,0.98) !important;
      backdrop-filter: blur(18px) !important;
      -webkit-backdrop-filter: blur(18px) !important;
      box-shadow: 0 20px 50px rgba(0,0,0,0.45) !important;
      z-index: 9999 !important;
    }

    .paila-phone .paila-country-item {
      min-height: 40px !important;
      display: flex !important;
      align-items: center !important;
      padding: 7px 9px !important;
      margin: 2px 0 !important;
      border-radius: 9px !important;
      color: rgb(226 232 240) !important;
      background: transparent !important;
      font-size: 13px !important;
      cursor: pointer !important;
    }

    .paila-phone .paila-country-item:hover {
      background: rgba(255,255,255,0.08) !important;
      color: white !important;
    }

    .paila-phone .paila-country-item.highlight {
      background: rgba(16,185,129,0.15) !important;
      color: white !important;
    }

    @media (max-width: 640px) {
      .paila-phone
      .react-international-phone-input {
        height: 42px !important;
      }

      .paila-phone
      .react-international-phone-country-selector-dropdown {
        width: 100% !important;
        min-width: 0 !important;
        max-width: calc(100vw - 40px) !important;
        max-height: 250px !important;
      }
    }

    @media (max-height: 700px) {
      .paila-phone
      .react-international-phone-country-selector-dropdown {
        max-height: 220px !important;
      }
    }
  `}</style>
</div>

);
}

/* =========================================
Reusable input styles
========================================= */

const inputClass =
"w-full rounded-xl border border-white/15 bg-white/10 py-2.5 pl-11 pr-4 text-sm text-white outline-none transition placeholder:text-slate-400 focus:border-emerald-400 focus:bg-white/[0.13] focus:ring-2 focus:ring-emerald-400/20 disabled:cursor-not-allowed disabled:opacity-60 sm:py-3";

const iconClass =
"pointer-events-none absolute left-3.5 top-1/2 z-10 h-4.5 w-4.5 -translate-y-1/2 text-slate-400";

const eyeButtonClass =
"absolute right-2.5 top-1/2 z-10 -translate-y-1/2 rounded-lg p-1.5 text-slate-400 transition hover:bg-white/10 hover:text-white disabled:cursor-not-allowed disabled:opacity-50";

/* =========================================
Form Field
========================================= */

function FormField({
label,
htmlFor,
icon,
children,
}: {
label: string;
htmlFor: string;
icon: React.ReactNode;
children: React.ReactNode;
}) {
return ( <div> <label
     htmlFor={htmlFor}
     className="mb-1.5 block text-xs font-medium text-slate-200 sm:text-sm"
   >
{label} </label>

  <div className="relative">
    <span className={iconClass}>
      {icon}
    </span>

    {children}
  </div>
</div>

);
}

/* =========================================
Password Requirement
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
className={`flex items-center gap-1 ${
        valid
          ? "text-emerald-400"
          : "text-slate-500"
      }`}
> <CheckCircle2 className="h-3 w-3 shrink-0" />
{text} </span>
);
}
