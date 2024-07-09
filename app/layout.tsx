import type { Metadata } from "next";
import { Inter } from "next/font/google";
import ClientWrapper from "shared/components/ClientWrapper";
import "shared/styles/main.css";

export const metadata: Metadata = {
  title: "Fabrotec Test | Home",
  description: "Fabrotec Frontend Test",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <ClientWrapper>{children}</ClientWrapper>
      </body>
    </html>
  );
}
