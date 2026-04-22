// Stub providers — works with no env vars.
// To enable auth + live data, add Clerk and Convex keys to .env.local
// and replace this file with the full version in docs/providers.full.tsx
export function Providers({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
