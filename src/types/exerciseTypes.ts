import { z } from "zod"
import { exerciseByIdSchema, exerciseDashboardSchema, exerciseSchema } from "../schemas"

export type Exercise = z.infer<typeof exerciseSchema>
export type ExerciseById = z.infer<typeof exerciseByIdSchema>
export type ExerciseDashboard = z.infer<typeof exerciseDashboardSchema>
export type ExerciseFormData = Pick<Exercise, 'exerciseName' | 'file' | 'routineId'>