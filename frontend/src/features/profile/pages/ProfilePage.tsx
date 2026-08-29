import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Edit3,
  Mail,
  Phone,
  ShieldCheck,
  UserRound,
  CheckCircle2,
  XCircle,
  Loader2,
} from "lucide-react";
import { useAuth } from "../../../context/AuthContext";
import Sidebar from "../../../components/layout/Sidebar";

export default function ProfilePage() {
  const { user, updateUser } = useAuth();

  const [editing, setEditing] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const firstName = user?.name?.split(" ")[0] || "Traveler";
  const initial = firstName.charAt(0).toUpperCase();

  useEffect(() => {
    if (user) {
      setName(user.name);
      setPhone(user.phone || "");
    }
  }, [user]);

  /* =========================================================
     USER NOT AVAILABLE
  ========================================================= */

  if (!user) {
    return (
      <div className="min-h-screen bg-slate-50">
        <Sidebar />

        <div className="ml-0 lg:ml-64">
          <main className="flex min-h-screen items-center justify-center px-5">
            <div className="w-full max-w-md text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-50">
                <UserRound className="h-7 w-7 text-emerald-500" />
              </div>

              <h1 className="mt-5 text-2xl font-bold text-slate-900">
                Profile unavailable
              </h1>

              <p className="mt-2 text-sm leading-6 text-slate-500">
                Please sign in to view your profile.
              </p>

              <Link
                to="/login"
                className="mt-6 inline-flex items-center justify-center rounded-xl bg-emerald-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-emerald-600"
              >
                Sign In
              </Link>
            </div>
          </main>
        </div>
      </div>
    );
  }

  /* =========================================================
     START EDITING
  ========================================================= */

  const handleEdit = () => {
    setName(user.name);
    setPhone(user.phone || "");
    setMessage("");
    setError("");
    setEditing(true);
  };

  /* =========================================================
     CANCEL EDITING
  ========================================================= */

  const handleCancel = () => {
    setName(user.name);
    setPhone(user.phone || "");
    setMessage("");
    setError("");
    setEditing(false);
  };

  /* =========================================================
     SAVE PROFILE
  ========================================================= */

  const handleSave = async () => {
    setMessage("");
    setError("");

    const cleanName = name.trim();
    const cleanPhone = phone.trim();

    if (!cleanName) {
      setError("Name is required.");
      return;
    }

    if (cleanName.length < 2) {
      setError("Name must be at least 2 characters long.");
      return;
    }

    if (cleanName.length > 50) {
      setError("Name cannot exceed 50 characters.");
      return;
    }

    if (!cleanPhone) {
      setError("Phone number is required.");
      return;
    }

    const phoneDigits = cleanPhone.replace(/\D/g, "");

    if (phoneDigits.length < 7) {
      setError("Please enter a valid phone number.");
      return;
    }

    try {
      setSaving(true);

      await updateUser(cleanName, cleanPhone);

      setName(cleanName);
      setPhone(cleanPhone);
      setEditing(false);
      setMessage("Profile updated successfully.");
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Unable to update your profile."
      );
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      {/* =====================================================
          SIDEBAR
      ====================================================== */}

      <Sidebar />

      {/* =====================================================
          PAGE CONTENT
      ====================================================== */}

      <div className="ml-0 lg:ml-64">
        <main>
          {/* =================================================
              PAGE HEADER
          ================================================== */}

          <section className="border-b border-slate-200 bg-white">
            <div className="mx-auto max-w-6xl px-5 py-7 sm:px-8 sm:py-8 lg:px-10">
              <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
                <div className="min-w-0">
                  <div className="flex items-center gap-2 text-sm font-semibold text-emerald-600">
                    <UserRound className="h-4 w-4 shrink-0" />

                    <span>My Profile</span>
                  </div>

                  <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
                    Your account
                  </h1>

                  <p className="mt-2 max-w-xl text-sm leading-6 text-slate-500 sm:text-base">
                    Manage your personal information and Paila account.
                  </p>
                </div>

                <Link
                  to="/dashboard"
                  className="inline-flex w-fit shrink-0 items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-600 shadow-sm transition hover:border-slate-300 hover:bg-slate-50 hover:text-slate-900"
                >
                  Dashboard
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </section>

          {/* =================================================
              PROFILE CONTENT
          ================================================== */}

          <section className="mx-auto max-w-6xl px-5 py-8 sm:px-8 lg:px-10 lg:py-12">
            <div className="grid gap-6 lg:grid-cols-[320px_1fr]">
              {/* =============================================
                  PROFILE CARD
              ============================================== */}

              <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
                <div className="h-24 bg-gradient-to-br from-emerald-400 to-emerald-600" />

                <div className="-mt-12 px-5 pb-6 sm:px-6">
                  <div className="flex h-24 w-24 items-center justify-center rounded-3xl border-4 border-white bg-emerald-100 text-3xl font-bold text-emerald-700 shadow-lg">
                    {initial}
                  </div>

                  <div className="mt-4 min-w-0">
                    <h2 className="truncate text-xl font-bold text-slate-900">
                      {user.name}
                    </h2>

                    <p className="mt-1 truncate text-sm text-slate-500">
                      {user.email}
                    </p>
                  </div>

                  <div className="mt-5 flex items-center gap-2 rounded-xl bg-emerald-50 px-3 py-2.5">
                    <ShieldCheck className="h-4 w-4 shrink-0 text-emerald-600" />

                    <span className="text-xs font-semibold text-emerald-700">
                      Paila Traveler
                    </span>
                  </div>

                  {user.role && (
                    <div className="mt-3 flex items-center justify-between border-t border-slate-100 pt-4">
                      <span className="text-xs text-slate-400">
                        Account type
                      </span>

                      <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-semibold capitalize text-slate-600">
                        {user.role}
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* =============================================
                  PERSONAL INFORMATION
              ============================================== */}

              <div className="min-w-0 rounded-3xl border border-slate-200 bg-white shadow-sm">
                {/* Card Header */}

                <div className="flex flex-col gap-4 border-b border-slate-100 px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-7">
                  <div>
                    <h2 className="text-lg font-bold text-slate-900">
                      Personal information
                    </h2>

                    <p className="mt-1 text-sm text-slate-500">
                      Your account details.
                    </p>
                  </div>

                  {!editing ? (
                    <button
                      type="button"
                      onClick={handleEdit}
                      className="inline-flex w-fit items-center gap-2 rounded-xl bg-emerald-500 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-600"
                    >
                      <Edit3 className="h-4 w-4" />
                      Edit Profile
                    </button>
                  ) : (
                    <div className="flex flex-wrap gap-2">
                      <button
                        type="button"
                        onClick={handleCancel}
                        disabled={saving}
                        className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-600 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        Cancel
                      </button>

                      <button
                        type="button"
                        onClick={handleSave}
                        disabled={saving}
                        className="inline-flex items-center gap-2 rounded-xl bg-emerald-500 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-600 disabled:cursor-not-allowed disabled:opacity-60"
                      >
                        {saving ? (
                          <>
                            <Loader2 className="h-4 w-4 animate-spin" />
                            Saving...
                          </>
                        ) : (
                          <>
                            <CheckCircle2 className="h-4 w-4" />
                            Save Changes
                          </>
                        )}
                      </button>
                    </div>
                  )}
                </div>

                {/* Success Message */}

                {message && (
                  <div className="flex items-center gap-2 border-b border-emerald-100 bg-emerald-50 px-5 py-3.5 sm:px-7">
                    <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-600" />

                    <p className="text-sm font-medium text-emerald-700">
                      {message}
                    </p>
                  </div>
                )}

                {/* Error Message */}

                {error && (
                  <div className="flex items-center gap-2 border-b border-red-100 bg-red-50 px-5 py-3.5 sm:px-7">
                    <XCircle className="h-4 w-4 shrink-0 text-red-500" />

                    <p className="text-sm font-medium text-red-600">
                      {error}
                    </p>
                  </div>
                )}

                {/* Fields */}

                <div className="grid gap-5 p-5 sm:grid-cols-2 sm:p-7">
                  {/* Full Name */}

                  <ProfileField
                    icon={<UserRound className="h-4 w-4" />}
                    label="Full name"
                    value={name}
                    editing={editing}
                    onChange={setName}
                  />

                  {/* Email */}

                  <ProfileField
                    icon={<Mail className="h-4 w-4" />}
                    label="Email address"
                    value={user.email}
                    editing={false}
                    disabled
                  />

                  {/* Phone */}

                  <ProfileField
                    icon={<Phone className="h-4 w-4" />}
                    label="Phone number"
                    value={phone}
                    editing={editing}
                    onChange={setPhone}
                  />

                  {/* User ID */}

                  <ProfileField
                    icon={<ShieldCheck className="h-4 w-4" />}
                    label="User ID"
                    value={user.id}
                    editing={false}
                    disabled
                  />
                </div>

                {/* Edit Notice */}

                {editing && (
                  <div className="border-t border-slate-100 bg-slate-50 px-5 py-4 sm:px-7">
                    <p className="text-xs leading-5 text-slate-500">
                      You can update your name and phone number. Your email
                      address cannot be changed from your profile.
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* =================================================
                ACCOUNT OVERVIEW
            ================================================== */}

            <div className="mt-6 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-50">
                  <CompassIcon />
                </div>

                <div className="min-w-0">
                  <h2 className="font-bold text-slate-900">
                    Your Paila account
                  </h2>

                  <p className="mt-1 text-sm leading-5 text-slate-500">
                    Everything you need for your journeys around Nepal.
                  </p>
                </div>
              </div>

              <div className="mt-6 grid gap-3 sm:grid-cols-3">
                <AccountItem
                  title="Destinations"
                  description="Explore Nepal"
                  href="/destinations"
                />

                <AccountItem
                  title="My Bookings"
                  description="View your bookings"
                  href="/bookings"
                />

                <AccountItem
                  title="Paila AI"
                  description="Plan your next trip"
                  href="/ai"
                />
              </div>
            </div>
          </section>
        </main>

        {/* =====================================================
            FOOTER
        ====================================================== */}

        <footer className="border-t border-slate-200 bg-white">
          <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-2 px-5 py-6 text-center sm:flex-row sm:px-8 sm:text-left lg:px-10">
            <p className="text-xs text-slate-400 sm:text-sm">
              © {new Date().getFullYear()} Paila. Made for Nepal.
            </p>

            <p className="text-xs text-slate-400 sm:text-sm">
              Every journey starts with a step. 🇳🇵
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
}

/* =========================================================
   PROFILE FIELD
========================================================= */

function ProfileField({
  icon,
  label,
  value,
  editing,
  disabled = false,
  onChange,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  editing: boolean;
  disabled?: boolean;
  onChange?: (value: string) => void;
}) {
  return (
    <div className="min-w-0">
      <label className="mb-2 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.12em] text-slate-400">
        <span className="text-emerald-500">{icon}</span>
        {label}
      </label>

      {editing && !disabled ? (
        <input
          type="text"
          value={value}
          onChange={(event) => onChange?.(event.target.value)}
          className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-800 outline-none transition focus:border-emerald-300 focus:ring-4 focus:ring-emerald-500/10"
        />
      ) : (
        <div
          className={`min-w-0 rounded-xl border border-slate-100 bg-slate-50 px-4 py-3 ${
            disabled ? "opacity-75" : ""
          }`}
        >
          <p className="truncate text-sm font-semibold text-slate-700">
            {value}
          </p>
        </div>
      )}
    </div>
  );
}

/* =========================================================
   ACCOUNT ITEM
========================================================= */

function AccountItem({
  title,
  description,
  href,
}: {
  title: string;
  description: string;
  href: string;
}) {
  return (
    <Link
      to={href}
      className="group rounded-2xl border border-slate-200 bg-slate-50 p-4 transition hover:-translate-y-0.5 hover:border-emerald-200 hover:bg-emerald-50"
    >
      <div className="flex items-center justify-between gap-3">
        <div className="min-w-0">
          <p className="truncate text-sm font-bold text-slate-800 group-hover:text-emerald-700">
            {title}
          </p>

          <p className="mt-1 truncate text-xs text-slate-500">
            {description}
          </p>
        </div>

        <ArrowRight className="h-4 w-4 shrink-0 text-slate-300 transition group-hover:translate-x-0.5 group-hover:text-emerald-500" />
      </div>
    </Link>
  );
}

/* =========================================================
   COMPASS ICON
========================================================= */

function CompassIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      className="h-5 w-5 text-emerald-600"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="9" />

      <path d="m15.5 8.5-2.2 4.8-4.8 2.2 2.2-4.8 4.8-2.2Z" />
    </svg>
  );
}