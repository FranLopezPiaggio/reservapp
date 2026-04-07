import { notFound } from "next/navigation";
import { getDemoBySlug, getAllReservaDemoSlugs } from "@/lib/demo-data";
import DemoHeader from "@/components/demo/DemoHeader";
import DemoHero from "@/components/demo/DemoHero";
import DemoFooter from "@/components/demo/DemoFooter";
import { BookingFlow } from "@/components/booking";

interface DemoPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const slugs = getAllReservaDemoSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: DemoPageProps) {
  const { slug } = await params;
  const demo = getDemoBySlug(slug);
  
  if (!demo) {
    return {
      title: "Demo no encontrado",
    };
  }
  
  return {
    title: `${demo.name} - ${demo.tagline}`,
    description: demo.description,
  };
}

export default async function ReservasDemoPage({ params }: DemoPageProps) {
  const { slug } = await params;
  const demo = getDemoBySlug(slug);
  
  if (!demo || demo.category !== "reservas") {
    notFound();
  }
  
  return (
    <main className="min-h-screen">
      <DemoHeader config={demo} />
      <DemoHero config={demo} />
      <BookingFlow demo={demo} />
      <DemoFooter config={demo} />
    </main>
  );
}
