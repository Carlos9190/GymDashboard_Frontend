import { isAxiosError } from "axios"
import api from "@/lib/axios"
import type { ApiResponse, Exercise, Record, RecordFormData } from "@/types/index"

type RecordService = {
    formData: RecordFormData
    exerciseId: Exercise['_id']
    recordId: Record['_id']
}

export async function createRecord({ formData, exerciseId }: Pick<RecordService, 'formData' | 'exerciseId'>) {
    try {
        const url = `/exercises/${exerciseId}/records`
        const { data } = await api.post<ApiResponse>(url, formData)
        return data
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.message)
        }
    }
}

export async function getRecordById({exerciseId, recordId}: Pick<RecordService, 'exerciseId' | 'recordId'>) {
    try {
        const url = `exercises/${exerciseId}/records/${recordId}`
        const {data} = await api<ApiResponse>(url)
        return data.data
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.message)
        }
    }
}

export async function updateRecord({exerciseId, recordId, formData}: Pick<RecordService, 'exerciseId' | 'recordId' | 'formData'>) {
    try {
        const url = `exercises/${exerciseId}/records/${recordId}`
        const {data} = await api.put<ApiResponse>(url, formData)
        return data
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.message)
        }
    }
}

export async function deleteRecord({exerciseId, recordId}: Pick<RecordService, 'exerciseId' | 'recordId'>) {
    try {
        const url = `exercises/${exerciseId}/records/${recordId}`
        const {data} = await api.delete<ApiResponse>(url)
        return data
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.message)
        }
    }
}