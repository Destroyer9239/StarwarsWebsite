/**
 * Full providers with Clerk + Convex.
 *
 * To enable:
 * 1. Add to .env.local:
 *    NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_...
 *    CLERK_SECRET_KEY=sk_...
 *    NEXT_PUBLIC_CONVEX_URL=https://your-deployment.convex.cloud
 *
 * 2. Copy this file over components/providers.tsx
 *
 * 3. Restore full middleware.ts (see docs/middleware.full.ts)
 */
"use client";

import { ClerkProvider } from "@clerk/nextjs";
import { ConvexProviderWithClerk } from "convex/react-clerk";
import { ConvexReactClient } from "convex/react";
import { useAuth } from "@clerk/nextjs";

const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

function ConvexWithClerk({ children }: { children: React.ReactNode }) {
  return (
    <ConvexProviderWithClerk client={convex} useAuth={useAuth}>
      {children}
    </ConvexProviderWithClerk>
  );
}

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider>
      <ConvexWithClerk>{children}</ConvexWithClerk>
    </ClerkProvider>
  );
}
