import { z } from "zod";

export const matchSchema = z.object({
    question1: z.string(),
    question2: z.string(),
    question3: z.string(),
    question4: z.string(),
    question5: z.string(),
    question6: z.string(),
    question7: z.string(),
    question8: z.string(),
    question9: z.string(),
    question10: z.string(),
    question11: z.string(),
    question12: z.string(),
    question13: z.string(),
    question14: z.string(),
    question15: z.string(),
});

export type matchModel = z.infer<typeof matchSchema>;
