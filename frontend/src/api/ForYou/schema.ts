import { z } from 'zod';

export const InterestSchema = z.object({
  name: z.string(),
});

export const PersonSchema = z.object({
  name: z.string(),
  age: z.number(),
  description: z.string(),
  sex: z.string(),
  image: z.string(),
  interests: z.array(InterestSchema),
});

export type personModel = z.infer<typeof PersonSchema>;