"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  BookOpen,
  Swords,
  Gamepad2,
  Wrench,
  Menu,
  X,
  Search,
  ChevronDown,
} from "lucide-react";

const NAV_LINKS = [
  {
    label: "Lore",
    href: "/lore",
    icon: BookOpen,
    sub: [
      { label: "Timeline", href: "/lore/timeline" },
      { label: "Factions", href: "/lore/factions" },
      { label: "Characters", href: "/lore/characters" },
      { label: "Planets", href: "/lore/planets" },
    ],
  },
  {
    label: "Battles",
    href: "/battles",
    icon: Swords,
    sub: [],
  },
  {
    label: "Games",
    href: "/games",
    icon: Gamepad2,
    sub: [],
  },
  {
    label: "Mods",
    href: "/mods",
    icon: Wrench,
    sub: [
      { label: "Galactic Contention", href: "/mods/galactic-contention" },
      { label: "All Mods", href: "/mods" },
    ],
  },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setActiveDropdown(null);
  }, [pathname]);

  return (
    <>
      <motion.nav
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-space/90 backdrop-blur-xl border-b border-white/[0.06] shadow-lg shadow-black/30"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 group">
              <div className="relative">
                <div className="w-8 h-8 rounded-full border-2 border-gold/60 flex items-center justify-center group-hover:border-gold transition-colors duration-300">
                  <div className="w-3 h-3 rounded-full bg-gold/80 group-hover:bg-gold transition-colors duration-300 group-hover:shadow-gold" />
                </div>
                <div className="absolute inset-0 rounded-full bg-gold/10 group-hover:bg-gold/20 blur-sm transition-all duration-300" />
              </div>
              <span className="font-display text-sm font-bold tracking-[0.25em] text-white group-hover:text-gold transition-colors duration-300 hidden sm:block">
                GALACTIC ARCHIVES
              </span>
              <span className="font-display text-sm font-bold tracking-[0.25em] text-white group-hover:text-gold transition-colors duration-300 sm:hidden">
                GA
              </span>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-1">
              {NAV_LINKS.map((link) => (
                <div
                  key={link.href}
                  className="relative"
                  onMouseEnter={() => link.sub.length > 0 && setActiveDropdown(link.label)}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <Link
                    href={link.href}
                    className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                      pathname.startsWith(link.href)
                        ? "text-gold bg-gold/10"
                        : "text-slate-300 hover:text-white hover:bg-white/5"
                    }`}
                  >
                    <link.icon size={14} />
                    {link.label}
                    {link.sub.length > 0 && (
                      <ChevronDown
                        size={12}
                        className={`transition-transform duration-200 ${
                          activeDropdown === link.label ? "rotate-180" : ""
                        }`}
                      />
                    )}
                  </Link>

                  {/* Dropdown */}
                  <AnimatePresence>
                    {link.sub.length > 0 && activeDropdown === link.label && (
                      <motion.div
                        initial={{ opacity: 0, y: 8, scale: 0.97 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 8, scale: 0.97 }}
                        transition={{ duration: 0.15 }}
                        className="absolute top-full left-0 mt-1 w-52 glass rounded-xl overflow-hidden shadow-xl shadow-black/40 border border-white/10"
                      >
                        {link.sub.map((sub) => (
                          <Link
                            key={sub.href}
                            href={sub.href}
                            className="flex items-center gap-2 px-4 py-3 text-sm text-slate-300 hover:text-gold hover:bg-gold/5 transition-colors duration-150 border-b border-white/[0.04] last:border-0"
                          >
                            <span className="w-1 h-1 rounded-full bg-gold/50" />
                            {sub.label}
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>

            {/* Right side */}
            <div className="flex items-center gap-3">
              <button
                className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 transition-all duration-200 text-sm"
                aria-label="Search"
              >
                <Search size={15} />
                <span className="text-xs text-slate-500 hidden lg:block">
                  Search...
                </span>
                <kbd className="hidden lg:block text-xs bg-white/5 border border-white/10 rounded px-1.5 py-0.5 text-slate-500">
                  ⌘K
                </kbd>
              </button>

              <Link
                href="/sign-in"
                className="hidden md:block px-4 py-1.5 text-sm font-medium rounded-lg border border-gold/40 text-gold hover:bg-gold/10 hover:border-gold transition-all duration-200"
              >
                Sign In
              </Link>

              {/* Mobile toggle */}
              <button
                className="md:hidden p-2 rounded-lg text-slate-300 hover:text-white hover:bg-white/5 transition-all duration-200"
                onClick={() => setMobileOpen(!mobileOpen)}
                aria-label="Toggle mobile menu"
              >
                {mobileOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="fixed inset-0 z-40 bg-space/98 backdrop-blur-xl pt-16 overflow-y-auto"
          >
            <div className="p-6 space-y-2">
              {NAV_LINKS.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.08 }}
                >
                  <Link
                    href={link.href}
                    className="flex items-center gap-3 px-4 py-3 rounded-xl text-lg font-medium text-slate-200 hover:text-gold hover:bg-gold/5 transition-all duration-200"
                    onClick={() => setMobileOpen(false)}
                  >
                    <link.icon size={20} className="text-gold/60" />
                    {link.label}
                  </Link>
                  {link.sub.map((sub) => (
                    <Link
                      key={sub.href}
                      href={sub.href}
                      className="flex items-center gap-3 px-8 py-2.5 text-sm text-slate-400 hover:text-gold transition-colors duration-150"
                      onClick={() => setMobileOpen(false)}
                    >
                      <span className="w-1 h-1 rounded-full bg-gold/40" />
                      {sub.label}
                    </Link>
                  ))}
                </motion.div>
              ))}

              <div className="pt-6 border-t border-white/10">
                <Link
                  href="/sign-in"
                  className="block w-full py-3 rounded-xl border border-gold/40 text-gold font-medium hover:bg-gold/10 transition-all duration-200 text-center"
                  onClick={() => setMobileOpen(false)}
                >
                  Sign In
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
