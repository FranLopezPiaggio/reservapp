"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function HomeHero() {
  return (
    <section className="pt-10 pb-20 md:pt-40 md:pb-20 px-4"
    style={{
    backgroundImage: "url('/hero-bg.jpg')",
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
  }}>
      <div className="max-w-[800px] mx-auto text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-3 py-1.5 bg-gray-100 rounded-full mb-8"
        >
          <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
          <span className="text-sm font-medium text-gray-600">
            Lo que tu negocio y tiempo estan buscando!          
          </span>
        </motion.div>

        {/* Main Title - Using Geist Mono for headings */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-black leading-[1.1] mb-6 font-heading"
        >
          La web + herramienta que necesitas vos y tu negocio
        </motion.h1>

        {/* Subtitle - Using Montserrat for body */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-lg md:text-xl text-gray-500 max-w-[600px] mx-auto mb-10 leading-relaxed font-body"
        >
          Ahorra tiempo, organizacion y mejora la experiencia de tus clientes.
        </motion.p>

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
        >
          <Link
            href="/auth/register"
            className="px-8 py-3.5 text-base font-semibold text-white bg-black rounded-lg hover:bg-gray-800 transition-all hover:scale-[1.02] cursor-pointer"
          >
            Contactanos
          </Link>
        </motion.div>

        {/* Mockup Image */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="relative"
        >
        </motion.div>
      </div>
    </section>
  );
}