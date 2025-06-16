import { getRecordById } from "@/services/RecordService"
import { useQuery } from "@tanstack/react-query"
import { Navigate, useLocation, useParams } from "react-router-dom"
import EditRecordModal from "./EditRecordModal"

export default function EditRecordData() {
    const params = useParams()
    const exerciseId = params.exerciseId!

    const location = useLocation()
    const queryParams = new URLSearchParams(location.search)
    const recordId = queryParams.get('editRecord')!

    const { data, isError } = useQuery({
        queryKey: ['record', recordId],
        queryFn: () => getRecordById({ exerciseId, recordId }),
        enabled: !!recordId,
        retry: false
    })

    if (isError) return <Navigate to={'/404'} />
    if (data) return <EditRecordModal data={data} recordId={recordId} />
}