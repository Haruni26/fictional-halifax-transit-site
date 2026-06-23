"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Link from "next/link";

const slides = [
  {
    tag: "Getting Around Halifax",
    headline: "Your City,\nOn Schedule.",
    body: "Halifax Transit connects over 60 routes across HRM — from the waterfront to the suburbs, reliably and sustainably.",
    cta: { label: "Explore All Routes", href: "/routes" },
    secondaryCta: { label: "Plan a Trip", href: "/trip-planner" },
    accent: "#F5A623",
    bg: "linear-gradient(135deg, #0A2342 0%, #1a3a6b 60%, #0d2f52 100%)",
    visual: "bus",
  },
  {
    tag: "Real-Time Schedules",
    headline: "Know Before\nYou Go.",
    body: "Live arrivals, route maps, and alerts — all in one place. Never miss your bus again.",
    cta: { label: "View Schedules", href: "/schedules" },
    secondaryCta: { label: "Real-Time Tracking", href: "/schedules/real-time" },
    accent: "#38B2AC",
    bg: "linear-gradient(135deg, #0d2f52 0%, #0A2342 50%, #0a3040 100%)",
    visual: "clock",
  },
  {
    tag: "Affordable Fares",
    headline: "More City,\nLess Cost.",
    body: "Monthly passes, student U-Pass, and senior discounts — transit made accessible for every Haligonian.",
    cta: { label: "See Fare Options", href: "/fares" },
    secondaryCta: { label: "Get a U-Pass", href: "/fares/upass" },
    accent: "#68D391",
    bg: "linear-gradient(135deg, #0A2342 0%, #0d3520 60%, #0A2342 100%)",
    visual: "card",
  },
  {
    tag: "Service Updates",
    headline: "Stay in the\nLoop.",
    body: "Subscribe to real-time alerts for your routes. Detours, delays, and closures delivered directly to you.",
    cta: { label: "Check Alerts", href: "/alerts" },
    secondaryCta: { label: "Subscribe to Updates", href: "/alerts/subscribe" },
    accent: "#F6AD55",
    bg: "linear-gradient(135deg, #1a1a2e 0%, #0A2342 50%, #2d1a0a 100%)",
    visual: "alert",
  },
];

// Each visual is its own small component
function BusVisual({ color }: { color: string }) {
  return (
    <svg viewBox="0 0 320 200" className="w-full h-full">
      <rect
        x="20"
        y="60"
        width="260"
        height="110"
        rx="12"
        fill={color}
        opacity="0.15"
      />
      <rect
        x="30"
        y="70"
        width="240"
        height="90"
        rx="8"
        fill={color}
        opacity="0.2"
      />
      {[0, 1, 2, 3].map((i) => (
        <rect
          key={i}
          x={50 + i * 58}
          y="82"
          width="42"
          height="30"
          rx="5"
          fill="white"
          opacity="0.7"
        />
      ))}
      <circle cx="70" cy="170" r="20" fill="#1A202C" />
      <circle cx="70" cy="170" r="12" fill="#2d3748" />
      <circle cx="230" cy="170" r="20" fill="#1A202C" />
      <circle cx="230" cy="170" r="12" fill="#2d3748" />
    </svg>
  );
}

function ClockVisual({ color }: { color: string }) {
  return (
    <svg viewBox="0 0 320 200" className="w-full h-full">
      <circle cx="160" cy="100" r="75" fill={color} opacity="0.1" />
      <circle
        cx="160"
        cy="100"
        r="65"
        fill="none"
        stroke={color}
        strokeWidth="3"
        opacity="0.4"
      />
      {Array.from({ length: 12 }, (_, i) => {
        const a = (i * 30 - 90) * (Math.PI / 180);
        return (
          <line
            key={i}
            x1={160 + 55 * Math.cos(a)}
            y1={100 + 55 * Math.sin(a)}
            x2={160 + 62 * Math.cos(a)}
            y2={100 + 62 * Math.sin(a)}
            stroke={color}
            strokeWidth={i % 3 === 0 ? 3 : 1.5}
            opacity="0.7"
          />
        );
      })}
      <line
        x1="160"
        y1="100"
        x2="178"
        y2="72"
        stroke="white"
        strokeWidth="4"
        strokeLinecap="round"
        opacity="0.9"
      />
      <line
        x1="160"
        y1="100"
        x2="185"
        y2="108"
        stroke={color}
        strokeWidth="3"
        strokeLinecap="round"
      />
    </svg>
  );
}

