import { useState } from "react";
import { Link } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteExercise, getExercises } from "@/services/ExerciseService";
import Spinner from "@/components/LoadingSpinner";
import { toast } from "react-toastify";
import ConfirmDeleteModal from "@/components/ConfirmDeleteModal";

export default function ExercisesDashboardView() {
    const [selectedExercise, setSelectedExercise] = useState<{
        _id: string;
        name: string;
    } | null>(null);
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

    if (isLoading) return <Spinner />;
    if (data)
        return (
            <>
                <h1 className="text-5xl font-black text-center">
                    My exercises
                </h1>
                <p className="text-2xl font-light mt-5 text-center">
                    Here you can manage your{" "}
                    <span className="text-red-600 font-bold">
                        workout exercises
                    </span>
                </p>

                <nav className="my-5">
                    <Link
                        className="bg-red-600 hover:bg-red-700 px-10 py-3 text-white text-xl font-bold cursor-pointer transition-colors rounded-lg"
                        to="/exercises/new"
                    >
                        New exercise
                    </Link>
                </nav>
                <hr></hr>

                {data.length ? (
                    <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-5">
                        {data.map((exercise) => (
                            <li
                                key={exercise._id}
                                className="bg-white rounded-2xl shadow-md overflow-hidden aspect-square flex flex-col items-center justify-between p-4"
                            >
                                <img
                                    src={
                                        exercise.exerciseImage ||
                                        "/default-image.webp"
                                    }
                                    alt={exercise.exerciseName}
                                    className="w-full h-2/3 object-cover"
                                />

                                <div className="w-full text-center mt-2">
                                    <p className="text-sm text-black font-semibold mb-2">
                                        {exercise.exerciseName}
                                    </p>

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
                                            type="button"
                                            onClick={() =>
                                                setSelectedExercise({
                                                    _id: exercise._id,
                                                    name: exercise.exerciseName,
                                                })
                                            }
                                            className="text-xs bg-red-100 text-red-600 px-3 py-1 rounded-sm hover:bg-red-200 transition w-full"
                                        >
                                            Delete
                                        </button>

                                        <ConfirmDeleteModal
                                            isOpen={!!selectedExercise}
                                            onClose={() =>
                                                setSelectedExercise(null)
                                            }
                                            onConfirm={confirmDelete}
                                            title="Delete exercise"
                                            description={`Are you sure you want to delete "${selectedExercise?.name}"? This action will remove the exercise and all its records permanently.`}
                                        />
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className="text-center text-gray-300 italic py-20">
                        No exercises yet. {""}
                        <Link
                            className="text-red-600 hover:underline font-medium"
                            to={"/exercises/new"}
                        >
                            Register exercise
                        </Link>
                    </p>
                )}
            </>
        );
}
