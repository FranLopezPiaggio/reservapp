import Header from "@/components/layout/Header";
import Hero from "@/components/demo/Hero";
import Services from "@/components/Services";
import Booking from "@/components/booking/Booking";
import Footer from "@/components/layout/Footer";

export default function DemoMainPage() {
  // Original landing page preserved for demo purposes
  return (
    <main className="min-h-screen">
      <Header />
      <Hero />
      <Services />
      <Booking calUsername="EmpreTools" />
      <Footer />
    </main>
  );
}
