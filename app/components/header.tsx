"use client";
import Link from "next/link";
import { useState, useRef, useEffect } from "react";

const navItems = [
  {
    label: "Routes",
    dropdown: [
      { label: "All Routes", href: "/routes" },
      {
        label: "Route 1 – Bridge Terminal/Mumford Terminal",
        href: "/routes/1",
      },
      { label: "Route 4 – Lacewood Terminal/Dalhousie", href: "/routes/4" },
      { label: "Route 7 – Robie Street", href: "/routes/7" },
      {
        label: "Route 24 – Leiblin Park/Saint Mary's University",
        href: "/routes/24",
      },
      { label: "Route 90 – Larry Uteck", href: "/routes/90" },
    ],
  },
  {
    label: "Schedules",
    dropdown: [
      { label: "Weekday Schedules", href: "/schedules/weekday" },
      { label: "Weekend Schedules", href: "/schedules/weekend" },
      { label: "Holiday Schedules", href: "/schedules/holiday" },
      { label: "Real-Time Tracking", href: "/schedules/real-time" },
    ],
  },
  {
    label: "Trip Planner",
    dropdown: [
      { label: "Plan a Trip", href: "/trip-planner" },
      { label: "Accessible Travel", href: "/trip-planner/accessible" },
      { label: "Park & Ride", href: "/trip-planner/park-ride" },
    ],
  },
  {
    label: "Fares",
    dropdown: [
      { label: "Fare Information", href: "/fares" },
      { label: "U-Pass", href: "/fares/upass" },
      { label: "Senior Passes", href: "/fares/senior" },
      { label: "Monthly Passes", href: "/fares/monthly" },
    ],
  },
  {
    label: "Alerts",
    dropdown: [
      { label: "Service Alerts", href: "/alerts" },
      { label: "Detours", href: "/alerts/detours" },
      { label: "Subscribe to Updates", href: "/alerts/subscribe" },
    ],
  },
];

export default function Header() {
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (!headerRef.current?.contains(e.target as Node)) setOpenMenu(null);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <header
      ref={headerRef}
      className="bg-navy fixed top-0 inset-x-0 z-50 shadow-lg"
    >
      {/* Top utility bar */}
      <div className="bg-asphalt px-8 py-1.5 flex justify-end gap-5">
        {[
          { label: "⚠ Service Alerts", href: "/alerts" },
          { label: "Real-Time Tracking", href: "/schedules/real-time" },
          { label: "Buy a Pass", href: "/fares" },
        ].map((l) => (
          <Link
            key={l.href}
            href={l.href}
            className="text-slate-400 text-xs no-underline hover:text-white transition-colors"
          >
            {l.label}
          </Link>
        ))}
      </div>

      {/* Main nav row */}
      <div className="px-8 flex items-center h-17 gap-0">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 mr-10 no-underline">
          <div className="w-10 h-10 bg-gold rounded-lg flex items-center justify-center font-sora font-extrabold text-navy">
            HT
          </div>
          <div>
            <div className="font-sora font-bold text-white leading-tight">
              Halifax
            </div>
            <div className="text-gold text-xs tracking-widest uppercase">
              Transit
            </div>
          </div>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-0.5 flex-1">
          {navItems.map((item) => (
            <div key={item.label} className="relative">
              <button
                onClick={() =>
                  setOpenMenu(openMenu === item.label ? null : item.label)
                }
                onMouseEnter={() => setOpenMenu(item.label)}
                className={`flex items-center gap-1 px-4 py-2 rounded-md text-sm font-medium transition-all cursor-pointer border-none
                  ${
                    openMenu === item.label
                      ? "bg-gold/10 text-gold"
                      : "text-white/90 bg-transparent hover:bg-gold/10 hover:text-gold"
                  }`}
              >
                {item.label}
                <span
                  className={`text-xs opacity-70 transition-transform duration-200 ${openMenu === item.label ? "rotate-180" : ""}`}
                >
                  ▼
                </span>
              </button>

              {openMenu === item.label && (
                <div
                  onMouseLeave={() => setOpenMenu(null)}
                  className="absolute top-[calc(100%+8px)] left-0 bg-white rounded-xl shadow-xl min-w-52 border border-navy/10 overflow-hidden"
                >
                  <div className="p-1.5">
                    {item.dropdown.map((sub, i) => (
                      <Link
                        key={sub.href}
                        href={sub.href}
                        onClick={() => setOpenMenu(null)}
                        className={`block px-3.5 py-2 rounded-md text-sm no-underline transition-colors hover:bg-fog
                          ${
                            i === 0
                              ? "font-semibold text-navy border-b border-navy/10 mb-1 pb-2.5"
                              : "text-steel"
                          }`}
                      >
                        {sub.label}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </nav>

        {/* CTA button */}
        <Link
          href="/trip-planner"
          className="bg-gold text-navy px-5 py-2 rounded-lg font-sora font-bold text-sm no-underline hover:opacity-90 transition-opacity whitespace-nowrap"
        >
          Plan a Trip →
        </Link>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden bg-transparent border-none text-white text-2xl ml-4 cursor-pointer"
        >
          {mobileOpen ? "✕" : "☰"}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-asphalt px-6 pb-6">
          {navItems.map((item) => (
            <div key={item.label}>
              <div className="text-gold font-sora font-semibold text-xs tracking-widest uppercase pt-4 pb-1.5">
                {item.label}
              </div>
              {item.dropdown.map((sub) => (
                <Link
                  key={sub.href}
                  href={sub.href}
                  onClick={() => setMobileOpen(false)}
                  className="block text-white/75 no-underline py-1.5 text-sm hover:text-white transition-colors"
                >
                  {sub.label}
                </Link>
              ))}
            </div>
          ))}
        </div>
      )}
    </header>
  );
}
