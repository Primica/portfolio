import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import "./globals.css";

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Arthur Malfere — Backend Developer @ Nicomatic",
  description:
    "Backend developer's notebook: connectors, microservices, and a love for the monospace grid. Working at Nicomatic, Cluses, FR.",
  keywords: [
    "Arthur Malfere",
    "backend developer",
    "Nicomatic",
    "interconnect",
    "aerospace",
    "Go",
    "Python",
    "PostgreSQL",
    "monospace web",
  ],
  authors: [{ name: "Arthur Malfere" }],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="fr" className={jetbrainsMono.variable}>
      <body>{children}</body>
    </html>
  );
}
