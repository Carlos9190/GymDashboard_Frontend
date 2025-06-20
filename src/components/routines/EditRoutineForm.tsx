import { Link, useNavigate } from "react-router-dom"
import RoutineForm from "./RoutineForm"
import { Routine, RoutineFormData } from "@/types/index"
import { useForm } from "react-hook-form"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { updateRoutine } from "@/services/RoutineService"
import { toast } from "react-toastify"

type EditRoutineFormProps = {
    data: RoutineFormData
    routineId: Routine['_id']
}

export default function EditRoutineForm({ data, routineId }: EditRoutineFormProps) {
    const { register, handleSubmit, watch, reset, formState: { errors } } = useForm<RoutineFormData>({
        defaultValues: {
            routineName: data.routineName,
            routineDays: data.routineDays
        }
    })

    const navigate = useNavigate()
    const queryClient = useQueryClient()
    const { mutate } = useMutation({
        mutationFn: updateRoutine,
        onError: (error) => toast.error(error.message),
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ['routines'] })
            queryClient.invalidateQueries({ queryKey: ['editRoutine', routineId] })
            toast.success(data?.message)
            reset()
            navigate('/')
        }
    })

    const handleForm = (formData: RoutineFormData) => {
        const data = {
            formData,
            routineId
        }
        mutate(data)
    }

    return (
        <div className="max-w-3xl mx-auto">
            <h1 className="text-5xl font-black text-center">Edit routine</h1>
            <p className="text-2xl font-light mt-5 text-center">Fill out the following form to <span className="text-red-600 font-bold">edit the routine</span></p>

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
                    value="Save changes"
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
