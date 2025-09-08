import { Metadata } from "next";
import "./globals.css";
import { Providers } from "./providers";

export const metadata: Metadata = {
  title: "Admin Panel",
  description: "Admin panel for Universea",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang={"en"}>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
