
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  ChevronDown,
  LogOut,
  MessageSquare,
  UserRound,
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import pailaLogo from "../../assets/images/pailalogo.png";

export default function Navbar() {
  const { user, isAuthenticated, logout } = useAuth();

  const [menuOpen, setMenuOpen] = useState(false);
  const [showNavbar, setShowNavbar] = useState(true);

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Always show navbar near the top
      if (currentScrollY < 40) {
        setShowNavbar(true);
      } else if (currentScrollY > lastScrollY) {
        // Scrolling down
        setShowNavbar(false);
        setMenuOpen(false);
      } else {
        // Scrolling up
        setShowNavbar(true);
      }

      lastScrollY = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleLogout = () => {
    setMenuOpen(false);
    logout();
  };

  return (
    <header
      className={`fixed left-0 top-0 z-50 w-full px-3 pt-3 transition-transform duration-500 ease-out sm:px-6 sm:pt-4 ${
        showNavbar ? "translate-y-0" : "-translate-y-[120%]"
      }`}
    >
      <nav className="mx-auto flex h-[82px] max-w-7xl items-center justify-between rounded-3xl border border-slate-200/70 bg-white/95 px-3 shadow-lg shadow-slate-900/5 backdrop-blur-xl sm:h-[88px] sm:px-7 lg:px-8">
        {/* Logo + Name */}
        <Link
          to="/"
          className="group flex min-w-0 items-center gap-2 sm:gap-3"
          aria-label="Paila Home"
        >
          {/* Logo */}
          <div className="flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-2xl transition-all duration-300 ease-out group-hover:-translate-y-1 group-hover:scale-105 sm:h-20 sm:w-20">
            <img
              src={pailaLogo}
              alt="Paila logo"
              className="h-14 w-14 object-contain transition-transform duration-500 ease-out group-hover:rotate-2 sm:h-16 sm:w-16"
            />
          </div>

          {/* Name + Tagline */}
          <div className="flex min-w-0 flex-col justify-center leading-none">
            <span className="text-[25px] font-bold tracking-[-0.05em] text-sky-400 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:text-sky-300 sm:text-[34px]">
              Paila
            </span>

            <span className="mt-1 hidden text-[11px] font-medium tracking-wide text-slate-500 transition-colors duration-300 group-hover:text-slate-600 sm:block">
              Every journey starts with a step.
            </span>
          </div>
        </Link>

        {/* Right Side */}
        <div className="flex shrink-0 items-center gap-1 sm:gap-2 sm:gap-4">
          {/* Dashboard */}
          {isAuthenticated && (
            <Link
              to="/dashboard"
              className="rounded-xl px-2 py-2 text-xs font-semibold text-slate-700 transition-all duration-200 hover:-translate-y-0.5 hover:bg-sky-50 hover:text-sky-500 sm:px-4 sm:py-2.5 sm:text-sm"
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
                className="flex items-center gap-1.5 rounded-2xl border border-slate-200 bg-white px-2 py-2 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-sky-200 hover:shadow-md active:translate-y-0 sm:gap-2.5 sm:px-3 sm:py-2.5"
              >
                {/* Avatar */}
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-sky-100 text-sm font-bold text-sky-600 transition-transform duration-300 hover:scale-105 sm:h-10 sm:w-10">
                  {user.name?.charAt(0).toUpperCase() || "U"}
                </div>

                {/* User Name */}
                <span className="hidden max-w-[140px] truncate text-sm font-semibold text-slate-700 sm:block">
                  {user.name || "User"}
                </span>

                {/* Chevron */}
                <ChevronDown
                  size={16}
                  className={`text-slate-400 transition-all duration-300 sm:h-[17px] sm:w-[17px] ${
                    menuOpen
                      ? "rotate-180 text-sky-500"
                      : "rotate-0"
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

                  {/* Dropdown */}
                  <div
                    role="menu"
                    className="absolute right-0 top-full mt-3 w-[calc(100vw-1.5rem)] max-w-64 origin-top-right overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl shadow-slate-900/10 animate-in fade-in zoom-in-95 slide-in-from-top-2 duration-200 sm:w-64"
                  >
                    {/* User Header */}
                    <div className="border-b border-slate-100 bg-slate-50 px-4 py-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-sky-500 text-sm font-bold text-white">
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
                        className="group flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium text-slate-700 transition-all duration-200 hover:translate-x-1 hover:bg-sky-50 hover:text-sky-600"
                      >
                        <UserRound
                          size={17}
                          className="text-slate-400 transition-colors duration-200 group-hover:text-sky-500"
                        />

                        <span>Edit Profile</span>
                      </Link>

                      {/* Feedback */}
                      <Link
                        to="/feedback"
                        role="menuitem"
                        onClick={() => setMenuOpen(false)}
                        className="group flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium text-slate-700 transition-all duration-200 hover:translate-x-1 hover:bg-sky-50 hover:text-sky-600"
                      >
                        <MessageSquare
                          size={17}
                          className="text-slate-400 transition-colors duration-200 group-hover:text-sky-500"
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
                        className="group flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-sm font-medium text-red-500 transition-all duration-200 hover:translate-x-1 hover:bg-red-50 hover:text-red-600"
                      >
                        <LogOut
                          size={17}
                          className="transition-transform duration-200 group-hover:-translate-x-0.5"
                        />

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
              className="rounded-2xl bg-emerald-500 px-3.5 py-2.5 text-xs font-semibold text-white shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-emerald-600 hover:shadow-lg active:translate-y-0 sm:px-6 sm:py-3 sm:text-sm"
            >
              Sign In
            </Link>
          )}
        </div>
      </nav>
    </header>
  );
}