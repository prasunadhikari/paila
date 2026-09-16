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
  Compass,
  Sparkles,
} from "lucide-react";
import Sidebar from "../../../components/layout/Sidebar";
import { useAuth } from "../../../context/AuthContext";

export default function ProfilePage() {
  const { user, updateUser } = useAuth();

  const [editing, setEditing] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (user) {
      setName(user.name || "");
      setPhone(user.phone || "");
    }
  }, [user]);

  if (!user) {
    return (
      <div className="min-h-screen bg-slate-50">
        <Sidebar />

        <main className="lg:ml-72 flex min-h-screen items-center justify-center px-6">
          <div className="w-full max-w-md rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-sm">
            <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-50">
              <UserRound className="h-8 w-8 text-emerald-600" />
            </div>

            <h1 className="text-2xl font-bold text-slate-900">
              Profile unavailable
            </h1>

            <p className="mt-2 text-sm text-slate-500">
              Please sign in to view your profile.
            </p>

            <Link
              to="/login"
              className="mt-6 inline-flex items-center gap-2 rounded-xl bg-emerald-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-emerald-600"
            >
              Sign In
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </main>
      </div>
    );
  }

  const firstName = user.name?.split(" ")[0] || "Traveler";

  const handleEdit = () => {
    setMessage("");
    setError("");
    setEditing(true);
  };

  const handleCancel = () => {
    setName(user.name || "");
    setPhone(user.phone || "");
    setMessage("");
    setError("");
    setEditing(false);
  };

  const handleSave = async () => {
    setMessage("");
    setError("");

    const cleanName = name.trim();
    const cleanPhone = phone.trim();

    if (!cleanName) {
      setError("Name is required.");
      return;
    }

    if (cleanName.length < 2 || cleanName.length > 50) {
      setError("Name must be between 2 and 50 characters.");
      return;
    }

    const phoneDigits = cleanPhone.replace(/\D/g, "");

    if (!cleanPhone || phoneDigits.length < 7) {
      setError("Please enter a valid phone number.");
      return;
    }

    try {
      setSaving(true);

      await updateUser(cleanName, cleanPhone);

      setEditing(false);
      setMessage("Profile updated successfully.");
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Failed to update your profile."
      );
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Sidebar />

      <main className="min-h-screen lg:ml-72">
        {/* Header */}
        <header className="border-b border-slate-200 bg-white">
          <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-5 sm:px-8">
            <div>
              <div className="mb-2 inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
                <UserRound className="h-3.5 w-3.5" />
                Account
              </div>

              <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                My Profile
              </h1>

              <p className="mt-1 text-sm text-slate-500">
                Manage your personal information and account.
              </p>
            </div>

            <Link
              to="/dashboard"
              className="hidden items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:border-emerald-200 hover:bg-emerald-50 hover:text-emerald-700 sm:inline-flex"
            >
              Dashboard
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </header>

        <div className="mx-auto max-w-7xl px-5 py-8 sm:px-8 lg:py-10">
          {/* Profile Hero */}
          <section className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
            <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500" />

            <div className="absolute -right-20 -top-20 h-56 w-56 rounded-full bg-white/10 blur-2xl" />
            <div className="absolute -left-20 top-16 h-48 w-48 rounded-full bg-cyan-300/10 blur-2xl" />

            <div className="relative px-6 pb-7 pt-20 sm:px-8">
              <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
                <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-end">
                  <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-3xl border-4 border-white bg-gradient-to-br from-emerald-500 to-teal-600 text-3xl font-bold text-white shadow-lg">
                    {firstName.charAt(0).toUpperCase()}
                  </div>

                  <div>
                    <div className="mb-2 inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
                      <Compass className="h-3.5 w-3.5" />
                      Paila Traveler
                    </div>

                    <h2 className="text-2xl font-bold text-slate-900">
                      {user.name || "Traveler"}
                    </h2>

                    <p className="mt-1 text-sm text-slate-500">
                      {user.email}
                    </p>
                  </div>
                </div>

                {!editing && (
                  <button
                    type="button"
                    onClick={handleEdit}
                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
                  >
                    <Edit3 className="h-4 w-4" />
                    Edit Profile
                  </button>
                )}
              </div>
            </div>
          </section>

          {/* Success Message */}
          {message && (
            <div className="mt-5 flex items-center gap-3 rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-700">
              <CheckCircle2 className="h-5 w-5 shrink-0" />
              {message}
            </div>
          )}

          {/* Error Message */}
          {error && (
            <div className="mt-5 flex items-center gap-3 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
              <XCircle className="h-5 w-5 shrink-0" />
              {error}
            </div>
          )}

          <div className="mt-8 grid gap-8 lg:grid-cols-[1.5fr_1fr]">
            {/* Personal Information */}
            <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
              <div className="mb-7 flex items-start justify-between gap-4">
                <div>
                  <h2 className="text-xl font-bold text-slate-900">
                    Personal Information
                  </h2>

                  <p className="mt-1 text-sm text-slate-500">
                    Your basic account information.
                  </p>
                </div>

                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-50">
                  <UserRound className="h-5 w-5 text-emerald-600" />
                </div>
              </div>

              {editing ? (
                <div className="space-y-5">
                  {/* Name */}
                  <div>
                    <label
                      htmlFor="profile-name"
                      className="mb-2 block text-sm font-semibold text-slate-700"
                    >
                      Full Name
                    </label>

                    <div className="relative">
                      <UserRound className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />

                      <input
                        id="profile-name"
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        maxLength={50}
                        className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3.5 pl-12 pr-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-emerald-400 focus:bg-white focus:ring-4 focus:ring-emerald-100"
                        placeholder="Enter your full name"
                      />
                    </div>
                  </div>

                  {/* Email */}
                  <div>
                    <label
                      htmlFor="profile-email"
                      className="mb-2 block text-sm font-semibold text-slate-700"
                    >
                      Email Address
                    </label>

                    <div className="relative">
                      <Mail className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />

                      <input
                        id="profile-email"
                        type="email"
                        value={user.email}
                        disabled
                        className="w-full cursor-not-allowed rounded-xl border border-slate-200 bg-slate-100 py-3.5 pl-12 pr-4 text-sm text-slate-500 outline-none"
                      />
                    </div>

                    <p className="mt-2 text-xs text-slate-400">
                      Email address cannot be changed here.
                    </p>
                  </div>

                  {/* Phone */}
                  <div>
                    <label
                      htmlFor="profile-phone"
                      className="mb-2 block text-sm font-semibold text-slate-700"
                    >
                      Phone Number
                    </label>

                    <div className="relative">
                      <Phone className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />

                      <input
                        id="profile-phone"
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3.5 pl-12 pr-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-emerald-400 focus:bg-white focus:ring-4 focus:ring-emerald-100"
                        placeholder="Enter your phone number"
                      />
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-col gap-3 pt-2 sm:flex-row">
                    <button
                      type="button"
                      onClick={handleSave}
                      disabled={saving}
                      className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-emerald-500 px-5 py-3.5 text-sm font-semibold text-white transition hover:bg-emerald-600 disabled:cursor-not-allowed disabled:opacity-60"
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

                    <button
                      type="button"
                      onClick={handleCancel}
                      disabled={saving}
                      className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-3.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      <XCircle className="h-4 w-4" />
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  {/* Name */}
                  <div className="flex items-center gap-4 rounded-2xl border border-slate-100 bg-slate-50 p-4">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white shadow-sm">
                      <UserRound className="h-5 w-5 text-emerald-600" />
                    </div>

                    <div className="min-w-0">
                      <p className="text-xs font-medium text-slate-400">
                        Full Name
                      </p>

                      <p className="mt-1 truncate text-sm font-semibold text-slate-900">
                        {user.name || "Not provided"}
                      </p>
                    </div>
                  </div>

                  {/* Email */}
                  <div className="flex items-center gap-4 rounded-2xl border border-slate-100 bg-slate-50 p-4">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white shadow-sm">
                      <Mail className="h-5 w-5 text-cyan-600" />
                    </div>

                    <div className="min-w-0">
                      <p className="text-xs font-medium text-slate-400">
                        Email Address
                      </p>

                      <p className="mt-1 truncate text-sm font-semibold text-slate-900">
                        {user.email}
                      </p>
                    </div>
                  </div>

                  {/* Phone */}
                  <div className="flex items-center gap-4 rounded-2xl border border-slate-100 bg-slate-50 p-4">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white shadow-sm">
                      <Phone className="h-5 w-5 text-emerald-600" />
                    </div>

                    <div className="min-w-0">
                      <p className="text-xs font-medium text-slate-400">
                        Phone Number
                      </p>

                      <p className="mt-1 truncate text-sm font-semibold text-slate-900">
                        {user.phone || "Not provided"}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </section>

            {/* Account Overview */}
            <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
              <div className="mb-7">
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-2xl bg-cyan-50">
                  <ShieldCheck className="h-5 w-5 text-cyan-600" />
                </div>

                <h2 className="text-xl font-bold text-slate-900">
                  Account Overview
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Quick access to your Paila experience.
                </p>
              </div>

              <div className="space-y-3">
                <AccountItem
                  icon={<Compass className="h-4 w-4" />}
                  title="Destinations"
                  description="Explore Nepal"
                  to="/destinations"
                />

                <AccountItem
                  icon={<Sparkles className="h-4 w-4" />}
                  title="Paila AI"
                  description="Plan your journey"
                  to="/ai"
                />
              </div>

              <div className="mt-6 rounded-2xl border border-emerald-100 bg-gradient-to-br from-emerald-50 to-cyan-50 p-5">
                <div className="flex items-start gap-3">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white shadow-sm">
                    <Sparkles className="h-4 w-4 text-emerald-600" />
                  </div>

                  <div>
                    <h3 className="text-sm font-bold text-slate-900">
                      Ready for your next adventure?
                    </h3>

                    <p className="mt-1 text-xs leading-5 text-slate-500">
                      Discover beautiful places across Nepal with Paila.
                    </p>

                    <Link
                      to="/destinations"
                      className="mt-3 inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 transition hover:text-emerald-800"
                    >
                      Explore destinations
                      <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                  </div>
                </div>
              </div>
            </section>
          </div>

          {/* Bottom CTA */}
          <section className="relative mt-8 overflow-hidden rounded-3xl bg-slate-900 px-6 py-8 text-white sm:px-8">
            <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-emerald-500/20 blur-3xl" />
            <div className="absolute -bottom-20 left-1/3 h-48 w-48 rounded-full bg-cyan-500/10 blur-3xl" />

            <div className="relative flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <div className="mb-2 inline-flex items-center gap-2 text-xs font-semibold text-emerald-300">
                  <Sparkles className="h-4 w-4" />
                  Every journey starts with a step.
                </div>

                <h2 className="text-xl font-bold sm:text-2xl">
                  Where will you go next?
                </h2>

                <p className="mt-1 max-w-xl text-sm text-slate-400">
                  Explore destinations or let Paila AI help you plan your
                  journey.
                </p>
              </div>

              <Link
                to="/ai"
                className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-emerald-500 px-5 py-3 text-sm font-bold text-white transition hover:bg-emerald-400"
              >
                Ask Paila AI
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </section>

          {/* Footer */}
          <footer className="py-8 text-center">
            <p className="text-xs text-slate-400">
              © {new Date().getFullYear()} Prasun Adhikari. All rights
              reserved.
            </p>
          </footer>
        </div>
      </main>
    </div>
  );
}

type AccountItemProps = {
  icon: React.ReactNode;
  title: string;
  description: string;
  to: string;
};

function AccountItem({
  icon,
  title,
  description,
  to,
}: AccountItemProps) {
  return (
    <Link
      to={to}
      className="group flex items-center gap-3 rounded-2xl border border-slate-100 bg-slate-50 p-4 transition hover:border-emerald-100 hover:bg-emerald-50/50"
    >
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-emerald-600 shadow-sm transition group-hover:bg-emerald-100">
        {icon}
      </div>

      <div className="min-w-0 flex-1">
        <p className="text-sm font-semibold text-slate-900">{title}</p>
        <p className="mt-0.5 text-xs text-slate-500">{description}</p>
      </div>

      <ArrowRight className="h-4 w-4 text-slate-300 transition group-hover:translate-x-0.5 group-hover:text-emerald-600" />
    </Link>
  );
}