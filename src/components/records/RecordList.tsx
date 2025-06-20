import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/solid"
import { Record } from "@/types/index"
import { formatDate } from "@/utils/datesUtils"
import { useNavigate, useParams } from "react-router-dom"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { deleteRecord } from "@/services/RecordService"
import { toast } from "react-toastify"

type RecordListProps = {
  records: Record[]
}

export default function RecordList({ records }: RecordListProps) {
  const navigate = useNavigate()
  const params = useParams()
  const exerciseId = params.exerciseId!

  const queryClient = useQueryClient()
  const { mutate } = useMutation({
    mutationFn: deleteRecord,
    onError: (error) => toast.error(error.message),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['exercise', exerciseId] })
      toast.success(data?.message)
    }
  })

  return (
    <div className="overflow-x-auto w-full">
      {records.length ? (
        <table className="min-w-full table-auto border-collapse border border-gray-700 text-white">
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
            {records.map((record) => (
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
      ) : (
        <p className="text-center py-20">No records yet for this exercise</p>
      )}
    </div>
  )
}