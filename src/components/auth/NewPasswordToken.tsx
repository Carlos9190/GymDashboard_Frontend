import { toast } from 'react-toastify'
import { Link } from 'react-router-dom'
import { Dispatch, SetStateAction } from 'react'
import { useMutation } from '@tanstack/react-query'
import { PinInput, PinInputField } from '@chakra-ui/pin-input'
import { ConfirmToken } from '@/types/index'
import { validateToken } from '@/api/AuthAPI'

type NewPasswordTokenProps = {
    token: ConfirmToken['token']
    setToken: Dispatch<SetStateAction<string>>
    setIsValidToken: Dispatch<SetStateAction<boolean>>
}

export default function NewPasswordToken({ token, setToken, setIsValidToken }: NewPasswordTokenProps) {

    const { mutate } = useMutation({
        mutationFn: validateToken,
        onError(error) {
            toast.error(error.message)
        },
        onSuccess(data) {
            toast.success(data?.message)
            setIsValidToken(true)
        }
    })

    const handleChange = (token: ConfirmToken['token']) => setToken(token)
    const handleComplete = (token: ConfirmToken['token']) => mutate({ token })

    return (
        <>
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
                    to={'/auth/forgot-password'}
                    className="text-center text-gray-300 font-normal hover:text-red-600"
                >
                    Request new token
                </Link>
            </nav>
        </>
    )
}