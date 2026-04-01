import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Booking from "@/components/Booking";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Header - Fixed, glass effect, transitions on scroll */}
      <Header />

      {/* Hero - Full-width background image with CTA */}
      <Hero />

      {/* Services - 3-card grid with rounded corners and shadows */}
      <Services />

      {/* Booking - Cal.com embed wrapper */}
      <Booking calUsername="reservapp" />

      {/* Footer - Minimalist */}
      <Footer />
    </main>
  );
}
