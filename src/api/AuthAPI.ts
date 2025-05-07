import api from "../lib/axios"
import { isAxiosError } from "axios"
import { ApiResponse, ConfirmToken, ForgotPasswordForm, NewPasswordForm, RequestConfirmationTokenForm, UserLoginForm, UserRegistrationForm } from "../types"

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

export async function confirmAccount(formData: ConfirmToken) {
    try {
        const url = '/auth/confirm-account'
        const { data } = await api.post<ApiResponse>(url, formData)
        return data
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.message)
        }
    }
}

export async function requestNewToken(formData: RequestConfirmationTokenForm) {
    try {
        const url = '/auth/request-code'
        const { data } = await api.post<ApiResponse>(url, formData)
        return data
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.message)
        }
    }
}

export async function login(formData: UserLoginForm) {
    try {
        const url = '/auth/login'
        const { data } = await api.post<ApiResponse<string>>(url, formData)
        localStorage.setItem('AUTH_TOKEN', data.data)
        return data
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.message)
        }
    }
}

export async function forgotPassword(formData: ForgotPasswordForm) {
    try {
        const url = '/auth/forgot-password'
        const { data } = await api.post<ApiResponse>(url, formData)
        return data
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.message)
        }
    }
}

export async function validateToken(formData: ConfirmToken) {
    try {
        const url = '/auth/validate-token'
        const { data } = await api.post<ApiResponse>(url, formData)
        return data
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.message)
        }
    }
}

export async function updatePasswordWithToken({ formData, token }: { formData: NewPasswordForm, token: ConfirmToken['token'] }) {
    try {
        const url = `/auth/update-password/${token}`
        const { data } = await api.post<ApiResponse>(url, formData)
        console.log(data)
        return data
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.message)
        }
    }
}