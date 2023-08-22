import { cleanEnv, str, num } from "envalid";

export const env = cleanEnv(process.env, {
  PORT: num({ default: 3333 }),
  DATABASE_URL: str({
    default: "postgres://qwer:qwer1234@localhost:5432/qwer?sslmode=disable",
  }),
});
