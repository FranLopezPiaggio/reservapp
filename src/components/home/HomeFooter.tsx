"use client";

import Link from "next/link";

export default function Home2Footer() {
  const links = [
    { label: "Privacy", href: "/privacy" },
    { label: "Terms", href: "/terms" },
    { label: "Contact", href: "/contact" },
    // { label: "Twitter", href: "https://twitter.com" },
    // { label: "GitHub", href: "https://github.com" },
  ];

  return (
    <footer className="py-10 md:py-10 px-4 bg-black border-t border-gray-100">
      <div className="max-w-[1200px] mx-auto">
        {/* Logo */}
        <div className="mb-8">
          <Link href="/" className="text-xl font-bold text-white">
            EmpreTools
          </Link>
        </div>

        {/* Links */}
        <div className="flex flex-wrap items-center justify-center gap-4 md:gap-6 mb-8">
          {links.map((link, index) => (
            <Link
              key={link.label}
              href={link.href}
              target={link.href.startsWith("http") ? "_blank" : undefined}
              rel={
                link.href.startsWith("http") ? "noopener noreferrer" : undefined
              }
              className="text-sm text-gray-500 hover:text-black transition-colors cursor-pointer"
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Copyright */}
        <p className="text-center text-sm text-gray-400">
          © {new Date().getFullYear()} EmpreTools. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
