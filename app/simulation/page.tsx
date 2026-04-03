import { auth } from "@/lib/auth.config";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import NavbarWrapper from "@/components/NavbarWrapper";
import SimulationClient from "./SimulationClient";

// Mock crypto prices (in production, fetch from API)
const MOCK_PRICES: Record<string, number> = {
  BTC: 67500,
  ETH: 3400,
  BNB: 590,
  SOL: 175,
  ADA: 0.65,
  XRP: 0.62,
  DOT: 8.5,
  DOGE: 0.15,
  AVAX: 42,
  LINK: 18,
};

export default async function SimulationPage() {
  const session = await auth();

  if (!session?.user?.id) {
    redirect("/login");
  }

  const portfolio = await prisma.simulationPortfolio.findUnique({
    where: { userId: session.user.id },
    include: {
      holdings: true,
      transactions: {
        orderBy: { createdAt: "desc" },
        take: 20,
      },
    },
  });

  // Create portfolio if doesn't exist
  const finalPortfolio =
    portfolio ||
    (await prisma.simulationPortfolio.create({
      data: {
        userId: session.user.id,
        balance: 10000,
      },
      include: {
        holdings: true,
        transactions: {
          orderBy: { createdAt: "desc" },
          take: 20,
        },
      },
    }));

  // Calculate portfolio value
  const holdingsValue = finalPortfolio.holdings.reduce(
    (acc, holding) =>
      acc + Number(holding.amount) * (MOCK_PRICES[holding.symbol] || 0),
    0,
  );
  const totalValue = Number(finalPortfolio.balance) + holdingsValue;
  const initialValue = 10000;
  const profitLoss = totalValue - initialValue;
  const profitLossPercent = ((profitLoss / initialValue) * 100).toFixed(2);

  return (
    <div className="min-h-screen bg-gray-50">
      <NavbarWrapper />

      <main className="pt-24 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              📊 Simulasi Portofolio
            </h1>
            <p className="text-gray-600">
              Belajar investasi crypto tanpa risiko dengan uang virtual
            </p>
          </div>

          <SimulationClient
            portfolio={finalPortfolio}
            prices={MOCK_PRICES}
            totalValue={totalValue}
            profitLoss={profitLoss}
            profitLossPercent={profitLossPercent}
            userId={session.user.id}
          />
        </div>
      </main>
    </div>
  );
}
