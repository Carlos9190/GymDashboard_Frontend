import Spinner from "@/components/LoadingSpinner";
import EditRoutineForm from "@/components/routines/EditRoutineForm";
import { getRoutineById, getRoutines } from "@/services/RoutineService";
import { useQuery } from "@tanstack/react-query";
import { Navigate, useParams } from "react-router-dom";

export default function EditRoutineView() {
    const params = useParams();
    const routineId = params.routineId!;
    const {
        data: routineToEdit,
        isLoading,
        isError,
    } = useQuery({
        queryKey: ["editRoutine", routineId],
        queryFn: () => getRoutineById({ routineId }),
        retry: false,
    });

    const { data: routinesData } = useQuery({
        queryKey: ["routine"],
        queryFn: () => getRoutines(),
        retry: false,
    });

    const occupiedDays = routinesData
        ? routinesData
              .filter((routine) => routine._id !== routineId)
              .flatMap((routine) => routine.routineDays)
        : [];

    if (isLoading) return <Spinner />;
    if (isError) return <Navigate to="/404" />;
    if (routineToEdit)
        return (
            <EditRoutineForm
                data={routineToEdit}
                routineId={routineId}
                occupiedDays={occupiedDays}
            />
        );
}
