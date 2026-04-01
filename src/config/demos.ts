export interface DemoConfig {
  slug: string;
  name: string;
  tagline: string;
  description: string;
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
  hero: {
    backgroundImage: string;
    headline: string;
    subtext: string;
    ctaText: string;
  };
  services: {
    title: string;
    subtitle: string;
    items: {
      icon: string;
      title: string;
      description: string;
    }[];
  };
  booking: {
    title: string;
    subtitle: string;
    ctaText: string;
  };
  footer: {
    links: { label: string; href: string }[];
  };
}

export const demoConfigs: Record<string, DemoConfig> = {
  barbershop: {
    slug: "barbershop",
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
      backgroundImage:
        "https://images.unsplash.com/photo-1585747860715-2ba37e788b70?w=1920&q=80",
      headline: "Tu estilo, nuestra pasión",
      subtext:
        "Cortes de pelo, afeitados y tratamientos especializados para el hombre moderno",
      ctaText: "Reservar Ahora",
    },
    services: {
      title: "Nuestros Servicios",
      subtitle: "Todo lo que necesitas para verte increíble",
      items: [
        {
          icon: "scissors",
          title: "Corte de Pelo",
          description:
            "Cortes clásicos y modernos realizados por profesionales con años de experiencia.",
        },
        {
          icon: "sparkles",
          title: "Afeitado Tradicional",
          description:
            "Afeitado con navaja caliente, toalla caliente y productos premium.",
        },
        {
          icon: "star",
          title: "Tratamientos Capilares",
          description:
            "Mascarillas, masajes capilares y tratamientos especializados para tu cabello.",
        },
      ],
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
  },
  beauty: {
    slug: "beauty",
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
      backgroundImage:
        "https://images.unsplash.com/photo-1560066984-138dadbdb983?w=1920&q=80",
      headline: "Belleza y Bienestar",
      subtext:
        "Tratamientos de belleza, masajes y relajación en un ambiente exclusivo",
      ctaText: "Reservar Tratamientos",
    },
    services: {
      title: "Nuestros Servicios",
      subtitle: "Descubre nuestros tratamientos exclusivos",
      items: [
        {
          icon: "face",
          title: "Tratamientos Faciales",
          description:
            "Limpieza facial, hidratación, antimanchas y rejuvenecimiento facial.",
        },
        {
          icon: "hand",
          title: "Manicure y Pedicure",
          description:
            "Cuidado completo de manos y pies con productos de primera calidad.",
        },
        {
          icon: "sparkles",
          title: "Masajes y Relajación",
          description:
            "Masajes terapeúticos, relajantes y tratamientos spa integrales.",
        },
      ],
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
  },
  soccer: {
    slug: "soccer",
    name: "Club Deportivo",
    tagline: "Juega con nosotros",
    description: "Alquila canchas de fútbol y únete a laliga",
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
      backgroundImage:
        "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=1920&q=80",
      headline: "Reserva tu Cancha",
      subtext:
        "Canchas de fútbol 5 y 7 con la mejor grama sintética. Torneos, ligas y entrenamientos",
      ctaText: "Reservar Cancha",
    },
    services: {
      title: "Nuestros Servicios",
      subtitle: "Todo para que juegues mejor",
      items: [
        {
          icon: "court",
          title: "Alquiler de Canchas",
          description:
            "Canchas de fútbol 5 y 7 con iluminación LED y grama sintética premium.",
        },
        {
          icon: "trophy",
          title: "Torneos y ligas",
          description:
            "Organizamos torneos competitivos y ligas recreativas para todos los niveles.",
        },
        {
          icon: "users",
          title: "Entrenamientos",
          description:
            "Clases de fútbol para niños, jóvenes y adultos con coaches profesionales.",
        },
      ],
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
  },
};

export function getDemoConfig(slug: string): DemoConfig | undefined {
  return demoConfigs[slug];
}

export function getAllDemoSlugs(): string[] {
  return Object.keys(demoConfigs);
}
