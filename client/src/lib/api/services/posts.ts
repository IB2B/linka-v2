import { http } from "../http";

export const postsService = {
  list: (params?: Record<string, string | number>) =>
    http.get("/posts", { params }).then((r) => r.data),
  get: (id: string) => http.get(`/posts/${id}`).then((r) => r.data),
  schedule: (id: string, payload: { scheduledAt: string }) =>
    http.post(`/posts/${id}/schedule`, payload).then((r) => r.data),
  publish: (id: string) => http.post(`/posts/${id}/publish`).then((r) => r.data),
  remove: (id: string) => http.delete(`/posts/${id}`).then((r) => r.data),
};
