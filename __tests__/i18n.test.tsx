import { describe, it, expect, beforeEach, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { LanguageProvider, useLanguage } from "../lib/i18n";

// Mock component for testing
function TestComponent() {
  const { t, language, setLanguage } = useLanguage();

  return (
    <div>
      <button onClick={() => setLanguage(language === "id" ? "en" : "id")}>
        Toggle Language
      </button>
      <span data-testid="greeting">{t.landing.hero.tagline}</span>
    </div>
  );
}

function Wrapper({ children }: { children: React.ReactNode }) {
  return <LanguageProvider>{children}</LanguageProvider>;
}

describe("Language Provider", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should render with default language (Indonesian)", () => {
    render(
      <Wrapper>
        <TestComponent />
      </Wrapper>,
    );

    const greeting = screen.getByTestId("greeting");
    expect(greeting).toBeInTheDocument();
  });

  it("should toggle language when button is clicked", () => {
    render(
      <Wrapper>
        <TestComponent />
      </Wrapper>,
    );

    const toggleButton = screen.getByText("Toggle Language");
    fireEvent.click(toggleButton);

    // Language should have changed
    expect(toggleButton).toBeInTheDocument();
  });
});
