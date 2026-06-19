import Header from "./components/header";
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
  return (
    <>
      <Header />
      <main>
        {/* <HeroSlideshow /> */}
        <section className="bg-white py-16 px-12">
          <div className="max-w-6xl mx-auto">
            <p className="text-xs font-semibold tracking-widest uppercase text-steel mb-2">
              Quick Access
            </p>
            <h2 className="font-sora text-3xl font-bold text-navy mb-10">
              How can we help you today?
            </h2>
            <div className="grid grid-cols-[repeat(auto-fit,minmax(220px,1fr))] gap-5">
              {quickLinks.map((card) => (
                <Link
                  key={card.title}
                  href={card.href}
                  className={`block p-7 bg-fog rounded-xl border-2 border-transparent hover:${card.color} hover:-translate-y-1 transition-all duration-200`}
                >
                  <div className="text-3xl mb-3">{card.icon}</div>
                  <div className="font-sora font-bold text-base text-navy mb-1">
                    {card.title}
                  </div>
                  <div className="text-sm text-steel leading-relaxed">
                    {card.desc}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <footer className="bg-navy text-white/60 py-10 px-12 text-center text-sm">
          <div className="font-sora font-bold text-white text-base mb-2">
            Halifax Transit
          </div>
          <div>
            © 2026 Aaron Seymour · Fictional site for demonstration purposes
          </div>
        </footer>
      </main>
    </>
  );
}
