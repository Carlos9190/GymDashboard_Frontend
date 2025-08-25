import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import RoutineForm from "@/components/routines/RoutineForm";
import { RoutineFormData } from "@/types/index";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createRoutine, getRoutines } from "@/services/RoutineService";
import { toast } from "react-toastify";
import SubmitButton from "@/components/SubmitButton";

export default function NewRoutineView() {
    const initialValues: RoutineFormData = {
        routineName: "",
        routineDays: [],
    };

    const {
        register,
        handleSubmit,
        reset,
        watch,
        formState: { errors },
    } = useForm({ defaultValues: initialValues });

    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const { mutate, isPending } = useMutation({
        mutationFn: createRoutine,
        onError: (error) => toast.error(error.message),
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ["routines"] });
            toast.success(data?.message);
            reset();
            navigate("/routines");
        },
    });

    const handleForm = (formData: RoutineFormData) => mutate({ formData });

    const { data: routinesData } = useQuery({
        queryKey: ["routine"],
        queryFn: () => getRoutines(),
        retry: false,
    });

    const occupiedDays = routinesData
        ? routinesData.flatMap((routine) => routine.routineDays)
        : [];

    return (
        <div className="max-w-3xl mx-auto">
            <h1 className="text-5xl font-black text-center">
                Register routine
            </h1>
            <p className="text-2xl font-light mt-5 text-center">
                Fill out the following form to{" "}
                <span className="text-red-600 font-bold">
                    register a new routine
                </span>
            </p>

            <form
                className="space-y-3 bg-transparent rounded-lg flex flex-col mx-auto w-lg py-10 "
                onSubmit={handleSubmit(handleForm)}
                noValidate
            >
                <RoutineForm
                    register={register}
                    watch={watch}
                    errors={errors}
                    occupiedDays={occupiedDays}
                    currentRoutineDays={[]}
                />

                <SubmitButton value="Register routine" isLoading={isPending} />

                <Link
                    to={"/routines"}
                    className="text-gray-300 font-normal hover:text-red-600 underline text-center"
                >
                    Back to routines
                </Link>
            </form>
        </div>
    );
}