function CardVisual({ color }: { color: string }) {
  return (
    <svg viewBox="0 0 320 200" className="w-full h-full">
      <rect
        x="52"
        y="48"
        width="220"
        height="128"
        rx="14"
        fill="black"
        opacity="0.15"
      />
      <rect
        x="46"
        y="42"
        width="220"
        height="128"
        rx="14"
        fill={color}
        opacity="0.2"
      />
      <rect
        x="46"
        y="42"
        width="220"
        height="128"
        rx="14"
        fill="none"
        stroke={color}
        strokeWidth="2"
        opacity="0.5"
      />
      <rect x="46" y="80" width="220" height="24" fill={color} opacity="0.15" />
      <rect
        x="66"
        y="58"
        width="32"
        height="24"
        rx="4"
        fill={color}
        opacity="0.6"
      />
      <text
        x="250"
        y="60"
        textAnchor="end"
        fill={color}
        fontSize="14"
        fontWeight="800"
        opacity="0.9"
      >
        HT
      </text>
      <text x="66" y="138" fill={color} fontSize="12" opacity="0.7">
        Balance
      </text>
      <text x="66" y="158" fill="white" fontSize="20" fontWeight="700">
        $26.00
      </text>
      <text
        x="256"
        y="158"
        textAnchor="end"
        fill={color}
        fontSize="11"
        opacity="0.6"
      >
        Monthly Pass
      </text>
    </svg>
  );
}

function AlertVisual({ color }: { color: string }) {
  return (
    <svg viewBox="0 0 320 200" className="w-full h-full">
      <path
        d="M130 100 Q115 95 112 75 Q112 42 160 38 Q208 42 208 75 Q205 95 190 100 Z"
        fill={color}
        opacity="0.25"
      />
      <path
        d="M130 100 Q115 95 112 75 Q112 42 160 38 Q208 42 208 75 Q205 95 190 100 Z"
        fill="none"
        stroke={color}
        strokeWidth="2.5"
        opacity="0.6"
      />
      <rect
        x="154"
        y="96"
        width="12"
        height="20"
        rx="6"
        fill={color}
        opacity="0.7"
      />
      <circle cx="200" cy="45" r="12" fill={color} />
      <text
        x="200"
        y="50"
        textAnchor="middle"
        fill="#0A2342"
        fontSize="12"
        fontWeight="800"
      >
        7
      </text>
      {[
        { y: 140, label: "Route 7 – Detour via Robie", c: "#F6AD55" },
        { y: 163, label: "Route 10 – On time", c: "#68D391" },
      ].map((a, i) => (
        <g key={i}>
          <rect
            x="50"
            y={a.y - 12}
            width="220"
            height="22"
            rx="11"
            fill={a.c}
            opacity="0.15"
          />
          <circle cx="65" cy={a.y} r="5" fill={a.c} opacity="0.8" />
          <text x="77" y={a.y + 5} fill="white" fontSize="11" opacity="0.85">
            {a.label}
          </text>
        </g>
      ))}
    </svg>
  );
}

// Map visual names to components so we can look them up dynamically
const visuals: Record<string, ({ color }: { color: string }) => JSX.Element> = {
  bus: BusVisual,
  clock: ClockVisual,
  card: CardVisual,
  alert: AlertVisual,
};

