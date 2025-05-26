import { Navigate, useParams } from "react-router-dom"
import { useQuery } from "@tanstack/react-query"
import { getExerciseById } from "@/services/ExerciseService"
import Spinner from "@/components/LoadingSpinner"
import EditProjectForm from "@/components/exercises/EditExerciseForm"

export default function UpdateExerciseView() {
    const params = useParams()
    const exerciseId = params.exerciseId!

    const { data, isLoading, isError } = useQuery({
        queryKey: ['editExercise', exerciseId],
        queryFn: () => getExerciseById(exerciseId),
        retry: false
    })

    if (isLoading) return <Spinner />
    if (isError) return <Navigate to='/404' />
    if (data) return <EditProjectForm data={data} exerciseId={exerciseId} />
}
