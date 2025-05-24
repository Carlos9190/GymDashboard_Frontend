import { Control, Controller, FieldErrors } from "react-hook-form"
import ErrorMessage from "../ErrorMessage";
import { ExerciseFormData } from "@/types/index";
import ImageUpload from "../ImageUploadButton";

type ExerciseFormProps = {
    control: Control<ExerciseFormData>
    errors: FieldErrors<ExerciseFormData>
}

export default function ExerciseForm({ errors, control }: ExerciseFormProps) {
    return (
        <>
            <Controller
                name="exerciseName"
                control={control}
                rules={{
                    required: "Exercise name is required"
                }}
                render={({ field }) => (
                    <div className="relative w-full">
                        <input
                            id="exerciseName"
                            type="text"
                            placeholder=" "
                            className={`peer w-full px-3 pt-6 pb-2 border rounded-lg bg-transparent text-white placeholder-transparent transition-all
                        ${errors.exerciseName ? "border-red-500" : "border-gray-300"} focus:outline-none focus:border-red-500`}
                            {...field}
                        />
                        <label
                            htmlFor="exerciseName"
                            className={`absolute left-3 transition-all 
                        ${field.value ? "top-1 text-sm text-red-600" : "top-3.5 text-gray-500"} 
                        peer-focus:top-1 peer-focus:text-sm peer-focus:text-red-600`}
                        >
                            Exercise name
                        </label>
                        {errors.exerciseName && <ErrorMessage>{errors.exerciseName.message}</ErrorMessage>}
                    </div>
                )}
            />

            <Controller
                name="file"
                control={control}
                render={({ field }) => (
                    <ImageUpload field={field} />
                )}
            />
        </>
    )
}