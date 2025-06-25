import { Link, Navigate, useNavigate, useParams } from "react-router-dom"
import { useQuery } from "@tanstack/react-query"
import { getExerciseById } from "@/services/ExerciseService"
import Spinner from "@/components/LoadingSpinner"
import AddRecordModal from "@/components/records/NewRecordModal"
import RecordList from "@/components/records/RecordList"
import EditRecordData from "@/components/records/EditRecordData"

export default function ExerciseDetailsView() {
  const navigate = useNavigate()
  const params = useParams()
  const exerciseId = params.exerciseId!
  const { data, isLoading, isError } = useQuery({
    queryKey: ['exercise', exerciseId],
    queryFn: () => getExerciseById({ exerciseId }),
    retry: false
  })

  if (isLoading) return <Spinner />
  if (isError) return <Navigate to='/404' />
  if (data) return (
    <>
      <nav className="flex gap-3">
        <Link
          className="bg-red-600 hover:bg-red-700 px-10 py-3 text-white text-xl font-bold cursor-pointer transition-colors rounded-lg"
          to='/exercises'
        >&larr; Exercises</Link>

        <button
          type="button"
          className="bg-purple-600 hover:bg-purple-700 px-10 py-3 text-white text-xl font-bold cursor-pointer transition-colors rounded-lg"
          onClick={() => navigate(location.pathname + '?newRecord=true')}
        >New record</button>
      </nav>

      <h1 className="text-4xl font-black mt-10 mb-5">{data.exerciseName}</h1>


      <div className="flex items-center space-x-3">
        <div className="max-w-xl bg-transparent rounded-lg">
          <img
            src={data.exerciseImage || "/default-image.webp"}
            alt={data.exerciseName}
            className="w-full rounded-xl"
          />
        </div>

        <RecordList exerciseId={exerciseId} />
      </div>

      <AddRecordModal />
      <EditRecordData />
    </>
  )
}