import { useState } from "react";
import { Link } from "react-router-dom";
import {
  ChevronDown,
  LogOut,
  MessageSquare,
  UserRound,
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";

export default function Navbar() {
  const { user, isAuthenticated, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    setMenuOpen(false);
    logout();
  };

  return (
    <header className="fixed left-0 top-0 z-50 w-full border-b border-slate-200/80 bg-white/95 backdrop-blur-md">
      <nav className="mx-auto flex h-[76px] max-w-7xl items-center justify-between px-6 lg:px-8">
        {/* Logo */}
        <Link to="/" className="group flex flex-col leading-none">
          <span className="text-[30px] font-bold tracking-[-0.04em] text-slate-900 transition-colors duration-200 group-hover:text-emerald-600">
            Paila
          </span>

          <span className="mt-1 text-[11px] font-medium tracking-wide text-slate-500">
            Every journey starts with a step.
          </span>
        </Link>

        {/* Right Side */}
        <div className="flex items-center gap-4">
          {/* Dashboard */}
          {isAuthenticated && (
            <Link
              to="/dashboard"
              className="rounded-lg px-4 py-2.5 text-sm font-semibold text-slate-700 transition-all duration-200 hover:bg-emerald-50 hover:text-emerald-600"
            >
              Dashboard
            </Link>
          )}

          {/* Profile */}
          {isAuthenticated && user ? (
            <div className="relative">
              {/* Profile Button */}
              <button
                type="button"
                onClick={() => setMenuOpen((open) => !open)}
                aria-expanded={menuOpen}
                aria-haspopup="menu"
                className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white px-3 py-2 shadow-sm transition-all duration-200 hover:border-slate-300 hover:shadow-md"
              >
                {/* Avatar */}
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-emerald-100 text-sm font-bold text-emerald-700">
                  {user.name?.charAt(0).toUpperCase() || "U"}
                </div>

                {/* User Name */}
                <span className="hidden max-w-[130px] truncate text-sm font-semibold text-slate-700 sm:block">
                  {user.name || "User"}
                </span>

                {/* Chevron */}
                <ChevronDown
                  size={16}
                  className={`text-slate-400 transition-transform duration-200 ${
                    menuOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {/* Dropdown */}
              {menuOpen && (
                <>
                  {/* Close when clicking outside */}
                  <button
                    type="button"
                    aria-label="Close menu"
                    className="fixed inset-0 -z-10 h-full w-full cursor-default"
                    onClick={() => setMenuOpen(false)}
                  />

                  <div
                    role="menu"
                    className="absolute right-0 mt-3 w-60 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl shadow-slate-900/10"
                  >
                    {/* User Header */}
                    <div className="border-b border-slate-100 bg-slate-50 px-4 py-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-500 text-sm font-bold text-white">
                          {user.name?.charAt(0).toUpperCase() || "U"}
                        </div>

                        <div className="min-w-0">
                          <p className="truncate text-sm font-semibold text-slate-800">
                            {user.name || "User"}
                          </p>

                          <p className="text-xs text-slate-500">
                            Your Paila account
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Menu Items */}
                    <div className="p-2">
                      {/* Edit Profile */}
                      <Link
                        to="/profile"
                        role="menuitem"
                        onClick={() => setMenuOpen(false)}
                        className="flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50 hover:text-emerald-600"
                      >
                        <UserRound
                          size={17}
                          className="text-slate-400"
                        />

                        <span>Edit Profile</span>
                      </Link>

                      {/* Feedback */}
                      <Link
                        to="/feedback"
                        role="menuitem"
                        onClick={() => setMenuOpen(false)}
                        className="flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50 hover:text-emerald-600"
                      >
                        <MessageSquare
                          size={17}
                          className="text-slate-400"
                        />

                        <span>Feedback</span>
                      </Link>

                      {/* Divider */}
                      <div className="my-1 border-t border-slate-100" />

                      {/* Logout */}
                      <button
                        type="button"
                        role="menuitem"
                        onClick={handleLogout}
                        className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-sm font-medium text-red-500 transition-colors hover:bg-red-50 hover:text-red-600"
                      >
                        <LogOut size={17} />

                        <span>Logout</span>
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          ) : (
            <Link
              to="/login"
              className="rounded-xl bg-emerald-500 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:bg-emerald-600 hover:shadow-md"
            >
              Sign In
            </Link>
          )}
        </div>
      </nav>
    </header>
  );
                }