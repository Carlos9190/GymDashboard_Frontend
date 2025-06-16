import { isAxiosError } from "axios"
import api from "@/lib/axios"
import type { ApiResponse, ExerciseFormData, Exercise } from "@/types/index"
import { exerciseDashboardSchema, exerciseByIdSchema } from "@/schemas/index"

type ExerciseService = {
    formData: ExerciseFormData
    exerciseId: Exercise['_id']
}

export async function createExercise({ formData }: Pick<ExerciseService, 'formData'>) {
    const formDataToSend = new FormData()
    formDataToSend.append('exerciseName', formData.exerciseName)
    formDataToSend.append('file', formData.file as File)
    formDataToSend.append('routineId', formData.routineId as string)
    try {
        const url = '/exercises'
        const { data } = await api.post<ApiResponse>(url, formDataToSend)
        return data
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.message)
        }
    }
}

export async function getExercises() {
    try {
        const url = '/exercises'
        const { data } = await api<ApiResponse>(url)
        const response = exerciseDashboardSchema.safeParse(data.data)
        if (response.success) {
            return response.data
        }
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.message)
        }
    }
}

export async function getExerciseById({ exerciseId }: Pick<ExerciseService, 'exerciseId'>) {
    try {
        const url = `/exercises/${exerciseId}`
        const { data } = await api<ApiResponse>(url)
        const response = exerciseByIdSchema.safeParse(data.data)
        if (response.success) {
            return response.data
        }
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.message)
        }
    }
}

export async function updateExercise({ formData, exerciseId }: Pick<ExerciseService, 'formData' | 'exerciseId'>) {
    let formDataToSend = new FormData()
    formDataToSend.append('exerciseName', formData.exerciseName)
    formDataToSend.append('file', formData.file as File)
    formDataToSend.append('routineId', formData.routineId as string)
    try {
        const url = `/exercises/${exerciseId}`
        const { data } = await api.put<ApiResponse>(url, formDataToSend)
        return data
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.message)
        }
    }
}

export async function deleteExercise({ exerciseId }: Pick<ExerciseService, 'exerciseId'>) {
    try {
        const url = `/exercises/${exerciseId}`
        const { data } = await api.delete<ApiResponse>(url)
        return data
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.message)
        }
    }
}