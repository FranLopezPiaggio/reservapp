/**
 * Demo Data Loader
 * 
 * Loads and processes demo configuration data.
 * Provides utilities for booking slot generation.
 */

// =============================================================================
// Types
// =============================================================================

export interface DemoColors {
  primary: string;
  primaryHover: string;
  secondary: string;
  background: string;
  surface: string;
  text: string;
  textSecondary: string;
  textMuted: string;
  cta: string;
}

export interface DemoHero {
  backgroundImage: string;
  headline: string;
  subtext: string;
  ctaText: string;
}

export interface DemoServiceItem {
  id: string;
  icon: string;
  title: string;
  description: string;
  duration: number;
  price: number;
}

export interface DemoServices {
  title: string;
  subtitle: string;
  items: DemoServiceItem[];
}

export interface WorkingHoursDay {
  isOpen: boolean;
  open?: string;
  close?: string;
  slotDuration?: number;
}

export interface DemoWorkingHours {
  monday: WorkingHoursDay;
  tuesday: WorkingHoursDay;
  wednesday: WorkingHoursDay;
  thursday: WorkingHoursDay;
  friday: WorkingHoursDay;
  saturday: WorkingHoursDay;
  sunday: WorkingHoursDay;
}

export interface DemoBooking {
  title: string;
  subtitle: string;
  ctaText: string;
}

export interface DemoFooterLink {
  label: string;
  href: string;
}

export interface DemoFooter {
  links: DemoFooterLink[];
}

export interface DemoConfig {
  slug: string;
  category: string;
  name: string;
  tagline: string;
  description: string;
  colors: DemoColors;
  hero: DemoHero;
  services: DemoServices;
  workingHours: DemoWorkingHours;
  booking: DemoBooking;
  footer: DemoFooter;
}

export interface TimeSlot {
  time: string;
  available: boolean;
}

export interface BookedSlots {
  [dateKey: string]: string[]; // "2026-04-07": ["10:00", "11:00"]
}

// =============================================================================
// Demo Data
// =============================================================================

const barberiaData: DemoConfig = {
  slug: "barberia",
  category: "reservas",
  name: "Barbería Moderno",
  tagline: "Estilo y tradición",
  description: "Tu barbería de confianza con los mejores profesionales",
  colors: {
    primary: "#1a1a1a",
    primaryHover: "#333333",
    secondary: "#c9a227",
    background: "#fafafa",
    surface: "#ffffff",
    text: "#1a1a1a",
    textSecondary: "#4a4a4a",
    textMuted: "#888888",
    cta: "#c9a227",
  },
  hero: {
    backgroundImage: "https://images.unsplash.com/photo-1585747860715-2ba37e788b70?w=1920&q=80",
    headline: "Tu estilo, nuestra pasión",
    subtext: "Cortes de pelo, afeitados y tratamientos especializados para el hombre moderno",
    ctaText: "Reservar Ahora",
  },
  services: {
    title: "Nuestros Servicios",
    subtitle: "Todo lo que necesitas para verte increíble",
    items: [
      {
        id: "1",
        icon: "scissors",
        title: "Corte de Pelo",
        description: "Cortes clásicos y modernos realizados por profesionales con años de experiencia.",
        duration: 30,
        price: 25,
      },
      {
        id: "2",
        icon: "sparkles",
        title: "Afeitado Tradicional",
        description: "Afeitado con navaja caliente, toalla caliente y productos premium.",
        duration: 30,
        price: 20,
      },
      {
        id: "3",
        icon: "star",
        title: "Tratamientos Capilares",
        description: "Mascarillas, masajes capilares y tratamientos especializados para tu cabello.",
        duration: 45,
        price: 35,
      },
    ],
  },
  workingHours: {
    monday: { isOpen: true, open: "09:00", close: "18:00", slotDuration: 60 },
    tuesday: { isOpen: true, open: "09:00", close: "18:00", slotDuration: 60 },
    wednesday: { isOpen: true, open: "09:00", close: "18:00", slotDuration: 60 },
    thursday: { isOpen: true, open: "09:00", close: "18:00", slotDuration: 60 },
    friday: { isOpen: true, open: "09:00", close: "18:00", slotDuration: 60 },
    saturday: { isOpen: true, open: "09:00", close: "14:00", slotDuration: 60 },
    sunday: { isOpen: false },
  },
  booking: {
    title: "Reserva tu Cita",
    subtitle: "Elige el servicio y horario que mejor te convenga",
    ctaText: "Reservar Cita",
  },
  footer: {
    links: [
      { label: "Servicios", href: "#services" },
      { label: "Reservar", href: "#booking" },
      { label: "Contacto", href: "#footer" },
    ],
  },
};

