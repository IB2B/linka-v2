import { http } from "../http";

export const voiceLabService = {
  listSamples: () => http.get("/voice-lab/samples").then((r) => r.data),
  createSample: (payload: Record<string, unknown>) =>
    http.post("/voice-lab/samples", payload).then((r) => r.data),
  bulkCreateSamples: (payload: Record<string, unknown>) =>
    http.post("/voice-lab/samples/bulk", payload).then((r) => r.data),
  deleteSample: (id: string) =>
    http.delete(`/voice-lab/samples/${id}`).then((r) => r.data),
  getProfile: () => http.get("/voice-lab/profile").then((r) => r.data),
  analyze: (payload: Record<string, unknown>) =>
    http.post("/voice-lab/analyze", payload).then((r) => r.data),
};
