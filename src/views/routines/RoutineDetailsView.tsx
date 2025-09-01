import ExerciseList from "@/components/exercises/ExerciseList";
import Spinner from "@/components/LoadingSpinner";
import { getRoutineById } from "@/services/RoutineService";
import { formatDays } from "@/utils/datesUtils";
import { useQuery } from "@tanstack/react-query";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import ExerciseSelectorModal from "@/components/routines/ExerciseSelectorModal";

export default function RoutineDetailsView() {
    const navigate = useNavigate();
    const params = useParams();
    const routineId = params.routineId!;
    const { data, isLoading, isError } = useQuery({
        queryKey: ["routine", routineId],
        queryFn: () => getRoutineById({ routineId }),
        retry: false,
    });

    if (isLoading) return <Spinner />;
    if (isError) return <Navigate to="/404" />;
    if (data)
        return (
            <div className="px-4 sm:px-6 lg:px-8 py-6 max-w-screen-2xl mx-auto">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-6">
                    <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black">
                        {data.routineName}
                    </h1>
                    <p className="text-base sm:text-lg text-gray-300">
                        {formatDays(data.routineDays)}
                    </p>
                </div>

                <nav className="flex flex-col sm:flex-row gap-4 mb-6">
                    <Link
                        className="bg-red-600 hover:bg-red-700 px-6 py-2 sm:px-8 sm:py-3 text-white text-base sm:text-lg font-bold transition-colors rounded-lg text-center"
                        to="/routines"
                    >
                        Routines
                    </Link>

                    <button
                        type="button"
                        className="bg-purple-600 hover:bg-purple-700 px-6 py-2 sm:px-8 sm:py-3 text-white text-base sm:text-lg font-bold transition-colors rounded-lg text-center"
                        onClick={() =>
                            navigate(
                                location.pathname + "?selectExercises=true"
                            )
                        }
                    >
                        Select exercises
                    </button>

                    <Link
                        className="bg-green-600 hover:bg-green-700 px-6 md:px-10 py-2 md:py-3 text-white text-base md:text-xl font-bold transition-colors rounded-lg text-center"
                        to={`/routines/${routineId}/edit`}
                    >
                        Edit routine
                    </Link>
                </nav>

                <hr className="border-gray-700 mb-6" />

                <ExerciseList
                    exercisesData={data.exercises}
                    routineId={routineId}
                />

                <ExerciseSelectorModal
                    routineName={data.routineName}
                    routineData={data.exercises}
                    routineId={routineId}
                />
            </div>
        );
}
