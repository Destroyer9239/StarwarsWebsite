// Auth is a passthrough until Clerk keys are added to .env.local
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(_request: NextRequest) {
  return NextResponse.next();
}

export const config = { matcher: [] };
