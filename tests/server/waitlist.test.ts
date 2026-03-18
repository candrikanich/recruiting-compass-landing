// @vitest-environment node
import { describe, it, expect, vi, beforeEach } from "vitest";

// Mock the Resend SDK before importing the module under test
const mockContactsCreate = vi.fn();
vi.mock("resend", () => ({
  Resend: vi.fn().mockImplementation(function () {
    return { contacts: { create: mockContactsCreate } };
  }),
}));

const { addToWaitlist } = await import("../../server/utils/waitlist");

const validConfig = {
  resendApiKey: "test-key",
  resendAudienceId: "test-audience-id",
};

describe("addToWaitlist", () => {
  beforeEach(() => vi.clearAllMocks());

  it("returns success:true for a valid email", async () => {
    mockContactsCreate.mockResolvedValueOnce({
      data: { id: "c-123" },
      error: null,
    });
    const result = await addToWaitlist("user@example.com", validConfig);
    expect(result).toEqual({ success: true });
    expect(mockContactsCreate).toHaveBeenCalledWith({
      audienceId: "test-audience-id",
      email: "user@example.com",
    });
  });

  it("trims whitespace from email before submitting", async () => {
    mockContactsCreate.mockResolvedValueOnce({
      data: { id: "c-123" },
      error: null,
    });
    await addToWaitlist("  user@example.com  ", validConfig);
    expect(mockContactsCreate).toHaveBeenCalledWith(
      expect.objectContaining({ email: "user@example.com" }),
    );
  });

  it("throws 400 for an invalid email format", async () => {
    await expect(
      addToWaitlist("not-an-email", validConfig),
    ).rejects.toMatchObject({
      statusCode: 400,
      data: { error: "Please enter a valid email address." },
    });
    expect(mockContactsCreate).not.toHaveBeenCalled();
  });

  it("throws 400 for a whitespace-only email", async () => {
    await expect(addToWaitlist("   ", validConfig)).rejects.toMatchObject({
      statusCode: 400,
      data: { error: "Please enter a valid email address." },
    });
  });

  it("throws 400 for missing email (undefined)", async () => {
    await expect(
      addToWaitlist(undefined as any, validConfig),
    ).rejects.toMatchObject({
      statusCode: 400,
      data: { error: "Please enter a valid email address." },
    });
  });

  it("throws 500 when resendApiKey is empty", async () => {
    await expect(
      addToWaitlist("user@example.com", { ...validConfig, resendApiKey: "" }),
    ).rejects.toMatchObject({
      statusCode: 500,
      data: { error: "Something went wrong. Please try again." },
    });
    expect(mockContactsCreate).not.toHaveBeenCalled();
  });

  it("throws 500 when resendAudienceId is empty", async () => {
    await expect(
      addToWaitlist("user@example.com", {
        ...validConfig,
        resendAudienceId: "",
      }),
    ).rejects.toMatchObject({
      statusCode: 500,
      data: { error: "Something went wrong. Please try again." },
    });
    expect(mockContactsCreate).not.toHaveBeenCalled();
  });

  it("returns success:true for a duplicate email (already_exists treated as success)", async () => {
    mockContactsCreate.mockResolvedValueOnce({
      data: null,
      error: { name: "already_exists", message: "Contact already exists" },
    });
    const result = await addToWaitlist("existing@example.com", validConfig);
    expect(result).toEqual({ success: true });
  });

  it("throws 500 when Resend returns an unexpected error", async () => {
    mockContactsCreate.mockResolvedValueOnce({
      data: null,
      error: { name: "internal_server_error", message: "Resend is down" },
    });
    await expect(
      addToWaitlist("user@example.com", validConfig),
    ).rejects.toMatchObject({
      statusCode: 500,
      data: { error: "Something went wrong. Please try again." },
    });
  });
});
