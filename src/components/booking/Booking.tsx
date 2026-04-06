"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import BookingModal from "./BookingModal";

interface BookingProps {
  calUsername?: string;
  calEventType?: string;
  calUrl?: string;
}

interface BookingData {
  date: Date;
  time: string;
  name: string;
  email: string;
  notes: string;
}

export default function Booking({}: BookingProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [bookings, setBookings] = useState<BookingData[]>([]);
  const [lastBooking, setLastBooking] = useState<BookingData | null>(null);

  const handleBookingConfirm = (
    date: Date,
    time: string,
    name: string,
    email: string,
    notes: string,
  ) => {
    const newBooking: BookingData = { date, time, name, email, notes };
    setBookings([...bookings, newBooking]);
    setLastBooking(newBooking);

    // In production, you would send this to your backend/API
    console.log("Nueva reserva:", newBooking);
  };

  return (
    <section
      id="booking"
      className="py-24"
      style={{ backgroundColor: "var(--color-surface)" }}
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
            Reserve su Cita
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-lg max-w-2xl mx-auto"
            style={{ color: "var(--color-text-secondary)" }}
          >
            Elija el servicio y horario que mejor se adapte a sus necesidades
          </motion.p>
        </div>

        {/* Booking Content */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-xl mx-auto"
        >
          {/* CTA Card */}
          <div
            className="rounded-2xl p-8 text-center"
            style={{
              backgroundColor: "var(--color-background)",
              boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
            }}
          >
            {/* Icon */}
            <div
              className="w-16 h-16 mx-auto mb-6 rounded-full flex items-center justify-center"
              style={{
                backgroundColor: "var(--color-surface)",
                color: "var(--color-primary)",
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
                color: "var(--color-text)",
              }}
            >
              Reserva Online
            </h3>
            <p
              className="mb-6"
              style={{ color: "var(--color-text-secondary)" }}
            >
              Selecciona una fecha y hora disponibles. Te enviaremos una
              confirmación por correo electrónico.
            </p>

            {/* Features */}
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              <div className="flex items-center gap-2 text-sm">
                <svg
                  className="w-4 h-4"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  style={{ color: "var(--color-primary)" }}
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
                <span style={{ color: "var(--color-text-secondary)" }}>
                  Confirmación instantánea
                </span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <svg
                  className="w-4 h-4"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  style={{ color: "var(--color-primary)" }}
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
                <span style={{ color: "var(--color-text-secondary)" }}>
                  Recordatorios por email
                </span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <svg
                  className="w-4 h-4"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  style={{ color: "var(--color-primary)" }}
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
                <span style={{ color: "var(--color-text-secondary)" }}>
                  Gestión fácil
                </span>
              </div>
            </div>

            {/* Book Now Button */}
            <button
              onClick={() => setIsModalOpen(true)}
              className="px-8 py-3 rounded-xl font-semibold text-white transition-all duration-200 hover:scale-105 hover:shadow-lg cursor-pointer"
              style={{ backgroundColor: "var(--color-cta)" }}
            >
              Reservar Ahora
            </button>
          </div>

          {/* Current Booking (Demo) */}
          {lastBooking && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-8 p-6 rounded-2xl text-center"
              style={{
                backgroundColor: "var(--color-surface)",
                border: "2px solid var(--color-primary)",
              }}
            >
              <p
                className="font-semibold mb-2"
                style={{ color: "var(--color-primary)" }}
              >
                ¡Reserva confirmada! 🎉
              </p>
              <p style={{ color: "var(--color-text-secondary)" }}>
                {lastBooking.name} —{" "}
                {lastBooking.date.toLocaleDateString("es-ES")} a las{" "}
                {lastBooking.time}
              </p>
              <p
                className="text-sm mt-2"
                style={{ color: "var(--color-text-muted)" }}
              >
                Revisa tu correo: {lastBooking.email}
              </p>
            </motion.div>
          )}

          {/* Alternative: Cal.com Link (for future) */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-center mt-8"
          >
            <p
              className="text-sm mb-2"
              style={{ color: "var(--color-text-muted)" }}
            >
              ¿Prefiere usar nuestro calendario externo?
            </p>
            <a
              href="https://wa.me/5492324511751"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm underline hover:no-underline transition-colors"
              style={{ color: "var(--color-text-secondary)" }}
            >
              Hablanos por Whatsapp
            </a>
          </motion.div>
        </motion.div>
      </div>

      {/* Booking Modal */}
      <BookingModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleBookingConfirm}
        selectedService="Reserva General"
      />
    </section>
  );
}
