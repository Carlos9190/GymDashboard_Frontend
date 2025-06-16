import { z } from "zod"

export const routineSchema = z.object({
    _id: z.string(),
    routineName: z.string(),
    routineDays: z.array(z.string()),
    exercises: z.array(z.string())
})

export const formRoutineSchema = z.array(
    routineSchema.pick({
        _id: true,
        routineName: true
    })
)

export const dashboardRoutineSchema = z.array(
    routineSchema.pick({
        _id: true,
        routineName: true,
        routineDays: true,
        exercises: true
    })
)