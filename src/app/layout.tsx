import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import { Toaster } from "@/components/ui/toaster";
import { Provider } from "./provider";
import I18nProvider from "./i18nprovider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "OCM Visitor Registration",
  description: "Visitor Registration for OCM",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang={'en'}>
      <Provider>
      <body className={inter.className}>
        <I18nProvider>
        {children}
        </I18nProvider>
        <Toaster />
      </body>
      </Provider>
    </html>
  );
}
