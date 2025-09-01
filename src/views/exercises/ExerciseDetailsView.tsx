import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getExerciseById } from "@/services/ExerciseService";
import Spinner from "@/components/LoadingSpinner";
import RecordList from "@/components/records/RecordList";
import AddRecordModal from "@/components/records/NewRecordModal";
import EditRecordData from "@/components/records/EditRecordData";
import { getFormRoutines } from "@/services/RoutineService";

export default function ExerciseDetailsView() {
    const navigate = useNavigate();
    const params = useParams();
    const exerciseId = params.exerciseId!;
    const { data, isLoading, isError } = useQuery({
        queryKey: ["exercise", exerciseId],
        queryFn: () => getExerciseById({ exerciseId }),
        retry: false,
    });

    const { data: currentRoutine } = useQuery({
        queryKey: ["currentRoutines"],
        queryFn: getFormRoutines,
    });

    if (isLoading) return <Spinner />;
    if (isError) return <Navigate to="/404" />;
    if (data)
        return (
            <>
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-center sm:text-left my-5">
                    {data.exerciseName}
                </h1>

                <nav className="flex flex-col sm:flex-row gap-3 my-4 justify-center sm:justify-start">
                    <Link
                        className="bg-red-600 hover:bg-red-700 px-6 md:px-10 py-2 md:py-3 text-white text-base md:text-xl font-bold transition-colors rounded-lg text-center"
                        to="/exercises"
                    >
                        Exercises
                    </Link>

                    <button
                        type="button"
                        className="bg-purple-600 hover:bg-purple-700 px-6 md:px-10 py-2 md:py-3 text-white text-base md:text-xl font-bold transition-colors rounded-lg text-center"
                        onClick={() =>
                            navigate(location.pathname + "?newRecord=true")
                        }
                    >
                        New record
                    </button>

                    <Link
                        className="bg-green-600 hover:bg-green-700 px-6 md:px-10 py-2 md:py-3 text-white text-base md:text-xl font-bold transition-colors rounded-lg text-center"
                        to={`/exercises/${exerciseId}/edit`}
                    >
                        Edit exercise
                    </Link>

                    {currentRoutine &&
                        currentRoutine.map((routine) => (
                            <Link
                                key={routine._id}
                                className="bg-blue-600 hover:bg-blue-700 px-6 md:px-10 py-2 md:py-3 text-white text-base md:text-xl font-bold transition-colors rounded-lg text-center"
                                to={`/routines/${routine._id}`}
                            >
                                {routine.routineName} routine
                            </Link>
                        ))}
                </nav>

                <hr className="border-gray-700 my-6" />

                <div className="flex flex-col lg:flex-row items-center lg:items-start gap-6 mt-6">
                    <div className="w-full lg:max-w-sm mb-6">
                        <img
                            src={data.exerciseImage || "/default-image.webp"}
                            alt={data.exerciseName}
                            className="w-full h-auto rounded-xl object-cover"
                        />
                    </div>

                    <div className="w-full">
                        <RecordList exerciseId={exerciseId} />
                    </div>
                </div>

                <AddRecordModal />
                <EditRecordData />
            </>
        );
}
