import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  ChevronDown,
  LogOut,
  MessageSquare,
  UserRound,
  Sparkles,
  Menu,
  X,
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import pailaLogo from "../../assets/images/pailalogo.png";

export default function Navbar() {
  const { user, isAuthenticated, logout } = useAuth();

  const [menuOpen, setMenuOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showNavbar, setShowNavbar] = useState(true);

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY < 40) {
        setShowNavbar(true);
      } else if (currentScrollY > lastScrollY) {
        setShowNavbar(false);
        setMenuOpen(false);
        setMobileMenuOpen(false);
      } else {
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
    setMobileMenuOpen(false);
    logout();
  };

  return (
    <header
      className={`fixed left-0 top-0 z-50 w-full px-3 pt-3 transition-transform duration-500 ease-out sm:px-6 sm:pt-4 ${
        showNavbar ? "translate-y-0" : "-translate-y-[120%]"
      }`}
    >
      <nav className="mx-auto flex h-[68px] max-w-7xl items-center justify-between rounded-[22px] border border-white/15 bg-black/25 px-3 shadow-2xl shadow-black/20 backdrop-blur-xl sm:h-[74px] sm:px-5 lg:px-6">
        {/* =========================
            LOGO
        ========================== */}
        <Link
          to="/"
          className="group flex min-w-0 items-center gap-2 sm:gap-2.5"
          aria-label="Paila Home"
          onClick={() => setMobileMenuOpen(false)}
        >
          {/* Logo */}
          <div className="flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-xl sm:h-12 sm:w-12">
            <img
              src={pailaLogo}
              alt="Paila logo"
              className="h-10 w-10 object-contain transition-all duration-500 group-hover:scale-110 group-hover:rotate-2 sm:h-11 sm:w-11"
            />
          </div>

          {/* Name */}
          <div className="flex flex-col justify-center leading-none">
            <span className="text-[25px] font-bold tracking-[-0.05em] text-white transition-colors duration-300 group-hover:text-sky-300 sm:text-[28px]">
              Paila
            </span>

            <span className="mt-1 hidden text-[9px] font-medium tracking-[0.12em] text-white/50 sm:block">
              EVERY JOURNEY STARTS WITH A STEP
            </span>
          </div>
        </Link>

        {/* =========================
            DESKTOP NAVIGATION
        ========================== */}
        <div className="hidden items-center gap-1 md:flex">
          <Link
            to="/"
            className="rounded-full px-4 py-2.5 text-sm font-medium text-white/80 transition-all duration-200 hover:bg-white/10 hover:text-white"
          >
            Home
          </Link>

          <Link
            to="/destinations"
            className="rounded-full px-4 py-2.5 text-sm font-medium text-white/80 transition-all duration-200 hover:bg-white/10 hover:text-white"
          >
            Destinations
          </Link>

          <Link
            to="/hotels"
            className="rounded-full px-4 py-2.5 text-sm font-medium text-white/80 transition-all duration-200 hover:bg-white/10 hover:text-white"
          >
            Hotels
          </Link>

          {/* Paila AI */}
          <Link
            to="/ai"
            className="group ml-1 inline-flex items-center gap-2 rounded-full border border-emerald-300/20 bg-emerald-400/10 px-4 py-2.5 text-sm font-semibold text-white transition-all duration-300 hover:border-emerald-300/40 hover:bg-emerald-400/20"
          >
            <Sparkles
              size={15}
              className="text-emerald-300 transition-transform duration-300 group-hover:rotate-12"
            />

            <span>Paila AI</span>
          </Link>
        </div>

        {/* =========================
            RIGHT SIDE
        ========================== */}
        <div className="flex shrink-0 items-center gap-1.5 sm:gap-2">
          {/* Dashboard */}
          {isAuthenticated && (
            <Link
              to="/dashboard"
              className="hidden rounded-full border border-white/15 bg-white/5 px-4 py-2.5 text-sm font-semibold text-white/85 transition-all duration-200 hover:-translate-y-0.5 hover:border-white/25 hover:bg-white/10 hover:text-white sm:block"
            >
              Dashboard
            </Link>
          )}

          {/* =========================
              AUTHENTICATED PROFILE
          ========================== */}
          {isAuthenticated && user ? (
            <div className="relative">
              {/* Profile Button */}
              <button
                type="button"
                onClick={() => setMenuOpen((open) => !open)}
                aria-expanded={menuOpen}
                aria-haspopup="menu"
                className="flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-1.5 py-1.5 shadow-lg shadow-black/10 backdrop-blur-md transition-all duration-200 hover:border-white/25 hover:bg-white/15 sm:gap-2.5 sm:pl-2 sm:pr-3"
              >
                {/* Avatar */}
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-sky-400/20 text-sm font-bold text-sky-200 ring-1 ring-white/10 sm:h-10 sm:w-10">
                  {user.name?.charAt(0).toUpperCase() || "U"}
                </div>

                {/* User Name */}
                <span className="hidden max-w-[120px] truncate text-sm font-semibold text-white/90 lg:block">
                  {user.name || "User"}
                </span>

                {/* Chevron */}
                <ChevronDown
                  size={16}
                  className={`text-white/50 transition-all duration-300 ${
                    menuOpen
                      ? "rotate-180 text-sky-300"
                      : "rotate-0"
                  }`}
                />
              </button>

              {/* Dropdown */}
              {menuOpen && (
                <>
                  {/* Outside click */}
                  <button
                    type="button"
                    aria-label="Close menu"
                    className="fixed inset-0 -z-10 h-full w-full cursor-default"
                    onClick={() => setMenuOpen(false)}
                  />

                  <div
                    role="menu"
                    className="absolute right-0 top-full mt-3 w-[calc(100vw-1.5rem)] max-w-64 origin-top-right overflow-hidden rounded-2xl border border-white/10 bg-slate-950/95 shadow-2xl shadow-black/30 backdrop-blur-2xl animate-in fade-in zoom-in-95 slide-in-from-top-2 duration-200 sm:w-64"
                  >
                    {/* User Header */}
                    <div className="border-b border-white/10 bg-white/[0.03] px-4 py-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-sky-400 text-sm font-bold text-slate-950">
                          {user.name?.charAt(0).toUpperCase() || "U"}
                        </div>

                        <div className="min-w-0">
                          <p className="truncate text-sm font-semibold text-white">
                            {user.name || "User"}
                          </p>

                          <p className="text-xs text-white/40">
                            Your Paila account
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Menu Items */}
                    <div className="p-2">
                      {/* Dashboard */}
                      <Link
                        to="/dashboard"
                        role="menuitem"
                        onClick={() => setMenuOpen(false)}
                        className="group flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium text-white/75 transition-all duration-200 hover:translate-x-1 hover:bg-white/10 hover:text-white"
                      >
                        <Sparkles
                          size={17}
                          className="text-white/40 transition-colors group-hover:text-sky-300"
                        />

                        <span>Dashboard</span>
                      </Link>

                      {/* Edit Profile */}
                      <Link
                        to="/profile"
                        role="menuitem"
                        onClick={() => setMenuOpen(false)}
                        className="group flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium text-white/75 transition-all duration-200 hover:translate-x-1 hover:bg-white/10 hover:text-white"
                      >
                        <UserRound
                          size={17}
                          className="text-white/40 transition-colors group-hover:text-sky-300"
                        />

                        <span>Edit Profile</span>
                      </Link>

                      {/* Feedback */}
                      <Link
                        to="/feedback"
                        role="menuitem"
                        onClick={() => setMenuOpen(false)}
                        className="group flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium text-white/75 transition-all duration-200 hover:translate-x-1 hover:bg-white/10 hover:text-white"
                      >
                        <MessageSquare
                          size={17}
                          className="text-white/40 transition-colors group-hover:text-sky-300"
                        />

                        <span>Feedback</span>
                      </Link>

                      <div className="my-1 border-t border-white/10" />

                      {/* Logout */}
                      <button
                        type="button"
                        role="menuitem"
                        onClick={handleLogout}
                        className="group flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-sm font-medium text-red-300 transition-all duration-200 hover:translate-x-1 hover:bg-red-400/10 hover:text-red-200"
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
            /* Sign In */
            <Link
              to="/login"
              className="rounded-full bg-white px-4 py-2.5 text-xs font-bold text-slate-900 shadow-lg shadow-black/10 transition-all duration-200 hover:-translate-y-0.5 hover:bg-sky-50 hover:shadow-xl sm:px-5 sm:text-sm"
            >
              Sign In
            </Link>
          )}

          {/* =========================
              MOBILE MENU BUTTON
          ========================== */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen((open) => !open)}
            aria-label="Toggle navigation menu"
            aria-expanded={mobileMenuOpen}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/10 text-white transition-all duration-200 hover:bg-white/15 md:hidden"
          >
            {mobileMenuOpen ? (
              <X size={19} />
            ) : (
              <Menu size={19} />
            )}
          </button>
        </div>

        {/* =========================
            MOBILE MENU
        ========================== */}
        {mobileMenuOpen && (
          <div className="absolute left-3 right-3 top-[calc(100%+10px)] overflow-hidden rounded-2xl border border-white/10 bg-slate-950/95 p-2 shadow-2xl shadow-black/30 backdrop-blur-2xl md:hidden">
            <Link
              to="/"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center rounded-xl px-4 py-3 text-sm font-medium text-white/80 transition hover:bg-white/10 hover:text-white"
            >
              Home
            </Link>

            <Link
              to="/destinations"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center rounded-xl px-4 py-3 text-sm font-medium text-white/80 transition hover:bg-white/10 hover:text-white"
            >
              Destinations
            </Link>

            <Link
              to="/hotels"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center rounded-xl px-4 py-3 text-sm font-medium text-white/80 transition hover:bg-white/10 hover:text-white"
            >
              Hotels
            </Link>

            <Link
              to="/ai"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2 rounded-xl px-4 py-3 text-sm font-semibold text-white transition hover:bg-emerald-400/10"
            >
              <Sparkles size={16} className="text-emerald-300" />
              Paila AI
            </Link>

            {isAuthenticated && (
              <Link
                to="/dashboard"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center rounded-xl px-4 py-3 text-sm font-semibold text-sky-300 transition hover:bg-sky-400/10"
              >
                Dashboard
              </Link>
            )}
          </div>
        )}
      </nav>
    </header>
  );
}