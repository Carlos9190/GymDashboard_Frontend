import { Link } from "react-router-dom"
import { useForm } from "react-hook-form"
import RoutineForm from "@/components/routines/RoutineForm"
import { RoutineFormData } from "@/types/index"
import { useMutation } from "@tanstack/react-query"
import { createRoutine } from "@/services/RoutineService"
import { toast } from "react-toastify"

export default function NewRoutineView() {

    const initialValues: RoutineFormData = {
        routineName: "",
        routineDays: []
    }

    const { register, handleSubmit, reset, watch, formState: { errors } } = useForm({ defaultValues: initialValues })

    const { mutate } = useMutation({
        mutationFn: createRoutine,
        onError: (error) => toast.error(error.message),
        onSuccess: (data) => {
            toast.success(data?.message)
            reset()
        }
    })

    const handleForm = (formData: RoutineFormData) => mutate(formData)

    return (
        <div className="max-w-3xl mx-auto">
            <h1 className="text-5xl font-black text-center">Register routine</h1>
            <p className="text-2xl font-light mt-5 text-center">Fill out the following form to <span className="text-red-600">register a new routine</span></p>

            <form
                className="space-y-3 bg-transparent rounded-lg flex flex-col mx-auto w-lg py-10 "
                onSubmit={handleSubmit(handleForm)}
                noValidate
            >

                <RoutineForm
                    register={register}
                    watch={watch}
                    errors={errors}
                />

                <input
                    type="submit"
                    value="Register routine"
                    className="bg-red-600 hover:bg-red-700 transition-colors w-full p-3 text-white font-black text-xl cursor-pointer rounded-4xl mt-2"
                />

                <Link
                    to={"/"}
                    className="text-gray-300 font-normal hover:text-red-600 underline text-center"
                >
                    Back to routines
                </Link>

            </form>
        </div>
    )
}
