import { FieldErrors, UseFormRegister, UseFormWatch, UseFormSetValue } from "react-hook-form"
import ErrorMessage from "../ErrorMessage"
import { ExerciseByIdResponse, ExerciseFormData } from "@/types/index"
import { useQuery } from "@tanstack/react-query"
import { getRoutines } from "@/services/RoutineService"
import Spinner from "../LoadingSpinner"
import { useEffect } from "react"

type ExerciseFormProps = {
    exercise?: ExerciseByIdResponse
    register: UseFormRegister<ExerciseFormData>
    watch: UseFormWatch<ExerciseFormData>
    setValue: UseFormSetValue<ExerciseFormData>
    errors: FieldErrors<ExerciseFormData>
}

export default function ExerciseForm({ exercise, register, watch, errors, setValue }: ExerciseFormProps) {
    const { data, isLoading } = useQuery({
        queryKey: ['formRoutines'],
        queryFn: getRoutines
    })

    const routineIdValue = watch("routineId") || ""
    const selectedIds = typeof routineIdValue === "string" && routineIdValue !== ""
        ? routineIdValue.split(",")
        : []

    useEffect(() => {
        if (exercise?._id && data?.length) {
            const defaultRoutineIds = data
                .filter(routine => routine.exercises.includes(exercise._id))
                .map(routine => routine._id)

            const currentIds = watch("routineId")
            if (!currentIds || currentIds.trim() === "") {
                setValue("routineId", defaultRoutineIds.join(","))
            }
        }
    }, [exercise, data, setValue, watch])

    const fileValue = watch("file") as File | null

    if (isLoading) return <Spinner />

    return (
        <>
            <div className="relative w-full">
                <input
                    id="exerciseName"
                    type="text"
                    placeholder=" "
                    className={`peer w-full px-3 pt-6 pb-2 border rounded-lg bg-transparent text-white placeholder-transparent transition-all ${errors.exerciseName ? "border-red-500" : "border-gray-300"} focus:outline-none focus:border-red-500`}
                    {...register("exerciseName", { required: "Exercise name is required" })}
                />
                <label
                    htmlFor="exerciseName"
                    className={`absolute left-3 transition-all ${watch("exerciseName") ? "top-1 text-sm text-red-600" : "top-3.5 text-gray-500"} peer-focus:top-1 peer-focus:text-sm peer-focus:text-red-600`}
                >
                    Exercise name
                </label>
                {errors.exerciseName && <ErrorMessage>{errors.exerciseName.message}</ErrorMessage>}
            </div>

            <div className="w-full mx-auto mt-2 p-4 bg-transparent rounded-lg shadow-md border border-gray-300">
                <label className="text-sm text-red-600 mb-2 block">
                    Assign to routine(s)
                </label>

                {data?.length ? (
                    <div className="grid grid-cols-3 gap-3">
                        {data.map((routine) => {
                            const isChecked = selectedIds.includes(routine._id)

                            const toggleId = () => {
                                const updated = isChecked
                                    ? selectedIds.filter(id => id !== routine._id)
                                    : [...selectedIds, routine._id]

                                const newValue = updated.length > 0 ? updated.join(",") : ""
                                setValue("routineId", newValue)
                            }

                            return (
                                <label
                                    key={routine._id}
                                    htmlFor={`routine-${routine._id}`}
                                    className={`w-full cursor-pointer rounded-full px-4 py-2 text-center text-sm font-medium transition-colors ${isChecked ? 'bg-red-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
                                >
                                    <input
                                        type="checkbox"
                                        id={`routine-${routine._id}`}
                                        className="sr-only"
                                        checked={isChecked}
                                        onChange={toggleId}
                                        readOnly
                                    />
                                    <div className={`${isChecked ? 'text-white' : 'text-gray-700'}`}>
                                        {routine.routineName}
                                    </div>
                                </label>
                            )
                        })}
                    </div>
                ) : (
                    <p className="text-gray-400 italic">No routines found</p>
                )}

                <input type="hidden" {...register("routineId")} />
            </div>

            {exercise?.exerciseImage && (
                <div className="max-w-xl mx-auto mt-2 p-2 bg-transparent rounded-lg shadow-md border border-gray-300">
                    <p className="text-sm text-red-500 mb-2 ml-2">Current image</p>
                    <img
                        src={exercise.exerciseImage}
                        alt={exercise.exerciseName}
                        className="w-full rounded-xl object-cover"
                    />
                </div>
            )}

            <div className="flex items-center justify-between mt-2">
                <input
                    id="file"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                        const file = e.target.files?.[0] ?? null
                        setValue("file", file)
                    }}
                />
                <label
                    htmlFor="file"
                    className="cursor-pointer bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-6 rounded-xl transition-colors text-center"
                >
                    Upload Image
                </label>
                <p className="text-sm text-gray-400 pr-3">
                    {fileValue ? fileValue.name : "No file selected"}
                </p>
            </div>
        </>
    )
}