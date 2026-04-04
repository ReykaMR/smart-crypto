// Server-side i18n utilities
import "server-only";
import { cookies } from "next/headers";
import { translations, type Language, type Translation } from "./i18n";

export async function getServerLanguage(): Promise<Language> {
  const cookieStore = await cookies();
  const languageCookie = cookieStore.get("language")?.value;

  if (languageCookie === "id" || languageCookie === "en") {
    return languageCookie;
  }

  return "id"; // Default to Indonesian
}

export async function getServerTranslations(): Promise<Translation> {
  const language = await getServerLanguage();
  return translations[language];
}

export async function t(key: string): Promise<string> {
  const language = await getServerLanguage();
  const keys = key.split(".");
  let value: unknown = translations[language];

  for (const k of keys) {
    if (value && typeof value === "object" && k in value) {
      value = (value as Record<string, unknown>)[k];
    } else {
      return key;
    }
  }

  return typeof value === "string" ? value : key;
}
