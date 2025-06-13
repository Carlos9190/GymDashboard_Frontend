import { z } from "zod"
import { exerciseByIdResponseSchema, exerciseSchema } from "../schemas"

export type Exercise = z.infer<typeof exerciseSchema>
export type ExerciseByIdResponse = z.infer<typeof exerciseByIdResponseSchema>
export type ExerciseFormData = Pick<Exercise, 'exerciseName' | 'file' | 'routineId'>