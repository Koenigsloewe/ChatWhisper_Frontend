import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { CustomProvider as Provider } from '@/redux/provider';
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ChatWhisper: Private & Secure Conversations",
  description: "Discover ChatWhisper, your new digital sanctuary for private conversations. Engage in secure, simple, and meaningful exchanges with privacy as our top priority.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Provider>
          <ThemeProvider attribute="class" defaultTheme="dark">
            {children}
          </ThemeProvider>
          <Toaster />
        </Provider>
      </body>
    </html>
  );
}
