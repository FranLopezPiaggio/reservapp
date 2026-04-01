"use client";

import { motion } from "framer-motion";

const services = [
  {
    number: "01",
    title: "Inline embed",
    description:
      "Display the booking calendar directly in your page. Perfect for pages where you want scheduling to be the main focus.",
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=250&fit=crop",
  },
  {
    number: "02",
    title: "Floating pop-up button",
    description:
      "Use a persistent button that triggers a modal. Keep your booking option accessible from anywhere on the site.",
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=250&fit=crop",
  },
  {
    number: "03",
    title: "Pop-up via element click",
    description:
      'Link the embed to a custom element like a "Book Now" button or link. Full control over the trigger.',
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=250&fit=crop",
  },
  {
    number: "04",
    title: "Email embed",
    description:
      "Add personalized booking links in your emails. Let clients schedule directly from their inbox.",
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=250&fit=crop",
  },
];

export default function Home2Services() {
  return (
    <section id="services" className="py-24 md:py-32 px-4 bg-gray-50">
      <div className="max-w-[1200px] mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-4xl font-bold text-black mb-4"
          >
            All available solutions to easily schedule meetings
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-gray-500 max-w-xl mx-auto"
          >
            Choose the embedding method that best fits your website and business
            needs.
          </motion.p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.number}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-white rounded-xl p-8 hover:shadow-lg transition-shadow duration-300 cursor-pointer"
              style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.05)" }}
            >
              {/* Number */}
              <div className="text-sm font-medium text-gray-400 mb-4">
                {service.number}
              </div>

              {/* Title */}
              <h3 className="text-xl font-semibold text-black mb-3">
                {service.title}
              </h3>

              {/* Description */}
              <p className="text-gray-500 text-sm leading-relaxed mb-6">
                {service.description}
              </p>

              {/* Image */}
              <div className="rounded-lg overflow-hidden">
                <div
                  className="h-32 md:h-40 bg-gray-100"
                  style={{
                    backgroundImage: `url(${service.image})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
