import { isAxiosError } from "axios"
import { ApiResponse, UpdateCurrentUserPasswordForm, UserProfileForm } from "@/types/index"
import api from "@/lib/axios"

export async function updateProfile(formData: UserProfileForm) {
    try {
        const url = '/auth/profile'
        const { data } = await api.patch<ApiResponse>(url, formData)
        return data
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.message)
        }
    }
}

export async function changePassword(formData: UpdateCurrentUserPasswordForm) {
    try {
        const url = '/auth/update-password'
        const { data } = await api.patch<ApiResponse>(url, formData)
        return data
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.message)
        }
    }
}