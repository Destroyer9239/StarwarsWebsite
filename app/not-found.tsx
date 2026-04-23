import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-screen bg-space flex flex-col items-center justify-center px-4 text-center">
      {/* Stars pseudo-bg */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute w-1 h-1 rounded-full bg-white/30 top-[15%] left-[20%]" />
        <div className="absolute w-1 h-1 rounded-full bg-white/20 top-[30%] left-[70%]" />
        <div className="absolute w-0.5 h-0.5 rounded-full bg-white/40 top-[60%] left-[40%]" />
        <div className="absolute w-1 h-1 rounded-full bg-white/25 top-[80%] left-[60%]" />
        <div className="absolute w-0.5 h-0.5 rounded-full bg-white/30 top-[10%] left-[80%]" />
        <div className="absolute w-1 h-1 rounded-full bg-white/20 top-[50%] left-[10%]" />
        <div className="absolute w-0.5 h-0.5 rounded-full bg-white/35 top-[25%] left-[50%]" />
        <div className="absolute w-1 h-1 rounded-full bg-white/15 top-[70%] left-[85%]" />
      </div>

      {/* Gold nebula glow */}
      <div className="absolute w-[400px] h-[400px] rounded-full bg-gold/[0.04] blur-[100px] pointer-events-none" />

      <div className="relative max-w-lg mx-auto">
        {/* 404 */}
        <div
          className="font-display font-black text-[160px] leading-none select-none mb-2 text-gold-shimmer"
          style={{ opacity: 0.15 }}
        >
          404
        </div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <div className="text-[80px] mb-4">🌌</div>
            <h1 className="font-display text-2xl md:text-3xl font-black text-white uppercase tracking-wide mb-3">
              Lost in the Outer Rim
            </h1>
            <p className="text-slate-500 text-base mb-8 leading-relaxed">
              These aren&apos;t the pages you&apos;re looking for.
              <br />
              The sector you requested does not exist in this galaxy.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link
                href="/"
                className="px-6 py-3 bg-gold hover:bg-gold-dim text-black font-bold rounded-xl font-display tracking-wide text-sm transition-colors duration-200"
              >
                Return to Base
              </Link>
              <Link
                href="/lore"
                className="px-6 py-3 border border-white/10 hover:border-white/20 text-slate-400 hover:text-white font-medium rounded-xl text-sm transition-all duration-200"
              >
                Explore the Lore
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="relative mt-32 text-xs text-slate-700 font-display uppercase tracking-widest">
        &ldquo;In a galaxy far, far away&hellip; this page got lost.&rdquo;
      </div>
    </main>
  );
}
