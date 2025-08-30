import { z } from "zod";

export const authSchema = z.object({
    name: z.string(),
    email: z.string().email(),
    current_password: z.string(),
    password: z.string(),
    password_confirmation: z.string(),
    token: z.string(),
});

export const userSchema = authSchema
    .pick({
        name: true,
        email: true,
    })
    .extend({
        _id: z.string(),
    });
