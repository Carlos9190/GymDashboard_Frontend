import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";
import { deleteExercise, getExercises } from "@/services/ExerciseService";
import Spinner from "@/components/LoadingSpinner";
import { toast } from "react-toastify";
import ConfirmDeleteModal from "@/components/ConfirmDeleteModal";
import ExerciseThumb from "@/components/exercises/ExerciseThumb";

export default function ExercisesDashboardView() {
    const [selectedExercise, setSelectedExercise] = useState<{
        _id: string;
        name: string;
    } | null>(null);
    const [query, setQuery] = useState("");

    const { data, isLoading } = useQuery({
        queryKey: ["exercises"],
        queryFn: getExercises,
    });

    const queryClient = useQueryClient();
    const { mutate } = useMutation({
        mutationFn: deleteExercise,
        onError: (error) => toast.error(error.message),
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ["exercises"] });
            toast.success(data?.message);
        },
    });

    const confirmDelete = () => {
        if (selectedExercise) {
            mutate({ exerciseId: selectedExercise._id });
            setSelectedExercise(null);
        }
    };

    const visibleExercises = useMemo(() => {
        if (!data) return [];
        const term = query.trim().toLowerCase();
        if (!term) return data;
        return data.filter((exercise) =>
            exercise.exerciseName.toLowerCase().includes(term)
        );
    }, [data, query]);

    if (isLoading) return <Spinner />;

    if (data)
        return (
            <>
                <h1 className="text-3xl md:text-5xl font-black text-center">
                    My exercises
                </h1>
                <p className="text-lg md:text-2xl font-light mt-3 md:mt-5 text-center">
                    Here you can manage your{" "}
                    <span className="text-brand-400 font-bold">
                        workout exercises
                    </span>
                </p>

                <div className="my-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                    <div className="relative w-full sm:max-w-xs">
                        <MagnifyingGlassIcon
                            className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-content-subtle"
                            aria-hidden="true"
                        />
                        <label htmlFor="exercise-search" className="sr-only">
                            Search exercises
                        </label>
                        <input
                            id="exercise-search"
                            type="search"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            placeholder="Search exercises"
                            className="w-full rounded-lg border border-edge bg-surface-raised py-2.5 pl-10 pr-3 text-content placeholder:text-content-subtle"
                        />
                    </div>

                    <Link
                        className="inline-flex min-h-11 items-center justify-center rounded-lg bg-brand-600 px-6 md:px-10 font-bold text-white transition-colors hover:bg-brand-700"
                        to="/exercises/new"
                    >
                        New exercise
                    </Link>
                </div>

                <hr className="border-edge" />

                <p aria-live="polite" className="sr-only">
                    {visibleExercises.length} exercises shown
                </p>

                {data.length ? (
                    visibleExercises.length ? (
                        <ul className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 my-5">
                            {visibleExercises.map((exercise) => (
                                <li
                                    key={exercise._id}
                                    className="flex flex-col overflow-hidden rounded-2xl border border-edge bg-surface-card shadow-md transition-colors hover:border-edge-strong"
                                >
                                    <ExerciseThumb
                                        src={exercise.exerciseImage}
                                        name={exercise.exerciseName}
                                    />

                                    <div className="flex flex-1 flex-col gap-3 p-3">
                                        <p className="text-sm md:text-base font-semibold text-content line-clamp-2">
                                            {exercise.exerciseName}
                                        </p>

                                        <div className="mt-auto grid grid-cols-3 gap-1.5">
                                            <Link
                                                to={`/exercises/${exercise._id}`}
                                                className="inline-flex min-h-11 items-center justify-center rounded-lg bg-brand-600 px-2 text-sm font-semibold text-white transition-colors hover:bg-brand-700"
                                            >
                                                View
                                            </Link>
                                            <Link
                                                to={`/exercises/${exercise._id}/edit`}
                                                className="inline-flex min-h-11 items-center justify-center rounded-lg border border-edge-strong px-2 text-sm font-semibold text-content-muted transition-colors hover:bg-surface-hover hover:text-content"
                                            >
                                                Edit
                                            </Link>
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    setSelectedExercise({
                                                        _id: exercise._id,
                                                        name: exercise.exerciseName,
                                                    })
                                                }
                                                className="inline-flex min-h-11 items-center justify-center rounded-lg border border-transparent px-2 text-sm font-semibold text-danger transition-colors hover:bg-danger/10"
                                            >
                                                <span className="sr-only">
                                                    Delete {exercise.exerciseName}
                                                </span>
                                                <span aria-hidden="true">
                                                    Delete
                                                </span>
                                            </button>
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className="text-center text-content-muted italic py-16">
                            No exercises match your search.{" "}
                            <button
                                type="button"
                                onClick={() => setQuery("")}
                                className="text-brand-400 underline hover:text-brand-500"
                            >
                                Clear search
                            </button>
                        </p>
                    )
                ) : (
                    <p className="text-center text-content-muted italic py-10 sm:py-20 px-4 text-sm sm:text-base">
                        No exercises yet.{" "}
                        <Link
                            className="text-brand-400 hover:underline font-medium"
                            to={"/exercises/new"}
                        >
                            Register exercise
                        </Link>
                    </p>
                )}

                {/* Single instance. This previously sat inside the .map(), which
                    mounted one Dialog per exercise — a single Delete click opened
                    36 dialogs, 72 backdrops and 39 aria-hidden nodes at once. */}
                <ConfirmDeleteModal
                    isOpen={!!selectedExercise}
                    onClose={() => setSelectedExercise(null)}
                    onConfirm={confirmDelete}
                    title="Delete exercise"
                    description={`Are you sure you want to delete "${selectedExercise?.name}"? This action will remove the exercise and all its records permanently.`}
                />
            </>
        );
}
