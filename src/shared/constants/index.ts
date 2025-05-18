export const PATH = {
  CONFIRM_EMAIL: "/auth/registration-confirmation",
  USERS_LIST: "/users-list",
  ROOT: "/",
} as const;

export const baseUrl =
  process.env.NODE_ENV === "development"
    ? "http://localhost:3000"
    : "admin.universea.ru";
