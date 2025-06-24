import { isAxiosError } from "axios"
import api from "@/lib/axios"
import { ApiResponse, Exercise, Routine, RoutineFormData } from "@/types/index"
import { routineByIdSchema, routineDashboardSchema, routineExerciseFormSchema } from "@/schemas/index"

export type RoutineService = {
    formData: RoutineFormData
    routineId: Routine['_id']
    exerciseId: Exercise['_id']
}

export async function createRoutine({ formData }: Pick<RoutineService, 'formData'>) {
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
        const response = routineDashboardSchema.safeParse(data.data)
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
        const response = routineExerciseFormSchema.safeParse(data.data)
        if (response.success) {
            return response.data
        }
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.message)
        }
    }
}

export async function getRoutineById({ routineId }: Pick<RoutineService, 'routineId'>) {
    try {
        const url = `/routines/${routineId}`
        const { data } = await api<ApiResponse>(url)
        const response = routineByIdSchema.safeParse(data.data)
        if (response.success) {
            return response.data
        }
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.message)
        }
    }
}

export async function updateRoutine({ formData, routineId }: Pick<RoutineService, 'formData' | 'routineId'>) {
    try {
        const url = `/routines/${routineId}`
        const { data } = await api.put<ApiResponse>(url, formData)
        return data
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.message)
        }
    }
}

export async function removeExerciseFromRoutine({ routineId, exerciseId }: Pick<RoutineService, 'routineId' | 'exerciseId'>) {
    try {
        const url = `/routines/${routineId}/exercise`
        const { data } = await api.patch<ApiResponse>(url, { exerciseId })
        return data
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.message)
        }
    }
}

export async function deleteRoutine({ routineId }: Pick<RoutineService, 'routineId'>) {
    try {
        const url = `/routines/${routineId}`
        const { data } = await api.delete<ApiResponse>(url)
        return data
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.message)
        }
    }
}
