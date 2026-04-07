/**
 * WhatsApp Module - Link Generator
 * 
 * Generates WhatsApp Web/App URLs with pre-filled messages.
 */

import { WhatsAppOptions, SimpleMessageOptions } from './types';
import { formatSimpleMessage, formatPhoneNumber } from './message-builder';

/**
 * Generate WhatsApp Web URL
 * Opens WhatsApp Web with pre-filled message
 */
export function generateWhatsAppLink(options: WhatsAppOptions): string {
  const { phone, message } = options;
  
  const formattedPhone = formatPhoneNumber(phone);
  const encodedMessage = encodeURIComponent(message);
  
  return `https://wa.me/${formattedPhone}?text=${encodedMessage}`;
}

/**
 * Generate WhatsApp link with simple prefill message
 * Shorthand for conversion CTAs
 */
export function generateSimpleLink(options: SimpleMessageOptions): string {
  const { phone, prefillMessage } = options;
  
  if (!prefillMessage) {
    // Just open chat without message
    const formattedPhone = formatPhoneNumber(phone);
    return `https://wa.me/${formattedPhone}`;
  }
  
  const message = formatSimpleMessage(prefillMessage);
  return generateWhatsAppLink({ phone, message });
}

/**
 * Generate WhatsApp link for booking confirmation
 * Combines booking data into message
 */
export function generateBookingLink(phone: string, message: string): string {
  return generateWhatsAppLink({ phone, message });
}

/**
 * Open WhatsApp in new tab
 */
export function openWhatsAppLink(link: string): void {
  window.open(link, '_blank', 'noopener,noreferrer');
}
