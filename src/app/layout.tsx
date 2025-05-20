import { Metadata } from "next";
import "./globals.css";
import { Suspense } from "react";
import { AuthModalProvider } from "@/features/ui/auth/ui/authModalProvider";

export const metadata: Metadata = {
  title: "Instagram",
  description: "social network",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang={"en"}>
      <body>
        <Suspense>
          <AuthModalProvider />
        </Suspense>
        {children}
      </body>
    </html>
  );
}
