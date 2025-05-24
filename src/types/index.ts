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
export type ForgotPasswordForm = Pick<Auth, 'email'>
export type NewPasswordForm = Pick<Auth, 'password' | 'password_confirmation'>

export type ConfirmToken = Pick<Auth, 'token'>

// Exercise
export const exerciseSchema = z.object({
    _id: z.string(),
    exerciseName: z.string(),
    exerciseImage: z.string(),
    file: z.instanceof(File).nullable()
})

export const dashboardExerciseSchema = z.array(
    exerciseSchema.pick({
        _id: true,
        exerciseName: true,
        exerciseImage: true
    })
)
export type Exercise = z.infer<typeof exerciseSchema>
export type ExerciseFormData = Pick<Exercise, 'exerciseName' | 'file' >


export const exerciseByIdResponseSchema = z.object({
    _id: z.string(),
    exerciseName: z.string(),
    exerciseImage: z.string(),
    userId: z.string(),
    __v: z.number()
})

export type ExerciseByIdResponse = z.infer<typeof exerciseByIdResponseSchema>