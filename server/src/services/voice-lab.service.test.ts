import { describe, it, expect, vi, beforeEach } from "vitest";

vi.mock("../lib/db", () => ({ db: { query: vi.fn() } }));
vi.mock("../lib/voice-analysis", () => ({ analyzeVoice: vi.fn() }));
vi.mock("../models/voice-profile.model", () => ({ saveVoiceDna: vi.fn() }));
vi.mock("../models/writing-sample.model", () => ({
  countByUser: vi.fn(), insertOne: vi.fn(), listByUser: vi.fn(),
  getByIds: vi.fn(), markProcessed: vi.fn(),
}));

import { db } from "../lib/db";
import * as s from "../models/writing-sample.model";
import * as profile from "../models/voice-profile.model";
import { analyzeVoice } from "../lib/voice-analysis";
import { getLimits, addSample, runAnalysis } from "./voice-lab.service";
import type { WritingSample } from "../types/voice-lab";

const q = vi.mocked(db.query);
const long = "x".repeat(150);
const smp = (id = "s1"): WritingSample => ({
  id, userId: "u1", title: null, content: long, source: "linkedin",
  wordCount: 20, processedAt: null, createdAt: "2026-01-01",
});

beforeEach(() => vi.clearAllMocks());

describe("getLimits", () => {
  it("defaults to free (5) when no subscription row", async () => {
    q.mockResolvedValueOnce([[]] as never);
    vi.mocked(s.countByUser).mockResolvedValue(2);
    expect(await getLimits("u1")).toEqual({ current: 2, limit: 5, canAddMore: true });
  });
  it("maps PRO→100 and flags canAddMore=false at the limit", async () => {
    q.mockResolvedValueOnce([[{ plan_tier: "PRO" }]] as never);
    vi.mocked(s.countByUser).mockResolvedValue(100);
    expect(await getLimits("u1")).toEqual({ current: 100, limit: 100, canAddMore: false });
  });
});

describe("addSample", () => {
  it("rejects content under 100 chars (400)", async () => {
    await expect(addSample("u1", null, "short", "linkedin"))
      .rejects.toMatchObject({ status: 400 });
  });
  it("rejects when the sample limit is reached (403)", async () => {
    q.mockResolvedValueOnce([[{ plan_tier: "free" }]] as never);
    vi.mocked(s.countByUser).mockResolvedValue(5);
    await expect(addSample("u1", null, long, "linkedin"))
      .rejects.toMatchObject({ status: 403 });
  });
  it("inserts a valid sample", async () => {
    q.mockResolvedValueOnce([[{ plan_tier: "free" }]] as never);
    vi.mocked(s.countByUser).mockResolvedValue(1);
    vi.mocked(s.insertOne).mockResolvedValue(smp());
    await addSample("u1", null, long, "linkedin");
    expect(s.insertOne).toHaveBeenCalledOnce();
  });
});

describe("runAnalysis", () => {
  it("needs at least 1 sample (400)", async () => {
    vi.mocked(s.listByUser).mockResolvedValue([]);
    await expect(runAnalysis("u1")).rejects.toMatchObject({ status: 400 });
  });
  it("analyzes a single sample", async () => {
    vi.mocked(s.listByUser).mockResolvedValue([smp("a")]);
    vi.mocked(analyzeVoice).mockResolvedValue({} as never);
    vi.mocked(profile.saveVoiceDna).mockResolvedValue({ version: 1 } as never);
    expect(await runAnalysis("u1")).toEqual({ version: 1, sampleCount: 1 });
    expect(s.markProcessed).toHaveBeenCalledWith("u1", ["a"]);
  });
  it("analyzes, saves DNA, and marks samples processed", async () => {
    vi.mocked(s.listByUser).mockResolvedValue([smp("a"), smp("b")]);
    vi.mocked(analyzeVoice).mockResolvedValue({} as never);
    vi.mocked(profile.saveVoiceDna).mockResolvedValue({ version: 3 } as never);
    expect(await runAnalysis("u1")).toEqual({ version: 3, sampleCount: 2 });
    expect(s.markProcessed).toHaveBeenCalledWith("u1", ["a", "b"]);
  });
});
