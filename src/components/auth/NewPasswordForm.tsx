import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import ErrorMessage from "@/components/ErrorMessage";
import SubmitButton from "@/components/SubmitButton";
import { updatePasswordWithToken } from "@/services/AuthService";
import type { ConfirmToken, NewPasswordForm } from "@/types/index";

type NewPasswordFormProps = {
    token: ConfirmToken["token"];
};

export default function NewPasswordForm({ token }: NewPasswordFormProps) {
    const navigate = useNavigate();
    const initialValues: NewPasswordForm = {
        password: "",
        password_confirmation: "",
    };

    const {
        register,
        handleSubmit,
        watch,
        reset,
        formState: { errors },
    } = useForm({ defaultValues: initialValues });

    const { mutate, isPending } = useMutation({
        mutationFn: updatePasswordWithToken,
        onError: (error) => toast.error(error.message),
        onSuccess: (data) => {
            toast.success(data?.message);
            reset();
            navigate("/auth/login");
        },
    });

    const handleNewPassword = (formData: NewPasswordForm) => {
        const data = {
            formData,
            token,
        };
        mutate(data);
    };

    const password = watch("password");

    return (
        <form
            onSubmit={handleSubmit(handleNewPassword)}
            className="space-y-4 bg-transparent rounded-lg flex flex-col w-full px-5"
            noValidate
        >
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
                            message:
                                "Password should be 8 characters length minimum",
                        },
                    })}
                />
                <label
                    htmlFor="password"
                    className={`absolute left-3 transition-all ${errors.password ? "text-red-600" : "text-gray-500"} peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-base peer-focus:top-1 peer-focus:text-sm peer-focus:text-red-600`}
                >
                    New password
                </label>
                {errors.password && (
                    <ErrorMessage>{errors.password.message}</ErrorMessage>
                )}
            </div>

            <div className="relative w-full">
                <input
                    id="password_confirmation"
                    type="password"
                    placeholder=" "
                    className={`peer w-full px-3 pt-6 pb-2 border rounded-lg bg-transparent text-white placeholder-transparent transition-all ${errors.password_confirmation ? "border-red-500" : "border-gray-300"} focus:outline-none focus:border-red-500`}
                    {...register("password_confirmation", {
                        required: "Password confirmation is required",
                        validate: (value) =>
                            value === password ||
                            "Password confirmation does not match",
                    })}
                />
                <label
                    htmlFor="password_confirmation"
                    className={`absolute left-3 transition-all ${errors.password_confirmation ? "text-red-600" : "text-gray-500"} peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-base peer-focus:top-1 peer-focus:text-sm peer-focus:text-red-600`}
                >
                    Confirm password
                </label>
                {errors.password_confirmation && (
                    <ErrorMessage>
                        {errors.password_confirmation.message}
                    </ErrorMessage>
                )}
            </div>

            <SubmitButton value="Set new password" isLoading={isPending} />
        </form>
    );
}