export default function HeroSlideshow() {
  const [current, setCurrent] = useState(0);
  const [animating, setAnimating] = useState(false);
  const [direction, setDirection] = useState<"left" | "right">("right");
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const go = useCallback(
    (index: number, dir: "left" | "right") => {
      if (animating) return;
      setDirection(dir);
      setAnimating(true);
      setTimeout(() => {
        setCurrent(index);
        setAnimating(false);
      }, 350);
    },
    [animating],
  );

  const next = useCallback(
    () => go((current + 1) % slides.length, "right"),
    [current, go],
  );
  const prev = useCallback(
    () => go((current - 1 + slides.length) % slides.length, "left"),
    [current, go],
  );

  const resetTimer = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(next, 6000);
  }, [next]);

  useEffect(() => {
    intervalRef.current = setInterval(next, 6000);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [next]);

  const slide = slides[current];
  const Visual = visuals[slide.visual];
  const textOffset = animating
    ? direction === "right"
      ? "-40px"
      : "40px"
    : "0px";
  const imgOffset = animating
    ? direction === "right"
      ? "40px"
      : "-40px"
    : "0px";

  return (
    <section
      style={{ background: slide.bg, transition: "background 0.8s ease" }}
      className="relative h-screen min-h-150 flex items-center overflow-hidden"
    >
      {/* Decorative angled bars */}
      <div
        style={{ background: slide.accent }}
        className="absolute -right-16 -top-20 w-120 h-170 opacity-[0.08] rotate-18 rounded-[40px] pointer-events-none"
      />
      <div
        style={{ background: slide.accent }}
        className="absolute right-16 -top-10 w-[320px] h-145 opacity-[0.05] rotate-18 rounded-[40px] pointer-events-none"
      />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(rgba(255,255,255,0.04) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      {/* Content */}
      <div className="max-w-6xl mx-auto px-12 w-full grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        {/* Text side */}
        <div
          style={{
            opacity: animating ? 0 : 1,
            transform: `translateX(${textOffset})`,
            transition: "opacity 0.35s ease, transform 0.35s ease",
          }}
        >
          <div
            style={{
              background: `${slide.accent}22`,
              border: `1px solid ${slide.accent}44`,
              color: slide.accent,
            }}
            className="inline-flex items-center gap-2 rounded-full px-3.5 py-1 mb-6"
          >
            <div
              style={{ background: slide.accent }}
              className="w-1.5 h-1.5 rounded-full"
            />
            <span className="text-xs font-medium">{slide.tag}</span>
          </div>

          <h1
            className="font-sora font-extrabold text-white leading-[1.08] tracking-tight whitespace-pre-line mb-5"
            style={{ fontSize: "clamp(38px, 5vw, 68px)" }}
          >
            {slide.headline}
          </h1>

          <p className="text-white/70 text-base leading-relaxed max-w-sm mb-9">
            {slide.body}
          </p>

          <div className="flex gap-3.5 flex-wrap">
            <Link
              href={slide.cta.href}
              style={{
                background: slide.accent,
                boxShadow: `0 4px 20px ${slide.accent}44`,
              }}
              className="text-navy font-sora font-bold px-7 py-3.5 rounded-xl no-underline hover:-translate-y-0.5 transition-transform"
            >
              {slide.cta.label} →
            </Link>
            <Link
              href={slide.secondaryCta.href}
              className="text-white font-sora font-semibold px-7 py-3.5 rounded-xl no-underline bg-white/10 border border-white/20 hover:bg-white/16 transition-colors"
            >
              {slide.secondaryCta.label}
            </Link>
          </div>
        </div>

        {/* Illustration side */}
        <div
          style={{
            opacity: animating ? 0 : 1,
            transform: `translateX(${imgOffset})`,
            transition: "opacity 0.35s ease, transform 0.35s ease",
          }}
          className="hidden md:flex items-center justify-center h-75"
        >
          <Visual color={slide.accent} />
        </div>
      </div>

      {/* Controls */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex items-center gap-5">
        <button
          onClick={() => {
            prev();
            resetTimer();
          }}
          aria-label="Previous slide"
          className="w-10 h-10 rounded-full bg-white/10 border border-white/20 text-white text-xl flex items-center justify-center hover:bg-white/20 transition-colors cursor-pointer"
        >
          ‹
        </button>

        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => {
              go(i, i > current ? "right" : "left");
              resetTimer();
            }}
            style={{
              background:
                i === current ? slide.accent : "rgba(255,255,255,0.3)",
              width: i === current ? "28px" : "8px",
            }}
            className="h-2 rounded border-none cursor-pointer transition-all duration-300 p-0"
          />
        ))}

        <button
          onClick={() => {
            next();
            resetTimer();
          }}
          aria-label="Next slide"
          className="w-10 h-10 rounded-full bg-white/10 border border-white/20 text-white text-xl flex items-center justify-center hover:bg-white/20 transition-colors cursor-pointer"
        >
          ›
        </button>
      </div>

      {/* Slide counter */}
      <div className="absolute bottom-11 right-12 text-white/40 text-xs tracking-widest font-sora">
        0{current + 1} / 0{slides.length}
      </div>

      {/* Progress bar */}
      <div className="absolute bottom-0 inset-x-0 h-0.75 bg-white/10">
        <div
          key={current}
          style={{
            background: slide.accent,
            animation: "slideProgress 6s linear",
          }}
          className="h-full"
        />
      </div>

      <style>{`@keyframes slideProgress { from { width: 0% } to { width: 100% } }`}</style>
    </section>
  );
}
