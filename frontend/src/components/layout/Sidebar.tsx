import { useEffect, useState } from "react";
import {
  Bus,
  Car,
  Compass,
  Hotel,
  LayoutDashboard,
  LogOut,
  Menu,
  MessageSquare,
  Plane,
  Ticket,
  Train,
  User,
  X,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import pailaLogo from "../../assets/images/pailalogo.png";

export default function Sidebar() {
  const location = useLocation();
  const { user, logout } = useAuth();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const firstName = user?.name?.split(" ")[0] || "Traveler";

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const isSectionActive = (paths: string[]) => {
    return paths.some(
      (path) =>
        location.pathname === path ||
        location.pathname.startsWith(`${path}/`)
    );
  };

  const handleLogout = () => {
    setMobileMenuOpen(false);
    logout();
  };

  // Close mobile menu when route changes
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  return (
    <>
      {/* =====================================================
          DESKTOP SIDEBAR
      ====================================================== */}
      <aside className="fixed left-0 top-0 z-50 hidden h-screen w-64 flex-col border-r border-slate-200 bg-white text-slate-900 shadow-[4px_0_24px_rgba(15,23,42,0.04)] lg:flex">
        {/* Logo */}
        <div className="border-b border-sky-100 bg-sky-50/70 px-5 py-5">
          <Link
            to="/dashboard"
            className="group flex items-center gap-3 rounded-2xl px-2 py-1.5"
          >
            {/* Logo */}
            <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-xl">
              <img
                src={pailaLogo}
                alt="Paila logo"
                className="absolute inset-0 h-full w-full scale-[1.05] object-cover object-center"
              />
            </div>

            {/* Brand */}
            <div className="min-w-0">
              <span className="block text-xl font-black tracking-tight text-slate-900">
                Paila
              </span>

              <span className="mt-0.5 block max-w-[150px] text-[9px] font-semibold leading-[1.35] tracking-[0.12em] text-slate-400">
                EVERY JOURNEY STARTS WITH A STEP
              </span>
            </div>
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto px-4 py-6 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-slate-200">
          <SidebarNavigation
            isActive={isActive}
            isSectionActive={isSectionActive}
          />
        </nav>

        {/* User Area */}
        <SidebarUser
          user={user}
          firstName={firstName}
          onLogout={handleLogout}
        />
      </aside>

      {/* =====================================================
          MOBILE HEADER
      ====================================================== */}
      <div className="fixed left-0 right-0 top-0 z-50 px-3 pt-3 lg:hidden">
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white/95 shadow-lg shadow-slate-900/10 backdrop-blur-xl">
          {/* Mobile Top Bar */}
          <div className="flex h-[68px] items-center justify-between px-4">
            {/* Logo + Brand */}
            <Link
              to="/dashboard"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2.5"
            >
              <div className="flex h-11 w-11 items-center justify-center overflow-hidden rounded-xl">
                <img
                  src={pailaLogo}
                  alt="Paila logo"
                  className="h-10 w-10 object-contain"
                />
              </div>

              <div className="flex flex-col leading-none">
                <span className="text-2xl font-black tracking-tight text-sky-400">
                  Paila
                </span>

                <span className="mt-1 text-[8px] font-semibold tracking-[0.1em] text-slate-400">
                  YOUR TRAVEL COMPANION
                </span>
              </div>
            </Link>

            {/* Menu Button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen((open) => !open)}
              aria-label={
                mobileMenuOpen ? "Close navigation" : "Open navigation"
              }
              aria-expanded={mobileMenuOpen}
              className="flex h-11 w-11 items-center justify-center rounded-xl border border-slate-200 bg-slate-50 text-slate-600 transition-all duration-200 hover:border-sky-200 hover:bg-sky-50 hover:text-sky-600 active:scale-95"
            >
              {mobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </button>
          </div>

          {/* =================================================
              MOBILE DROPDOWN
          ================================================== */}
          <div
            className={`grid transition-all duration-300 ease-out ${
              mobileMenuOpen
                ? "grid-rows-[1fr] opacity-100"
                : "grid-rows-[0fr] opacity-0"
            }`}
          >
            <div className="min-h-0 overflow-hidden">
              <div className="border-t border-slate-100 px-3 pb-3 pt-3">
                {/* Navigation */}
                <nav className="max-h-[calc(100vh-170px)] overflow-y-auto">
                  <SidebarNavigation
                    isActive={isActive}
                    isSectionActive={isSectionActive}
                    mobile
                  />
                </nav>

                {/* User Area */}
                <div className="mt-3 border-t border-slate-100 pt-3">
                  <SidebarUser
                    user={user}
                    firstName={firstName}
                    onLogout={handleLogout}
                    mobile
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

/* =========================================================
   SIDEBAR NAVIGATION
========================================================= */

function SidebarNavigation({
  isActive,
  isSectionActive,
  mobile = false,
}: {
  isActive: (path: string) => boolean;
  isSectionActive: (paths: string[]) => boolean;
  mobile?: boolean;
}) {
  return (
    <div className={mobile ? "space-y-1" : ""}>
      {/* MAIN */}
      <SidebarSection title="MAIN">
        <SidebarItem
          to="/dashboard"
          icon={<LayoutDashboard className="h-[18px] w-[18px]" />}
          label="Dashboard"
          active={isActive("/dashboard")}
        />

        <SidebarItem
          to="/destinations"
          icon={<Compass className="h-[18px] w-[18px]" />}
          label="Destinations"
          active={isSectionActive(["/destinations"])}
        />
      </SidebarSection>

      {/* BOOKING */}
      <SidebarSection title="BOOKING">
        <SidebarItem
          to="/flights"
          icon={<Plane className="h-[18px] w-[18px]" />}
          label="Book a Flight"
          active={isSectionActive(["/flights"])}
        />

        <SidebarItem
          to="/hotels"
          icon={<Hotel className="h-[18px] w-[18px]" />}
          label="Book a Hotel"
          active={isSectionActive(["/hotels"])}
        />

        <SidebarItem
          to="/cabs"
          icon={<Car className="h-[18px] w-[18px]" />}
          label="Book a Cab"
          active={isSectionActive(["/cabs"])}
        />

        <SidebarItem
          to="/buses"
          icon={<Bus className="h-[18px] w-[18px]" />}
          label="Book a Bus"
          active={isSectionActive(["/buses"])}
        />

        <SidebarItem
          to="/trains"
          icon={<Train className="h-[18px] w-[18px]" />}
          label="Book a Train"
          active={isSectionActive(["/trains"])}
        />

        <SidebarItem
          to="/bookings"
          icon={<Ticket className="h-[18px] w-[18px]" />}
          label="My Bookings"
          active={isSectionActive(["/bookings"])}
        />
      </SidebarSection>

      {/* MY JOURNEY */}
      <SidebarSection title="MY JOURNEY">
        <SidebarItem
          to="/profile"
          icon={<User className="h-[18px] w-[18px]" />}
          label="My Profile"
          active={isActive("/profile")}
        />

        <SidebarItem
          to="/feedback"
          icon={<MessageSquare className="h-[18px] w-[18px]" />}
          label="Feedback"
          active={isActive("/feedback")}
        />
      </SidebarSection>
    </div>
  );
}

/* =========================================================
   USER AREA
========================================================= */

function SidebarUser({
  user,
  firstName,
  onLogout,
  mobile = false,
}: {
  user: any;
  firstName: string;
  onLogout: () => void;
  mobile?: boolean;
}) {
  return (
    <div
      className={
        mobile
          ? "rounded-2xl bg-slate-50/70 p-2"
          : "border-t border-slate-100 bg-slate-50/70 p-3"
      }
    >
      {/* User */}
      <div className="mb-2 flex items-center gap-3 rounded-2xl border border-slate-200/70 bg-white px-3 py-3 shadow-sm">
        {/* Avatar */}
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-100 text-sm font-bold text-emerald-700">
          {firstName.charAt(0).toUpperCase()}
        </div>

        {/* User Info */}
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-bold text-slate-800">
            {user?.name || "Traveler"}
          </p>

          <p className="mt-0.5 text-xs text-slate-400">Traveler</p>
        </div>
      </div>

      {/* Logout */}
      <button
        type="button"
        onClick={onLogout}
        className="group flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold text-slate-500 transition duration-200 hover:bg-red-50 hover:text-red-600"
      >
        <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-100 transition group-hover:bg-red-100">
          <LogOut className="h-4 w-4" />
        </span>

        <span>Logout</span>
      </button>
    </div>
  );
}

/* =========================================================
   SIDEBAR SECTION
========================================================= */

function SidebarSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mb-7">
      {/* Section Heading */}
      <div className="mb-2.5 flex items-center gap-2.5 px-2">
        <span className="text-[10px] font-extrabold tracking-[0.16em] text-emerald-600">
          {title}
        </span>

        <div className="h-px flex-1 bg-slate-100" />
      </div>

      {/* Items */}
      <div className="space-y-1">{children}</div>
    </div>
  );
}

/* =========================================================
   SIDEBAR ITEM
========================================================= */

function SidebarItem({
  to,
  icon,
  label,
  active,
}: {
  to: string;
  icon: React.ReactNode;
  label: string;
  active: boolean;
}) {
  return (
    <Link
      to={to}
      className={`group relative flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold transition-all duration-200 ${
        active
          ? "bg-emerald-50 text-emerald-700 shadow-sm"
          : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
      }`}
    >
      {/* Active Indicator */}
      {active && (
        <span className="absolute left-0 top-1/2 h-6 w-1 -translate-y-1/2 rounded-r-full bg-emerald-600" />
      )}

      {/* Icon */}
      <span
        className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl transition-all duration-200 ${
          active
            ? "bg-white text-emerald-600 shadow-sm"
            : "bg-transparent text-slate-400 group-hover:bg-white group-hover:text-emerald-600"
        }`}
      >
        {icon}
      </span>

      {/* Label */}
      <span className="truncate">{label}</span>
    </Link>
  );
}