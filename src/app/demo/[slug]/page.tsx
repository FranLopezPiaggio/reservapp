import { redirect } from 'next/navigation';

export default function DemoPage() {
  // Old demo paths now redirect to /reservas/demo/[slug]
  // This page is kept for backward compatibility but redirects
  redirect('/reservas');
}