import { useState } from "react"
import { toast } from "react-toastify"
import { useMutation } from "@tanstack/react-query"
import { Link, useNavigate } from "react-router-dom"
import { PinInput, PinInputField } from '@chakra-ui/pin-input'
import { ConfirmToken } from "@/types/index"
import { confirmAccount } from "@/api/AuthAPI"

export default function ConfirmAccountView() {
    const navigate = useNavigate()
    const [token, setToken] = useState<ConfirmToken['token']>('')

    const { mutate } = useMutation({
        mutationFn: confirmAccount,
        onError: (error) => {
            toast.error(error.message)
        },
        onSuccess: (data) => {
            toast.success(data?.message)
            navigate('/auth/login')
        }
    })

    const handleChange = (token: ConfirmToken['token']) => {
        setToken(token)
    }

    const handleComplete = (token: ConfirmToken['token']) => mutate({ token })

    return (
        <>
            <h1 className="text-5xl font-black text-white">Confirm your account</h1>
            <p className="text-2xl font-light text-white mt-5">
                Enter the token you received {''}
                <span className=" text-red-600 font-bold"> via email</span>
            </p>

            <form
                className="space-y-8 p-10 bg-white mt-10 rounded-lg"
            >
                <label
                    className="font-normal text-2xl text-center block"
                >6 digits token</label>
                <div className="flex justify-center gap-5">
                    <PinInput value={token} onChange={handleChange} onComplete={handleComplete}>
                        <PinInputField className="w-10 h-10 rounded-lg border-gray-300 border placeholder-white text-center" />
                        <PinInputField className="w-10 h-10 rounded-lg border-gray-300 border placeholder-white text-center" />
                        <PinInputField className="w-10 h-10 rounded-lg border-gray-300 border placeholder-white text-center" />
                        <PinInputField className="w-10 h-10 rounded-lg border-gray-300 border placeholder-white text-center" />
                        <PinInputField className="w-10 h-10 rounded-lg border-gray-300 border placeholder-white text-center" />
                        <PinInputField className="w-10 h-10 rounded-lg border-gray-300 border placeholder-white text-center" />
                    </PinInput>
                </div>
            </form>

            <nav className="mt-10 flex flex-col space-y-4">
                <Link
                    to={'/auth/request-token'}
                    className="text-center text-gray-300 font-normal hover:text-red-600"
                >
                    Request new token
                </Link>
            </nav>

        </>
    )
}