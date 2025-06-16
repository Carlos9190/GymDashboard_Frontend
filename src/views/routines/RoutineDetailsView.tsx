import ExerciseList from "@/components/exercises/ExerciseList"
import Spinner from "@/components/LoadingSpinner"
import { getRoutineById } from "@/services/RoutineService"
import { formatDays } from "@/utils/datesUtils"
import { useQuery } from "@tanstack/react-query"
import { Link, Navigate, useParams } from "react-router-dom"

export default function RoutineDetailsView() {
    const params = useParams()
    const routineId = params.routineId!
    const { data, isLoading, isError } = useQuery({
        queryKey: ['routine', routineId],
        queryFn: () => getRoutineById({ routineId }),
        retry: false
    })

    if (isLoading) return <Spinner />
    if (isError) return <Navigate to='/404' />
    if (data) return (
        <>
            <Link
                className="bg-red-600 hover:bg-red-700 px-10 py-3 text-white text-xl font-bold cursor-pointer transition-colors rounded-lg"
                to='/'
            >&larr; Routines</Link>

            <div className="text-4xl flex items-center gap-5 mt-10 mb-5">
                <h1 className="font-black">{data.routineName}:</h1>
                <p className="text-gray-300">
                    {formatDays(data.routineDays)}
                </p>
            </div>

            <ExerciseList exercises={data.exercises} routineId={routineId} />
        </>
    )
}