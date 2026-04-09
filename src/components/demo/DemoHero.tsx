"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { DemoConfig } from "@/config/demos";

interface DemoHeroProps {
  config: DemoConfig;
}

export default function DemoHero({ config }: DemoHeroProps) {
  return (
    <section
      className="relative h-screen w-full bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.5)), url(${config.hero.backgroundImage})`,
      }}
    >
      {/* Content Overlay */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 font-heading"
          >
            {config.hero.headline}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="text-lg md:text-xl text-white/90 mb-8 max-w-2xl mx-auto font-body"
          >
            {config.hero.subtext}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          >
            <Link
              href="#services"
              className="inline-block px-8 py-4 text-lg font-semibold text-white rounded-2xl transition-all duration-300 hover:scale-105 hover:shadow-xl cursor-pointer"
              style={{
                backgroundColor: config.colors.cta,
              }}
            >
              {config.hero.ctaText}
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          className="w-6 h-10 rounded-full border-2 border-white/50 flex justify-center pt-2"
        >
          <div className="w-1.5 h-3 bg-white/70 rounded-full" />
        </motion.div>
      </motion.div>
    </section>
  );
}
