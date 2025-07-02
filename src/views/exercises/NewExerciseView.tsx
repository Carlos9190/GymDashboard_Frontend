import { Link, useNavigate } from "react-router-dom"
import { useForm } from "react-hook-form"
import { toast } from "react-toastify"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import ExerciseForm from "@/components/exercises/ExerciseForm"
import { createExercise } from "@/services/ExerciseService"
import type { ExerciseFormData } from "@/types/index"
import SubmitButton from "@/components/SubmitButton"

export default function NewExerciseView() {
  const initialValues: ExerciseFormData = {
    exerciseName: "",
    file: null,
    routineId: ""
  }

  const { register, watch, reset, handleSubmit, formState: { errors }, setValue } = useForm<ExerciseFormData>({ defaultValues: initialValues })

  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const { mutate, isPending } = useMutation({
    mutationFn: createExercise,
    onError: (error) => toast.error(error.message),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['exercises'] })
      toast.success(data?.message)
      reset()
      navigate('/exercises')
    }
  })

  const handleForm = (formData: ExerciseFormData) => mutate({ formData })

  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-5xl font-black text-center">Register exercise</h1>
      <p className="text-2xl font-light mt-5 text-center">
        Fill out the following form to <span className="text-red-600 font-bold">register a new exercise</span>
      </p>

      <form
        className="space-y-3 bg-transparent rounded-lg flex flex-col mx-auto w-lg py-10"
        onSubmit={handleSubmit(handleForm)}
        noValidate
      >
        <ExerciseForm
          register={register}
          watch={watch}
          setValue={setValue}
          errors={errors}
        />

        <SubmitButton value="Register exercise" isLoading={isPending} />

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