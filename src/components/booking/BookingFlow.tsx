"use client";

import { useState, useEffect, useCallback } from "react";
import { DemoConfig, DemoServiceItem, BookedSlots, generateRandomBookedSlots } from "@/lib/demo-data";

import ServiceSelector from "./ServiceSelector";
import DateTimePicker from "./DateTimePicker";
import BookingForm from "./BookingForm";
import ConversionModal from "./ConversionModal";

type BookingStep = "service" | "datetime" | "form" | "complete";

interface BookingFlowProps {
  demo: DemoConfig;
}

export default function BookingFlow({ demo }: BookingFlowProps) {
  // Booking state
  const [step, setStep] = useState<BookingStep>("service");
  const [selectedService, setSelectedService] = useState<DemoServiceItem | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [customerData, setCustomerData] = useState<{ name: string; phone: string; email: string } | null>(null);
  
  // Modal state
  const [showConversionModal, setShowConversionModal] = useState(false);
  
  // Booked slots (generated randomly for realism)
  const [bookedSlots, setBookedSlots] = useState<BookedSlots>({});

  // Generate random booked slots on mount
  useEffect(() => {
    const slots = generateRandomBookedSlots(new Date(), 30, demo.workingHours);
    setBookedSlots(slots);
  }, [demo.workingHours]);

  // Handlers
  const handleServiceSelect = useCallback((service: DemoServiceItem) => {
    setSelectedService(service);
    setStep("datetime");
  }, []);

  const handleDateSelect = useCallback((date: Date) => {
    setSelectedDate(date);
    setSelectedTime(null);
  }, []);

  const handleTimeSelect = useCallback((time: string) => {
    setSelectedTime(time);
    setStep("form");
  }, []);

  const handleFormSubmit = useCallback((data: { name: string; phone: string; email: string }) => {
    setCustomerData(data);
    setShowConversionModal(true);
  }, []);

  const handleModalClose = useCallback(() => {
    setShowConversionModal(false);
    // Reset flow after modal closes
    setTimeout(() => {
      setStep("service");
      setSelectedService(null);
      setSelectedDate(null);
      setSelectedTime(null);
      setCustomerData(null);
    }, 300);
  }, []);

  // Scroll to booking section when step changes
  useEffect(() => {
    if (step !== "service") {
      const element = document.getElementById("booking");
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  }, [step]);

  const colors = demo.colors;

  return (
    <div>
      {/* Step 1: Service Selection */}
      {step === "service" && (
        <ServiceSelector
          services={demo.services.items}
          selectedService={selectedService}
          onSelect={handleServiceSelect}
          colors={colors}
        />
      )}

      {/* Step 2: Date & Time Selection */}
      {step === "datetime" && selectedService && (
        <DateTimePicker
          workingHours={demo.workingHours}
          bookedSlots={bookedSlots}
          selectedDate={selectedDate}
          selectedTime={selectedTime}
          onSelectDate={handleDateSelect}
          onSelectTime={handleTimeSelect}
          colors={colors}
        />
      )}

      {/* Step 3: Customer Details Form */}
      {step === "form" && selectedService && selectedDate && selectedTime && (
        <BookingForm
          serviceName={selectedService.title}
          servicePrice={selectedService.price}
          date={selectedDate}
          time={selectedTime}
          onSubmit={handleFormSubmit}
          colors={colors}
        />
      )}

      {/* Step 4: Conversion Modal */}
      <ConversionModal
        isOpen={showConversionModal}
        onClose={handleModalClose}
        bookingData={{
          serviceName: selectedService?.title || "",
          servicePrice: selectedService?.price || 0,
          date: selectedDate || new Date(),
          time: selectedTime || "",
          customerName: customerData?.name || "",
          customerPhone: customerData?.phone || "",
          customerEmail: customerData?.email || undefined,
        }}
      />
    </div>
  );
}
