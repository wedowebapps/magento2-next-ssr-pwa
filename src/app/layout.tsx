import "./globals.css";
import { App } from "@/container";
import { FullPageLoading, TrackingScript } from "@/components";
import { ApolloWrapper } from "@/app/ApolloWrapper";
import { Footer, Header } from "@/components";

import { RootContextProvider } from "@/context/rootContextProvider";
import { Suspense } from "react";

import { Metadata } from "next";
import { ReduxProvider } from "@/redux/ReduxProvider";

export const metadata: Metadata = {
  title: "Wedo Commerce",
  description: "Wedo Commerce",
  generator: "Next.js",
  manifest: "/manifest.json",
  viewport:
    "minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, viewport-fit=cover",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={"bg-gray-100"}>
        <ApolloWrapper>
          <ReduxProvider>
            <RootContextProvider>
              <Suspense fallback={<FullPageLoading />}>
                <Header />
                <App>{children}</App>
                <TrackingScript />
                <Footer />
              </Suspense>
            </RootContextProvider>
          </ReduxProvider>
        </ApolloWrapper>
      </body>
    </html>
  );
}
