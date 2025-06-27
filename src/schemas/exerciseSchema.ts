import { z } from "zod"
import { recordSchema } from "./recordSchema"

export const exerciseSchema = z.object({
    _id: z.string(),
    exerciseName: z.string(),
    exerciseImage: z.string(),
    file: z.instanceof(File).nullable(),
    routineId: z.string().nullable(),
    records: z.array(recordSchema)
})

export const exerciseOrderSchema = z.array(z.string())

export const exerciseDashboardSchema = z.array(
    exerciseSchema.pick({
        _id: true,
        exerciseName: true,
        exerciseImage: true
    })
)

export const exerciseByIdSchema = z.object({
    _id: z.string(),
    exerciseName: z.string(),
    exerciseImage: z.string()
})