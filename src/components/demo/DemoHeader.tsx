"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { DemoConfig } from "@/config/demos";

interface DemoHeaderProps {
  config: DemoConfig;
}

export default function DemoHeader({ config }: DemoHeaderProps) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-4 left-4 right-4 z-50 transition-all duration-300 rounded-2xl ${
        scrolled ? "bg-white/95 backdrop-blur-md shadow-lg" : "bg-transparent"
      }`}
      style={scrolled ? { backgroundColor: `${config.colors.surface}dd` } : {}}
    >
      <div className="max-w-7xl mx-auto ml-8 px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link
            href={`/demo/${config.slug}`}
            className="flex items-center gap-2"
          >
            <span
              className="text-xl font-bold font-heading"
              style={{
                color: config.colors.primary,
              }}
            >
              {config.name}
            </span>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            <Link
              href="#services"
              className="text-sm font-medium transition-colors duration-200 hover:opacity-80 cursor-pointer"
              style={{ color: config.colors.text }}
            >
              Servicios
            </Link>
            <Link
              href="#services"
              className="text-sm font-medium transition-colors duration-200 hover:opacity-80 cursor-pointer"
              style={{ color: config.colors.text }}
            >
              Reservar
            </Link>
            <Link
              href="#footer"
              className="text-sm font-medium transition-colors duration-200 hover:opacity-80 cursor-pointer"
              style={{ color: config.colors.text }}
            >
              Contacto
            </Link>
            <Link
              href="#services"
              className="px-5 py-2.5 rounded-xl font-semibold text-white transition-all duration-200 hover:opacity-90 cursor-pointer"
              style={{ backgroundColor: config.colors.cta }}
            >
              Reservar Ahora
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-lg hover:opacity-80 transition-colors cursor-pointer"
            style={{ color: config.colors.text }}
            aria-label="Toggle menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
}
