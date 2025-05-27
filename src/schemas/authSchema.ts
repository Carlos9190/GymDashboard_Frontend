import { z } from "zod"

export const authSchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string(),
    password_confirmation: z.string(),
    token: z.string()
})

export const userSchema = authSchema.pick({
    name: true,
    email: true
}).extend({
    _id: z.string()
})