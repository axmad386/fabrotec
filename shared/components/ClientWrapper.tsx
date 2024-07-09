"use client";
import { Provider } from "jotai";
import { store } from "shared/stores";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export default function ClientWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const queryClient = new QueryClient();
  return (
    <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
    </Provider>
  );
}
