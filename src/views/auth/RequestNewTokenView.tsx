import { toast } from "react-toastify"
import { useForm } from "react-hook-form"
import { useMutation } from "@tanstack/react-query"
import ErrorMessage from "@/components/ErrorMessage"
import { requestNewToken } from "@/services/AuthService"
import type { RequestConfirmationTokenForm } from "@/types/index"

export default function RequestNewTokenView() {
    const initialValues: RequestConfirmationTokenForm = {
        email: ''
    }

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors }
    } = useForm({ defaultValues: initialValues })

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
            <h1 className="text-2xl uppercase font-bold text-white text-center mb-4">Request Token</h1>
            <p className="text-xl font-light text-white text-center mb-6">
                Enter your email to receive{" "}
                <span className="text-red-600 font-bold">a new confirmation token</span>
            </p>

            <form
                onSubmit={handleSubmit(handleRequestCode)}
                className="space-y-4 bg-transparent rounded-lg flex flex-col w-full px-5"
                noValidate
            >
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
                                message: "Invalid email address",
                            },
                        })}
                    />
                    <label
                        htmlFor="email"
                        className={`absolute left-3 transition-all 
              peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-base text-sm
              peer-focus:top-1 peer-focus:text-sm 
              ${errors.email ? "text-red-600" : "text-gray-500"}`}
                    >
                        Email address
                    </label>
                    {errors.email && (
                        <ErrorMessage>{errors.email.message}</ErrorMessage>
                    )}
                </div>

                <input
                    type="submit"
                    value='Send token'
                    className="bg-red-600 hover:bg-red-700 w-full p-3 rounded-4xl text-white font-black text-xl cursor-pointer"
                />
            </form>
        </>
    )
}