import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/solid"
import { Exercise } from "@/types/index"
import { formatDate } from "@/utils/datesUtils"
import { Navigate, useLocation, useNavigate } from "react-router-dom"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { deleteRecord, getRecords } from "@/services/RecordService"
import { toast } from "react-toastify"
import RecordsPagination from "./RecordsPagination"

type RecordListProps = {
  exerciseId: Exercise['_id']
}

export default function RecordList({ exerciseId }: RecordListProps) {
  const navigate = useNavigate()

  const location = useLocation()
  const queryParams = new URLSearchParams(location.search)
  const page = queryParams.get('page') || '1'

  // TODO: Check how to keep data staled
  const { data } = useQuery({
    queryKey: ['records', `${exerciseId}-${page}`],
    queryFn: () => getRecords({ exerciseId, page }),
    retry: false
  })

  const queryClient = useQueryClient()
  const { mutate } = useMutation({
    mutationFn: deleteRecord,
    onError: (error) => toast.error(error.message),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['records', exerciseId] })
      toast.success(data?.message)
    }
  })

  if (+page <= 0 || (data && data.totalPages > 0 && data.page > data.totalPages)) return <Navigate to={`/exercises/${exerciseId}`} />
  if (data) return (
    <div className="overflow-x-auto w-full">
      {data.records.length ? (
        <>
          <table className="min-w-full table-auto border-collapse border border-gray-700 text-white xl:mt-8">
            <thead className="bg-gray-800">
              <tr>
                <th className="border border-gray-700 px-4 py-2">Sets</th>
                <th className="border border-gray-700 px-4 py-2">Reps</th>
                <th className="border border-gray-700 px-4 py-2">Weight</th>
                <th className="border border-gray-700 px-4 py-2">Date</th>
                <th className="border border-gray-700 px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {data.records.map((record) => (
                <tr key={record._id} className="text-center">
                  <td className="border border-gray-700 px-4 py-2">{record.sets}</td>
                  <td className="border border-gray-700 px-4 py-2">{record.reps}</td>
                  <td className="border border-gray-700 px-4 py-2">{record.weight} kg</td>
                  <td className="border border-gray-700 px-4 py-2">{formatDate(record.updatedAt)}</td>
                  <td className="border border-gray-700 px-4 py-2">
                    <div className="flex justify-center gap-5">
                      <button
                        type="button"
                        className="text-blue-400 hover:text-blue-600"
                        onClick={() => navigate(location.pathname + `?editRecord=${record._id}`)}
                      >
                        <PencilSquareIcon className="w-5 h-5" />
                      </button>
                      <button
                        type="button"
                        className="text-red-500 hover:text-red-700"
                        onClick={() => mutate({ exerciseId, recordId: record._id })}
                      >
                        <TrashIcon className="w-5 h-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <RecordsPagination
            exerciseId={exerciseId}
            page={data.page}
            totalPages={data.totalPages}
          />
        </>
      ) : (
        <p className="text-center py-20">No records yet for this exercise</p>
      )}
    </div>
  )
}