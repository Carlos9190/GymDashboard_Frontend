import { z } from "zod"

// Response
export type ApiResponse<T = null> = {
    message: string;
    success: boolean;
    data: T;
}

// Auth 
const authSchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string(),
    password_confirmation: z.string(),
    token: z.string()
})

type Auth = z.infer<typeof authSchema>
export type UserLoginForm = Pick<Auth, 'email' | 'password'>
export type UserRegistrationForm = Pick<Auth, 'name' | 'email' | 'password' | 'password_confirmation'>
export type RequestConfirmationTokenForm = Pick<Auth, 'email'>

export type ConfirmToken = Pick<Auth, 'token'>