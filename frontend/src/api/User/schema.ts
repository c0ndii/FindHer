import { z } from "zod";

export const userSchema = z.object({
    name: z.string(),
    age: z.number().min(18),
    description: z.string(),
    sex: z.string(),
    image: z.string()
});

export type userModel = z.infer<typeof userSchema>;
