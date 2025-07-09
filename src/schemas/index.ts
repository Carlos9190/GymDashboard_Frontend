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
    routineDetailsSchema,
    routineByIdSchema
} from "./routineSchema"
import {
    recordSchema,
    paginatedRecordSchema,
    recordByIdSchema
} from "./recordSchema"


export { authSchema, userSchema }
export { exerciseSchema, exerciseOrderSchema, exerciseDashboardSchema, exerciseByIdSchema }
export { routineSchema, routineExerciseFormSchema, routineDashboardSchema, routineDetailsSchema, routineByIdSchema }
export { recordSchema, paginatedRecordSchema, recordByIdSchema }