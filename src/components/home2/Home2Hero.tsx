"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function Home2Hero() {
  return (
    <section className="pt-40 pb-32 md:pt-48 md:pb-40 px-4">
      <div className="max-w-[800px] mx-auto text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-3 py-1.5 bg-gray-100 rounded-full mb-8"
        >
          <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
          <span className="text-sm font-medium text-gray-600">
            New: Embed scheduling on your website
          </span>
        </motion.div>

        {/* Main Title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-black leading-[1.1] mb-6"
          style={{
            fontFamily:
              'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
          }}
        >
          Embed a scheduling widget on your website
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-lg md:text-xl text-gray-500 max-w-[600px] mx-auto mb-10 leading-relaxed"
        >
          Add seamless scheduling to your site with our embed widget. Accept
          bookings 24/7, reduce no-shows, and save hours every week.
        </motion.p>

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
        >
          <Link
            href="/auth/register"
            className="px-8 py-3.5 text-base font-semibold text-white bg-black rounded-lg hover:bg-gray-800 transition-all hover:scale-[1.02] cursor-pointer"
          >
            Get started
          </Link>
          <Link
            href="#contact"
            className="px-8 py-3.5 text-base font-medium text-gray-600 bg-transparent border border-gray-200 rounded-lg hover:border-gray-300 hover:bg-gray-50 transition-all flex items-center gap-2 cursor-pointer"
          >
            Talk to sales
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </Link>
        </motion.div>

        {/* Mockup Image */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="relative"
        >
          <div className="bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl p-4 md:p-8 shadow-xl">
            {/* Fake browser/app mockup */}
            <div className="bg-white rounded-xl overflow-hidden shadow-lg">
              {/* Fake header */}
              <div className="bg-gray-50 px-4 py-3 flex items-center gap-2 border-b">
                <div className="w-3 h-3 bg-red-400 rounded-full" />
                <div className="w-3 h-3 bg-yellow-400 rounded-full" />
                <div className="w-3 h-3 bg-green-400 rounded-full" />
              </div>
              {/* Fake content */}
              <div className="p-6 md:p-10">
                <div className="flex gap-6">
                  {/* Fake calendar */}
                  <div className="flex-1">
                    <div className="text-sm font-semibold text-gray-400 mb-4">
                      Select a date
                    </div>
                    <div className="grid grid-cols-7 gap-1 text-center">
                      {["M", "T", "W", "T", "F", "S", "S"].map((d, i) => (
                        <div
                          key={i}
                          className="text-xs font-medium text-gray-400 py-2"
                        >
                          {d}
                        </div>
                      ))}
                      {Array.from({ length: 35 }, (_, i) => {
                        const day = i + 1;
                        const isAvailable = day > 5 && day < 25;
                        const isSelected = day === 15;
                        return (
                          <div
                            key={i}
                            className={`py-2 rounded-lg text-sm ${
                              isSelected
                                ? "bg-black text-white"
                                : isAvailable
                                  ? "bg-gray-50 text-gray-700 hover:bg-gray-100"
                                  : "text-gray-300"
                            } cursor-pointer`}
                          >
                            {day <= 31 ? day : ""}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                  {/* Fake time slots */}
                  <div className="w-48 hidden md:block">
                    <div className="text-sm font-semibold text-gray-400 mb-4">
                      Select a time
                    </div>
                    <div className="space-y-2">
                      {[
                        "09:00 AM",
                        "10:00 AM",
                        "11:00 AM",
                        "02:00 PM",
                        "03:00 PM",
                      ].map((time, i) => (
                        <div
                          key={i}
                          className={`px-4 py-2.5 rounded-lg text-sm cursor-pointer transition-colors ${
                            i === 1
                              ? "bg-black text-white"
                              : "bg-gray-50 text-gray-700 hover:bg-gray-100"
                          }`}
                        >
                          {time}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
