import { Hero } from "@/components/home/Hero";
import { FeaturedSections } from "@/components/home/FeaturedSections";

export default function HomePage() {
  return (
    <>
      <Hero />
      <FeaturedSections />
      <footer className="border-t border-white/[0.05] py-12 px-4 text-center">
        <div className="max-w-7xl mx-auto">
          <div className="font-display text-2xl font-black text-gold tracking-[0.3em] text-glow-gold mb-3">
            GALACTIC ARCHIVES
          </div>
          <p className="text-slate-500 text-sm italic mb-6">
            &ldquo;May the Force be with you.&rdquo;
          </p>
          <div className="divider-gold max-w-xs mx-auto mb-6" />
          <p className="text-slate-700 text-xs">
            Star Wars is a trademark of Lucasfilm Ltd. Galactic Archives is an unofficial fan resource.
          </p>
        </div>
      </footer>
    </>
  );
}
