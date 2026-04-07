"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { generateWhatsAppLink, openWhatsAppLink } from "@/lib/whatsapp";

interface ConversionModalProps {
  isOpen: boolean;
  onClose: () => void;
  bookingData: {
    serviceName: string;
    servicePrice: number;
    date: Date;
    time: string;
    customerName: string;
    customerPhone: string;
    customerEmail?: string;
  };
}

const CONVERSION_MESSAGE = "Hola quiero la web con reserva";

export default function ConversionModal({
  isOpen,
  onClose,
  bookingData,
}: ConversionModalProps) {
  const [isWhatsAppReady, setIsWhatsAppReady] = useState(false);

  useEffect(() => {
    // Preload WhatsApp number
    setIsWhatsAppReady(true);
  }, []);

  const handleLetsTalk = () => {
    const phone = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER;
    
    if (!phone) {
      console.error("WhatsApp number not configured");
      return;
    }

    const link = generateWhatsAppLink({
      phone,
      message: CONVERSION_MESSAGE,
    });

    openWhatsAppLink(link);
    onClose();
  };

  const handleNoThanks = () => {
    // Save to localStorage before closing
    saveBookingToLocalStorage();
    onClose();
  };

  const saveBookingToLocalStorage = () => {
    const existingBookings = localStorage.getItem("reservapp_demo_bookings");
    const bookings = existingBookings ? JSON.parse(existingBookings) : [];
    
    bookings.push({
      ...bookingData,
      bookedAt: new Date().toISOString(),
      status: "pending",
    });
    
    localStorage.setItem("reservapp_demo_bookings", JSON.stringify(bookings));
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.6)" }}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 text-center"
          >
            {/* Icon */}
            <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
              <svg className="w-8 h-8 text-green-600" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.48 0 1.517 1.065 2.874 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
            </div>

            {/* Message */}
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              ¡Veo que te interesa esto, Hablemos!
            </h2>
            
            <p className="text-gray-600 mb-8">
              Tu reserva ha sido guardada. ¿Te gustaría hablar con nosotros para obtener tu propia web con sistema de reservas?
            </p>

            {/* Booking Summary */}
            <div 
              className="rounded-lg p-4 mb-6 text-left"
              style={{ backgroundColor: "#f9fafb" }}
            >
              <p className="text-sm text-gray-500 mb-2">Resumen de tu reserva:</p>
              <p className="font-medium text-gray-900">
                {bookingData.serviceName} - {bookingData.date.toLocaleDateString("es-ES")} a las {bookingData.time}
              </p>
              <p className="text-sm text-gray-500">
                {bookingData.customerName} - {bookingData.customerPhone}
              </p>
            </div>

            {/* CTAs */}
            <div className="space-y-3">
              <button
                onClick={handleLetsTalk}
                className="w-full py-3 px-6 rounded-lg font-semibold text-white bg-green-600 hover:bg-green-700 transition-colors flex items-center justify-center gap-2"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.48 0 1.517 1.065 2.874 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                ¡Hablemos! Quiero la web
              </button>
              
              <button
                onClick={handleNoThanks}
                className="w-full py-3 px-6 rounded-lg font-medium text-gray-600 bg-gray-100 hover:bg-gray-200 transition-colors"
              >
                No gracias, terminar aquí
              </button>
            </div>

            <p className="text-xs text-gray-400 mt-4">
              Tu reserva ha sido guardada localmente
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
