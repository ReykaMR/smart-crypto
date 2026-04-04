"use client";

import Link from "next/link";
import dynamic from "next/dynamic";
import { useLanguage } from "@/lib/i18n";

// Dynamic imports for heavy animation components
const FadeIn = dynamic(
  () => import("@/components/AnimatedComponents").then((mod) => mod.FadeIn),
  {
    ssr: false,
    loading: () => (
      <div className="animate-pulse h-8 bg-gray-200 rounded mb-4" />
    ),
  },
);

const AnimatedButton = dynamic(
  () =>
    import("@/components/AnimatedComponents").then((mod) => mod.AnimatedButton),
  {
    ssr: false,
    loading: () => (
      <button className="px-6 py-3 bg-gray-200 rounded-lg animate-pulse">
        Loading...
      </button>
    ),
  },
);

export default function HomePageClient() {
  const { t } = useLanguage();

  return (
    <>
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4" aria-label="Hero section">
        <div className="max-w-6xl mx-auto text-center">
          <FadeIn direction="down">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-medium mb-6">
              {t.landing.hero.tagline}
            </div>
          </FadeIn>
          <FadeIn delay={0.1}>
            <h1
              className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight whitespace-pre-line"
              id="hero-title"
            >
              {t.landing.hero.title}
            </h1>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p
              className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto"
              id="hero-description"
            >
              {t.landing.hero.subtitle}
            </p>
          </FadeIn>
          <FadeIn delay={0.3}>
            <div
              className="flex flex-col sm:flex-row gap-4 justify-center"
              role="group"
              aria-label="Call to action buttons"
            >
              <AnimatedButton
                href="/register"
                variant="primary"
                aria-label={t.landing.hero.cta}
              >
                {t.landing.hero.cta}
              </AnimatedButton>
              <AnimatedButton
                href="#features"
                variant="outline"
                aria-label={t.landing.hero.learnMore}
              >
                {t.landing.hero.learnMore}
              </AnimatedButton>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600 mb-2">10+</div>
              <div className="text-gray-600">{t.landing.stats.modules}</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600 mb-2">50+</div>
              <div className="text-gray-600">{t.landing.stats.lessons}</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600 mb-2">100+</div>
              <div className="text-gray-600">{t.landing.stats.terms}</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600 mb-2">100%</div>
              <div className="text-gray-600">{t.landing.stats.free}</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              {t.landing.features.title}
            </h2>
            <p className="text-xl text-gray-600">
              {t.landing.features.subtitle}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard
              icon="📚"
              title={t.landing.features.stepByStep}
              description={t.landing.features.stepByStepDesc}
            />
            <FeatureCard
              icon="✅"
              title={t.landing.features.quiz}
              description={t.landing.features.quizDesc}
            />
            <FeatureCard
              icon="📊"
              title={t.landing.features.progress}
              description={t.landing.features.progressDesc}
            />
            <FeatureCard
              icon="📱"
              title={t.landing.features.flexible}
              description={t.landing.features.flexibleDesc}
            />
            <FeatureCard
              icon="📖"
              title={t.landing.features.glossary}
              description={t.landing.features.glossaryDesc}
            />
            <FeatureCard
              icon="🎓"
              title={t.landing.features.certificate}
              description={t.landing.features.certificateDesc}
            />
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              {t.landing.howItWorks.title}
            </h2>
            <p className="text-xl text-gray-600">
              {t.landing.howItWorks.subtitle}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <StepCard
              number="01"
              title={t.landing.howItWorks.step1}
              description={t.landing.howItWorks.step1Desc}
            />
            <StepCard
              number="02"
              title={t.landing.howItWorks.step2}
              description={t.landing.howItWorks.step2Desc}
            />
            <StepCard
              number="03"
              title={t.landing.howItWorks.step3}
              description={t.landing.howItWorks.step3Desc}
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-linear-to-r from-blue-600 to-indigo-600 rounded-3xl p-12 text-center text-white">
            <h2 className="text-4xl font-bold mb-4">{t.landing.cta.title}</h2>
            <p className="text-xl text-blue-100 mb-8">
              {t.landing.cta.subtitle}
            </p>
            <Link
              href="/register"
              className="inline-flex items-center justify-center px-8 py-4 bg-white text-blue-600 rounded-xl font-semibold text-lg hover:bg-blue-50 transition-all shadow-lg"
            >
              {t.landing.cta.button}
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 border-t border-gray-200">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-bold text-xl text-gray-900 mb-4">
                Smart Crypto
              </h3>
              <p className="text-gray-600">{t.landing.footer.description}</p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-4">
                {t.landing.footer.navigation}
              </h4>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="#features"
                    className="text-gray-600 hover:text-blue-600"
                  >
                    {t.landing.footer.features}
                  </Link>
                </li>
                <li>
                  <Link
                    href="/glossary"
                    className="text-gray-600 hover:text-blue-600"
                  >
                    {t.landing.footer.glossary}
                  </Link>
                </li>
                <li>
                  <Link
                    href="/about"
                    className="text-gray-600 hover:text-blue-600"
                  >
                    {t.landing.footer.about}
                  </Link>
                </li>
                <li>
                  <Link
                    href="/login"
                    className="text-gray-600 hover:text-blue-600"
                  >
                    {t.landing.footer.login}
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-4">
                {t.landing.footer.legal}
              </h4>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="/privacy"
                    className="text-gray-600 hover:text-blue-600"
                  >
                    {t.landing.footer.privacyPolicy}
                  </Link>
                </li>
                <li>
                  <Link
                    href="/terms"
                    className="text-gray-600 hover:text-blue-600"
                  >
                    {t.landing.footer.termsOfService}
                  </Link>
                </li>
                <li>
                  <Link
                    href="/disclaimer"
                    className="text-gray-600 hover:text-blue-600"
                  >
                    Disclaimer
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-4">
                {t.landing.footer.contact}
              </h4>
              <p className="text-gray-600">
                {t.landing.footer.contactQuestion}
                <br />
                hello@smartcrypto.com
              </p>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-gray-200 text-center text-gray-600">
            <p>{t.landing.footer.disclaimer}</p>
            <p className="mt-4 text-sm">
              © {new Date().getFullYear()} {t.landing.footer.copyright}
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}

function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: string;
  title: string;
  description: string;
}) {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-all border border-gray-100">
      <div className="text-4xl mb-4">{icon}</div>
      <h3 className="text-xl font-semibold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}

function StepCard({
  number,
  title,
  description,
}: {
  number: string;
  title: string;
  description: string;
}) {
  return (
    <div className="text-center">
      <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 text-blue-600 rounded-2xl font-bold text-2xl mb-4">
        {number}
      </div>
      <h3 className="text-xl font-semibold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}
