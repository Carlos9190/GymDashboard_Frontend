import { z } from "zod"
import { routineDetailsSchema, routineSchema } from "../schemas"

export type Routine = z.infer<typeof routineSchema>
export type RoutineDetails = z.infer<typeof routineDetailsSchema>
export type RoutineCard = Pick<Routine, '_id' | 'routineName' | 'routineDays'>
export type RoutineFormData = Pick<Routine, 'routineName' | 'routineDays'>