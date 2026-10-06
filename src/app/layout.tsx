import type { Metadata } from "next";
import { Figtree } from "next/font/google";
import "./globals.css";

// Figtree: free, closest match to Fontana's Proxima Nova (which is a paid font)
const figtree = Figtree({
  variable: "--font-figtree",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "Marvel Fountains | Premium Water Fountains",
  description:
    "Marvel Fountains designs, manufactures and installs premium indoor & outdoor fountains — engineered for silence, built for permanence.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="hi" className={figtree.variable}>
      <body className="font-sans antialiased">
        {children}
      </body>
    </html>
  );
}
