"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { generateWhatsAppLink, openWhatsAppLink } from "@/lib/whatsapp";

const WHATSAPP_MESSAGE = "Hola, estoy interesado en Empretools";

export default function Home2Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleWhatsAppClick = () => {
    const phone = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER;
    
    if (!phone) {
      console.error("WhatsApp number not configured");
      return;
    }

    const link = generateWhatsAppLink({
      phone,
      message: WHATSAPP_MESSAGE,
    });

    openWhatsAppLink(link);
  };

  const navLinks = [
    { label: "Por que?", href: "#why" },
    { label: "Reservas", href: "/reservas" },
    { label: "Menus", href: "/menus" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-white/95 backdrop-blur-sm shadow-sm" : "bg-white"
      }`}
    >
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="text-xl font-bold text-black">
            EmpreTools
          </Link>

          {/* Desktop Navigation - Centered */}
          <nav className="hidden md:flex items-center gap-8 ml-[-100px]">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-gray-500 hover:text-black transition-colors cursor-pointer"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Auth Buttons - Right */}
          <div className="flex items-center gap-4">
            {/* WhatsApp Button */}
            <button
              onClick={handleWhatsAppClick}
              className="hover:opacity-80 transition-opacity cursor-pointer"
              aria-label="Contactar por WhatsApp"
            >
              <Image src="/whatsapp.svg" alt="WhatsApp" width={40} height={40}/>
            </button>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {mobileMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t">
            <nav className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm font-medium text-gray-600 hover:text-black transition-colors cursor-pointer"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <button
                onClick={() => {
                  handleWhatsAppClick();
                  setMobileMenuOpen(false);
                }}
                className="text-sm font-medium text-gray-600 hover:text-black transition-colors cursor-pointer text-left"
              >
                Contactar
              </button>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}