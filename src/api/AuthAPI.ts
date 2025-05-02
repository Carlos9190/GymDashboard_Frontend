import { isAxiosError } from "axios"
import api from "../lib/axios"

export async function login() {
    try {
        const url = '/auth'
        const { data } = await api(url)
        console.log(data)
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}