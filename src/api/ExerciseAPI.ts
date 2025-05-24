import { isAxiosError } from "axios"
import { ApiResponse, dashboardExerciseSchema, Exercise, ExerciseFormData } from "../types"
import api from "@/lib/axios"

export async function createExercise(formData: ExerciseFormData) {
    let formDataToSend = new FormData()
    formDataToSend.append('exerciseName', formData.exerciseName)
    formDataToSend.append('file', formData.file as File)
    try {
        const url = '/exercises'
        const { data } = await api.post<ApiResponse>(url, formDataToSend)
        return data.message
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
        const response = dashboardExerciseSchema.safeParse(data.data)
        console.log(response)
        if (response.success) {
            return response.data
        }
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.message)
        }
    }
}

export async function getExerciseById(exerciseId: Exercise['_id']) {
    try {
        const url = `/exercises/${exerciseId}`
        const { data } = await api<ApiResponse>(url)
        return data.data
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.message)
        }
    }
}

type ExerciseAPIType = {
    formData: ExerciseFormData,
    exerciseId: Exercise['_id']
}

export async function updateExercise({ formData, exerciseId }: ExerciseAPIType) {
    let formDataToSend = new FormData()
    formDataToSend.append('exerciseName', formData.exerciseName)
    formDataToSend.append('file', formData.file as File)
    try {
        const url = `/exercises/${exerciseId}`
        const { data } = await api.put<ApiResponse>(url, formDataToSend)
        return data.message
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.message)
        }
    }
}

export async function deleteExercise(exerciseId: Exercise['_id']) {
    try {
        const url = `/exercises/${exerciseId}`
        const { data } = await api.delete<ApiResponse>(url)
        return data.message
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.message)
        }
    }
}