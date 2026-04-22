import Link from "next/link";

export default function SignUpPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-space px-4">
      <div className="glass rounded-2xl p-10 max-w-md w-full text-center border border-white/10">
        <h1 className="font-display text-2xl font-black text-gold text-glow-gold tracking-widest uppercase mb-3">
          Galactic Archives
        </h1>
        <p className="text-slate-400 text-sm mb-6">
          Registration is coming soon. Add your Clerk keys to{" "}
          <code className="text-gold/80 bg-white/5 px-1.5 py-0.5 rounded text-xs">.env.local</code>{" "}
          to enable sign-up.
        </p>
        <Link
          href="/"
          className="inline-block px-6 py-2.5 border border-gold/40 text-gold rounded-xl hover:bg-gold/10 transition-all duration-200 text-sm font-medium"
        >
          ← Back to Archives
        </Link>
      </div>
    </div>
  );
}
