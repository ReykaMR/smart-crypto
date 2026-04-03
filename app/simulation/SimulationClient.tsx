"use client";

import { useState } from "react";
import {
  SimulationPortfolio,
  SimulationHolding,
  SimulationTransaction,
} from "@prisma/client";
import { buyCrypto, sellCrypto } from "@/app/actions/simulation";
import { useLanguage } from "@/lib/i18n";

interface SimulationClientProps {
  portfolio: SimulationPortfolio & {
    holdings: SimulationHolding[];
    transactions: SimulationTransaction[];
  };
  prices: Record<string, number>;
  totalValue: number;
  profitLoss: number;
  profitLossPercent: string;
  userId: string;
}

const CRYPTOS = [
  { symbol: "BTC", name: "Bitcoin" },
  { symbol: "ETH", name: "Ethereum" },
  { symbol: "BNB", name: "Binance Coin" },
  { symbol: "SOL", name: "Solana" },
  { symbol: "ADA", name: "Cardano" },
  { symbol: "XRP", name: "Ripple" },
  { symbol: "DOT", name: "Polkadot" },
  { symbol: "DOGE", name: "Dogecoin" },
  { symbol: "AVAX", name: "Avalanche" },
  { symbol: "LINK", name: "Chainlink" },
];

export default function SimulationClient({
  portfolio,
  prices,
  totalValue,
  profitLoss,
  profitLossPercent,
  userId,
}: SimulationClientProps) {
  const { t } = useLanguage();
  const [selectedCrypto, setSelectedCrypto] = useState("BTC");
  const [amount, setAmount] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [transactionType, setTransactionType] = useState<"BUY" | "SELL">("BUY");

  const handleTransaction = async () => {
    if (!amount || parseFloat(amount) <= 0) return;

    setIsLoading(true);

    if (transactionType === "BUY") {
      await buyCrypto({
        portfolioId: portfolio.id,
        symbol: selectedCrypto,
        amount: parseFloat(amount),
      });
    } else {
      await sellCrypto({
        portfolioId: portfolio.id,
        symbol: selectedCrypto,
        amount: parseFloat(amount),
      });
    }

    setAmount("");
    setIsLoading(false);
  };

  const currentPrice = prices[selectedCrypto];
  const totalCost = currentPrice * (parseFloat(amount) || 0);

  const isProfit = profitLoss >= 0;

  return (
    <div className="space-y-8">
      {/* Portfolio Overview */}
      <div className="grid md:grid-cols-3 gap-6">
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <h3 className="text-gray-600 font-medium mb-2">
            {t.simulation.totalValue}
          </h3>
          <p className="text-3xl font-bold text-gray-900">
            $
            {totalValue.toLocaleString(undefined, {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </p>
          <p className="text-sm text-gray-600 mt-1">
            {t.simulation.starting}: $10,000
          </p>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <h3 className="text-gray-600 font-medium mb-2">
            {t.simulation.availableBalance}
          </h3>
          <p className="text-3xl font-bold text-green-600">
            $
            {Number(portfolio.balance).toLocaleString(undefined, {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </p>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <h3 className="text-gray-600 font-medium mb-2">
            {t.simulation.profitLoss}
          </h3>
          <p
            className={`text-3xl font-bold ${isProfit ? "text-green-600" : "text-red-600"}`}
          >
            {isProfit ? "+" : ""}${Math.abs(profitLoss).toFixed(2)}
          </p>
          <p
            className={`text-sm ${isProfit ? "text-green-600" : "text-red-600"}`}
          >
            {isProfit ? "+" : ""}
            {profitLossPercent}%
          </p>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Holdings */}
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <h2 className="text-xl font-bold text-gray-900 mb-4">
            {t.simulation.yourHoldings}
          </h2>

          {portfolio.holdings.length === 0 ? (
            <div className="text-center py-8 text-gray-600">
              <p>{t.simulation.noHoldings}</p>
            </div>
          ) : (
            <div className="space-y-4">
              {portfolio.holdings.map((holding) => {
                const currentPrice = prices[holding.symbol];
                const value = Number(holding.amount) * currentPrice;
                const costBasis =
                  Number(holding.amount) * Number(holding.avgBuyPrice);
                const profitLoss = value - costBasis;
                const profitLossPercent = (
                  (profitLoss / costBasis) *
                  100
                ).toFixed(2);
                const isProfit = profitLoss >= 0;

                return (
                  <div
                    key={holding.id}
                    className="border border-gray-200 rounded-xl p-4"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center font-bold text-blue-600">
                          {holding.symbol[0]}
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900">
                            {holding.symbol}
                          </p>
                          <p className="text-sm text-gray-600">
                            {holding.amount.toFixed(6)} {t.simulation.tokens}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-gray-900">
                          ${value.toFixed(2)}
                        </p>
                        <p
                          className={`text-sm ${isProfit ? "text-green-600" : "text-red-600"}`}
                        >
                          {isProfit ? "+" : ""}${profitLoss.toFixed(2)} (
                          {profitLossPercent}%)
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Trading Form */}
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <h2 className="text-xl font-bold text-gray-900 mb-4">
            {t.simulation.tradeCrypto}
          </h2>

          <div className="space-y-4">
            {/* Crypto Selector */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t.simulation.selectCrypto}
              </label>
              <select
                value={selectedCrypto}
                onChange={(e) => setSelectedCrypto(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {CRYPTOS.map((crypto) => (
                  <option key={crypto.symbol} value={crypto.symbol}>
                    {crypto.name} ({crypto.symbol}) - $
                    {prices[crypto.symbol].toLocaleString()}
                  </option>
                ))}
              </select>
            </div>

            {/* Transaction Type */}
            <div className="flex gap-2">
              <button
                onClick={() => setTransactionType("BUY")}
                className={`flex-1 py-3 rounded-lg font-semibold transition-all ${
                  transactionType === "BUY"
                    ? "bg-green-600 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {t.simulation.buy}
              </button>
              <button
                onClick={() => setTransactionType("SELL")}
                className={`flex-1 py-3 rounded-lg font-semibold transition-all ${
                  transactionType === "SELL"
                    ? "bg-red-600 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {t.simulation.sell}
              </button>
            </div>

            {/* Amount Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t.simulation.amount}
              </label>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="0.00"
                step="0.000001"
                min="0"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              {amount && (
                <p className="text-sm text-gray-600 mt-2">
                  {t.simulation.total}: $
                  {totalCost.toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </p>
              )}
            </div>

            <button
              onClick={handleTransaction}
              disabled={isLoading || !amount || parseFloat(amount) <= 0}
              className={`w-full py-4 rounded-xl font-semibold text-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed ${
                transactionType === "BUY"
                  ? "bg-green-600 text-white hover:bg-green-700"
                  : "bg-red-600 text-white hover:bg-red-700"
              }`}
            >
              {isLoading
                ? t.simulation.processing
                : `${transactionType === "BUY" ? t.simulation.buy : t.simulation.sell} ${selectedCrypto}`}
            </button>
          </div>
        </div>
      </div>

      {/* Recent Transactions */}
      <div className="bg-white rounded-2xl p-6 shadow-sm">
        <h2 className="text-xl font-bold text-gray-900 mb-4">
          {t.simulation.recentTransactions}
        </h2>

        {portfolio.transactions.length === 0 ? (
          <div className="text-center py-8 text-gray-600">
            <p>{t.simulation.noTransactions}</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
                    {t.simulation.type}
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
                    {t.simulation.crypto}
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
                    {t.simulation.amount}
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
                    {t.simulation.price}
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
                    {t.simulation.total}
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
                    {t.simulation.date}
                  </th>
                </tr>
              </thead>
              <tbody>
                {portfolio.transactions.map((tx) => (
                  <tr key={tx.id} className="border-b border-gray-100">
                    <td className="py-3 px-4">
                      <span
                        className={`px-2 py-1 rounded text-xs font-semibold ${
                          tx.type === "BUY"
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {tx.type === "BUY"
                          ? t.simulation.buy
                          : t.simulation.sell}
                      </span>
                    </td>
                    <td className="py-3 px-4 font-medium text-gray-900">
                      {tx.symbol}
                    </td>
                    <td className="py-3 px-4 text-gray-700">
                      {tx.amount.toFixed(6)}
                    </td>
                    <td className="py-3 px-4 text-gray-700">
                      ${tx.price.toLocaleString()}
                    </td>
                    <td className="py-3 px-4 font-medium text-gray-900">
                      ${tx.total.toLocaleString()}
                    </td>
                    <td className="py-3 px-4 text-gray-600 text-sm">
                      {new Date(tx.createdAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Disclaimer */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6">
        <p className="text-sm text-yellow-800">{t.simulation.disclaimer}</p>
      </div>
    </div>
  );
}
