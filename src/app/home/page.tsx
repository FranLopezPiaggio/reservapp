import HomeHeader from "@/components/home/HomeHeader";
import HomeHero from "@/components/home/HomeHero";
import HomeServices from "@/components/home/HomeServices";
import HomeFooter from "@/components/home/HomeFooter";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-white font-sans">
      <HomeHeader />
      <HomeHero />
      <HomeServices />
      <HomeFooter />
    </main>
  );
}
