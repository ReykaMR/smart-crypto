"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

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

export async function buyCrypto({
  portfolioId,
  symbol,
  amount,
}: {
  portfolioId: string;
  symbol: string;
  amount: number;
}) {
  try {
    const portfolio = await prisma.simulationPortfolio.findUnique({
      where: { id: portfolioId },
    });

    if (!portfolio) {
      return { success: false, error: "Portfolio not found" };
    }

    const price = MOCK_PRICES[symbol];
    if (!price) {
      return { success: false, error: "Invalid crypto symbol" };
    }

    const totalCost = price * amount;

    if (Number(portfolio.balance) < totalCost) {
      return { success: false, error: "Insufficient balance" };
    }

    // Update balance
    await prisma.simulationPortfolio.update({
      where: { id: portfolioId },
      data: { balance: Number(portfolio.balance) - totalCost },
    });

    // Update or create holding
    const existingHolding = await prisma.simulationHolding.findUnique({
      where: {
        portfolioId_symbol: {
          portfolioId,
          symbol,
        },
      },
    });

    if (existingHolding) {
      const newAmount = Number(existingHolding.amount) + amount;
      const avgPrice =
        (Number(existingHolding.avgBuyPrice) * Number(existingHolding.amount) +
          totalCost) /
        newAmount;

      await prisma.simulationHolding.update({
        where: { id: existingHolding.id },
        data: {
          amount: newAmount,
          avgBuyPrice: avgPrice,
        },
      });
    } else {
      await prisma.simulationHolding.create({
        data: {
          portfolioId,
          symbol,
          amount,
          avgBuyPrice: price,
        },
      });
    }

    // Record transaction
    await prisma.simulationTransaction.create({
      data: {
        portfolioId,
        symbol,
        type: "BUY",
        amount,
        price,
        total: totalCost,
      },
    });

    revalidatePath("/simulation");
    return { success: true };
  } catch (error) {
    console.error("Error buying crypto:", error);
    return { success: false, error: "Failed to buy crypto" };
  }
}

export async function sellCrypto({
  portfolioId,
  symbol,
  amount,
}: {
  portfolioId: string;
  symbol: string;
  amount: number;
}) {
  try {
    const holding = await prisma.simulationHolding.findUnique({
      where: {
        portfolioId_symbol: {
          portfolioId,
          symbol,
        },
      },
    });

    if (!holding || Number(holding.amount) < amount) {
      return { success: false, error: "Insufficient holdings" };
    }

    const price = MOCK_PRICES[symbol];
    if (!price) {
      return { success: false, error: "Invalid crypto symbol" };
    }

    const totalValue = price * amount;

    // Update balance
    const portfolio = await prisma.simulationPortfolio.findUnique({
      where: { id: portfolioId },
    });

    if (!portfolio) {
      return { success: false, error: "Portfolio not found" };
    }

    await prisma.simulationPortfolio.update({
      where: { id: portfolioId },
      data: { balance: Number(portfolio.balance) + totalValue },
    });

    // Update holding
    const newAmount = Number(holding.amount) - amount;

    if (newAmount <= 0) {
      await prisma.simulationHolding.delete({
        where: { id: holding.id },
      });
    } else {
      await prisma.simulationHolding.update({
        where: { id: holding.id },
        data: { amount: newAmount },
      });
    }

    // Record transaction
    await prisma.simulationTransaction.create({
      data: {
        portfolioId,
        symbol,
        type: "SELL",
        amount,
        price,
        total: totalValue,
      },
    });

    revalidatePath("/simulation");
    return { success: true };
  } catch (error) {
    console.error("Error selling crypto:", error);
    return { success: false, error: "Failed to sell crypto" };
  }
}
