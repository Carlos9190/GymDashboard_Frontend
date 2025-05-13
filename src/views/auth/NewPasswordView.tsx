import { useState } from "react"
import NewPasswordToken from "@/components/auth/NewPasswordToken"
import NewPasswordForm from "@/components/auth/NewPasswordForm"
import { ConfirmToken } from "@/types/index"

export default function NewPasswordView() {
  const [token, setToken] = useState<ConfirmToken['token']>('')
  const [isValidToken, setIsValidToken] = useState(false)

  return (
    <>
      <h1 className="text-2xl uppercase font-bold text-white text-center mb-4">Reset password</h1>
      <p className="text-xl font-light text-white text-center mb-6">
        Enter the 6-digit token you received{" "}
        <span className="text-red-600 font-bold">via email</span>
      </p>

      {!isValidToken ?
        <NewPasswordToken token={token} setToken={setToken} setIsValidToken={setIsValidToken} /> :
        <NewPasswordForm token={token} />
      }
    </>
  )
}