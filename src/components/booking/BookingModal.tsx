"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface TimeSlot {
  id: string;
  time: string;
  available: boolean;
}

interface DaySchedule {
  date: Date;
  slots: TimeSlot[];
}

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (
    date: Date,
    time: string,
    name: string,
    email: string,
    notes: string,
  ) => void;
  selectedService?: string;
}

// Generate mock time slots (9 AM - 6 PM, 1-hour intervals)
const generateTimeSlots = (): TimeSlot[] => {
  const slots: TimeSlot[] = [];
  const hours = [9, 10, 11, 12, 13, 14, 15, 16, 17, 18];

  hours.forEach((hour, index) => {
    const time = `${hour.toString().padStart(2, "0")}:00`;
    // Random availability for demo
    const available = Math.random() > 0.3;
    slots.push({
      id: `slot-${index}`,
      time,
      available,
    });
  });

  return slots;
};

// Generate schedule for next 14 days
const generateSchedule = (): DaySchedule[] => {
  const schedule: DaySchedule[] = [];
  const today = new Date();

  for (let i = 0; i < 14; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() + i);
    date.setHours(0, 0, 0, 0);

    schedule.push({
      date,
      slots: generateTimeSlots(),
    });
  }

  return schedule;
};

const DAYS_OF_WEEK = ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"];
const MONTHS = [
  "Enero",
  "Febrero",
  "Marzo",
  "Abril",
  "Mayo",
  "Junio",
  "Julio",
  "Agosto",
  "Septiembre",
  "Octubre",
  "Noviembre",
  "Diciembre",
];

