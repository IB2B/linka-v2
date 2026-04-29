import { http } from "../http";

export type RegisterPayload = { email: string; password: string; name?: string };
export type LoginPayload = { email: string; password: string };

export const authService = {
  register: (payload: RegisterPayload) =>
    http.post("/auth/register", payload).then((r) => r.data),
  login: (payload: LoginPayload) =>
    http.post("/auth/login", payload).then((r) => r.data),
  logout: () => http.post("/auth/logout").then((r) => r.data),
  me: () => http.get("/auth/me").then((r) => r.data),
};
