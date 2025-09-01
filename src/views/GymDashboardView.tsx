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
        <>
            <h1 className="text-5xl font-black text-center">
                Dashboard for <span className="text-red-600">{today}</span>
            </h1>

            <nav className="my-5">
                <Link
                    className="bg-red-600 hover:bg-red-700 px-10 py-3 text-white text-xl font-bold cursor-pointer transition-colors rounded-lg"
                    to="/routines"
                >
                    Manage routines
                </Link>
            </nav>
            <hr></hr>

            <div className="mt-5 space-y-12">
                {data && data.length > 0 ? (
                    data.map((routine) => (
                        <div key={routine._id} className="space-y-4">
                            <h2 className="text-3xl font-bold text-red-600 hover:underline transition-all w-fit">
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
                    <p className="text-center text-gray-300 italic py-20">
                        You don’t have any routines registered for today.
                    </p>
                )}
            </div>
        </>
    );
}
