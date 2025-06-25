import { z } from "zod"
import { paginatedRecordSchema, recordByIdSchema, recordSchema } from "../schemas"

export type Record = z.infer<typeof recordSchema>
export type RecordById = z.infer<typeof recordByIdSchema>
type RecordListData = z.infer<typeof paginatedRecordSchema>
export type RecordList = Pick<RecordListData, 'page' | 'totalPages'>
export type RecordFormData = Pick<Record, 'sets' | 'reps' | 'weight'>