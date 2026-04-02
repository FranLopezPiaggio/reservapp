import { notFound } from "next/navigation";
import { getDemoConfig, getAllDemoSlugs } from "@/config/demos";
import DemoHeader from "@/components/demo/DemoHeader";
import DemoHero from "@/components/demo/DemoHero";
import DemoServices from "@/components/demo/DemoServices";
import DemoBooking from "@/components/demo/DemoBooking";
import DemoFooter from "@/components/demo/DemoFooter";

interface DemoPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const slugs = getAllDemoSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: DemoPageProps) {
  const { slug } = await params;
  const config = getDemoConfig(slug);

  if (!config) {
    return {
      title: "Demo no encontrado",
    };
  }

  return {
    title: `${config.name} - ${config.tagline}`,
    description: config.description,
  };
}

export default async function DemoPage({ params }: DemoPageProps) {
  const { slug } = await params;
  const config = getDemoConfig(slug);

  if (!config) {
    notFound();
  }

  return (
    <main className="min-h-screen">
      <DemoHeader config={config} />
      <DemoHero config={config} />
      <DemoServices config={config} />
      <DemoBooking config={config} />
      <DemoFooter config={config} />
    </main>
  );
}
