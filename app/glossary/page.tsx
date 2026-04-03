import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth.config";
import NavbarWrapper from "@/components/NavbarWrapper";
import GlossaryClientWrapper from "./GlossaryClientWrapper";

export default async function GlossaryPage() {
  const session = await auth();

  const terms = await prisma.glossaryTerm.findMany({
    orderBy: { term: "asc" },
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <NavbarWrapper />

      <main className="pt-24 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <GlossaryClientWrapper terms={terms} isLoggedIn={!!session?.user} />
        </div>
      </main>
    </div>
  );
}
