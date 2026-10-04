import ExerciseList from "@/components/exercises/ExerciseList";
import Spinner from "@/components/LoadingSpinner";
import { getRoutineByCurrentDay } from "@/services/RoutineService";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { CalendarDaysIcon } from "@heroicons/react/24/outline";

export default function GymDashboardView() {
    const { data, isLoading } = useQuery({
        queryKey: ["currentRoutine"],
        queryFn: getRoutineByCurrentDay,
    });

    const today = new Date().toLocaleDateString("en-US", {
        weekday: "long",
    });

    if (isLoading) return <Spinner label="Loading today's routine" />;

    const hasRoutines = Boolean(data && data.length > 0);

    return (
        <div className="py-2">
            <div className="flex flex-col items-center gap-4 sm:flex-row sm:items-end sm:justify-between">
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-center sm:text-left">
                    <span className="text-brand-400">{today}</span> routine
                </h1>

                <Link
                    className="inline-flex min-h-11 items-center justify-center rounded-lg bg-brand-600 px-6 sm:px-8 text-lg font-bold text-white transition-colors hover:bg-brand-700"
                    to="/routines"
                >
                    Manage routines
                </Link>
            </div>

            <hr className="my-6 border-edge" />

            <div className="space-y-12">
                {hasRoutines ? (
                    data!.map((routine) => (
                        <section key={routine._id} className="space-y-4">
                            <h2 className="w-fit text-2xl sm:text-3xl font-bold">
                                <Link
                                    to={`/routines/${routine._id}`}
                                    className="text-brand-400 hover:underline"
                                >
                                    {routine.routineName}
                                </Link>
                            </h2>

                            {routine.exercises.length > 0 ? (
                                <ExerciseList
                                    exercisesData={routine.exercises}
                                    routineId={routine._id}
                                />
                            ) : (
                                <p className="text-content-muted italic">
                                    No exercises assigned to this routine.{" "}
                                    <Link
                                        to={`/routines/${routine._id}/edit`}
                                        className="font-medium text-brand-400 hover:underline"
                                    >
                                        Add exercises
                                    </Link>
                                </p>
                            )}
                        </section>
                    ))
                ) : (
                    /* Was a single italic line on an otherwise empty 900px
                       viewport, with no way forward from the dead end. */
                    <div className="mx-auto flex max-w-md flex-col items-center gap-4 rounded-2xl border border-dashed border-edge-strong px-6 py-14 text-center">
                        <CalendarDaysIcon
                            className="h-12 w-12 text-content-subtle"
                            aria-hidden="true"
                        />
                        <h2 className="text-xl font-bold text-content">
                            Nothing scheduled for {today}
                        </h2>
                        <p className="text-content-muted">
                            Create a routine and assign it to a weekday to see
                            it here automatically.
                        </p>
                        <Link
                            to="/routines/new"
                            className="inline-flex min-h-11 items-center justify-center rounded-lg bg-brand-600 px-6 font-bold text-white transition-colors hover:bg-brand-700"
                        >
                            Create a routine
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
}
