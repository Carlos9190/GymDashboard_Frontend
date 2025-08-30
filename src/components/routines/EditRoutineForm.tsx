import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateRoutine } from "@/services/RoutineService";
import RoutineForm from "./RoutineForm";
import SubmitButton from "@/components/SubmitButton";
import { Routine, RoutineFormData } from "@/types/index";

type EditRoutineFormProps = {
    data: RoutineFormData;
    routineId: Routine["_id"];
    occupiedDays?: string[];
};

export default function EditRoutineForm({
    data,
    routineId,
    occupiedDays,
}: EditRoutineFormProps) {
    const {
        register,
        handleSubmit,
        watch,
        reset,
        formState: { errors },
    } = useForm<RoutineFormData>({
        defaultValues: {
            routineName: data.routineName,
            routineDays: data.routineDays,
        },
    });

    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const { mutate, isPending } = useMutation({
        mutationFn: updateRoutine,
        onError: (error) => toast.error(error.message),
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ["routines"] });
            queryClient.invalidateQueries({
                queryKey: ["editRoutine", routineId],
            });
            toast.success(data?.message);
            reset();
            navigate("/routines");
        },
    });

    const handleForm = (formData: RoutineFormData) => {
        const data = {
            formData,
            routineId,
        };
        mutate(data);
    };

    return (
        <div className="px-4 sm:px-6 lg:px-8 py-8 max-w-4xl mx-auto">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-center">
                Edit routine
            </h1>
            <p className="text-lg sm:text-xl lg:text-2xl font-light mt-4 text-center">
                Fill out the following form to{" "}
                <span className="text-red-600 font-bold">edit the routine</span>
            </p>

            <form
                className="space-y-6 bg-transparent rounded-lg flex flex-col w-full py-10 mt-6"
                onSubmit={handleSubmit(handleForm)}
                noValidate
            >
                <RoutineForm
                    register={register}
                    watch={watch}
                    errors={errors}
                    occupiedDays={occupiedDays}
                    currentRoutineDays={data.routineDays}
                />

                <SubmitButton value="Save changes" isLoading={isPending} />

                <Link
                    to="/routines"
                    className="text-sm sm:text-base text-gray-300 font-normal hover:text-red-600 underline text-center"
                >
                    Back to routines
                </Link>
            </form>
        </div>
    );
}
