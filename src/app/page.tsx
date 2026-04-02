import { redirect } from "next/navigation";

export default function RootPage() {
  // Redirect to home2 (promo page based on prompt2.md)
  // Original landing page preserved at /demo/main
  redirect("/home");
}
