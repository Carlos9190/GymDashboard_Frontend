import { useForm } from "react-hook-form"
import { useMutation } from "@tanstack/react-query"
import { toast } from "react-toastify"
import { Link } from "react-router-dom"
import ErrorMessage from "@/components/ErrorMessage"
import { createAccount } from "@/services/AuthService"
import type { UserRegistrationForm } from "@/types/index"

export default function RegisterView() {
    const initialValues: UserRegistrationForm = {
        name: "",
        email: "",
        password: "",
        password_confirmation: ""
    }

    const {
        register,
        handleSubmit,
        formState: { errors },
        watch,
        reset
    } = useForm<UserRegistrationForm>({ defaultValues: initialValues })

    const password = watch("password")

    const { mutate } = useMutation({
        mutationFn: createAccount,
        onError: (error: any) => toast.error(error.message),
        onSuccess: (data) => {
            toast.success(data?.message)
            reset()
        }
    })

    const handleRegister = (formData: UserRegistrationForm) => mutate(formData)

    return (
        <>
            <h1 className="text-2xl uppercase font-bold text-white text-center mb-4">Singup</h1>
            <p className="text-xl font-light text-white text-center mb-6">
                Create an account and start managing your workouts{" "}
                <span className="text-red-600 font-bold">today</span>
            </p>

            <form
                onSubmit={handleSubmit(handleRegister)}
                className="space-y-3 bg-transparent rounded-lg flex flex-col w-full px-5"
                noValidate
            >
                <div className="relative w-full">
                    <input
                        id="name"
                        type="text"
                        placeholder=" "
                        className={`peer w-full px-3 pt-6 pb-2 border rounded-lg bg-transparent text-white placeholder-transparent transition-all
              ${errors.name ? "border-red-500" : "border-gray-300"} focus:outline-none focus:border-red-500`}
                        {...register("name", { required: "Name is required" })}
                    />
                    <label
                        htmlFor="name"
                        className={`absolute left-3 transition-all 
              ${watch("name") ? "top-1 text-sm text-red-600" : "top-3.5 text-gray-500"} 
              peer-focus:top-1 peer-focus:text-sm peer-focus:text-red-600`}
                    >
                        Name
                    </label>
                    {errors.name && <ErrorMessage>{errors.name.message}</ErrorMessage>}
                </div>

                <div className="relative w-full">
                    <input
                        id="email"
                        type="email"
                        placeholder=" "
                        className={`peer w-full px-3 pt-6 pb-2 border rounded-lg bg-transparent text-white placeholder-transparent transition-all
              ${errors.email ? "border-red-500" : "border-gray-300"} focus:outline-none focus:border-red-500`}
                        {...register("email", {
                            required: "Email is required",
                            pattern: {
                                value: /\S+@\S+\.\S+/,
                                message: "Invalid email address"
                            }
                        })}
                    />
                    <label
                        htmlFor="email"
                        className={`absolute left-3 transition-all 
              ${watch("email") ? "top-1 text-sm text-red-600" : "top-3.5 text-gray-500"} 
              peer-focus:top-1 peer-focus:text-sm peer-focus:text-red-600`}
                    >
                        Email address
                    </label>
                    {errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}
                </div>

                <div className="relative w-full">
                    <input
                        id="password"
                        type="password"
                        placeholder=" "
                        className={`peer w-full px-3 pt-6 pb-2 border rounded-lg bg-transparent text-white placeholder-transparent transition-all
              ${errors.password ? "border-red-500" : "border-gray-300"} focus:outline-none focus:border-red-500`}
                        {...register("password", {
                            required: "Password is required",
                            minLength: {
                                value: 8,
                                message: "Password should be at least 8 characters"
                            }
                        })}
                    />
                    <label
                        htmlFor="password"
                        className={`absolute left-3 transition-all 
              ${watch("password") ? "top-1 text-sm text-red-600" : "top-3.5 text-gray-500"} 
              peer-focus:top-1 peer-focus:text-sm peer-focus:text-red-600`}
                    >
                        Password
                    </label>
                    {errors.password && <ErrorMessage>{errors.password.message}</ErrorMessage>}
                </div>

                <div className="relative w-full">
                    <input
                        id="password_confirmation"
                        type="password"
                        placeholder=" "
                        className={`peer w-full px-3 pt-6 pb-2 border rounded-lg bg-transparent text-white placeholder-transparent transition-all
              ${errors.password_confirmation ? "border-red-500" : "border-gray-300"} focus:outline-none focus:border-red-500`}
                        {...register("password_confirmation", {
                            required: "Password confirmation is required",
                            validate: value =>
                                value === password || "Passwords do not match"
                        })}
                    />
                    <label
                        htmlFor="password_confirmation"
                        className={`absolute left-3 transition-all 
              ${watch("password_confirmation") ? "top-1 text-sm text-red-600" : "top-3.5 text-gray-500"} 
              peer-focus:top-1 peer-focus:text-sm peer-focus:text-red-600`}
                    >
                        Confirm password
                    </label>
                    {errors.password_confirmation && (
                        <ErrorMessage>{errors.password_confirmation.message}</ErrorMessage>
                    )}
                </div>

                <input
                    type="submit"
                    value="Register"
                    className="bg-red-600 hover:bg-red-700 w-full p-3 text-white font-black text-xl cursor-pointer rounded-4xl mt-2"
                />

                <p className="text-center text-gray-300 font-normal">
                    Already have an account?{" "}
                    <Link to="/auth/login" className="hover:text-red-600 underline">
                        Log in
                    </Link>
                </p>
            </form>
        </>
    )
}