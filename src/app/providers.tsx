"use client";

import { ApolloProvider } from "@apollo/client";
import { Suspense } from "react";
import { AuthModalProvider } from "@/features/ui/auth/ui/authModalProvider";
import client from "@/lib/apolloClient";
import { Spinner } from "@/shared/ui/spinner/Spinner";

export const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <ApolloProvider client={client}>
      <Suspense fallback={<Spinner />}>
        <AuthModalProvider />
        {children}
      </Suspense>
    </ApolloProvider>
  );
}; 