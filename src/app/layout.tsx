import { Metadata } from "next";
import "./globals.css";
import { Suspense } from "react";
import { AuthModalProvider } from "@/features/ui/auth/ui/authModalProvider";
import { ApolloProvider } from "@apollo/client";
import client from "@/lib/apolloClient";

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
        <ApolloProvider client={client}>
          <Suspense>
            <AuthModalProvider />
          </Suspense>
          {children}
        </ApolloProvider>
      </body>
    </html>
  );
}
