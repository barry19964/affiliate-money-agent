/**
 * Lead Magnet PDF Generation Module
 * Generates high-quality PDFs for lead magnets and stores them in S3
 */

import { PDFDocument, PDFPage, rgb } from "pdf-lib";
import { storagePut } from "../storage";

export interface PDFConfig {
  title: string;
  subtitle: string;
  sections: PDFSection[];
  author: string;
  createdDate: Date;
}

export interface PDFSection {
  title: string;
  content: string;
  type: "text" | "list" | "table";
  items?: string[];
}

// ============= PDF GENERATION HELPERS =============

export async function generateLeadMagnetPDF(config: PDFConfig): Promise<Buffer> {
  const pdfDoc = await PDFDocument.create();

  // Add cover page
  addCoverPage(pdfDoc, config.title, config.subtitle, config.author);

  // Add table of contents
  addTableOfContents(pdfDoc, config.sections);

  // Add sections
  for (const section of config.sections) {
    addSection(pdfDoc, section);
  }

  // Add footer
  addFooter(pdfDoc);

  const pdfBytes = await pdfDoc.save();
  return Buffer.from(pdfBytes);
}

function addCoverPage(
  pdfDoc: PDFDocument,
  title: string,
  subtitle: string,
  author: string
): void {
  const page = pdfDoc.addPage([612, 792]); // Letter size
  const { width, height } = page.getSize();

  // Background color
  page.drawRectangle({
    x: 0,
    y: 0,
    width,
    height,
    color: rgb(0.05, 0.1, 0.2),
  });

  // Title
  page.drawText(title, {
    x: 50,
    y: height - 150,
    size: 48,
    color: rgb(0.2, 0.6, 1),
    maxWidth: width - 100,
  });

  // Subtitle
  page.drawText(subtitle, {
    x: 50,
    y: height - 250,
    size: 24,
    color: rgb(0.7, 0.7, 0.7),
    maxWidth: width - 100,
  });

  // Author
  page.drawText(`By ${author}`, {
    x: 50,
    y: height - 350,
    size: 14,
    color: rgb(0.5, 0.5, 0.5),
  });

  // Date
  page.drawText(new Date().toLocaleDateString(), {
    x: 50,
    y: height - 380,
    size: 12,
    color: rgb(0.4, 0.4, 0.4),
  });
}

function addTableOfContents(pdfDoc: PDFDocument, sections: PDFSection[]): void {
  const page = pdfDoc.addPage([612, 792]);
  const { width, height } = page.getSize();

  // Title
  page.drawText("Table of Contents", {
    x: 50,
    y: height - 50,
    size: 24,
    color: rgb(0.2, 0.6, 1),
  });

  // Content
  let yPosition = height - 100;
  sections.forEach((section, index) => {
    page.drawText(`${index + 1}. ${section.title}`, {
      x: 70,
      y: yPosition,
      size: 12,
      color: rgb(0.8, 0.8, 0.8),
    });
    yPosition -= 30;
  });
}

function addSection(pdfDoc: PDFDocument, section: PDFSection): void {
  let page = pdfDoc.addPage([612, 792]);
  let { width, height } = page.getSize();
  let yPosition = height - 50;

  // Section title
  page.drawText(section.title, {
    x: 50,
    y: yPosition,
    size: 20,
    color: rgb(0.2, 0.6, 1),
  });
  yPosition -= 40;

  // Section content
  if (section.type === "text") {
    const lines = wrapText(section.content, 80);
    for (const line of lines) {
      if (yPosition < 50) {
        page = pdfDoc.addPage([612, 792]);
        yPosition = height - 50;
      }
      page.drawText(line, {
        x: 50,
        y: yPosition,
        size: 11,
        color: rgb(0.8, 0.8, 0.8),
      });
      yPosition -= 20;
    }
  } else if (section.type === "list" && section.items) {
    for (const item of section.items) {
      if (yPosition < 50) {
        page = pdfDoc.addPage([612, 792]);
        yPosition = height - 50;
      }
      page.drawText(`• ${item}`, {
        x: 70,
        y: yPosition,
        size: 11,
        color: rgb(0.8, 0.8, 0.8),
      });
      yPosition -= 20;
    }
  }
}

function addFooter(pdfDoc: PDFDocument): void {
  const pages = pdfDoc.getPages();
  pages.forEach((page, index) => {
    const { width, height } = page.getSize();
    page.drawText(`Page ${index + 1}`, {
      x: width / 2 - 20,
      y: 20,
      size: 10,
      color: rgb(0.5, 0.5, 0.5),
    });
  });
}

function wrapText(text: string, maxLength: number): string[] {
  const words = text.split(" ");
  const lines: string[] = [];
  let currentLine = "";

  for (const word of words) {
    if ((currentLine + word).length > maxLength) {
      if (currentLine) lines.push(currentLine);
      currentLine = word;
    } else {
      currentLine += (currentLine ? " " : "") + word;
    }
  }
  if (currentLine) lines.push(currentLine);

  return lines;
}

