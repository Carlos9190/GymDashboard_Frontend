import { z } from 'zod'

export const recordSchema = z.object({
    _id: z.string(),
    sets: z.number(),
    reps: z.number(),
    weight: z.number(),
    exercise: z.string(),
    updatedAt: z.string()
})

const recordListSchema = z.array(
    recordSchema.pick({
        _id: true,
        sets: true,
        reps: true,
        weight: true,
        updatedAt: true
    })
)

export const paginatedRecordSchema = z.object({
    records: recordListSchema,
    page: z.number(),
    totalPages: z.number()
})

export const recordByIdSchema = z.object({
    _id: z.string(),
    sets: z.number(),
    reps: z.number(),
    weight: z.number()
})