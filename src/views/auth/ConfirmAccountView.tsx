import { useState } from "react"
import { toast } from "react-toastify"
import { useMutation } from "@tanstack/react-query"
import { Link, useNavigate } from "react-router-dom"
import { PinInput, PinInputField } from "@chakra-ui/pin-input"
import { confirmAccount } from "@/services/AuthService"
import type { ConfirmToken } from "@/types/index"

export default function ConfirmAccountView() {
    const navigate = useNavigate()
    const [token, setToken] = useState<ConfirmToken["token"]>("")

    const { mutate } = useMutation({
        mutationFn: confirmAccount,
        onError: (error) => toast.error(error.message),
        onSuccess: (data) => {
            toast.success(data?.message)
            navigate("/auth/login")
        },
    })

    const handleChange = (value: ConfirmToken["token"]) => setToken(value)
    const handleComplete = (value: ConfirmToken["token"]) => mutate({ token: value })

    return (
        <>
            <h1 className="text-2xl uppercase font-bold text-white text-center mb-4">Confirm Account</h1>
            <p className="text-xl font-light text-white text-center mb-6">
                Enter the 6-digit token you received{" "}
                <span className="text-red-600 font-bold">via email</span>
            </p>

            <form
                className="space-y-6 bg-transparent rounded-lg flex flex-col items-center w-full px-5 mt-6"
                onSubmit={(e) => e.preventDefault()}
            >
                <label className="text-white text-lg font-medium text-center">Confirmation token</label>

                <div className="flex space-x-3">
                    <PinInput
                        value={token}
                        onChange={handleChange}
                        onComplete={handleComplete}
                    >
                        {[...Array(6)].map((_, index) => (
                            <PinInputField
                                key={index}
                                className="w-10 h-12 text-xl text-white text-center bg-transparent border rounded-md border-gray-300 focus:border-red-500 focus:outline-none"
                            />
                        ))}
                    </PinInput>
                </div>

                <Link
                    to={"/auth/request-token"}
                    className="text-center text-gray-300 font-normal hover:text-red-600 underline mt-4"
                >
                    Request new token
                </Link>
            </form>
        </>
    )
}