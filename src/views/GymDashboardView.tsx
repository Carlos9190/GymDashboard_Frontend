import ExerciseList from "@/components/exercises/ExerciseList";
import Spinner from "@/components/LoadingSpinner";
import { getRoutineByCurrentDay } from "@/services/RoutineService";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";

export default function GymDashboardView() {
    const { data, isLoading } = useQuery({
        queryKey: ["currentRoutine"],
        queryFn: getRoutineByCurrentDay,
    });

    const today = new Date().toLocaleDateString("en-US", {
        weekday: "long",
    });

    if (isLoading) return <Spinner />;
    return (
        <div className="px-4 sm:px-6 lg:px-8 py-6 max-w-7xl mx-auto">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-center">
                <span className="text-red-600">{today}</span> routine
            </h1>

            <nav className="my-5 flex justify-center">
                <Link
                    className="bg-red-600 hover:bg-red-700 px-6 sm:px-8 md:px-10 py-2 sm:py-3 text-white text-lg sm:text-xl font-bold cursor-pointer transition-colors rounded-lg text-center"
                    to="/routines"
                >
                    Manage routines
                </Link>
            </nav>

            <hr className="border-gray-700" />

            <div className="mt-5 space-y-12">
                {data && data.length > 0 ? (
                    data.map((routine) => (
                        <div key={routine._id} className="space-y-4">
                            <h2 className="text-2xl sm:text-3xl font-bold text-red-600 hover:underline transition-all w-fit">
                                <Link to={`/routines/${routine._id}`}>
                                    {routine.routineName}
                                </Link>
                            </h2>

                            {routine.exercises.length > 0 ? (
                                <ExerciseList
                                    exercisesData={routine.exercises}
                                    routineId={routine._id}
                                />
                            ) : (
                                <p className="text-gray-300 italic">
                                    No exercises assigned to this routine.{" "}
                                    <Link
                                        to="/exercises"
                                        className="text-red-600 hover:underline font-medium"
                                    >
                                        Manage your exercises
                                    </Link>
                                </p>
                            )}
                        </div>
                    ))
                ) : (
                    <p className="text-center text-gray-300 italic py-20 text-base sm:text-lg">
                        You don’t have any routines registered for today.
                    </p>
                )}
            </div>
        </div>
    );
}
