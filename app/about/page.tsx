import NavbarWrapper from "@/components/NavbarWrapper";
import { auth } from "@/lib/auth.config";
import AboutClient from "./AboutClient";

export const metadata = {
  title: "About & Support - Smart Crypto",
  description:
    "Informasi tentang Smart Crypto, disclaimer, dan kontak dukungan",
};

export default async function AboutPage() {
  const session = await auth();

  return (
    <div className="min-h-screen bg-gray-50">
      <NavbarWrapper />

      <main className="pt-24 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <AboutClient isLoggedIn={!!session?.user} />
        </div>
      </main>
    </div>
  );
}