// ============= LEAD MAGNET PDF TEMPLATES =============

export async function generateAIToolsGuidePDF(): Promise<Buffer> {
  const config: PDFConfig = {
    title: "10 AI Tools That Save 10 Hours Per Week",
    subtitle: "Complete Guide to the Best AI Tools for Productivity and Automation",
    author: "Affiliate Money Agent",
    createdDate: new Date(),
    sections: [
      {
        title: "Introduction",
        type: "text",
        content:
          "Artificial Intelligence is revolutionizing how we work. In this guide, you'll discover the 10 best AI tools that can save you 10 hours per week. These tools are proven to boost productivity, automate repetitive tasks, and help you earn more money.",
      },
      {
        title: "Tool #1: ChatGPT - The Ultimate Writing Assistant",
        type: "list",
        items: [
          "Write blog posts, emails, and social media content in seconds",
          "Generate ideas for content, products, and businesses",
          "Learn new topics and get explanations on complex subjects",
          "Average time saved: 3-4 hours per week",
          "Cost: Free or €20/month for ChatGPT Plus",
        ],
      },
      {
        title: "Tool #2: Midjourney - AI Image Generation",
        type: "list",
        items: [
          "Create stunning images for your content without hiring a designer",
          "Generate unlimited variations of your ideas",
          "Perfect for social media, blog posts, and marketing materials",
          "Average time saved: 2-3 hours per week",
          "Cost: €10-96/month",
        ],
      },
      {
        title: "Tool #3: Claude - Advanced AI Writing",
        type: "list",
        items: [
          "More powerful than ChatGPT for complex tasks",
          "Better at reasoning and analysis",
          "Perfect for technical writing and code generation",
          "Average time saved: 2-3 hours per week",
          "Cost: Free or €20/month",
        ],
      },
      {
        title: "Tool #4: Zapier - Workflow Automation",
        type: "list",
        items: [
          "Connect your favorite apps and automate workflows",
          "No coding required - just point and click",
          "Automate repetitive tasks like data entry and email management",
          "Average time saved: 2-3 hours per week",
          "Cost: Free or €19-99/month",
        ],
      },
      {
        title: "Tool #5: Make - Advanced Automation",
        type: "list",
        items: [
          "More powerful than Zapier for complex workflows",
          "Automate multi-step processes",
          "Perfect for scaling your business",
          "Average time saved: 2-3 hours per week",
          "Cost: Free or €9-299/month",
        ],
      },
      {
        title: "How to Combine These Tools for Maximum Efficiency",
        type: "text",
        content:
          "The real power comes from combining these tools. For example: Use ChatGPT to write your blog post, Midjourney to create images, and Zapier to automatically post to social media. This workflow takes 30 minutes instead of 4 hours.",
      },
      {
        title: "Common Mistakes to Avoid",
        type: "list",
        items: [
          "Don't rely on AI 100% - always review and edit the output",
          "Don't use the same prompts for everything - customize them",
          "Don't ignore the learning curve - invest time to master the tools",
          "Don't forget about data privacy - be careful what you share",
        ],
      },
      {
        title: "Next Steps",
        type: "text",
        content:
          "Start with ChatGPT today. Spend 1 hour exploring what it can do. Then add Midjourney next week. Gradually build your AI toolkit. Within a month, you'll save 10+ hours per week and be able to focus on what really matters.",
      },
    ],
  };

  return generateLeadMagnetPDF(config);
}

