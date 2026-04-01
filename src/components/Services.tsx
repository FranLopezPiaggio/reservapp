"use client";

import { motion } from "framer-motion";

interface Service {
  icon: string;
  title: string;
  description: string;
}

const services: Service[] = [
  {
    icon: "calendar",
    title: "Reservas Online",
    description:
      "Tus clientes pueden reservar las 24 horas del día, los 7 días de la semana. Sin llamadas, sin esperas.",
  },
  {
    icon: "clock",
    title: "Gestión de Tiempo",
    description:
      "Organiza tu agenda de forma inteligente. Evita sobreposiciones y optimiza tu tiempo.",
  },
  {
    icon: "chart",
    title: "Análisis y Reportes",
    description:
      "Conoce el comportamiento de tus reservas. Estadísticas detalladas para mejorar tu negocio.",
  },
];

const iconMap: Record<string, React.ReactNode> = {
  calendar: (
    <svg
      className="w-8 h-8"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
      />
    </svg>
  ),
  clock: (
    <svg
      className="w-8 h-8"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
  ),
  chart: (
    <svg
      className="w-8 h-8"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
      />
    </svg>
  ),
};

export default function Services() {
  return (
    <section
      id="services"
      className="py-24"
      style={{ backgroundColor: "var(--color-background)" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-4xl font-bold mb-4"
            style={{
              fontFamily: "var(--font-heading)",
              color: "var(--color-text)",
            }}
          >
            Nuestros Servicios
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-lg max-w-2xl mx-auto"
            style={{ color: "var(--color-text-secondary)" }}
          >
            Todo lo que necesitas para gestionar tu negocio de forma eficiente
          </motion.p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group bg-white rounded-2xl p-8 cursor-pointer transition-all duration-300 hover:-translate-y-2"
              style={{
                boxShadow:
                  "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow =
                  "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow =
                  "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1)";
              }}
            >
              {/* Icon */}
              <div
                className="w-14 h-14 rounded-xl flex items-center justify-center mb-6 transition-colors duration-300"
                style={{
                  backgroundColor: "var(--color-background)",
                  color: "var(--color-primary)",
                }}
              >
                {iconMap[service.icon]}
              </div>

              {/* Title */}
              <h3
                className="text-xl font-bold mb-3"
                style={{
                  fontFamily: "var(--font-heading)",
                  color: "var(--color-text)",
                }}
              >
                {service.title}
              </h3>

              {/* Description */}
              <p
                className="text-base leading-relaxed"
                style={{ color: "var(--color-text-secondary)" }}
              >
                {service.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
