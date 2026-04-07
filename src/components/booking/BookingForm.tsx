"use client";

import { useState } from "react";
import { motion } from "framer-motion";

interface BookingFormProps {
  serviceName: string;
  servicePrice: number;
  date: Date;
  time: string;
  onSubmit: (data: { name: string; phone: string; email: string }) => void;
  colors: {
    primary: string;
    primaryHover: string;
    secondary: string;
    background: string;
    surface: string;
    text: string;
    textSecondary: string;
    textMuted: string;
    cta: string;
  };
}

export default function BookingForm({
  serviceName,
  servicePrice,
  date,
  time,
  onSubmit,
  colors,
}: BookingFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.phone.trim()) return;

    setIsSubmitting(true);
    
    // Small delay for UX
    await new Promise(resolve => setTimeout(resolve, 500));
    
    onSubmit(formData);
    setIsSubmitting(false);
  };

  const formatDate = (d: Date): string => {
    return d.toLocaleDateString("es-ES", {
      weekday: "long",
      day: "numeric",
      month: "long",
    });
  };

  const isValid = formData.name.trim().length > 0 && formData.phone.trim().length > 0;

  return (
    <section className="py-16" style={{ backgroundColor: colors.surface }}>
      <div className="max-w-xl mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-8">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-3xl font-bold mb-4"
            style={{ color: colors.text }}
          >
            Completa tu Reserva
          </motion.h2>
        </div>

        {/* Booking Summary */}
        <div 
          className="rounded-xl p-6 mb-8"
          style={{ backgroundColor: colors.background }}
        >
          <h3 className="text-sm font-medium mb-4" style={{ color: colors.textMuted }}>
            Resumen de la reserva
          </h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span style={{ color: colors.textSecondary }}>Servicio</span>
              <span className="font-medium" style={{ color: colors.text }}>{serviceName}</span>
            </div>
            <div className="flex justify-between">
              <span style={{ color: colors.textSecondary }}>Fecha</span>
              <span className="font-medium" style={{ color: colors.text }}>{formatDate(date)}</span>
            </div>
            <div className="flex justify-between">
              <span style={{ color: colors.textSecondary }}>Hora</span>
              <span className="font-medium" style={{ color: colors.text }}>{time}</span>
            </div>
            <div className="flex justify-between pt-3 border-t border-gray-200">
              <span style={{ color: colors.textSecondary }}>Total</span>
              <span className="text-xl font-bold" style={{ color: colors.primary }}>{servicePrice}€</span>
            </div>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label 
              className="block text-sm font-medium mb-2"
              style={{ color: colors.textSecondary }}
            >
              Nombre completo *
            </label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2"
              style={{ 
                borderColor: colors.primary + "20",
                '--tw-ring-color': colors.primary 
              } as React.CSSProperties}
              placeholder="Juan Pérez"
            />
          </div>

          <div>
            <label 
              className="block text-sm font-medium mb-2"
              style={{ color: colors.textSecondary }}
            >
              Teléfono *
            </label>
            <input
              type="tel"
              required
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2"
              style={{ 
                borderColor: colors.primary + "20",
                '--tw-ring-color': colors.primary 
              } as React.CSSProperties}
              placeholder="+34 612 345 678"
            />
          </div>

          <div>
            <label 
              className="block text-sm font-medium mb-2"
              style={{ color: colors.textSecondary }}
            >
              Email (opcional)
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2"
              style={{ 
                borderColor: colors.primary + "20",
                '--tw-ring-color': colors.primary 
              } as React.CSSProperties}
              placeholder="juan@email.com"
            />
          </div>

          <button
            type="submit"
            disabled={!isValid || isSubmitting}
            className="w-full py-4 rounded-lg font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            style={{ 
              backgroundColor: colors.primary,
              color: "#ffffff",
            }}
          >
            {isSubmitting ? "Reservando..." : "Confirmar Reserva"}
          </button>
        </form>
      </div>
    </section>
  );
}
