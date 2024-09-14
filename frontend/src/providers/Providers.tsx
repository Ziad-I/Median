"use client";

import { ThemeProvider } from "next-themes";
import { AuthStoreProvider } from "./AuthStoreProvider";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <AuthStoreProvider>
      <ThemeProvider attribute="class">{children}</ThemeProvider>
    </AuthStoreProvider>
  );
}
