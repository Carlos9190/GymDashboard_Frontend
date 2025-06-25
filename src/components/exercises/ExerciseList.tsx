import { ExerciseDashboard } from "@/types/index"
import { Link } from "react-router-dom"

type ExerciseListProps = {
  exercises: ExerciseDashboard
}

export default function ExerciseList({ exercises }: ExerciseListProps) {
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
              <div className="w-full text-center mt-2 flex flex-col">
                <p className="mt-2 text-sm text-black font-semibold mb-2">{exercise.exerciseName}</p>

                <Link
                  to={`/exercises/${exercise._id}`}
                  className="w-full text-xs bg-blue-100 text-blue-600 px-3 py-1 rounded-sm hover:bg-blue-200 transition"
                >
                  View records
                </Link>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-center py-20">No exercises yet for this routine</p>
      )}
    </>
  )
}