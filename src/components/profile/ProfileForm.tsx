import { useForm } from "react-hook-form"
import ErrorMessage from "../ErrorMessage"
import { User, UserProfileForm } from "@/types/index"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { updateProfile } from "@/services/ProfileService"
import { toast } from "react-toastify"
import SubmitButton from "@/components/SubmitButton"

type ProfileFormProps = {
    data: User
}

export default function ProfileForm({ data }: ProfileFormProps) {
    const { register, handleSubmit, formState: { errors } } = useForm<UserProfileForm>({ defaultValues: data })

    const queryClient = useQueryClient()
    const { mutate, isPending } = useMutation({
        mutationFn: updateProfile,
        onError: (error) => toast.error(error.message),
        onSuccess: (data) => {
            toast.success(data?.message)
            queryClient.invalidateQueries({ queryKey: ['user'] })
        }
    })

    const handleEditProfile = (formData: UserProfileForm) => mutate(formData)

    return (
        <>
            <div className="mx-auto max-w-xl">
                <h1 className="text-5xl font-black text-center">My profile</h1>
                <p className="text-2xl font-light mt-5 text-center">Here you can update {" "}
                    <span className="text-red-600 font-bold">your personal information</span>
                </p>

                <form
                    onSubmit={handleSubmit(handleEditProfile)}
                    className="space-y-5 bg-transparent p-10"
                    noValidate
                >
                    <div className="relative w-full">
                        <input
                            id="name"
                            type="text"
                            step="any"
                            placeholder=" "
                            className={`peer w-full px-3 pt-6 pb-2 border rounded-lg bg-transparent text-white placeholder-transparent transition-all ${errors.name ? "border-red-500" : "border-gray-300"} focus:outline-none focus:border-red-500`}
                            {...register("name", {
                                required: "User name is required",
                            })}
                        />
                        <label
                            htmlFor="name"
                            className={`absolute left-3 transition-all top-1 text-sm text-red-600 peer-focus:top-1 peer-focus:text-sm peer-focus:text-red-600`}
                        >
                            Name
                        </label>
                        {errors.name && <ErrorMessage>{errors.name.message}</ErrorMessage>}
                    </div>

                    <SubmitButton value="Save changes" isLoading={isPending} />
                </form>
            </div>
        </>
    )
}