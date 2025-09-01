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
            <>
                <div className="text-4xl flex items-center gap-5 my-5">
                    <h1 className="font-black">{data.routineName}:</h1>
                    <p className="text-gray-300">
                        {formatDays(data.routineDays)}
                    </p>
                </div>

                <nav className="flex gap-3 my-2">
                    <Link
                        className="bg-red-600 hover:bg-red-700 px-10 py-3 text-white text-xl font-bold cursor-pointer transition-colors rounded-lg"
                        to="/routines"
                    >
                        Routines
                    </Link>

                    <button
                        type="button"
                        className="bg-purple-600 hover:bg-purple-700 px-10 py-3 text-white text-xl font-bold cursor-pointer transition-colors rounded-lg"
                        onClick={() =>
                            navigate(
                                location.pathname + "?selectExercises=true"
                            )
                        }
                    >
                        Select exercises
                    </button>
                </nav>
                <hr></hr>

                <ExerciseList
                    exercisesData={data.exercises}
                    routineId={routineId}
                />
                <ExerciseSelectorModal
                    routineName={data.routineName}
                    routineData={data.exercises}
                    routineId={routineId}
                />
            </>
        );
}
