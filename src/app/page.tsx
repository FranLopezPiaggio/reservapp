import HomeHeader from "@/components/home/HomeHeader";
import HomeHero from "@/components/home/HomeHero";
import HomeServices from "@/components/home/HomeServices";
import HomeWhy from "@/components/home/HomeWhy";
import HomeFooter from "@/components/home/HomeFooter";


export default function HomePage() {
  return (
    <main className="min-h-screen bg-white font-sans">
      <HomeHeader />
      <HomeHero />
      <HomeWhy />
      <HomeServices />
      <HomeFooter />
    </main>
  );
}