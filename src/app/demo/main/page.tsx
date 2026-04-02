import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Booking from "@/components/Booking";
import Footer from "@/components/Footer";

export default function DemoMainPage() {
  // Original landing page preserved for demo purposes
  return (
    <main className="min-h-screen">
      <Header />
      <Hero />
      <Services />
      <Booking calUsername="reservapp" />
      <Footer />
    </main>
  );
}
