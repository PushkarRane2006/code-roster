import type { Metadata } from "next";
import { Inter, JetBrains_Mono, Outfit, Space_Grotesk } from "next/font/google";
import { APP } from "@/config/app.config";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: `${APP.name} — AI Code Critique | DevFest Nashik 2026`,
  description: `${APP.tagline} ${APP.subTagline}`,
  keywords: ["Code Roaster", "Gemini", "DevFest Nashik 2026", "GDG Nashik", "Code Review", "AI Roast"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${jetbrainsMono.variable} ${outfit.variable} ${spaceGrotesk.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#F8F4EC] text-[#141414] relative selection:bg-[#EDB13E] selection:text-[#141414]">
        {children}
      </body>
    </html>
  );
}
