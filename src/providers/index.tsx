"use client";
import type { ReactNode } from "react";
import QueryProvider from "./query.provider";
import GoogleOAuthProvider from "./google-auth.provider";
import { TooltipProvider } from "@/components/ui/tooltip";

// এই providerটা মেইন layout এ ব্যবহার করা হচ্ছে
export default function Provider({ children }: { children: ReactNode }) {
  return (
    <GoogleOAuthProvider>
      <QueryProvider>
        <TooltipProvider>{children}</TooltipProvider>
      </QueryProvider>
    </GoogleOAuthProvider>
  );
}
