import { Link, useNavigate } from "react-router-dom"
import ExerciseForm from "./ExerciseForm"
import { Exercise, ExerciseFormData } from "@/types/index"
import { useForm } from "react-hook-form"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { updateExercise } from "@/api/ExerciseAPI"
import { toast } from "react-toastify"

type EditProjectFormProps = {
    data: ExerciseFormData
    exerciseId: Exercise['_id']
}

export default function EditProjectForm({ data, exerciseId }: EditProjectFormProps) {

    const initialValues: ExerciseFormData = {
        exerciseName: data.exerciseName,
        file: null
    }
    const { control, handleSubmit, formState: { errors } } = useForm({ defaultValues: initialValues })

    const navigate = useNavigate()
    const queryClient = useQueryClient()
    const { mutate } = useMutation({
        mutationFn: updateExercise,
        onError: (error) => toast.error(error.message),
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ['exercises'] })
            queryClient.invalidateQueries({ queryKey: ['editExercise', exerciseId] })
            toast.success(data)
            navigate('/exercises')
        }
    })

    const handleForm = (formData: ExerciseFormData) => {
        const data = {
            formData,
            exerciseId
        }
        mutate(data)
    }

    return (
        <div className="max-w-3xl mx-auto">
            <h1 className="text-5xl font-black text-center">Edit exercise</h1>
            <p className="text-2xl font-light mt-5 text-center">Fill out the following form to <span className="text-red-600">edit the exercise</span></p>

            <form
                className="space-y-3 bg-transparent rounded-lg flex flex-col mx-auto w-lg py-10 "
                onSubmit={handleSubmit(handleForm)}
                noValidate
            >

                <ExerciseForm
                    control={control}
                    errors={errors}
                />

                <input
                    type="submit"
                    value="Save changes"
                    className="bg-red-600 hover:bg-red-700 transition-colors w-full p-3 text-white font-black text-xl cursor-pointer rounded-4xl mt-2"
                />

                <Link
                    to={"/exercises"}
                    className="text-gray-300 font-normal hover:text-red-600 underline text-center"
                >
                    Back to exercises
                </Link>

            </form>
        </div>
    )
}
