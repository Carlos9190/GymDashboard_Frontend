import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import FloatingField from "@/components/FloatingField";
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
                <span className="text-brand-400 font-bold">by logging in</span>
            </p>

            <form
                onSubmit={handleSubmit(handleLogin)}
                className="space-y-3 bg-transparent rounded-lg flex flex-col w-full px-5"
                noValidate
            >
                <FloatingField
                    id="email"
                    label="Email address"
                    type="email"
                    autoComplete="email"
                    error={errors.email?.message}
                    registration={register("email", {
                        required: "Email is required",
                        pattern: {
                            value: /\S+@\S+\.\S+/,
                            message: "Invalid email address",
                        },
                    })}
                />

                <FloatingField
                    id="password"
                    label="Password"
                    type="password"
                    autoComplete="current-password"
                    error={errors.password?.message}
                    registration={register("password", {
                        required: "Password is required",
                    })}
                />

                <Link
                    to={"/auth/forgot-password"}
                    className="text-center font-normal text-content-muted underline hover:text-brand-400"
                >
                    Forgot password?
                </Link>

                <SubmitButton value="Log in" isLoading={isPending} />

                <p className="text-center font-normal text-content-muted">
                    Do not have an account?{" "}
                    <Link
                        to={"/auth/register"}
                        className="font-normal underline hover:text-brand-400"
                    >
                        Sign up
                    </Link>
                </p>
            </form>
        </>
    );
}
