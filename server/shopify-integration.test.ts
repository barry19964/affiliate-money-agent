import { describe, it, expect } from "vitest";

describe("Shopify Integration", () => {
  it("should have valid Shopify credentials", () => {
    const storeName = process.env.SHOPIFY_STORE_NAME;
    const accessToken = process.env.SHOPIFY_ACCESS_TOKEN;

    expect(storeName).toBeDefined();
    expect(accessToken).toBeDefined();
    expect(storeName).toContain("myshopify.com");
    expect(accessToken).toMatch(/^shpss_/);
  });

  it("should validate Shopify API connection", async () => {
    const storeName = process.env.SHOPIFY_STORE_NAME;
    const accessToken = process.env.SHOPIFY_ACCESS_TOKEN;

    if (!storeName || !accessToken) {
      expect(true).toBe(true); // Skip if not configured
      return;
    }

    try {
      const response = await fetch(`https://${storeName}/admin/api/2024-01/shop.json`, {
        method: "GET",
        headers: {
          "X-Shopify-Access-Token": accessToken,
          "Content-Type": "application/json",
        },
      });

      expect(response.status).toBe(200);
      const data = await response.json();
      expect(data.shop).toBeDefined();
      expect(data.shop.name).toBeDefined();
      console.log(`✅ Shopify Store Connected: ${data.shop.name}`);
    } catch (error) {
      console.error("❌ Shopify Connection Failed:", error);
      throw error;
    }
  });
});
