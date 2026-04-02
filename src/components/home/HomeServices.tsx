"use client";

import { motion } from "framer-motion";
import { link } from "fs";

const services = [
  {
    title: "Landing Page + Reservas + Whastapp",
    description:
      "Tus clientes pueden reservar sus turnos de forma automatica y vos solo los recibis en tu calendario.",
    image:
      "",
    link: "/reserva/demo",
  },
  {
    title: "Landing + Menú/Catalogo + WhatsApp Order",
    description:
      "Mostra tu menu, productos y recibi pedidos directamente en tu WhatsApp.",
    image:
      "",
    link: "/catalogo/demo",
  },
  {
    title: "Landing + Servicios + Contacto WP",
    description:
      'Mostra tus servicios, que el cliente conozca mejor lo que haces y se contacte con vos',
    image:
      "",
    link: "/servicios/demo",
  },
  {
    title: "Landing + Catálogo + Carrito + WP Checkout",
    description:
      "Tu tienda online lista para recibir pedidos.",
    image:
      "",
    link: "/tienda/demo",
  },
];

export default function Home2Services() {
  return (
    <section id="services" className="py-24 md:py-32 px-4 bg-gray-50">
      <div className="max-w-[1200px] mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-4xl font-bold text-black mb-4"
          >
            La herramienta que necesitas para tu negocio
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-gray-500 max-w-xl mx-auto"
          >
            Tener tu web ya es obvio, pero ahora podemos sumarle la herramienta que mejor se adapte a tu negocio.
          </motion.p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-4 md:grid-cols-4 gap-6 md:gap-8">
          {services.map((service, index) => (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-white rounded-xl p-8 hover:shadow-lg transition-shadow duration-300 cursor-pointer"
              style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.05)" }}
            >
              {/* Title */}
              <h3 className="text-xl font-semibold text-black mb-3">
                {service.title}
              </h3>

              {/* Description */}
              <p className="text-gray-500 text-sm leading-relaxed mb-6">
                {service.description}
              </p>

              {/* Image */}
              <div className="rounded-lg overflow-hidden">
                <div
                  className="h-32 md:h-40 bg-gray-100"
                  style={{
                    backgroundImage: `url(${service.image})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
