"use client";

// src/app/layout.tsx

import { ReactNode } from "react";
import { SessionProvider } from "next-auth/react";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <SessionProvider>{children}</SessionProvider>
      </body>
    </html>
  );
}

