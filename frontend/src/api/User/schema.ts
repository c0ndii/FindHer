import { z } from 'zod'

export const userSchema = z.object({
  name: z.string(),
  age: z.number().min(18),
  description: z.string(),
  sex: z.string(),
  image: z.union([z.instanceof(File), z.null()]),
  userId: z.number(),
})

export const interestSchema = z.array(
  z.object({
    name: z.string(),
  })
)

export type userModel = z.infer<typeof userSchema>
export type intetrestModel = z.infer<typeof interestSchema>
