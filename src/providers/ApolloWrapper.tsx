import React from "react";
import useApolloClientWithAuth from "../graphql/client";
import { ApolloProvider } from "@apollo/client/react";

const ApolloWrapper = ({ children }: { children: React.ReactNode }) => {
  const client = useApolloClientWithAuth();
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};

export { ApolloWrapper };
export default ApolloWrapper;
