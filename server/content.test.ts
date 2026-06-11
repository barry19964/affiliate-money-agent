import { describe, expect, it } from "vitest";
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";

type AuthenticatedUser = NonNullable<TrpcContext["user"]>;

function createAuthContext(userId: number = 1): TrpcContext {
  const user: AuthenticatedUser = {
    id: userId,
    openId: `user-${userId}`,
    email: `user${userId}@example.com`,
    name: `Test User ${userId}`,
    loginMethod: "manus",
    role: "user",
    createdAt: new Date(),
    updatedAt: new Date(),
    lastSignedIn: new Date(),
  };

  return {
    user,
    req: {
      protocol: "https",
      headers: {},
    } as TrpcContext["req"],
    res: {
      clearCookie: () => {},
    } as TrpcContext["res"],
  };
}

describe("Content Router - Basic Operations", () => {
  it("should list content without errors", async () => {
    const ctx = createAuthContext(1);
    const caller = appRouter.createCaller(ctx);

    const content = await caller.content.list();
    expect(Array.isArray(content)).toBe(true);
  }, { timeout: 15000 });
});

describe("Metrics Router - Basic Operations", () => {
  it("should get user metrics without errors", async () => {
    const ctx = createAuthContext(1);
    const caller = appRouter.createCaller(ctx);

    const metrics = await caller.metrics.getUserMetrics();
    expect(metrics).toBeDefined();
    expect(typeof metrics.totalClicks).toBe("number");
    expect(typeof metrics.totalEarnings).toBe("number");
  });
});

describe("Affiliate Router - Basic Operations", () => {
  it("should list affiliate programs without errors", async () => {
    const ctx = createAuthContext(1);
    const caller = appRouter.createCaller(ctx);

    const programs = await caller.affiliate.list();
    expect(Array.isArray(programs)).toBe(true);
  });
});

describe("Config Router - Basic Operations", () => {
  it("should get user config without errors", async () => {
    const ctx = createAuthContext(1);
    const caller = appRouter.createCaller(ctx);

    const config = await caller.config.get();
    expect(config).toBeDefined();
  });
});

describe("Auth Router - Logout", () => {
  it("should logout user successfully", async () => {
    const ctx = createAuthContext(1);
    const caller = appRouter.createCaller(ctx);

    const result = await caller.auth.logout();
    expect(result.success).toBe(true);
  });
});
