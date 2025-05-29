export const PATH = {
  CONFIRM_EMAIL: "/auth/registration-confirmation",
  USERS_LIST: "/users-list",
  ROOT: "/",
  LOGIN: "/auth",
  STATISTICS: "/statistics",
  PAYMENTS_LIST: "/payments-list",
  POSTS_LIST: "/posts-list",
} as const;

export const baseUrl =
  process.env.NODE_ENV === "development"
    ? "http://localhost:3000"
    : "admin.universea.ru";
