import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { UserRegistrationForm } from "../../types";
import ErrorMessage from "../../components/ErrorMessage";
import { createAccount } from "../../api/AuthAPI";
import { toast } from "react-toastify";

export default function RegisterView() {

    const initialValues: UserRegistrationForm = {
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    }

    const { register, handleSubmit, watch, reset, formState: { errors } } = useForm<UserRegistrationForm>({ defaultValues: initialValues });

    const { mutate } = useMutation({
        mutationFn: createAccount,
        onError: (error) => {
            toast.error(error.message)
        },
        onSuccess: (data) => {
            toast.success(data?.message)
            reset()
        }
    })

    const password = watch('password');

    const handleRegister = (formData: UserRegistrationForm) => mutate(formData)

    return (
        <>
            <h1 className="text-5xl font-black text-white">Create account</h1>
            <p className="text-2xl font-light text-white mt-5">
                Fill out the form to {''}
                <span className=" text-red-600 font-bold"> create your account</span>
            </p>

            <form
                onSubmit={handleSubmit(handleRegister)}
                className="space-y-8 p-10 bg-white mt-10 rounded-lg"
                noValidate
            >
                <div className="flex flex-col gap-5">
                    <label
                        className="font-normal text-2xl"
                        htmlFor="email"
                    >Email</label>
                    <input
                        id="email"
                        type="email"
                        placeholder="Email address"
                        className="w-full p-3 border-gray-300 border rounded-lg"
                        {...register("email", {
                            required: "Email is required",
                            pattern: {
                                value: /\S+@\S+\.\S+/,
                                message: "Invalid email address",
                            },
                        })}
                    />
                    {errors.email && (
                        <ErrorMessage>{errors.email.message}</ErrorMessage>
                    )}
                </div>

                <div className="flex flex-col gap-5">
                    <label
                        className="font-normal text-2xl"
                    >Name</label>
                    <input
                        type="name"
                        placeholder="User name"
                        className="w-full p-3 border-gray-300 border rounded-lg"
                        {...register("name", {
                            required: "User name is required",
                        })}
                    />
                    {errors.name && (
                        <ErrorMessage>{errors.name.message}</ErrorMessage>
                    )}
                </div>

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
                    value='Register'
                    className="bg-red-600 hover:bg-red-700 w-full p-3 text-white font-black text-xl cursor-pointer rounded-lg"
                />
            </form>

            <nav className="mt-10 flex flex-col space-y-4">
                <Link
                    to={'/auth/login'}
                    className="text-center text-gray-300 font-normal hover:text-red-600"
                >Do you have account? Login</Link>
                <Link
                    to={'/auth/forgot-password'}
                    className="text-center text-gray-300 font-normal hover:text-red-600"
                >
                    Forgot your password? Reset
                </Link>
            </nav>
        </>
    )
}