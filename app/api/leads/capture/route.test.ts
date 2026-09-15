/**
 * Test: /api/leads/capture Route Handler
 * Critical path: Lead generation API endpoint
 */

import { beforeEach, describe, expect, it, vi } from "vitest";
import { POST } from "./route";

const mockFub = {
  findPerson: vi.fn(),
  upsertPerson: vi.fn(),
  addTag: vi.fn(),
  createEvent: vi.fn(),
};

vi.mock("@/lib/fub/client", () => ({
  FollowUpBossClient: vi.fn(function FollowUpBossClient() {
    return mockFub;
  }),
}));

describe("POST /api/leads/capture", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockFub.findPerson.mockResolvedValue(null);
    mockFub.upsertPerson.mockResolvedValue({ id: "lead-123" });
    mockFub.addTag.mockResolvedValue(undefined);
    mockFub.createEvent.mockResolvedValue({ id: "evt-1" });
  });

  it("creates lead with valid data", async () => {
    const request = new Request("http://localhost:3000/api/leads/capture", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        firstName: "John",
        lastName: "Doe",
        email: "john@example.com",
        phone: "7025551234",
        message: "Interested in buying",
        source: "website-form",
        stage: "New Lead",
        tags: ["website"],
      }),
    });

    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data.success).toBe(true);
    expect(data.leadId).toBe("lead-123");
    expect(mockFub.upsertPerson).toHaveBeenCalledWith(
      expect.objectContaining({
        name: "John Doe",
        emails: [{ value: "john@example.com" }],
      }),
    );
  });

  it("returns 400 for missing required fields", async () => {
    const request = new Request("http://localhost:3000/api/leads/capture", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        phone: "7025551234",
      }),
    });

    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(400);
    expect(data.error).toContain("required");
  });

  it("returns 400 for invalid email", async () => {
    const request = new Request("http://localhost:3000/api/leads/capture", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        firstName: "John",
        lastName: "Doe",
        email: "invalid-email",
        phone: "7025551234",
      }),
    });

    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(400);
    expect(data.error).toContain("email");
  });

  it("handles FUB API errors gracefully", async () => {
    mockFub.upsertPerson.mockRejectedValueOnce(
      new Error("FUB API unavailable"),
    );

    const request = new Request("http://localhost:3000/api/leads/capture", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        firstName: "John",
        lastName: "Doe",
        email: "john@example.com",
      }),
    });

    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(500);
    expect(data.error).toBeDefined();
  });

  it("enriches lead with source and tags", async () => {
    const request = new Request("http://localhost:3000/api/leads/capture", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        firstName: "Jane",
        lastName: "Smith",
        email: "jane@example.com",
        source: "hero-section",
        stage: "Hot Lead",
        tags: ["website", "hero-cta", "q1-2026"],
      }),
    });

    await POST(request);

    expect(mockFub.upsertPerson).toHaveBeenCalledWith(
      expect.objectContaining({
        source: "hero-section",
        stage: "Hot Lead",
      }),
    );
    expect(mockFub.addTag).toHaveBeenCalled();
  });

  it("handles property search criteria", async () => {
    const request = new Request("http://localhost:3000/api/leads/capture", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        firstName: "Buyer",
        lastName: "Jones",
        email: "buyer@example.com",
        priceMin: 400000,
        priceMax: 600000,
        bedrooms: 3,
        bathrooms: 2.5,
        timeline: "1-3 months",
        preApproved: true,
      }),
    });

    await POST(request);

    expect(mockFub.upsertPerson).toHaveBeenCalledWith(
      expect.objectContaining({
        customFields: expect.objectContaining({
          priceMin: 400000,
          priceMax: 600000,
          bedrooms: 3,
          bathrooms: 2.5,
          timeline: "1-3 months",
          preApproved: true,
        }),
      }),
    );
  });

  it("sanitizes input data", async () => {
    const request = new Request("http://localhost:3000/api/leads/capture", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        firstName: '<script>alert("xss")</script>',
        lastName: "Doe",
        email: "test@example.com",
      }),
    });

    await POST(request);

    const callArg = mockFub.upsertPerson.mock.calls[0][0];
    expect(callArg.name).not.toContain("<script>");
  });
});
