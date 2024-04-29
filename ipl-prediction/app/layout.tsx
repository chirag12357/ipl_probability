import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Recursive } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });
const recursive = Recursive({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "IPL Prediction",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={recursive.className}>{children}</body>
    </html>
  );
}