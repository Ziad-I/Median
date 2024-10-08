import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Header from "@/components/pages/home/Header";
import Footer from "@/components/pages/home/Footer";
import { Toaster } from "@/components/ui/toaster";
import { Providers } from "@/providers/Providers";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Median",
  description:
    "Discover stories, thinking, and expertise from writers on any topic.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <div className="flex flex-col min-h-screen ">
            <Header />
            <main className="flex-1">{children}</main>
            <Toaster />
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  );
}
