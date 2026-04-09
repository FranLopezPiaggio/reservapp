/**
 * WhatsApp Module
 * 
 * Atomic, reusable module for generating WhatsApp links and messages.
 * 
 * @example
 * ```typescript
 * import { generateWhatsAppLink, formatBookingMessage } from '@/lib/whatsapp';
 * 
 * // Generate booking link
 * const message = formatBookingMessage(bookingData);
 * const link = generateWhatsAppLink({
 *   phone: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER!,
 *   message
 * });
 * 
 * // Open in new tab
 * window.open(link, '_blank');
 * ```
 */

// Types
export type {
  WhatsAppOptions,
  BookingData,
  SimpleMessageOptions,
  ConversionModalOptions,
} from './types';

// Message Builder
export {
  formatBookingMessage,
  formatSimpleMessage,
  formatPhoneNumber,
} from './message-builder';

// Link Generator
export {
  generateWhatsAppLink,
  generateSimpleLink,
  generateBookingLink,
  openWhatsAppLink,
} from './link-generator';
