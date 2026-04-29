import { http } from "../http";

export const contentService = {
  suggestTopics: (payload: Record<string, unknown>) =>
    http.post("/content/suggest-topics", payload).then((r) => r.data),
  generate: (payload: Record<string, unknown>) =>
    http.post("/content/generate", payload).then((r) => r.data),
};
