// Server Component
import NavbarWrapper from "@/components/NavbarWrapper";
import HomePageClient from "./HomePageClient";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-linear-to-b from-white to-blue-50">
      <NavbarWrapper />
      <HomePageClient />
    </div>
  );
}
