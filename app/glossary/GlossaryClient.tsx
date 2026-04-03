"use client";

import { useState } from "react";
import { GlossaryTerm } from "@prisma/client";
import { useLanguage } from "@/lib/i18n";
import Link from "next/link";

interface GlossaryClientProps {
  terms: GlossaryTerm[];
  isLoggedIn: boolean;
}

export default function GlossaryClient({
  terms,
  isLoggedIn,
}: GlossaryClientProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [expandedTerm, setExpandedTerm] = useState<string | null>(null);
  const { t } = useLanguage();

  const categories = Array.from(
    new Set(terms.map((t) => t.category).filter(Boolean)),
  );

  const filteredTerms = terms.filter((term) => {
    const matchesSearch =
      term.term.toLowerCase().includes(searchQuery.toLowerCase()) ||
      term.definition.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      !selectedCategory || term.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <div>
      {/* Search Bar */}
      <div className="mb-8">
        <div className="relative">
          <input
            type="text"
            placeholder={t.glossary.searchPlaceholder}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-6 py-4 pl-12 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
          />
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-2xl">
            🔍
          </span>
        </div>
      </div>

      {/* Category Filters */}
      {categories.length > 0 && (
        <div className="mb-8 flex flex-wrap gap-2">
          <button
            onClick={() => setSelectedCategory(null)}
            className={`px-4 py-2 rounded-lg font-medium transition-all ${
              selectedCategory === null
                ? "bg-blue-600 text-white"
                : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-200"
            }`}
          >
            {t.glossary.allCategories}
          </button>
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                selectedCategory === category
                  ? "bg-blue-600 text-white"
                  : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-200"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      )}

      {/* Results Count */}
      <div className="mb-6 text-gray-600">
        {t.glossary.displaying} {filteredTerms.length} {t.glossary.from}{" "}
        {terms.length} {t.glossary.terms}
      </div>

      {/* Terms List */}
      <div className="space-y-4">
        {filteredTerms.map((term) => (
          <div
            key={term.id}
            className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-md transition-all"
          >
            <button
              onClick={() =>
                setExpandedTerm(expandedTerm === term.id ? null : term.id)
              }
              className="w-full px-6 py-4 flex items-center justify-between text-left"
            >
              <div>
                <h3 className="text-lg font-semibold text-gray-900">
                  {term.term}
                </h3>
                {term.category && (
                  <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded mt-1 inline-block">
                    {term.category}
                  </span>
                )}
              </div>
              <span
                className={`transform transition-transform ${
                  expandedTerm === term.id ? "rotate-180" : ""
                }`}
              >
                ▼
              </span>
            </button>

            {expandedTerm === term.id && (
              <div className="px-6 pb-6 border-t border-gray-100">
                <div className="pt-4">
                  <p className="text-gray-700 mb-4">{term.definition}</p>
                  {term.example && (
                    <div className="bg-gray-50 rounded-lg p-4">
                      <p className="text-sm text-gray-600">
                        <span className="font-semibold">
                          {t.glossary.example}:
                        </span>{" "}
                        {term.example}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {filteredTerms.length === 0 && (
        <div className="text-center py-12">
          <div className="text-4xl mb-4">🔍</div>
          <p className="text-gray-600">{t.glossary.notFound}</p>
        </div>
      )}

      {!isLoggedIn && (
        <div className="mt-12 bg-blue-50 border border-blue-200 rounded-xl p-6 text-center">
          <p className="text-gray-700 mb-4">{t.glossary.loginCTA}</p>
          <Link
            href="/register"
            className="inline-flex bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-all"
          >
            {t.glossary.registerNow}
          </Link>
        </div>
      )}
    </div>
  );
}
