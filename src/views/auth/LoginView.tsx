import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import ErrorMessage from "@/components/ErrorMessage";
import { login } from "@/services/AuthService";
import type { UserLoginForm } from "@/types/index";
import SubmitButton from "@/components/SubmitButton";

export default function LoginView() {
    const initialValues: UserLoginForm = {
        email: "",
        password: "",
    };

    const {
        register,
        handleSubmit,
        formState: { errors },
        watch,
    } = useForm<UserLoginForm>({ defaultValues: initialValues });

    const navigate = useNavigate();
    const { mutate, isPending } = useMutation({
        mutationFn: login,
        onError: (error) => {
            toast.error(error.message);
            if (
                error.message ===
                "User account has not been confirmed, check your email to confirm it"
            )
                return navigate("/auth/confirm-account");
        },
        onSuccess: (data) => {
            toast.success(data?.message);
            navigate("/");
        },
    });

    const handleLogin = (formData: UserLoginForm) => mutate(formData);

    return (
        <>
            <h1 className="text-2xl uppercase font-bold text-white text-center mb-4">
                Login
            </h1>
            <p className="text-xl font-light text-white text-center mb-6">
                Start planning your gym routines{" "}
                <span className="text-red-600 font-bold">by logging in</span>
            </p>

            <form
                onSubmit={handleSubmit(handleLogin)}
                className="space-y-3 bg-transparent rounded-lg flex flex-col w-full px-5"
                noValidate
            >
                <div className="relative w-full">
                    <input
                        id="email"
                        type="email"
                        placeholder=" "
                        className={`peer w-full px-3 pt-6 pb-2 border rounded-lg bg-transparent text-white placeholder-transparent transition-all ${errors.email ? "border-red-500" : "border-gray-300"} focus:outline-none focus:border-red-500`}
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
                        className={`absolute left-3 transition-all ${watch("email") ? "top-1 text-sm text-red-600" : "top-3.5 text-gray-500"} peer-focus:top-1 peer-focus:text-sm peer-focus:text-red-600`}
                    >
                        Email address
                    </label>
                    {errors.email && (
                        <ErrorMessage>{errors.email.message}</ErrorMessage>
                    )}
                </div>

                <div className="relative w-full">
                    <input
                        id="password"
                        type="password"
                        placeholder=" "
                        className={`peer w-full px-3 pt-6 pb-2 border rounded-lg bg-transparent text-white placeholder-transparent transition-all ${errors.password ? "border-red-500" : "border-gray-300"} focus:outline-none focus:border-red-500`}
                        {...register("password", {
                            required: "Password is required",
                        })}
                    />
                    <label
                        htmlFor="password"
                        className={`absolute left-3 transition-all ${watch("password") ? "top-1 text-sm text-red-600" : "top-3.5 text-gray-500"} peer-focus:top-1 peer-focus:text-sm peer-focus:text-red-600`}
                    >
                        Password
                    </label>
                    {errors.password && (
                        <ErrorMessage>{errors.password.message}</ErrorMessage>
                    )}
                </div>

                <Link
                    to={"/auth/forgot-password"}
                    className="text-gray-300 font-normal hover:text-red-600 underline text-center"
                >
                    Forgot password?
                </Link>

                <SubmitButton value="Log in" isLoading={isPending} />

                <p className="text-center text-gray-300 font-normal">
                    Do not have an account?{" "}
                    <Link
                        to={"/auth/register"}
                        className="text-gray-300 font-normal hover:text-red-600 underline text-center"
                    >
                        Sign up
                    </Link>
                </p>
            </form>
        </>
    );
}
