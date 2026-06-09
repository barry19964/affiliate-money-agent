import { invokeLLM } from "../_core/llm";

export interface DigitalProduct {
  id: string;
  type: "ebook" | "course" | "template" | "tool";
  title: string;
  description: string;
  price: number;
  currency: string;
  content: string;
  downloadUrl?: string;
  createdAt: Date;
  sales: number;
  revenue: number;
}

export interface ProductSalesPage {
  headline: string;
  subheadline: string;
  benefits: string[];
  features: string[];
  socialProof: string;
  cta: string;
  price: string;
  guarantee: string;
}

/**
 * Generiert automatisch digitale Produkte aus Blog-Inhalten
 */
export async function generateDigitalProduct(
  blogTitle: string,
  blogContent: string,
  productType: "ebook" | "course" | "template" | "tool"
): Promise<DigitalProduct> {
  const prompt = `Create a high-value ${productType} based on this blog article:

Title: "${blogTitle}"
Content: "${blogContent.substring(0, 500)}..."

Requirements:
- Title: Catchy, benefit-focused (max 60 chars)
- Description: Compelling, 100-150 words
- Price: Realistic for ${productType} (suggest price)
- Content: Detailed outline/structure

Format as JSON with keys: title, description, price, content`;

  const response = await invokeLLM({
    messages: [
      {
        role: "system",
        content: `You are an expert digital product creator. Create ${productType}s that solve real problems and command premium prices. Focus on transformation and results.`,
      },
      {
        role: "user",
        content: prompt,
      },
    ],
  });

  try {
    const content = typeof response.choices[0]?.message?.content === "string"
      ? response.choices[0].message.content
      : "";

    const jsonMatch = content.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error("No JSON found in response");
    }

    const data = JSON.parse(jsonMatch[0]) as {
      title: string;
      description: string;
      price: number;
      content: string;
    };

    return {
      id: `prod_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      type: productType,
      title: data.title,
      description: data.description,
      price: data.price,
      currency: "EUR",
      content: data.content,
      createdAt: new Date(),
      sales: 0,
      revenue: 0,
    };
  } catch (error) {
    console.error("Failed to generate digital product:", error);
    throw error;
  }
}

/**
 * Generiert eine hochkonvertierende Sales Page
 */
export async function generateSalesPage(
  product: DigitalProduct
): Promise<ProductSalesPage> {
  const prompt = `Create a high-converting sales page for this ${product.type}:

Title: "${product.title}"
Description: "${product.description}"
Price: €${product.price}

Generate:
- Compelling headline (under 60 chars)
- Subheadline (under 100 chars)
- 5 key benefits
- 5 key features
- Social proof statement
- CTA button text
- Money-back guarantee

Format as JSON`;

  const response = await invokeLLM({
    messages: [
      {
        role: "system",
        content: "You are a conversion copywriter expert. Create sales pages that convert 5-10% of visitors. Use proven psychological triggers.",
      },
      {
        role: "user",
        content: prompt,
      },
    ],
  });

  try {
    const content = typeof response.choices[0]?.message?.content === "string"
      ? response.choices[0].message.content
      : "";

    const jsonMatch = content.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error("No JSON found in response");
    }

    return JSON.parse(jsonMatch[0]) as ProductSalesPage;
  } catch (error) {
    console.error("Failed to generate sales page:", error);
    throw error;
  }
}

/**
 * Berechnet optimale Produktpreise basierend auf Markt
 */
export function calculateOptimalPrice(
  productType: string,
  targetAudience: string
): number {
  const priceRanges: Record<string, Record<string, [number, number]>> = {
    ebook: {
      general: [9, 29],
      premium: [29, 99],
      enterprise: [99, 299],
    },
    course: {
      general: [29, 99],
      premium: [99, 297],
      enterprise: [297, 997],
    },
    template: {
      general: [19, 49],
      premium: [49, 149],
      enterprise: [149, 499],
    },
    tool: {
      general: [9, 29],
      premium: [29, 99],
      enterprise: [99, 499],
    },
  };

  const range = priceRanges[productType]?.[targetAudience] || [19, 99];
  return Math.round((range[0] + range[1]) / 2);
}

/**
 * Berechnet Umsatzpotential
 */
export function calculateRevenueProjection(
  monthlyVisitors: number,
  conversionRate: number,
  averagePrice: number
): {
  monthlyRevenue: number;
  annualRevenue: number;
  breakeven: number;
} {
  const monthlySales = monthlyVisitors * (conversionRate / 100);
  const monthlyRevenue = monthlySales * averagePrice;
  const annualRevenue = monthlyRevenue * 12;

  return {
    monthlyRevenue: Math.round(monthlyRevenue),
    annualRevenue: Math.round(annualRevenue),
    breakeven: Math.ceil(100 / (conversionRate * averagePrice)),
  };
}

/**
 * Generiert Upsell-Strategien
 */
export function generateUpsellStrategy(
  mainProduct: DigitalProduct
): {
  upsell: DigitalProduct;
  crosssell: DigitalProduct;
  strategy: string;
}[] {
  return [
    {
      upsell: {
        ...mainProduct,
        id: `upsell_${mainProduct.id}`,
        title: `${mainProduct.title} - Premium Bundle`,
        price: mainProduct.price * 2.5,
        type: "course",
      },
      crosssell: {
        ...mainProduct,
        id: `cross_${mainProduct.id}`,
        title: `Companion ${mainProduct.type === "ebook" ? "Course" : "Template"}`,
        price: mainProduct.price * 0.7,
        type: mainProduct.type === "ebook" ? "course" : "template",
      },
      strategy: "Offer upsell immediately after purchase, crosssell via email",
    },
  ];
}
