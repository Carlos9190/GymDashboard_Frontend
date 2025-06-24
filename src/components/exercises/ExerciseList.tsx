import { removeExerciseFromRoutine } from "@/services/RoutineService"
import { ExerciseDashboard, Routine } from "@/types/index"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { Link } from "react-router-dom"
import { toast } from "react-toastify"

type ExerciseListProps = {
  exercises: ExerciseDashboard
  routineId: Routine['_id']
}

export default function ExerciseList({ exercises, routineId }: ExerciseListProps) {
  const queryClient = useQueryClient()
  const { mutate } = useMutation({
    mutationFn: removeExerciseFromRoutine,
    onError: (error) => toast.error(error.message),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['routine', routineId] })
      toast.success(data?.message)
    }
  })

  return (
    <>
      {exercises.length ? (
        <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-10">
          {exercises.map((exercise) => (
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
                    View records
                  </Link>
                  <button
                    type='button'
                    onClick={() => mutate({ routineId, exerciseId: exercise._id })}
                    className="text-xs bg-red-100 text-red-600 px-3 py-1 rounded-sm hover:bg-red-200 transition w-full"
                  >
                    Remove from routine
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      ) : ( //TODO:
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