import { Link } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Spinner from "@/components/LoadingSpinner";
import { toast } from "react-toastify";
import { deleteRoutine, getRoutines } from "@/services/RoutineService";
import RoutineCard from "@/components/routines/RoutineCard";

export default function RoutineDashboardView() {
    const { data, isLoading } = useQuery({
        queryKey: ["routines"],
        queryFn: getRoutines,
    });

    const queryClient = useQueryClient();
    const { mutate } = useMutation({
        mutationFn: deleteRoutine,
        onError: (error) => toast.error(error.message),
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ["routines"] });
            toast.success(data?.message);
        },
    });

    if (isLoading) return <Spinner />;
    if (data)
        return (
            <div className="px-4 sm:px-6 lg:px-8 py-6 max-w-screen-2xl mx-auto">
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-center">
                    My routines
                </h1>
                <p className="text-lg sm:text-xl lg:text-2xl font-light mt-4 text-center">
                    Here you can manage your{" "}
                    <span className="text-red-600 font-bold">
                        workout routines
                    </span>
                </p>

                <nav className="my-6 flex justify-center">
                    <Link
                        className="bg-red-600 hover:bg-red-700 px-6 sm:px-8 lg:px-10 py-2 sm:py-3 text-white text-base sm:text-lg lg:text-xl font-bold cursor-pointer transition-colors rounded-lg"
                        to="/routines/new"
                    >
                        New routine
                    </Link>
                </nav>
                <hr className="border-gray-700" />

                {data.length ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
                        {data.map((routine) => (
                            <RoutineCard
                                key={routine._id}
                                routine={routine}
                                mutate={mutate}
                            />
                        ))}
                    </div>
                ) : (
                    <p className="text-center text-gray-300 italic py-20">
                        No routines yet.{" "}
                        <Link
                            className="text-red-600 hover:underline font-medium"
                            to={"/routines/new"}
                        >
                            Register routine
                        </Link>
                    </p>
                )}
            </div>
        );
}
