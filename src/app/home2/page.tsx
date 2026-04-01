import Home2Header from "@/components/home2/Home2Header";
import Home2Hero from "@/components/home2/Home2Hero";
import Home2Services from "@/components/home2/Home2Services";
import Home2Booking from "@/components/home2/Home2Booking";
import Home2Footer from "@/components/home2/Home2Footer";

export default function Home2Page() {
  return (
    <main className="min-h-screen bg-white font-sans">
      <Home2Header />
      <Home2Hero />
      <Home2Services />
      <Home2Booking />
      <Home2Footer />
    </main>
  );
}
