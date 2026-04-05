'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

export default function ReservasPage() {
  const demos = [
    {
      slug: 'barberia',
      name: 'Barbería',
      tagline: 'Estilo y tradición',
      image: 'https://images.unsplash.com/photo-1585747860715-2ba37e788b70?w=600&q=80',
      description: 'Sistema de reservas para barberías con gestión de clientes y horarios.',
    },
    {
      slug: 'salon-belleza',
      name: 'Salón de Belleza',
      tagline: 'Tu momento de relax',
      image: 'https://images.unsplash.com/photo-1560066984-138dadbdb983?w=600&q=80',
      description: 'Plataforma integral para salones de belleza y spas.',
    },
    {
      slug: 'cancha-futbol',
      name: 'Cancha de Fútbol',
      tagline: 'Reserva tu partido',
      image: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=600&q=80',
      description: 'Alquila canchas de fútbol 5 y 7 con reserva online.',
    },
  ];

  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="py-24 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block px-4 py-1.5 bg-black text-white text-sm font-medium rounded-full mb-6">
              🗓️ Sistema de Reservas
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold text-black mb-6"
          >
            Sistema de Reservas Online
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl text-gray-500 max-w-2xl mx-auto mb-8"
          >
            Acepta reservas 24/7, gestiona tu agenda automáticamente y reduce cancelaciones 
            con recordatorios automáticos.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link
              href="/reservas/demo/barberia"
              className="px-6 py-3 bg-black text-white font-semibold rounded-lg hover:bg-gray-800 transition-all cursor-pointer"
            >
              Ver Demo
            </Link>
            <Link
              href="/auth/register"
              className="px-6 py-3 border border-gray-200 text-gray-600 font-medium rounded-lg hover:border-gray-300 hover:bg-gray-50 transition-all cursor-pointer"
            >
              Empezar Gratis
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold text-black text-center mb-12">
            ¿Qué incluye el sistema de reservas?
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: '📅',
                title: 'Calendario Interactivo',
                description: 'Tus clientes reservan en tiempo real viendo disponibilidad.',
              },
              {
                icon: '📱',
                title: 'Notificaciones WhatsApp',
                description: 'Confirmanción instantánea y recordatorios por WhatsApp.',
              },
              {
                icon: '📊',
                title: 'Dashboard Profesional',
                description: 'Gestiona clientes, reservas y analiza tu negocio.',
              },
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-xl p-6 text-center"
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-lg font-semibold text-black mb-2">{feature.title}</h3>
                <p className="text-gray-500 text-sm">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Demos */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold text-black text-center mb-4">
            Explora nuestras plantillas
          </h2>
          <p className="text-gray-500 text-center mb-12">
            Demos listos para diferentes industrias
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {demos.map((demo, index) => (
              <motion.div
                key={demo.slug}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group rounded-xl overflow-hidden border border-gray-100 hover:shadow-lg transition-all cursor-pointer"
              >
                <Link href={`/reservas/demo/${demo.slug}`}>
                  <div className="h-48 bg-gray-100 relative overflow-hidden">
                    <div
                      className="absolute inset-0 bg-cover bg-center transition-transform duration-300 group-hover:scale-105"
                      style={{ backgroundImage: `url(${demo.image})` }}
                    />
                    <div className="absolute inset-0 bg-black/20" />
                  </div>
                  <div className="p-6">
                    <h3 className="text-lg font-bold text-black mb-1">{demo.name}</h3>
                    <p className="text-sm text-gray-500 mb-3">{demo.tagline}</p>
                    <p className="text-sm text-gray-600">{demo.description}</p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4 bg-black">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-white mb-4">
            ¿Listo para empezar?
          </h2>
          <p className="text-gray-300 mb-8">
            Crea tu cuenta gratis y comienza a aceptar reservas hoy mismo.
          </p>
          <Link
            href="/auth/register"
            className="inline-block px-8 py-3 bg-white text-black font-semibold rounded-lg hover:bg-gray-100 transition-all cursor-pointer"
          >
            Crear Cuenta Gratis
          </Link>
        </div>
      </section>
    </main>
  );
}