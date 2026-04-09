import type { Metadata } from "next";
import { Geist_Mono, Montserrat, Playfair_Display } from "next/font/google";
import "./globals.css";

/**
 * Font Configuration - Using next/font for performance
 * 
 * - Geist Mono: Headings (--font-heading)
 * - Montserrat: Body text (--font-body) 
 * - Playfair Display: Accents/special (--font-accent)
 */

const geistMono = Geist_Mono({
  variable: "--font-heading",
  subsets: ["latin"],
  display: "swap",
});

const montserrat = Montserrat({
  variable: "--font-body",
  subsets: ["latin"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-accent",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "EmpreTools - Herramientas para tu negocio",
  description: "Plataforma SaaS para gestión de reservas, menús y tiendas online",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${geistMono.variable} ${montserrat.variable} ${playfair.variable}`}
    >
      <body className="min-h-full flex flex-col font-sans">
        {children}
      </body>
    </html>
  );
}