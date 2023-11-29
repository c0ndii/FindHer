import { z } from "zod";

export const matchSchema = z.object({
    question1: z.string(),
    question2: z.string(),
    question3: z.string(),
    question4: z.string(),
    question5: z.string(),
});

export type matchModel = z.infer<typeof matchSchema>;
