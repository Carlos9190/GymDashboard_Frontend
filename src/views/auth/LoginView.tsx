import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { UserLoginForm } from "../../types";
import ErrorMessage from "../../components/ErrorMessage";
import { login } from "../../api/AuthAPI";
import { toast } from "react-toastify";

export default function LoginView() {

  const initialValues: UserLoginForm = {
    email: '',
    password: '',
  }
  const { register, handleSubmit, formState: { errors } } = useForm({ defaultValues: initialValues })

  const { mutate } = useMutation({
    mutationFn: login,
    onError: (error) => {
      toast.error(error.message)
    },
    onSuccess: (data) => {
      toast.success(data?.message)
    }
  })

  const handleLogin = (formData: UserLoginForm) => mutate(formData)

  return (
    <>
      <form
        onSubmit={handleSubmit(handleLogin)}
        className="space-y-8 p-10 bg-white rounded-lg"
        noValidate
      >
        <div className="flex flex-col gap-5">
          <label
            className="font-normal text-2xl"
          >Email</label>

          <input
            id="email"
            type="email"
            placeholder="Registration email address"
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
          >Password</label>

          <input
            type="password"
            placeholder="Registration password"
            className="w-full p-3 border-gray-300 border rounded-lg"
            {...register("password", {
              required: "Password is required",
            })}
          />
          {errors.password && (
            <ErrorMessage>{errors.password.message}</ErrorMessage>
          )}
        </div>

        <input
          type="submit"
          value='Login'
          className="bg-red-600 hover:bg-red-700 w-full p-3 text-white font-black text-xl cursor-pointer rounded-lg"
        />
      </form>

      <nav className="mt-10 flex flex-col space-y-4">
        <Link
          to={'/auth/register'}
          className="text-center text-gray-300 font-normal hover:text-red-600"
        >Do not have account yet? Create one</Link>
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
