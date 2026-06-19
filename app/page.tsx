import Header from "";
import HeroSlideshow from "";
import Link from "next/link";

const quickLinks = [
  {
    icon: "🗺️",
    title: "Route Maps",
    desc: "Browse all routes across HRM",
    href: "/routes",
    color: "border-gold",
  },
  {
    icon: "🕐",
    title: "Live Times",
    desc: "Real-time arrivals at your stop",
    href: "/schedules/real-time",
    color: "border-teal-400",
  },
  {
    icon: "💳",
    title: "Fare Info",
    desc: "Passes, U-Pass, and payment",
    href: "/fares",
    color: "border-green-400",
  },
  {
    icon: "⚠️",
    title: "Alerts",
    desc: "Detours and service updates",
    href: "/alerts",
    color: "border-orange-400",
  },
];

export default function Home() {
  return <></>;
}
