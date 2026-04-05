'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

export default function MenuPage() {
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
              📋 Próximamente
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold text-black mb-6"
          >
            Menú Digital + WhatsApp
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl text-gray-500 max-w-2xl mx-auto mb-8"
          >
            Comparte tu menú digital y recibe pedidos directamente por WhatsApp. 
            Perfecto para restaurantes, cafeterías y food trucks.
          </motion.p>

          {/* Coming Soon Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="inline-flex items-center gap-2 px-6 py-3 bg-gray-100 rounded-lg"
          >
            <span className="text-2xl">🚧</span>
            <span className="font-medium text-gray-600"> Lanzamiento: Tercer Trimestre 2026</span>
          </motion.div>
        </div>
      </section>

      {/* Features Preview */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold text-black text-center mb-4">
            ¿Qué incluirá?
          </h2>
          <p className="text-gray-500 text-center mb-12">
            La forma más fácil de mostrar tu menú online
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: '🍽️',
                title: 'Menú Digital',
                description: 'Crea tu menú con categorías, platos, precios y fotos.',
              },
              {
                icon: '📲',
                title: 'Pedido por WhatsApp',
                description: 'Tus clientes ordenan y el pedido llega directo a tu WhatsApp.',
              },
              {
                icon: '📱',
                title: 'Comparte Fácil',
                description: 'Envía el enlace a tus clientes o genera un código QR.',
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

      {/* Notify Me */}
      <section className="py-20 px-4">
        <div className="max-w-xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-black mb-4">
            ¿Quieres ser el primero en saber?
          </h2>
          <p className="text-gray-500 mb-8">
            Déjanos tu email y te avisaremos cuando lancemos esta función.
          </p>
          
          <form className="flex flex-col sm:flex-row gap-4">
            <input
              type="email"
              placeholder="Tu email"
              className="flex-1 px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-black"
            />
            <button
              type="submit"
              className="px-6 py-3 bg-black text-white font-semibold rounded-lg hover:bg-gray-800 transition-all"
            >
              Notificarme
            </button>
          </form>
        </div>
      </section>

      {/* Back to Home */}
      <section className="py-12 px-4 border-t border-gray-100">
        <div className="text-center">
          <Link href="/" className="text-gray-500 hover:text-black transition-colors">
            ← Volver al inicio
          </Link>
        </div>
      </section>
    </main>
  );
}