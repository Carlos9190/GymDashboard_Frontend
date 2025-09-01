import { z } from "zod";
import { authSchema, userSchema } from "@/schemas/index";

export type Auth = z.infer<typeof authSchema>;
export type UserLoginForm = Pick<Auth, "email" | "password">;
export type UserRegistrationForm = Pick<
    Auth,
    "name" | "email" | "password" | "password_confirmation"
>;
export type RequestConfirmationTokenForm = Pick<Auth, "email">;
export type ForgotPasswordForm = Pick<Auth, "email">;
export type NewPasswordForm = Pick<Auth, "password" | "password_confirmation">;
export type UpdateCurrentUserPasswordForm = Pick<
    Auth,
    "current_password" | "password" | "password_confirmation"
>;
export type ConfirmToken = Pick<Auth, "token">;

export type User = z.infer<typeof userSchema>;
export type UserProfileForm = Pick<User, "name">;
