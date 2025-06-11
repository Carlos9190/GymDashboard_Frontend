import { z } from "zod"
import { routineSchema } from "../schemas"

export type Routine = z.infer<typeof routineSchema>
export type RoutineFormData = Pick<Routine, 'routineName' | 'routineDays'>