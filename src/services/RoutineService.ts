import { isAxiosError } from "axios"
import api from "@/lib/axios"
import { ApiResponse, RoutineFormData } from "@/types/index"
import { dashboardRoutineSchema, formRoutineSchema } from "@/schemas/index"

export async function createRoutine(formData: RoutineFormData) {
    try {
        const url = '/routines'
        const { data } = await api.post<ApiResponse>(url, formData)
        return data
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.message)
        }
    }
}

export async function getRoutines() {
    try {
        const url = '/routines'
        const { data } = await api<ApiResponse>(url)
        const response = dashboardRoutineSchema.safeParse(data.data)
        if (response.success) {
            return response.data
        }
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.message)
        }
    }
}

export async function getFormRoutines() {
    try {
        const url = '/routines'
        const { data } = await api<ApiResponse>(url)
        const response = formRoutineSchema.safeParse(data.data)
        if (response.success) {
            return response.data
        }
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.message)
        }
    }
}