import { describe, it, expect } from "vitest";

describe("API Keys Validation", () => {
  it("should have Google API key configured", () => {
    const googleKey = process.env.GOOGLE_API_KEY;
    expect(googleKey).toBeDefined();
    expect(googleKey).toMatch(/^Alza/); // Google API keys start with "Alza"
    expect(googleKey?.length).toBeGreaterThanOrEqual(30);
  });

  it("should have Mailchimp API key configured", () => {
    const mailchimpKey = process.env.MAILCHIMP_API_KEY;
    expect(mailchimpKey).toBeDefined();
    expect(mailchimpKey).toMatch(/^hf_/); // Mailchimp keys start with "hf_"
    expect(mailchimpKey?.length).toBeGreaterThan(20);
  });

  it("should have Stripe keys configured", () => {
    const publishableKey = process.env.VITE_STRIPE_PUBLISHABLE_KEY;
    const secretKey = process.env.STRIPE_SECRET_KEY;
    
    expect(publishableKey).toBeDefined();
    expect(secretKey).toBeDefined();
    expect(publishableKey).toMatch(/^pk_test_/);
    expect(secretKey).toMatch(/^sk_test_/);
  });

  it("API keys should not be empty", () => {
    const keys = [
      process.env.GOOGLE_API_KEY,
      process.env.MAILCHIMP_API_KEY,
      process.env.VITE_STRIPE_PUBLISHABLE_KEY,
      process.env.STRIPE_SECRET_KEY,
    ];

    keys.forEach((key) => {
      expect(key).toBeTruthy();
      expect(key?.length).toBeGreaterThan(0);
    });
  });
});
