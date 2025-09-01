import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateExercise } from "@/services/ExerciseService";
import ExerciseForm from "./ExerciseForm";
import SubmitButton from "@/components/SubmitButton";
import type { Exercise, ExerciseById, ExerciseFormData } from "@/types/index";

type EditExerciseFormProps = {
    data: ExerciseById;
    exerciseId: Exercise["_id"];
};

export default function EditExerciseForm({
    data,
    exerciseId,
}: EditExerciseFormProps) {
    const {
        register,
        watch,
        reset,
        handleSubmit,
        formState: { errors },
        setValue,
    } = useForm<ExerciseFormData>({
        defaultValues: {
            exerciseName: data.exerciseName,
            file: null,
            routineId: null,
        },
    });

    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const { mutate, isPending } = useMutation({
        mutationFn: updateExercise,
        onError: (error) => toast.error(error.message),
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ["formRoutines"] });
            queryClient.invalidateQueries({
                queryKey: ["editExercise", exerciseId],
            });
            toast.success(data?.message);
            reset();
            navigate("/exercises");
        },
    });

    const handleForm = (formData: ExerciseFormData) => {
        const data = {
            formData,
            exerciseId,
        };
        mutate(data);
    };

    return (
        <div className="max-w-3xl mx-auto px-4">
            <h1 className="text-3xl md:text-5xl font-black text-center">
                Edit exercise
            </h1>
            <p className="text-lg md:text-2xl font-light mt-3 md:mt-5 text-center">
                Fill out the following form to{" "}
                <span className="text-red-600 font-bold">
                    edit the exercise
                </span>
            </p>

            <form
                className="space-y-6 bg-transparent rounded-lg flex flex-col mx-auto w-full py-6 md:py-10"
                onSubmit={handleSubmit(handleForm)}
                noValidate
            >
                <ExerciseForm
                    exercise={data}
                    register={register}
                    watch={watch}
                    setValue={setValue}
                    errors={errors}
                />

                <SubmitButton value="Save changes" isLoading={isPending} />

                <Link
                    to="/exercises"
                    className="text-gray-300 font-normal hover:text-red-600 underline text-center"
                >
                    Back to exercises
                </Link>
            </form>
        </div>
    );
}
