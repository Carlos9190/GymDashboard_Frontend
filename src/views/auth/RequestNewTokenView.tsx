import { toast } from "react-toastify"
import { Link } from "react-router-dom"
import { useForm } from "react-hook-form"
import { useMutation } from "@tanstack/react-query"
import { RequestConfirmationTokenForm } from "@/types/index"
import ErrorMessage from "@/components/ErrorMessage"
import { requestNewToken } from "@/api/AuthAPI"

export default function RequestNewTokenView() {
    const initialValues: RequestConfirmationTokenForm = {
        email: ''
    }

    const { register, handleSubmit, reset, formState: { errors } } = useForm({ defaultValues: initialValues })

    const { mutate } = useMutation({
        mutationFn: requestNewToken,
        onError: (error) => {
            toast.error(error.message)
        },
        onSuccess: (data) => {
            toast.success(data?.message)
            reset()
        }
    })

    const handleRequestCode = (formData: RequestConfirmationTokenForm) => mutate(formData)

    return (
        <>
            <h1 className="text-5xl font-black text-white">Request new confirmation token</h1>
            <p className="text-2xl font-light text-white mt-5">
                Enter your email to receive {''}
                <span className=" text-red-600 font-bold"> a new token</span>
            </p>

            <form
                onSubmit={handleSubmit(handleRequestCode)}
                className="space-y-8 p-10 rounded-lg bg-white mt-10"
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
                        placeholder="Registration email address"
                        className="w-full p-3 rounded-lg border-gray-300 border"
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

                <input
                    type="submit"
                    value='Send token'
                    className="bg-red-600 hover:bg-red-700 w-full p-3 rounded-lg text-white font-black  text-xl cursor-pointer"
                />
            </form>

            <nav className="mt-10 flex flex-col space-y-4">
                <Link
                    to={'/auth/login'}
                    className="text-center text-gray-300 font-normal hover:text-red-600"
                >
                    Do you have account? Login
                </Link>
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