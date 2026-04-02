"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { DemoConfig } from "@/config/demos";
import BookingModal from "@/components/BookingModal";

interface DemoBookingProps {
  config: DemoConfig;
}

interface BookingData {
  date: Date;
  time: string;
  name: string;
  email: string;
  notes: string;
}

export default function DemoBooking({ config }: DemoBookingProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [lastBooking, setLastBooking] = useState<BookingData | null>(null);

  const handleBookingConfirm = (
    date: Date,
    time: string,
    name: string,
    email: string,
    notes: string,
  ) => {
    const newBooking: BookingData = { date, time, name, email, notes };
    setLastBooking(newBooking);
    console.log("Nueva reserva:", newBooking);
  };

  return (
    <section
      id="booking"
      className="py-24"
      style={{ backgroundColor: config.colors.surface }}
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
              color: config.colors.text,
            }}
          >
            {config.booking.title}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-lg max-w-2xl mx-auto"
            style={{ color: config.colors.textSecondary }}
          >
            {config.booking.subtitle}
          </motion.p>
        </div>

        {/* Booking Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-xl mx-auto"
        >
          <div
            className="rounded-2xl p-8 text-center"
            style={{
              backgroundColor: config.colors.background,
              boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
            }}
          >
            {/* Icon */}
            <div
              className="w-16 h-16 mx-auto mb-6 rounded-full flex items-center justify-center"
              style={{
                backgroundColor: config.colors.surface,
                color: config.colors.primary,
              }}
            >
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
            </div>

            <h3
              className="text-xl font-bold mb-3"
              style={{
                fontFamily: "var(--font-heading)",
                color: config.colors.text,
              }}
            >
              Reserva Online
            </h3>
            <p className="mb-6" style={{ color: config.colors.textSecondary }}>
              Selecciona una fecha y hora disponibles. Te enviaremos una
              confirmación por correo.
            </p>

            <button
              onClick={() => setIsModalOpen(true)}
              className="px-8 py-3 rounded-xl font-semibold text-white transition-all duration-200 hover:scale-105 hover:shadow-lg cursor-pointer"
              style={{ backgroundColor: config.colors.cta }}
            >
              {config.booking.ctaText}
            </button>
          </div>

          {/* Booking Confirmation */}
          {lastBooking && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-8 p-6 rounded-2xl text-center"
              style={{
                backgroundColor: config.colors.surface,
                border: `2px solid ${config.colors.primary}`,
              }}
            >
              <p
                className="font-semibold mb-2"
                style={{ color: config.colors.primary }}
              >
                ¡Reserva confirmada! 🎉
              </p>
              <p style={{ color: config.colors.textSecondary }}>
                {lastBooking.name} —{" "}
                {lastBooking.date.toLocaleDateString("es-ES")} a las{" "}
                {lastBooking.time}
              </p>
            </motion.div>
          )}
        </motion.div>
      </div>

      {/* Booking Modal */}
      <BookingModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleBookingConfirm}
        selectedService={config.name}
      />
    </section>
  );
}
