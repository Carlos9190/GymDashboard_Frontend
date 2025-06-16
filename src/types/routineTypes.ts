import { z } from "zod"
import { routineSchema } from "../schemas"

export type Routine = z.infer<typeof routineSchema>
export type RoutineCard = Pick<Routine, '_id' | 'routineName' | 'routineDays'>
export type RoutineFormData = Pick<Routine, 'routineName' | 'routineDays'>