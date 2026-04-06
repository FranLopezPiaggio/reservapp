"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { DemoConfig } from "@/config/demos";

interface DemoFooterProps {
  config: DemoConfig;
}

export default function DemoFooter({ config }: DemoFooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      id="footer"
      className="py-12"
      style={{ backgroundColor: config.colors.surface }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo & Copyright */}
          <div className="flex flex-col items-center md:items-start gap-2">
            <Link
              href={`/demo/${config.slug}`}
              className="flex items-center gap-2"
            >
              <span
                className="text-xl font-bold"
                style={{
                  fontFamily: "var(--font-heading)",
                  color: config.colors.primary,
                }}
              >
                {config.name}
              </span>
            </Link>
            <p className="text-sm" style={{ color: config.colors.textMuted }}>
              © {currentYear} {config.name}. Todos los derechos reservados.
            </p>
          </div>

          {/* Navigation Links */}
          <nav className="flex items-center gap-6">
            {config.footer.links.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-sm transition-colors duration-200 hover:opacity-80 cursor-pointer"
                style={{ color: config.colors.textSecondary }}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Social Links Placeholder */}
          <div className="flex items-center gap-4">
            {["Instagram", "Twitter", "Facebook"].map((social) => (
              <a
                key={social}
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg hover:opacity-80 transition-colors cursor-pointer"
                style={{ color: config.colors.textSecondary }}
              >
                <span className="text-sm">{social[0]}</span>
              </a>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div
          className="mt-8 pt-8 border-t"
          style={{ borderColor: config.colors.background }}
        >
          <p
            className="text-center text-xs"
            style={{ color: config.colors.textMuted }}
          >
            Desarrollado con EmpreTools
          </p>
        </div>
      </div>
    </footer>
  );
}
