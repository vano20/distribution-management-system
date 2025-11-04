import * as z from "zod";

export const Login = z.object({
  email: z.email().min(3),
  password: z.string().min(8),
  remember: z.boolean()
});
export type LoginForm = z.infer<typeof Login>;