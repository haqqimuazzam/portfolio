import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Haqqi Muazzam — Web Developer & Vibe Engineer",
  description:
    "Portfolio of Haqqi Muazzam, an independent web developer and vibe engineer from Sukabumi, Indonesia.",
  openGraph: {
    title: "Haqqi Muazzam — Web Developer & Vibe Engineer",
    description: "I turn curious ideas into websites with AI agents.",
    type: "website",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="id">
      <body>{children}</body>
    </html>
  );
}
