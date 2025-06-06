"use client";

import { ApolloProvider } from "@apollo/client";
import { Suspense } from "react";
import { AuthModalProvider } from "@/features/ui/auth/ui/authModalProvider";
import client from "@/lib/apolloClient";

export const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <ApolloProvider client={client}>
      <Suspense>
        <AuthModalProvider />
      </Suspense>
      {children}
    </ApolloProvider>
  );
}; 