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
            <>
                <h1 className="text-5xl font-black text-center">My routines</h1>
                <p className="text-2xl font-light mt-5 text-center">
                    Here you can manage your{" "}
                    <span className="text-red-600 font-bold">
                        workout routines
                    </span>
                </p>

                <nav className="my-5">
                    <Link
                        className="bg-red-600 hover:bg-red-700 px-10 py-3 text-white text-xl font-bold cursor-pointer transition-colors rounded-lg"
                        to="/routines/new"
                    >
                        New routine
                    </Link>
                </nav>
                <hr></hr>

                {data.length ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-5">
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
                        No routines yet. {""}
                        <Link
                            className="text-red-600 hover:underline font-medium"
                            to={"/routines/new"}
                        >
                            Register routine
                        </Link>
                    </p>
                )}
            </>
        );
}
