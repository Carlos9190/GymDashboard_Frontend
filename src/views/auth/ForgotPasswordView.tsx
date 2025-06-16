import { useForm } from "react-hook-form"
import { useMutation } from "@tanstack/react-query"
import { toast } from "react-toastify"
import { Link } from "react-router-dom"
import ErrorMessage from "@/components/ErrorMessage"
import { forgotPassword } from "@/services/AuthService"
import type { ForgotPasswordForm } from "@/types/index" 

export default function ForgotPasswordView() {
    const initialValues: ForgotPasswordForm = {
        email: ""
    }

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        watch
    } = useForm<ForgotPasswordForm>({ defaultValues: initialValues })

    const { mutate } = useMutation({
        mutationFn: forgotPassword,
        onError: (error) => toast.error(error.message),
        onSuccess: (data) => {
            toast.success(data?.message)
            reset()
        }
    })

    const handleForgotPassword = (formData: ForgotPasswordForm) => mutate(formData)

    return (
        <>
            <h1 className="text-2xl uppercase font-bold text-white text-center mb-4">Forgot your password?</h1>
            <p className="text-xl font-light text-white text-center mb-6">
                No problem. Enter your account email address and we will send you instructions so{" "}
                <span className="text-red-600 font-bold">you can reset your password</span>
            </p>

            <form
                onSubmit={handleSubmit(handleForgotPassword)}
                className="space-y-3 bg-transparent rounded-lg flex flex-col w-full px-5"
                noValidate
            >
                <div className="relative w-full">
                    <input
                        id="email"
                        type="email"
                        placeholder=" "
                        className={`peer w-full px-3 pt-6 pb-2 border rounded-lg bg-transparent text-white placeholder-transparent transition-all ${errors.email ? "border-red-500" : "border-gray-300"} focus:outline-none focus:border-red-500`}
                        {...register("email", {
                            required: "Email is required",
                            pattern: {
                                value: /\S+@\S+\.\S+/,
                                message: "Invalid email address",
                            }
                        })}
                    />
                    <label
                        htmlFor="email"
                        className={`absolute left-3 transition-all ${watch("email") ? "top-1 text-sm text-red-600" : "top-3.5 text-gray-500"} peer-focus:top-1 peer-focus:text-sm peer-focus:text-red-600`}
                    >
                        Email address
                    </label>
                    {errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}
                </div>

                <input
                    type="submit"
                    value="Send instructions"
                    className="bg-red-600 hover:bg-red-700 w-full p-3 text-white font-black text-xl cursor-pointer rounded-4xl mt-2"
                />

                <Link
                    to={"/auth/login"}
                    className="text-gray-300 font-normal hover:text-red-600 underline text-center"
                >
                    Back to login
                </Link>
            </form>
        </>
    )
}