import { z } from "zod"
import { exerciseDashboardSchema, exerciseOrderSchema } from "./exerciseSchema"

export const routineSchema = z.object({
    _id: z.string(),
    routineName: z.string(),
    routineDays: z.array(z.string()),
    exercises: z.array(z.string())
})

export const routineExerciseFormSchema = z.array(
    routineSchema.pick({
        _id: true,
        routineName: true,
        exercises: true
    })
)

export const routineDashboardSchema = z.array(
    routineSchema.pick({
        _id: true,
        routineName: true,
        routineDays: true
    })
)

export const routineByIdSchema = z.object({
    _id: z.string(),
    routineName: z.string(),
    routineDays: z.array(z.string()),
    exercises: exerciseDashboardSchema,
    exerciseOrder: exerciseOrderSchema
})