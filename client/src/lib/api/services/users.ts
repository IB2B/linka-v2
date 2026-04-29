import { http } from "../http";

export const usersService = {
  me: () => http.get("/users/me").then((r) => r.data),
  updateMe: (patch: Record<string, unknown>) =>
    http.patch("/users/me", patch).then((r) => r.data),
  updateProfile: (patch: Record<string, unknown>) =>
    http.patch("/users/me/profile", patch).then((r) => r.data),
  changePassword: (payload: { currentPassword: string; newPassword: string }) =>
    http.post("/users/me/password", payload).then((r) => r.data),
  deleteMe: () => http.delete("/users/me").then((r) => r.data),
  uploadAvatar: (file: FormData) =>
    http
      .post("/users/avatar", file, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((r) => r.data),
};
