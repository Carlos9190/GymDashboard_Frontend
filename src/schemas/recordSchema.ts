import { z } from 'zod'

export const recordSchema = z.object({
    _id: z.string(),
    sets: z.number(),
    reps: z.number(),
    weight: z.number(),
    exercise: z.string(),
    updatedAt: z.string()
})