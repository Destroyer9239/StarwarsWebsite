import Link from "next/link";

const FOOTER_LINKS = [
  {
    heading: "Lore",
    links: [
      { label: "Timeline", href: "/lore/timeline" },
      { label: "Characters", href: "/lore/characters" },
      { label: "Factions", href: "/lore/factions" },
      { label: "Planets", href: "/lore/planets" },
    ],
  },
  {
    heading: "Combat",
    links: [
      { label: "All Battles", href: "/battles" },
      { label: "Clone Wars", href: "/battles?era=fall-of-jedi" },
      { label: "Civil War", href: "/battles?era=age-of-empire" },
    ],
  },
  {
    heading: "Games & Mods",
    links: [
      { label: "Games", href: "/games" },
      { label: "All Mods", href: "/mods" },
      { label: "Galactic Contention", href: "/mods/galactic-contention" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="relative border-t border-white/[0.05] bg-space-lighter/30 pt-16 pb-10 px-4 overflow-hidden">
      {/* Subtle nebula */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute w-[600px] h-[300px] rounded-full bg-gold/[0.03] blur-[80px] bottom-0 left-1/2 -translate-x-1/2" />
      </div>

      <div className="relative max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <div className="font-display text-xl font-black text-gold tracking-[0.3em] mb-3">
              GALACTIC<br />ARCHIVES
            </div>
            <p className="text-slate-500 text-sm leading-relaxed mb-4">
              The comprehensive Star Wars encyclopedia — lore, history, games, and mods.
            </p>
            <p className="text-xs text-slate-600 italic">
              &ldquo;May the Force be with you.&rdquo;
            </p>
          </div>

          {/* Link columns */}
          {FOOTER_LINKS.map((col) => (
            <div key={col.heading}>
              <h3 className="font-display text-xs font-bold uppercase tracking-[0.25em] text-gold/60 mb-4">
                {col.heading}
              </h3>
              <ul className="space-y-2.5">
                {col.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-slate-500 hover:text-gold transition-colors duration-200"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="divider-gold mb-8" />

        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-700">
          <p>Star Wars is a trademark of Lucasfilm Ltd. This is an unofficial fan resource.</p>
          <p>Built with Next.js · Tailwind CSS · Framer Motion</p>
        </div>
      </div>
    </footer>
  );
}
