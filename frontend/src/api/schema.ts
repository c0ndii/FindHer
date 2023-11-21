import { z } from "zod";

export const signupSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8),
    passwordConfirm: z.string().min(8)
}).superRefine(({ passwordConfirm, password }, ctx) => {
    if (passwordConfirm !== password) {
      ctx.addIssue({
        path: ['passwordConfirm'],
        code: "custom",
        message: "The passwords did not match"
      });
    }
  });
export type signupModel = z.infer<typeof signupSchema>;

export const loginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8)
});

export type loginModel = z.infer<typeof loginSchema>;