import { z } from 'zod';


export const meetingSchema = z.object({
    meetingName: z.string().min(1),
    meetingPlace: z.string().min(1),
    meetingDate: z.date(),
    userId: z.number(),
});

export type meetingModel = z.infer<typeof meetingSchema>;