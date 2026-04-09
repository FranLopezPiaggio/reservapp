/**
 * WhatsApp Module - TypeScript Interfaces
 * 
 * Atomic types for booking and WhatsApp message generation.
 */

export interface WhatsAppOptions {
  phone: string;
  message: string;
}

export interface BookingData {
  serviceName: string;
  servicePrice?: number;
  date: string;
  time: string;
  customerName: string;
  customerPhone: string;
  customerEmail?: string;
}

export interface SimpleMessageOptions {
  phone: string;
  prefillMessage?: string;
}

export interface ConversionModalOptions {
  phone: string;
  title?: string;
  message?: string;
  ctaText?: string;
}