export async function generateCryptoBeginnersChecklistPDF(): Promise<Buffer> {
  const config: PDFConfig = {
    title: "Crypto Investment Beginner's Checklist",
    subtitle: "Step-by-Step Guide to Starting Your Crypto Investment Journey",
    author: "Affiliate Money Agent",
    createdDate: new Date(),
    sections: [
      {
        title: "Before You Start",
        type: "list",
        items: [
          "☐ Understand that crypto is volatile and risky",
          "☐ Only invest money you can afford to lose",
          "☐ Learn the basics of blockchain technology",
          "☐ Research different cryptocurrencies",
        ],
      },
      {
        title: "Step 1: Choose a Crypto Exchange",
        type: "list",
        items: [
          "☐ Research the top exchanges (Coinbase, Kraken, Binance)",
          "☐ Compare fees, security, and user experience",
          "☐ Choose the one that best fits your needs",
          "☐ Create an account",
        ],
      },
      {
        title: "Step 2: Verify Your Identity",
        type: "list",
        items: [
          "☐ Prepare your ID (passport or driver's license)",
          "☐ Take a selfie for facial recognition",
          "☐ Complete the KYC (Know Your Customer) process",
          "☐ Wait for verification (usually 1-24 hours)",
        ],
      },
      {
        title: "Step 3: Fund Your Account",
        type: "list",
        items: [
          "☐ Link your bank account or credit card",
          "☐ Start with a small amount (€50-100)",
          "☐ Understand the fees involved",
          "☐ Complete your first deposit",
        ],
      },
      {
        title: "Step 4: Buy Your First Crypto",
        type: "list",
        items: [
          "☐ Start with Bitcoin or Ethereum (most stable)",
          "☐ Use limit orders instead of market orders",
          "☐ Don't invest all your money at once",
          "☐ Dollar-cost average (invest small amounts regularly)",
        ],
      },
      {
        title: "Step 5: Secure Your Assets",
        type: "list",
        items: [
          "☐ Enable two-factor authentication (2FA)",
          "☐ Use a strong, unique password",
          "☐ Consider a hardware wallet for large amounts",
          "☐ Never share your private keys",
        ],
      },
      {
        title: "Step 6: Understand Wallets",
        type: "list",
        items: [
          "☐ Learn the difference between hot and cold wallets",
          "☐ Set up a hardware wallet if you have significant holdings",
          "☐ Backup your seed phrase in a safe place",
          "☐ Test your backup by recovering your wallet",
        ],
      },
      {
        title: "Common Mistakes to Avoid",
        type: "list",
        items: [
          "☐ Don't FOMO (Fear of Missing Out) - invest based on research",
          "☐ Don't share your seed phrase with anyone",
          "☐ Don't invest more than you can afford to lose",
          "☐ Don't panic sell during market downturns",
        ],
      },
      {
        title: "Tax Considerations",
        type: "text",
        content:
          "In most countries, crypto transactions are taxable events. Keep records of all your trades. Consult with a tax professional to understand your obligations.",
      },
      {
        title: "Resources & Next Steps",
        type: "list",
        items: [
          "☐ Join crypto communities on Reddit and Discord",
          "☐ Follow crypto news on CoinMarketCap and CoinGecko",
          "☐ Read whitepapers of projects you're interested in",
          "☐ Start small and learn as you go",
        ],
      },
    ],
  };

  return generateLeadMagnetPDF(config);
}

export async function generateChatGPTPromptsLibraryPDF(): Promise<Buffer> {
  const config: PDFConfig = {
    title: "Complete ChatGPT Prompt Library",
    subtitle: "100+ Proven ChatGPT Prompts for Business, Marketing, and Content Creation",
    author: "Affiliate Money Agent",
    createdDate: new Date(),
    sections: [
      {
        title: "Introduction",
        type: "text",
        content:
          "ChatGPT is incredibly powerful, but only if you know how to use it. This library contains 100+ proven prompts that will help you generate high-quality content, ideas, and solutions in seconds.",
      },
      {
        title: "Content Creation Prompts",
        type: "list",
        items: [
          'Write a 500-word blog post about [topic] in [style]',
          'Create 10 social media post ideas for [product/service]',
          'Write an email subject line that will get [percentage]% open rate',
          'Generate 5 catchy product names for [description]',
          'Write a product description that converts',
        ],
      },
      {
        title: "Business & Marketing Prompts",
        type: "list",
        items: [
          'Create a marketing strategy for [business type]',
          'Generate 10 ways to increase sales by [percentage]%',
          'Write a business plan for [business idea]',
          'Create a customer persona for [target audience]',
          'Generate 5 pricing strategies for [product/service]',
        ],
      },
      {
        title: "Writing & Copywriting Prompts",
        type: "list",
        items: [
          'Rewrite this text to be more persuasive: [text]',
          'Create a compelling headline for [topic]',
          'Write a sales page for [product]',
          'Generate 5 call-to-action variations',
          'Improve the tone of this email: [email]',
        ],
      },
      {
        title: "Learning & Research Prompts",
        type: "list",
        items: [
          'Explain [complex topic] in simple terms',
          'Create a study guide for [subject]',
          'Generate 10 interview questions for [position]',
          'Summarize this text in [number] words: [text]',
          'Create a pros and cons list for [topic]',
        ],
      },
      {
        title: "Tips for Better Results",
        type: "list",
        items: [
          "Be specific - the more details, the better the output",
          "Give context - explain what you're trying to achieve",
          "Iterate - refine your prompts based on results",
          "Use examples - show ChatGPT what you want",
          "Ask follow-up questions - dig deeper into topics",
        ],
      },
    ],
  };

  return generateLeadMagnetPDF(config);
}

// ============= STORAGE INTEGRATION =============

export async function savePDFToStorage(
  pdfBuffer: Buffer,
  filename: string,
  contentType: string = "application/pdf"
): Promise<{ key: string; url: string }> {
  return storagePut(`lead-magnets/${filename}`, pdfBuffer, contentType);
}

export async function generateAndStorePDF(
  pdfGenerator: () => Promise<Buffer>,
  filename: string
): Promise<{ key: string; url: string }> {
  const pdfBuffer = await pdfGenerator();
  return savePDFToStorage(pdfBuffer, filename);
}