const salonBellezaData: DemoConfig = {
  slug: "salon-belleza",
  category: "reservas",
  name: "Belleza SPA",
  tagline: "Tu momento de relax",
  description: "Centro de belleza y bienestar integral",
  colors: {
    primary: "#d4a574",
    primaryHover: "#c49565",
    secondary: "#e8d5c4",
    background: "#fdf8f5",
    surface: "#ffffff",
    text: "#3d3d3d",
    textSecondary: "#6b6b6b",
    textMuted: "#a0a0a0",
    cta: "#d4a574",
  },
  hero: {
    backgroundImage: "https://images.unsplash.com/photo-1560066984-138dadbdb983?w=1920&q=80",
    headline: "Belleza y Bienestar",
    subtext: "Tratamientos de belleza, masajes y relajación en un ambiente exclusivo",
    ctaText: "Reservar Tratamientos",
  },
  services: {
    title: "Nuestros Servicios",
    subtitle: "Descubre nuestros tratamientos exclusivos",
    items: [
      {
        id: "1",
        icon: "face",
        title: "Tratamientos Faciales",
        description: "Limpieza facial, hidratación, antimanchas y rejuvenecimiento facial.",
        duration: 60,
        price: 55,
      },
      {
        id: "2",
        icon: "hand",
        title: "Manicure y Pedicure",
        description: "Cuidado completo de manos y pies con productos de primera calidad.",
        duration: 45,
        price: 35,
      },
      {
        id: "3",
        icon: "sparkles",
        title: "Masajes y Relajación",
        description: "Masajes terapéuticos, relajantes y tratamientos spa integrales.",
        duration: 90,
        price: 75,
      },
    ],
  },
  workingHours: {
    monday: { isOpen: true, open: "09:00", close: "18:00", slotDuration: 60 },
    tuesday: { isOpen: true, open: "09:00", close: "18:00", slotDuration: 60 },
    wednesday: { isOpen: true, open: "09:00", close: "18:00", slotDuration: 60 },
    thursday: { isOpen: true, open: "09:00", close: "18:00", slotDuration: 60 },
    friday: { isOpen: true, open: "09:00", close: "18:00", slotDuration: 60 },
    saturday: { isOpen: true, open: "09:00", close: "14:00", slotDuration: 60 },
    sunday: { isOpen: false },
  },
  booking: {
    title: "Reserva tu Momento",
    subtitle: "Elige el tratamiento perfecto para ti",
    ctaText: "Reservar Ahora",
  },
  footer: {
    links: [
      { label: "Servicios", href: "#services" },
      { label: "Reservar", href: "#booking" },
      { label: "Contacto", href: "#footer" },
    ],
  },
};

const canchaFutbolData: DemoConfig = {
  slug: "cancha-futbol",
  category: "reservas",
  name: "Club Deportivo",
  tagline: "Juega con nosotros",
  description: "Alquila canchas de fútbol y únete a la liga",
  colors: {
    primary: "#2d8a2d",
    primaryHover: "#236e23",
    secondary: "#f5a623",
    background: "#f0f7f0",
    surface: "#ffffff",
    text: "#1a3d1a",
    textSecondary: "#4a6b4a",
    textMuted: "#7a9a7a",
    cta: "#2d8a2d",
  },
  hero: {
    backgroundImage: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=1920&q=80",
    headline: "Reserva tu Cancha",
    subtext: "Canchas de fútbol 5 y 7 con la mejor grama sintética. Torneos, ligas y entrenamientos",
    ctaText: "Reservar Cancha",
  },
  services: {
    title: "Nuestros Servicios",
    subtitle: "Todo para que juegues mejor",
    items: [
      {
        id: "1",
        icon: "court",
        title: "Alquiler de Canchas",
        description: "Canchas de fútbol 5 y 7 con iluminación LED y grama sintética premium.",
        duration: 60,
        price: 50,
      },
      {
        id: "2",
        icon: "trophy",
        title: "Torneos y ligas",
        description: "Organizamos torneos competitivos y ligas recreativas para todos los niveles.",
        duration: 120,
        price: 100,
      },
      {
        id: "3",
        icon: "users",
        title: "Entrenamientos",
        description: "Clases de fútbol para niños, jóvenes y adultos con coaches profesionales.",
        duration: 60,
        price: 30,
      },
    ],
  },
  workingHours: {
    monday: { isOpen: true, open: "09:00", close: "18:00", slotDuration: 60 },
    tuesday: { isOpen: true, open: "09:00", close: "18:00", slotDuration: 60 },
    wednesday: { isOpen: true, open: "09:00", close: "18:00", slotDuration: 60 },
    thursday: { isOpen: true, open: "09:00", close: "18:00", slotDuration: 60 },
    friday: { isOpen: true, open: "09:00", close: "18:00", slotDuration: 60 },
    saturday: { isOpen: true, open: "09:00", close: "14:00", slotDuration: 60 },
    sunday: { isOpen: false },
  },
  booking: {
    title: "Reserva tu Cancha",
    subtitle: "Elige el horario y cancha que prefieras",
    ctaText: "Reservar Ahora",
  },
  footer: {
    links: [
      { label: "Servicios", href: "#services" },
      { label: "Reservar", href: "#booking" },
      { label: "Contacto", href: "#footer" },
    ],
  },
};

