import { authSchema, userSchema } from "./authSchema"
import {
    exerciseSchema,
    exerciseOrderSchema,
    exerciseDashboardSchema,
    exerciseByIdSchema
} from "./exerciseSchema"
import {
    routineSchema,
    routineExerciseFormSchema,
    routineDashboardSchema,
    routineByIdSchema
} from "./routineSchema"
import {
    recordSchema,
    paginatedRecordSchema,
    recordByIdSchema
} from "./recordSchema"


export { authSchema, userSchema }
export { exerciseSchema, exerciseOrderSchema, exerciseDashboardSchema, exerciseByIdSchema }
export { routineSchema, routineExerciseFormSchema, routineDashboardSchema, routineByIdSchema }
export { recordSchema, paginatedRecordSchema, recordByIdSchema }