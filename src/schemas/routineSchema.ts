import { z } from "zod"
import { exerciseByIdSchema } from "./exerciseSchema"

export const routineSchema = z.object({
    _id: z.string(),
    routineName: z.string(),
    routineDays: z.array(z.string()),
    exercises: z.array(
        z.object({
            exercise: z.string(),
            order: z.number()
        })
    )
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

const routineExercisePopulatedSchema = z.object({
    exercise: exerciseByIdSchema,
    order: z.number()
})

export const routineDetailsSchema = z.array(routineExercisePopulatedSchema)

export const routineByIdSchema = z.object({
    _id: z.string(),
    routineName: z.string(),
    routineDays: z.array(z.string()),
    exercises: z.array(routineExercisePopulatedSchema)
})