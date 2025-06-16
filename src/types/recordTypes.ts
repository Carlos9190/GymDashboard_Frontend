import { z } from "zod"
import { recordSchema } from "../schemas"

export type Record = z.infer<typeof recordSchema>
export type RecordFormData = Pick<Record, 'sets' | 'reps' | 'weight'>