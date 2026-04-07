"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { 
  DemoWorkingHours, 
  TimeSlot, 
  BookedSlots, 
  generateTimeSlots, 
  formatDateKey,
  isSlotBooked 
} from "@/lib/demo-data";

interface DateTimePickerProps {
  workingHours: DemoWorkingHours;
  bookedSlots: BookedSlots;
  selectedDate: Date | null;
  selectedTime: string | null;
  onSelectDate: (date: Date) => void;
  onSelectTime: (time: string) => void;
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
}

const DAYS = ["Lun", "Mar", "Mié", "Jue", "Vie", "Sáb", "Dom"];
const MONTHS = [
  "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
  "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
];

export default function DateTimePicker({
  workingHours,
  bookedSlots,
  selectedDate,
  selectedTime,
  onSelectDate,
  onSelectTime,
  colors,
}: DateTimePickerProps) {
  const [currentDate, setCurrentDate] = useState(new Date());

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  // Generate calendar days
  const calendarDays = useMemo(() => {
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    
    // Adjust for Monday start (0 = Sunday in JS, we want Monday = 0)
    let startingDay = firstDay.getDay() - 1;
    if (startingDay < 0) startingDay = 6;
    
    const daysInMonth = lastDay.getDate();
    const days: (number | null)[] = [];

    // Empty slots before first day
    for (let i = 0; i < startingDay; i++) {
      days.push(null);
    }

    // Days of the month
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(i);
    }

    return days;
  }, [year, month]);

  // Get time slots for selected date
  const timeSlots: TimeSlot[] = useMemo(() => {
    if (!selectedDate) return [];
    return generateTimeSlots(selectedDate, workingHours, bookedSlots[formatDateKey(selectedDate)] || []);
  }, [selectedDate, workingHours, bookedSlots]);

  const prevMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
  };

  // Check if a date is selectable
  const isDateSelectable = (day: number | null): boolean => {
    if (day === null) return false;
    
    const date = new Date(year, month, day);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    // Can't select past dates
    if (date < today) return false;
    
    // Check if day is open
    const dayNames = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
    const dayName = dayNames[date.getDay()];
    const dayHours = workingHours[dayName as keyof DemoWorkingHours];
    
    return dayHours?.isOpen || false;
  };

  const isDateSelected = (day: number | null): boolean => {
    if (day === null || !selectedDate) return false;
    return (
      selectedDate.getDate() === day &&
      selectedDate.getMonth() === month &&
      selectedDate.getFullYear() === year
    );
  };

  return (
    <section id="booking" className="py-16" style={{ backgroundColor: colors.surface }}>
      <div className="max-w-4xl mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-4xl font-bold mb-4"
            style={{ color: colors.text }}
          >
            Elige Fecha y Hora
          </motion.h2>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Calendar */}
            <div className="flex-1">
              {/* Month Navigation */}
              <div className="flex items-center justify-between mb-6">
                <button
                  onClick={prevMonth}
                  className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <h3 className="text-lg font-semibold" style={{ color: colors.text }}>
                  {MONTHS[month]} {year}
                </h3>
                <button
                  onClick={nextMonth}
                  className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>

              {/* Days of Week */}
              <div className="grid grid-cols-7 mb-2">
                {DAYS.map((day) => (
                  <div
                    key={day}
                    className="text-center text-xs font-medium text-gray-400 py-2"
                  >
                    {day}
                  </div>
                ))}
              </div>

              {/* Calendar Days */}
              <div className="grid grid-cols-7 gap-1">
                {calendarDays.map((day, index) => {
                  const selectable = isDateSelectable(day);
                  const selected = isDateSelected(day);

                  return (
                    <button
                      key={index}
                      onClick={() => {
                        if (selectable) {
                          const date = new Date(year, month, day!);
                          onSelectDate(date);
                        }
                      }}
                      disabled={!selectable}
                      className={`py-3 rounded-lg text-sm font-medium transition-all ${
                        selected
                          ? "text-white"
                          : selectable
                            ? "bg-gray-50 text-gray-700 hover:bg-gray-100"
                            : "text-gray-300 cursor-not-allowed"
                      }`}
                      style={selected ? { backgroundColor: colors.primary } : undefined}
                    >
                      {day}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Time Slots */}
            <div className="w-full lg:w-72 border-t lg:border-t-0 lg:border-l border-gray-100 pt-6 lg:pt-0 lg:pl-8">
              <h4 className="text-sm font-semibold mb-4" style={{ color: colors.textSecondary }}>
                Horarios disponibles
              </h4>
              
              {!selectedDate ? (
                <p className="text-sm text-gray-400">
                  Selecciona una fecha primero
                </p>
              ) : timeSlots.length === 0 ? (
                <p className="text-sm text-gray-400">
                  No hay horarios disponibles para esta fecha
                </p>
              ) : (
                <div className="grid grid-cols-2 gap-2 max-h-64 overflow-y-auto">
                  {timeSlots.map((slot) => (
                    <button
                      key={slot.time}
                      onClick={() => slot.available && onSelectTime(slot.time)}
                      disabled={!slot.available}
                      className={`px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                        selectedTime === slot.time
                          ? "text-white"
                          : slot.available
                            ? "bg-gray-50 text-gray-700 hover:bg-gray-100"
                            : "text-gray-300 cursor-not-allowed line-through bg-gray-50"
                      }`}
                      style={selectedTime === slot.time ? { backgroundColor: colors.primary } : undefined}
                    >
                      {slot.time}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
