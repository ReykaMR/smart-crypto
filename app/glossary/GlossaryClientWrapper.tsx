"use client";

import { useLanguage } from "@/lib/i18n";
import GlossaryClient from "./GlossaryClient";
import { GlossaryTerm } from "@prisma/client";

interface GlossaryClientWrapperProps {
  terms: GlossaryTerm[];
  isLoggedIn: boolean;
}

export default function GlossaryClientWrapper({
  terms,
  isLoggedIn,
}: GlossaryClientWrapperProps) {
  const { t } = useLanguage();

  return (
    <>
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          {t.glossary.title}
        </h1>
        <p className="text-xl text-gray-600">{t.glossary.subtitle}</p>
      </div>

      <GlossaryClient terms={terms} isLoggedIn={isLoggedIn} />
    </>
  );
}
