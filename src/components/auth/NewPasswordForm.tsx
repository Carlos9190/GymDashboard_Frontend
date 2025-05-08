import { toast } from "react-toastify"
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"
import { useMutation } from "@tanstack/react-query"
import ErrorMessage from "@/components/ErrorMessage"
import { updatePasswordWithToken } from "@/api/AuthAPI"
import type { ConfirmToken, NewPasswordForm } from "@/types/index"

type NewPasswordFormProps = {
    token: ConfirmToken['token']
}

export default function NewPasswordForm({ token }: NewPasswordFormProps) {
    const navigate = useNavigate()
    const initialValues: NewPasswordForm = {
        password: '',
        password_confirmation: '',
    }
    const { register, handleSubmit, watch, reset, formState: { errors } } = useForm({ defaultValues: initialValues })

    const { mutate } = useMutation({
        mutationFn: updatePasswordWithToken,
        onError(error) {
            toast.error(error.message)
        },
        onSuccess(data) {
            toast.success(data?.message)
            reset()
            navigate('/auth/login')
        }
    })

    const handleNewPassword = (formData: NewPasswordForm) => {
        const data = {
            formData,
            token
        }
        mutate(data)
    }

    const password = watch('password')

    return (
        <>
            <form
                onSubmit={handleSubmit(handleNewPassword)}
                className="space-y-8 p-10 bg-white mt-10 rounded-lg"
                noValidate
            >

                <div className="flex flex-col gap-5">
                    <label
                        className="font-normal text-2xl"
                    >Password</label>

                    <input
                        type="password"
                        placeholder="Password"
                        className="w-full p-3 border-gray-300 border rounded-lg"
                        {...register("password", {
                            required: "Password is required",
                            minLength: {
                                value: 8,
                                message: 'Password should be 8 characters length minimum'
                            }
                        })}
                    />
                    {errors.password && (
                        <ErrorMessage>{errors.password.message}</ErrorMessage>
                    )}
                </div>

                <div className="flex flex-col gap-5">
                    <label
                        className="font-normal text-2xl"
                    >Password confirmation</label>

                    <input
                        id="password_confirmation"
                        type="password"
                        placeholder="Password confirmation"
                        className="w-full p-3 border-gray-300 border rounded-lg"
                        {...register("password_confirmation", {
                            required: "Password confirmation is required",
                            validate: value => value === password || 'Password confirmation does not match'
                        })}
                    />

                    {errors.password_confirmation && (
                        <ErrorMessage>{errors.password_confirmation.message}</ErrorMessage>
                    )}
                </div>

                <input
                    type="submit"
                    value='Set new password'
                    className="bg-red-600 hover:bg-red-700 w-full p-3 text-white font-black text-xl cursor-pointer"
                />
            </form>
        </>
    )
}