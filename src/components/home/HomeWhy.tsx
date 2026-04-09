"use client";

import { motion } from "framer-motion";
import Image from "next/image";

import ClockSvg from "@/assets/svg/clock-three-svgrepo-com.svg"
import CredibilitySvg from "@/assets/svg/check-all-big-svgrepo-com.svg"
import MarketingSvg from "@/assets/svg/monitor-trend-svgrepo-com.svg"

const benefits = [
  {
    emoji: ClockSvg,
    title: "Disponibilidad 24/7",
    description: "Tu negocio siempre abierto, sin importar la hora ni el día.",
  },
  {
    emoji: CredibilitySvg ,
    title: "Credibilidad",
    description: "Una web profesional genera confianza en tus clientes.",
  },
  {
    emoji: MarketingSvg,
    title: "Marketing",
    description: "Atrae nuevos clientes y fideliza a los existentes.",
  },
];

export default function HomeWhy() {
  return (
    <section className="py-16 md:py-24 px-4 bg-gray-50" id="why">
      <div className="max-w-5xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-black mb-4 font-accent">
            ¿Por qué necesito una web?
          </h2>
          <hr className="w-1/2 mx-auto border-yellow-500" />
          <p className="text-gray-500 max-w-lg pt-4 mx-auto">
            Tres razones fundamentales para digitalizar tu negocio
          </p>
        </motion.div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {benefits.map((benefit, index) => (
            <motion.div
              key={benefit.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              className="relative"
            >
              {/* Shaded background layer */}
              <div className="absolute inset-0 bg-gradient-to-br from-gray-200 to-gray-300 rounded-2xl transform translate-y-2 translate-x-1" />
              
              {/* Main card */}
              <div className="relative bg-white rounded-2xl p-6 h-full hover:translate-y-[-4px] transition-transform duration-300">
                {/* Emoji Icon */}
                <div className="text-4xl mb-4">
                  <Image src={benefit.emoji} alt={benefit.title} width={50} height={50} />
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold text-black mb-3 font-heading">
                  {benefit.title}
                </h3>

                {/* Description */}
                <p className="text-gray-500 text-sm leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}