import { useForm } from "react-hook-form"
import ErrorMessage from "@/components/ErrorMessage"
import { UpdateCurrentUserPasswordForm } from "@/types/index"
import { useMutation } from "@tanstack/react-query"
import { changePassword } from "@/services/ProfileService"
import { toast } from "react-toastify"

export default function ChangePasswordView() {
  const initialValues: UpdateCurrentUserPasswordForm = {
    current_password: '',
    password: '',
    password_confirmation: ''
  }

  const { register, reset, handleSubmit, watch, formState: { errors } } = useForm({ defaultValues: initialValues })

  const { mutate } = useMutation({
    mutationFn: changePassword,
    onError: (error) => toast.error(error.message),
    onSuccess: (data) => {
      toast.success(data?.message)
      reset()
    }
  })

  const password = watch('password')

  const handleChangePassword = (formData: UpdateCurrentUserPasswordForm) => mutate(formData)

  return (
    <>
      <div className="mx-auto max-w-xl">

        <h1 className="text-5xl font-black text-center">Update password</h1>
        <p className="text-2xl font-light text-center mt-5">Fill out the following form to {" "}
          <span className="text-red-600 font-bold">update your password</span>
        </p>


        <form
          onSubmit={handleSubmit(handleChangePassword)}
          className="space-y-5 bg-transparent p-10"
          noValidate
        >
          <div className="relative w-full">
            <input
              id="current_password"
              type="password"
              placeholder=" "
              className={`peer w-full px-3 pt-6 pb-2 border rounded-lg bg-transparent text-white placeholder-transparent transition-all ${errors.current_password ? "border-red-500" : "border-gray-300"} focus:outline-none focus:border-red-500`}
              {...register("current_password", {
                required: "Current password is required"
              })}
            />
            <label
              htmlFor="current_password"
              className={`absolute left-3 transition-all ${watch("current_password") ? "top-1 text-sm text-red-600" : "top-3.5 text-gray-500"} peer-focus:top-1 peer-focus:text-sm peer-focus:text-red-600`}
            >
              Current password
            </label>
            {errors.current_password && <ErrorMessage>{errors.current_password.message}</ErrorMessage>}
          </div>

          <div className="relative w-full">
            <input
              id="password"
              type="password"
              placeholder=" "
              className={`peer w-full px-3 pt-6 pb-2 border rounded-lg bg-transparent text-white placeholder-transparent transition-all ${errors.password ? "border-red-500" : "border-gray-300"} focus:outline-none focus:border-red-500`}
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
              className={`absolute left-3 transition-all ${watch("password") ? "top-1 text-sm text-red-600" : "top-3.5 text-gray-500"} peer-focus:top-1 peer-focus:text-sm peer-focus:text-red-600`}
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
              className={`peer w-full px-3 pt-6 pb-2 border rounded-lg bg-transparent text-white placeholder-transparent transition-all ${errors.password_confirmation ? "border-red-500" : "border-gray-300"} focus:outline-none focus:border-red-500`}
              {...register("password_confirmation", {
                required: "Password confirmation is required",
                validate: value =>
                  value === password || "Passwords do not match"
              })}
            />
            <label
              htmlFor="password_confirmation"
              className={`absolute left-3 transition-all ${watch("password_confirmation") ? "top-1 text-sm text-red-600" : "top-3.5 text-gray-500"} peer-focus:top-1 peer-focus:text-sm peer-focus:text-red-600`}
            >
              Confirm password
            </label>
            {errors.password_confirmation && (
              <ErrorMessage>{errors.password_confirmation.message}</ErrorMessage>
            )}
          </div>

          <input
            type="submit"
            value="Change password"
            className="bg-red-600 hover:bg-red-700 transition-colors w-full p-3 text-white font-black text-xl cursor-pointer rounded-4xl mt-2"
          />
        </form>
      </div>
    </>
  )
}