// =============================================================================
// Data Registry
// =============================================================================

const DEMOS_REGISTRY: Record<string, DemoConfig> = {
  barberia: barberiaData,
  'salon-belleza': salonBellezaData,
  'cancha-futbol': canchaFutbolData,
};

// =============================================================================
// Loader Functions
// =============================================================================

/**
 * Get demo configuration by slug
 */
export function getDemoBySlug(slug: string): DemoConfig | undefined {
  return DEMOS_REGISTRY[slug];
}

/**
 * Get all available demo slugs for a category
 */
export function getDemoSlugsByCategory(category: string): string[] {
  return Object.values(DEMOS_REGISTRY)
    .filter((demo) => demo.category === category)
    .map((demo) => demo.slug);
}

/**
 * Get all demo slugs for reservas category
 */
export function getAllReservaDemoSlugs(): string[] {
  return getDemoSlugsByCategory('reservas');
}

// =============================================================================
// Slot Generation Utilities
// =============================================================================

/**
 * Get day of week key from Date (0 = Sunday, 1 = Monday, etc.)
 */
function getDayOfWeekKey(date: Date): string {
  const days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
  return days[date.getDay()];
}

/**
 * Generate time slots for a specific date based on working hours
 */
export function generateTimeSlots(
  date: Date,
  workingHours: DemoWorkingHours,
  bookedSlots: string[] = []
): TimeSlot[] {
  const dayKey = getDayOfWeekKey(date);
  const dayHours = workingHours[dayKey as keyof DemoWorkingHours];

  // Closed on this day
  if (!dayHours.isOpen || !dayHours.open || !dayHours.close) {
    return [];
  }

  const slots: TimeSlot[] = [];
  
  const [openHour] = dayHours.open.split(':').map(Number);
  const [closeHour] = dayHours.close.split(':').map(Number);

  // Generate slots from open to close (hourly)
  for (let hour = openHour; hour < closeHour; hour++) {
    const timeStr = `${hour.toString().padStart(2, '0')}:00`;
    const dateKey = formatDateKey(date);
    const isBooked = bookedSlots.includes(`${dateKey}:${timeStr}`);

    slots.push({
      time: timeStr,
      available: !isBooked,
    });
  }

  return slots;
}

/**
 * Format date as key for booking lookup (YYYY-MM-DD)
 */
export function formatDateKey(date: Date): string {
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  return `${year}-${month}-${day}`;
}

/**
 * Generate random booked slots for realism
 * Returns ~40% of slots as booked
 */
export function generateRandomBookedSlots(
  startDate: Date,
  daysAhead: number = 30,
  workingHours: DemoWorkingHours
): BookedSlots {
  const booked: BookedSlots = {};
  const today = new Date(startDate);
  today.setHours(0, 0, 0, 0);

  for (let d = 1; d <= daysAhead; d++) {
    const currentDate = new Date(today);
    currentDate.setDate(today.getDate() + d);

    const dayKey = getDayOfWeekKey(currentDate);
    const dayHours = workingHours[dayKey as keyof DemoWorkingHours];

    // Skip closed days
    if (!dayHours.isOpen || !dayHours.open || !dayHours.close) {
      continue;
    }

    const dateKey = formatDateKey(currentDate);
    const slots = generateTimeSlots(currentDate, workingHours, []);
    
    // Randomly mark ~40% as booked
    const bookedCount = Math.floor(slots.length * 0.4);
    const shuffled = [...slots].sort(() => Math.random() - 0.5);
    const bookedTimes = shuffled.slice(0, bookedCount).map((s) => s.time);

    if (bookedTimes.length > 0) {
      booked[dateKey] = bookedTimes;
    }
  }

  return booked;
}

/**
 * Get all booked slots for a date
 */
export function getBookedSlotsForDate(
  date: Date,
  bookedSlots: BookedSlots
): string[] {
  const dateKey = formatDateKey(date);
  return bookedSlots[dateKey] || [];
}

/**
 * Check if a specific slot is booked
 */
export function isSlotBooked(
  date: Date,
  time: string,
  bookedSlots: BookedSlots
): boolean {
  const dateKey = formatDateKey(date);
  const dayBooked = bookedSlots[dateKey] || [];
  return dayBooked.includes(time);
}

// =============================================================================
// Export all demos
// =============================================================================

export const DEMOS = DEMOS_REGISTRY;
