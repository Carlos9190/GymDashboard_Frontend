import { Link } from "react-router-dom"
import { useForm } from "react-hook-form"
import { toast } from "react-toastify"
import { useMutation } from "@tanstack/react-query"
import ExerciseForm from "@/components/exercises/ExerciseForm"
import { createExercise } from "@/services/ExerciseService"
import type { ExerciseFormData } from "@/types/index"

export default function CreateExerciseView() {

  const initialValues: ExerciseFormData = {
    exerciseName: "",
    file: null
  }
  const { control, reset, handleSubmit, formState: { errors } } = useForm({ defaultValues: initialValues })

  const { mutate } = useMutation({
    mutationFn: createExercise,
    onError: (error) => toast.error(error.message),
    onSuccess: (data) => {
      toast.success(data?.message)
      reset()
    }
  })

  const handleForm = (formData: ExerciseFormData) => mutate(formData)

  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-5xl font-black text-center">Register exercise</h1>
      <p className="text-2xl font-light mt-5 text-center">Fill out the following form to <span className="text-red-600">register a new exercise</span></p>

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
          value="Register exercise"
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
