import { Link } from "react-router-dom"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { deleteExercise, getExercises } from "@/services/ExerciseService"
import Spinner from "@/components/LoadingSpinner"
import { toast } from "react-toastify"

export default function ExercisesDashboardView() {

  const { data, isLoading } = useQuery({
    queryKey: ['exercises'],
    queryFn: getExercises
  })

  const queryClient = useQueryClient()
  const { mutate } = useMutation({
    mutationFn: deleteExercise,
    onError: (error) => toast.error(error.message),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['exercises'] })
      queryClient.invalidateQueries({ queryKey: ['formRoutines'] })
      toast.success(data?.message)
    }
  })

  if (isLoading) return <Spinner />
  if (data) return (
    <>
      <h1 className="text-5xl font-black text-center">My exercises</h1>
      <p className="text-2xl font-light mt-5 text-center">Here you can manage your workout exercises</p>

      <nav className="my-5">
        <Link
          className="bg-red-600 hover:bg-red-700 px-10 py-3 text-white text-xl font-bold cursor-pointer transition-colors rounded-lg"
          to='/exercises/new'
        >New exercise</Link>
      </nav>

      {data.length ? (
        <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-10">
          {data.map((exercise) => (
            <li
              key={exercise._id}
              className="bg-white rounded-2xl shadow-md overflow-hidden aspect-square flex flex-col items-center justify-between p-4"
            >
              <img
                src={exercise.exerciseImage || "/default-image.webp"}
                alt={exercise.exerciseName}
                className="w-full h-2/3 object-cover"
              />

              <div className="w-full text-center mt-2">
                <p className="text-sm text-black font-semibold mb-2">{exercise.exerciseName}</p>

                <div className="flex justify-between gap-2">
                  <Link
                    to={`/exercises/${exercise._id}`}
                    className="text-xs bg-blue-100 text-blue-600 px-3 py-1 rounded-sm hover:bg-blue-200 transition w-full"
                  >
                    View
                  </Link>
                  <Link
                    to={`/exercises/${exercise._id}/edit`}
                    className="text-xs bg-yellow-100 text-yellow-600 px-3 py-1 rounded-sm hover:bg-yellow-200 transition w-full"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => mutate(exercise._id)}
                    className="text-xs bg-red-100 text-red-600 px-3 py-1 rounded-sm hover:bg-red-200 transition w-full"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-center py-20">No exercises yet {''}
          <Link
            className="text-red-600 hover:underline"
            to={'/exercises/new'}
          >Register exercise</Link>
        </p>
      )}
    </>
  )
}
