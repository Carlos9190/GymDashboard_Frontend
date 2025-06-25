import { FieldErrors, UseFormRegister } from "react-hook-form"
import { RecordFormData } from "@/types/index"
import ErrorMessage from "../ErrorMessage"

type TaskFormProps = {
    errors: FieldErrors<RecordFormData>
    register: UseFormRegister<RecordFormData>
}

export default function RecordForm({ errors, register }: TaskFormProps) {
    return (
        <>
            <div className="relative w-full">
                <input
                    id="sets"
                    type="number"
                    placeholder=" "
                    className={`peer w-full px-3 pt-6 pb-2 border rounded-lg bg-transparent text-white placeholder-transparent transition-all ${errors.sets ? "border-red-500" : "border-gray-300"} focus:outline-none focus:border-red-500`}
                    {...register("sets", {
                        required: "Number of sets is required",
                        min: {
                            value: 1,
                            message: "Sets must be at least 1"
                        }
                    })}
                />
                <label
                    htmlFor="sets"
                    className={`absolute left-3 transition-all top-1 text-sm text-red-600 peer-focus:top-1 peer-focus:text-sm peer-focus:text-red-600`}
                >
                    Number of sets
                </label>
                {errors.sets && <ErrorMessage>{errors.sets.message}</ErrorMessage>}
            </div>

            <div className="relative w-full">
                <input
                    id="reps"
                    type="number"
                    placeholder=" "
                    className={`peer w-full px-3 pt-6 pb-2 border rounded-lg bg-transparent text-white placeholder-transparent transition-all ${errors.reps ? "border-red-500" : "border-gray-300"} focus:outline-none focus:border-red-500`}
                    {...register("reps", {
                        required: "Number of reps is required",
                        min: {
                            value: 1,
                            message: "Reps must be at least 1"
                        }
                    })}
                />
                <label
                    htmlFor="reps"
                    className={`absolute left-3 transition-all top-1 text-sm text-red-600 peer-focus:top-1 peer-focus:text-sm peer-focus:text-red-600`}
                >
                    Number of reps
                </label>
                {errors.reps && <ErrorMessage>{errors.reps.message}</ErrorMessage>}
            </div>

            <div className="relative w-full">
                <input
                    id="weight"
                    type="number"
                    step="any"
                    placeholder=" "
                    className={`peer w-full px-3 pt-6 pb-2 border rounded-lg bg-transparent text-white placeholder-transparent transition-all ${errors.weight ? "border-red-500" : "border-gray-300"} focus:outline-none focus:border-red-500`}
                    {...register("weight", {
                        required: "Weight is required",
                        min: {
                            value: 0.1,
                            message: "Weight must be greater than 0"
                        }
                    })}
                />
                <label
                    htmlFor="weight"
                    className={`absolute left-3 transition-all top-1 text-sm text-red-600 peer-focus:top-1 peer-focus:text-sm peer-focus:text-red-600`}
                >
                    Weight {'(kg)'}
                </label>
                {errors.weight && <ErrorMessage>{errors.weight.message}</ErrorMessage>}
            </div>
        </>
    )
}