export default function BookingModal({
  isOpen,
  onClose,
  onConfirm,
  selectedService = "Reserva",
}: BookingModalProps) {
  const [schedule] = useState<DaySchedule[]>(generateSchedule);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [step, setStep] = useState<"date" | "time" | "details">("date");

  // Form state
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [notes, setNotes] = useState("");

  const formatDate = (date: Date): string => {
    return `${DAYS_OF_WEEK[date.getDay()]}, ${date.getDate()} de ${MONTHS[date.getMonth()]}`;
  };

  const handleDateSelect = (day: DaySchedule) => {
    setSelectedDate(day.date);
    setSelectedTime(null);
    setStep("time");
  };

  const handleTimeSelect = (time: string) => {
    setSelectedTime(time);
    setStep("details");
  };

  const handleConfirm = () => {
    if (selectedDate && selectedTime && name && email) {
      onConfirm(selectedDate, selectedTime, name, email, notes);
      onClose();
      // Reset form
      setSelectedDate(null);
      setSelectedTime(null);
      setName("");
      setEmail("");
      setNotes("");
      setStep("date");
    }
  };

  const handleBack = () => {
    if (step === "time") {
      setStep("date");
      setSelectedDate(null);
    } else if (step === "details") {
      setStep("time");
      setSelectedTime(null);
    }
  };

  const availableDates = useMemo(() => {
    return schedule.filter((day) => day.slots.some((slot) => slot.available));
  }, [schedule]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", duration: 0.3 }}
            className="fixed inset-4 md:inset-auto md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:w-full md:max-w-2xl md:max-h-[90vh] bg-white rounded-2xl shadow-2xl z-50 overflow-hidden flex flex-col"
          >
            {/* Header */}
            <div
              className="flex items-center justify-between p-6 border-b"
              style={{ borderColor: "var(--color-background)" }}
            >
              <div>
                <h2
                  className="text-xl font-bold"
                  style={{
                    fontFamily: "var(--font-heading)",
                    color: "var(--color-text)",
                  }}
                >
                  Reservar Cita
                </h2>
                <p
                  className="text-sm mt-1"
                  style={{ color: "var(--color-text-secondary)" }}
                >
                  {selectedService}
                </p>
              </div>
              <button
                onClick={onClose}
                className="p-2 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            {/* Progress Steps */}
            <div className="flex items-center justify-center gap-2 p-4 bg-gray-50">
              {["date", "time", "details"].map((s, i) => (
                <div key={s} className="flex items-center">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-colors ${
                      step === s ? "text-white" : "text-gray-500"
                    }`}
                    style={{
                      backgroundColor:
                        step === s ? "var(--color-primary)" : "transparent",
                      border:
                        step !== s
                          ? "2px solid var(--color-text-muted)"
                          : "none",
                    }}
                  >
                    {i + 1}
                  </div>
                  {i < 2 && (
                    <div
                      className="w-8 h-0.5 mx-1"
                      style={{
                        backgroundColor:
                          step === "details" || (step === "time" && i === 0)
                            ? "var(--color-primary)"
                            : "var(--color-text-muted)",
                        opacity: 0.3,
                      }}
                    />
                  )}
                </div>
              ))}
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-6">
              {/* Step 1: Select Date */}
              {step === "date" && (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                >
                  <h3
                    className="text-lg font-semibold mb-4"
                    style={{ color: "var(--color-text)" }}
                  >
                    Selecciona una fecha
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {schedule.map((day) => {
                      const hasAvailable = day.slots.some(
                        (slot) => slot.available,
                      );
                      return (
                        <button
                          key={day.date.toISOString()}
                          onClick={() => hasAvailable && handleDateSelect(day)}
                          disabled={!hasAvailable}
                          className={`p-4 rounded-xl text-center transition-all duration-200 ${
                            hasAvailable
                              ? "hover:scale-105 cursor-pointer"
                              : "opacity-40 cursor-not-allowed"
                          }`}
                          style={{
                            backgroundColor: hasAvailable
                              ? "var(--color-surface)"
                              : "var(--color-background)",
                            boxShadow: hasAvailable
                              ? "0 2px 4px rgba(0,0,0,0.1)"
                              : "none",
                          }}
                        >
                          <div
                            className="text-xs font-medium uppercase"
                            style={{ color: "var(--color-text-muted)" }}
                          >
                            {DAYS_OF_WEEK[day.date.getDay()]}
                          </div>
                          <div
                            className="text-2xl font-bold mt-1"
                            style={{ color: "var(--color-text)" }}
                          >
                            {day.date.getDate()}
                          </div>
                          <div
                            className="text-xs mt-1"
                            style={{ color: "var(--color-primary)" }}
                          >
                            {hasAvailable
                              ? `${day.slots.filter((s) => s.available).length} disponíveis`
                              : "No disponible"}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </motion.div>
              )}

              {/* Step 2: Select Time */}
              {step === "time" && selectedDate && (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                >
                  <button
                    onClick={handleBack}
                    className="flex items-center gap-2 mb-4 text-sm hover:underline cursor-pointer"
                    style={{ color: "var(--color-text-secondary)" }}
                  >
                    ← Volver a fechas
                  </button>
                  <h3
                    className="text-lg font-semibold mb-4"
                    style={{ color: "var(--color-text)" }}
                  >
                    Horario disponible — {formatDate(selectedDate)}
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {schedule
                      .find(
                        (d) =>
                          d.date.toDateString() === selectedDate.toDateString(),
                      )
                      ?.slots.map((slot) => (
                        <button
                          key={slot.id}
                          onClick={() =>
                            slot.available && handleTimeSelect(slot.time)
                          }
                          disabled={!slot.available}
                          className={`p-3 rounded-xl text-center font-medium transition-all duration-200 ${
                            slot.available
                              ? "hover:scale-105 cursor-pointer"
                              : "opacity-40 cursor-not-allowed line-through"
                          } ${selectedTime === slot.time ? "ring-2 ring-offset-2" : ""}`}
                          style={{
                            backgroundColor:
                              selectedTime === slot.time
                                ? "var(--color-primary)"
                                : "var(--color-surface)",
                            color:
                              selectedTime === slot.time
                                ? "white"
                                : "var(--color-text)",
                          }}
                        >
                          {slot.time}
                        </button>
                      ))}
                  </div>
                </motion.div>
              )}

              {/* Step 3: Enter Details */}
              {step === "details" && (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                >
                  <button
                    onClick={handleBack}
                    className="flex items-center gap-2 mb-4 text-sm hover:underline cursor-pointer"
                    style={{ color: "var(--color-text-secondary)" }}
                  >
                    ← Volver a horarios
                  </button>
                  <h3
                    className="text-lg font-semibold mb-4"
                    style={{ color: "var(--color-text)" }}
                  >
                    Tus datos
                  </h3>

                  <div className="space-y-4">
                    {/* Selected summary */}
                    <div
                      className="p-4 rounded-xl"
                      style={{ backgroundColor: "var(--color-background)" }}
                    >
                      <div className="flex items-center gap-2 text-sm">
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          style={{ color: "var(--color-primary)" }}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                          />
                        </svg>
                        <span style={{ color: "var(--color-text)" }}>
                          {selectedDate && formatDate(selectedDate)} a las{" "}
                          {selectedTime}
                        </span>
                      </div>
                    </div>

                    {/* Form */}
                    <div>
                      <label
                        className="block text-sm font-medium mb-2"
                        style={{ color: "var(--color-text)" }}
                      >
                        Nombre completo *
                      </label>
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Juan Pérez"
                        className="w-full px-4 py-3 rounded-xl border transition-colors focus:ring-2 focus:ring-offset-2"
                        style={{
                          borderColor: "var(--color-text-muted)",
                          backgroundColor: "var(--color-surface)",
                          color: "var(--color-text)",
                        }}
                      />
                    </div>

                    <div>
                      <label
                        className="block text-sm font-medium mb-2"
                        style={{ color: "var(--color-text)" }}
                      >
                        Correo electrónico *
                      </label>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="juan@ejemplo.com"
                        className="w-full px-4 py-3 rounded-xl border transition-colors focus:ring-2 focus:ring-offset-2"
                        style={{
                          borderColor: "var(--color-text-muted)",
                          backgroundColor: "var(--color-surface)",
                          color: "var(--color-text)",
                        }}
                      />
                    </div>

                    <div>
                      <label
                        className="block text-sm font-medium mb-2"
                        style={{ color: "var(--color-text)" }}
                      >
                        Notas adicionales (opcional)
                      </label>
                      <textarea
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        placeholder="Alguna información adicional..."
                        rows={3}
                        className="w-full px-4 py-3 rounded-xl border transition-colors focus:ring-2 focus:ring-offset-2 resize-none"
                        style={{
                          borderColor: "var(--color-text-muted)",
                          backgroundColor: "var(--color-surface)",
                          color: "var(--color-text)",
                        }}
                      />
                    </div>
                  </div>
                </motion.div>
              )}
            </div>

            {/* Footer */}
            {step === "details" && (
              <div
                className="p-6 border-t"
                style={{ borderColor: "var(--color-background)" }}
              >
                <button
                  onClick={handleConfirm}
                  disabled={!name || !email}
                  className="w-full py-3 rounded-xl font-semibold text-white transition-all duration-200 hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                  style={{ backgroundColor: "var(--color-cta)" }}
                >
                  Confirmar Reserva
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
