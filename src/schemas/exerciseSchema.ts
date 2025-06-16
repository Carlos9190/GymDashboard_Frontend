import { z } from "zod"
import {  recordSchema } from "./recordSchema"

export const exerciseSchema = z.object({
    _id: z.string(),
    exerciseName: z.string(),
    exerciseImage: z.string(),
    file: z.instanceof(File).nullable(),
    routineId: z.string().nullable()
})

export const dashboardExerciseSchema = z.array(
    exerciseSchema.pick({
        _id: true,
        exerciseName: true,
        exerciseImage: true
    })
)

export const exerciseByIdResponseSchema = z.object({
    _id: z.string(),
    exerciseName: z.string(),
    exerciseImage: z.string(),
    userId: z.string(),
    records: z.array(recordSchema)
})