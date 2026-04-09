/**
 * WhatsApp Module - Message Builder
 * 
 * Formats booking data and messages for WhatsApp.
 */

import { BookingData } from './types';

/**
 * Format a complete booking message
 * Used when sending full booking details
 */
export function formatBookingMessage(data: BookingData): string {
  const parts = [
    `¡Hola! Quiero reservar en ${data.serviceName}`,
    `Fecha: ${formatDate(data.date)}`,
    `Hora: ${data.time}`,
    `Cliente: ${data.customerName}`,
    `Teléfono: ${data.customerPhone}`,
  ];

  if (data.customerEmail) {
    parts.push(`Email: ${data.customerEmail}`);
  }

  if (data.servicePrice) {
    parts.push(`Precio: ${data.servicePrice}$`);
  }

  return parts.join('\n');
}

/**
 * Format a simple prefill message
 * Used for conversion CTA
 */
export function formatSimpleMessage(message: string): string {
  return message.trim();
}

/**
 * Format date for display (Spanish format)
 */
function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString('es-ES', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

/**
 * Format phone number to remove non-digits
 */
export function formatPhoneNumber(phone: string): string {
  return phone.replace(/\D/g, '');
}
