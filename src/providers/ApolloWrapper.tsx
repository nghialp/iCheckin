import React from "react";
import useApolloClientWithAuth from "../graphql/client";
import { ApolloProvider } from "@apollo/client/react";

export function ApolloWrapper({ children }: { children: React.ReactNode }) {
  const client = useApolloClientWithAuth();
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
}