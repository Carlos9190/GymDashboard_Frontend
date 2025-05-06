import api from "../lib/axios"
import { isAxiosError } from "axios"
import { ApiResponse, UserRegistrationForm } from "../types"

export async function createAccount(formData: UserRegistrationForm) {
    try {
        const url = '/auth/create-account'
        const { data } = await api.post<ApiResponse>(url, formData)
        return data
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.message)
        }
    }
}