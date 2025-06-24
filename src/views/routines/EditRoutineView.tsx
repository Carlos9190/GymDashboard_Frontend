import Spinner from "@/components/LoadingSpinner"
import EditRoutineForm from "@/components/routines/EditRoutineForm"
import { getRoutineById } from "@/services/RoutineService"
import { useQuery } from "@tanstack/react-query"
import { Navigate, useParams } from "react-router-dom"

export default function EditRoutineView() {
    const params = useParams()
    const routineId = params.routineId!
    const { data, isLoading, isError } = useQuery({
        queryKey: ['editRoutine', routineId],
        queryFn: () => getRoutineById({ routineId }),
        retry: false
    })

    if (isLoading) return <Spinner />
    if (isError) return <Navigate to='/404' />
    if (data) return <EditRoutineForm data={data} routineId={routineId} />
}