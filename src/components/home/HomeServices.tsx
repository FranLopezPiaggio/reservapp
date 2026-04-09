'use client';

import { motion } from "framer-motion";
import Link from "next/link";

const services = [
  {
    title: "Necesitas Organizar tus turnos",
    description:
      "Web + Reservas + WhatsApp => Sistema de reservas online con calendario interactivo. Tus clientes reservan 24/7 y tú recibes todo en WhatsApp.",
    image: "https://images.unsplash.com/photo-1585747860715-2ba37e788b70?w=600&q=80",
    link: "/reservas",
    badge: "🗓️ Disponible",
  },
  {
    title: "Necesitas un Menu Digital",
    description:
      "Web + Menú Digital + WhatsApp => Menú digital interactivo para restaurantes y cafeterías. Los clientes ven el menú y piden directo por WhatsApp.",
    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=600&q=80",
    link: "/menu",
    badge: "📋 Próximamente",
  },
  {
    title: "Necesitas vender tus servicios/productos",
    description:
      "Web + Tienda Online/Catalogo + WhatsApp => Tu tienda online con catálogo de productos y carrito. Los pedidos se completan por WhatsApp.",
    image: "https://images.unsplash.com/photo-1472851294608-062f824d29ab?w=600&q=80",
    link: "/tienda",
    badge: "🛒 Próximamente",
  }
];

export default function HomeServices() {
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
            Cada uno de tus problemas tiene un herramienta para solucionarlo
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-gray-500 max-w-xl mx-auto"
          >
            Elige la herramienta que mejor se adapte a tu negocio. Cada solución incluye Landing Page + la funcionalidad que necesitás.
          </motion.p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-white rounded-xl overflow-hidden hover:shadow-lg transition-shadow duration-300"
            >
              <Link href={service.link} className="block">
                {/* Image */}
                <div className="h-40 md:h-48 bg-gray-100 relative overflow-hidden">
                  <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-300 hover:scale-105"
                    style={{
                      backgroundImage: `url(${service.image})`,
                    }}
                  />
                  <div className="absolute top-3 right-3">
                    <span className="inline-block px-2 py-1 bg-white/90 backdrop-blur-sm text-xs font-medium rounded-full">
                      {service.badge}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  {/* Title */}
                  <h3 className="text-lg font-semibold text-black mb-2">
                    {service.title}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-500 text-sm leading-relaxed">
                    {service.description}
                  </p>

                  {/* Link Arrow */}
                  <div className="mt-4 flex items-center gap-2 text-sm font-medium text-black">
                    <span>Ver más</span>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}