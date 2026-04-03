"use client";

import { useState } from "react";
import { submitContactForm } from "@/app/actions/contact";
import { useLanguage } from "@/lib/i18n";
import Link from "next/link";

interface AboutClientProps {
  isLoggedIn: boolean;
}

export default function AboutClient({ isLoggedIn }: AboutClientProps) {
  const { t } = useLanguage();

  return (
    <div className="space-y-12">
      {/* About Section */}
      <section className="bg-white rounded-2xl p-8 shadow-sm">
        <h1 className="text-4xl font-bold text-gray-900 mb-6">
          {t.about.about.title}
        </h1>

        <div className="prose prose-lg max-w-none">
          <p className="text-gray-700 leading-relaxed mb-4">
            {t.about.about.p1}
          </p>

          <p className="text-gray-700 leading-relaxed mb-4">
            {t.about.about.p2}
          </p>

          <ul className="space-y-2 mb-6">
            <li className="flex items-start gap-2">
              <span className="text-green-500 mt-1">✓</span>
              <span>
                <strong>{t.about.about.easyToUnderstand}:</strong>{" "}
                {t.about.about.easyToUnderstandDesc}
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-500 mt-1">✓</span>
              <span>
                <strong>{t.about.about.structured}:</strong>{" "}
                {t.about.about.structuredDesc}
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-500 mt-1">✓</span>
              <span>
                <strong>{t.about.about.safe}:</strong> {t.about.about.safeDesc}
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-500 mt-1">✓</span>
              <span>
                <strong>{t.about.about.free}:</strong> {t.about.about.freeDesc}
              </span>
            </li>
          </ul>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
            {t.about.about.mission}
          </h2>
          <p className="text-gray-700 leading-relaxed">{t.about.about.team}</p>
        </div>
      </section>

      {/* Disclaimer Section */}
      <section className="bg-amber-50 border-2 border-amber-200 rounded-2xl p-8">
        <div className="flex items-start gap-4 mb-6">
          <span className="text-4xl">⚠️</span>
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              {t.about.disclaimer.title}
            </h2>

            <div className="prose prose-amber max-w-none">
              <p className="text-amber-900 leading-relaxed mb-4">
                <strong>{t.about.disclaimer.education.split(":")[0]}:</strong>{" "}
                {t.about.disclaimer.education.split(":")[1]}
              </p>

              <p className="text-amber-900 leading-relaxed mb-4">
                <strong>{t.about.disclaimer.risk.split(":")[0]}:</strong>{" "}
                {t.about.disclaimer.risk.split(":")[1]}
              </p>

              <p className="text-amber-900 leading-relaxed mb-4">
                <strong>{t.about.disclaimer.dyor.split(":")[0]}:</strong>{" "}
                {t.about.disclaimer.dyor.split(":")[1]}
              </p>

              <p className="text-amber-900 leading-relaxed mb-4">
                <strong>{t.about.disclaimer.liability.split(":")[0]}:</strong>{" "}
                {t.about.disclaimer.liability.split(":")[1]}
              </p>

              <p className="text-amber-900 leading-relaxed">
                <strong>
                  {t.about.disclaimer.professional.split(":")[0]}:
                </strong>{" "}
                {t.about.disclaimer.professional.split(":")[1]}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="bg-white rounded-2xl p-8 shadow-sm">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          {t.about.contact.title}
        </h2>

        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">
              {t.about.contact.info}
            </h3>

            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <span className="text-2xl">📧</span>
                <div>
                  <p className="font-medium text-gray-900">
                    {t.about.contact.email}
                  </p>
                  <p className="text-gray-600">hello@smartcrypto.com</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <span className="text-2xl">📍</span>
                <div>
                  <p className="font-medium text-gray-900">
                    {t.about.contact.location}
                  </p>
                  <p className="text-gray-600">Indonesia</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <span className="text-2xl">💬</span>
                <div>
                  <p className="font-medium text-gray-900">
                    {t.about.contact.responseTime}
                  </p>
                  <p className="text-gray-600">
                    1-2{" "}
                    {t.about.contact.responseTime
                      .toLowerCase()
                      .includes("waktu")
                      ? ""
                      : "business days"}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <ContactForm isLoggedIn={isLoggedIn} />
        </div>
      </section>

      {/* FAQ Section */}
      <section className="bg-white rounded-2xl p-8 shadow-sm">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          {t.about.faq.title}
        </h2>

        <div className="space-y-6">
          <FaqItem question={t.about.faq.q1} answer={t.about.faq.a1} />
          <FaqItem question={t.about.faq.q2} answer={t.about.faq.a2} />
          <FaqItem question={t.about.faq.q3} answer={t.about.faq.a3} />
          <FaqItem question={t.about.faq.q4} answer={t.about.faq.a4} />
          <FaqItem question={t.about.faq.q5} answer={t.about.faq.a5} />
        </div>
      </section>
    </div>
  );
}

function FaqItem({ question, answer }: { question: string; answer: string }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border border-gray-200 rounded-xl overflow-hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-6 py-4 flex items-center justify-between bg-gray-50 hover:bg-gray-100 transition-all"
      >
        <span className="font-semibold text-gray-900 text-left">
          {question}
        </span>
        <span
          className={`transform transition-transform ${isOpen ? "rotate-180" : ""}`}
        >
          ▼
        </span>
      </button>
      {isOpen && (
        <div className="px-6 py-4 bg-white">
          <p className="text-gray-700">{answer}</p>
        </div>
      )}
    </div>
  );
}

function ContactForm({ isLoggedIn }: { isLoggedIn: boolean }) {
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const { t } = useLanguage();

  const handleSubmit = async (formData: FormData) => {
    setStatus("loading");
    const result = await submitContactForm(formData);
    setStatus(result.success ? "success" : "error");

    if (result.success) {
      setTimeout(() => setStatus("idle"), 3000);
    }
  };

  if (!isLoggedIn) {
    return (
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 text-center">
        <p className="text-blue-900 mb-4">{t.about.contact.loginToContact}</p>
        <Link
          href="/login"
          className="inline-flex bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-all"
        >
          {t.about.contact.login}
        </Link>
      </div>
    );
  }

  return (
    <form action={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {t.about.contact.name}
        </label>
        <input
          name="name"
          type="text"
          required
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder={t.about.contact.namePlaceholder}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {t.about.contact.emailLabel}
        </label>
        <input
          name="email"
          type="email"
          required
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder={t.about.contact.emailPlaceholder}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {t.about.contact.subject}
        </label>
        <select
          name="subject"
          required
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="">{t.about.contact.subjectPlaceholder}</option>
          <option value="general">{t.about.contact.generalSubject}</option>
          <option value="technical">{t.about.contact.technicalSubject}</option>
          <option value="content">{t.about.contact.contentSubject}</option>
          <option value="partnership">
            {t.about.contact.partnershipSubject}
          </option>
          <option value="other">{t.about.contact.otherSubject}</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {t.about.contact.message}
        </label>
        <textarea
          name="message"
          required
          rows={4}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder={t.about.contact.messagePlaceholder}
        />
      </div>

      <button
        type="submit"
        disabled={status === "loading"}
        className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {status === "loading" ? t.about.contact.sending : t.about.contact.send}
      </button>

      {status === "success" && (
        <div className="p-3 bg-green-50 border border-green-200 text-green-700 rounded-lg text-sm text-center">
          {t.about.contact.success}
        </div>
      )}

      {status === "error" && (
        <div className="p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm text-center">
          {t.about.contact.error}
        </div>
      )}
    </form>
  );
}
