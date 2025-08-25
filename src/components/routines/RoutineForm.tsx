import { FieldErrors, UseFormRegister, UseFormWatch } from "react-hook-form";
import ErrorMessage from "../ErrorMessage";
import { RoutineFormData } from "@/types/index";
import { daysOfWeekTranslations } from "@/locales/daysOfWeek";

type RoutineFormProps = {
    register: UseFormRegister<RoutineFormData>;
    watch: UseFormWatch<RoutineFormData>;
    errors: FieldErrors<RoutineFormData>;
    occupiedDays?: string[];
    currentRoutineDays?: string[];
};

export default function RoutineForm({
    errors,
    watch,
    register,
    occupiedDays,
    currentRoutineDays,
}: RoutineFormProps) {
    const selectedDays: string[] = watch("routineDays") || [];

    const disabledDays = new Set(
        (occupiedDays || []).filter((day) => !currentRoutineDays?.includes(day))
    );

    return (
        <>
            <div className="relative w-full">
                <input
                    id="routineName"
                    type="text"
                    placeholder=" "
                    className={`peer w-full px-3 pt-6 pb-2 border rounded-lg bg-transparent text-white placeholder-transparent transition-all ${errors.routineName ? "border-red-500" : "border-gray-300"} focus:outline-none focus:border-red-500`}
                    {...register("routineName", {
                        required: "Routine name is required",
                    })}
                />
                <label
                    htmlFor="routineName"
                    className={`absolute left-3 transition-all ${watch("routineName") ? "top-1 text-sm text-red-600" : "top-3.5 text-gray-500"} peer-focus:top-1 peer-focus:text-sm peer-focus:text-red-600`}
                >
                    Routine name
                </label>
                {errors.routineName && (
                    <ErrorMessage>{errors.routineName.message}</ErrorMessage>
                )}
            </div>

            <div className="w-full mt-2">
                <label className="block mb-2 text-sm text-red-600 select-none">
                    Routine days
                </label>
                <div className="grid grid-cols-2 gap-4">
                    {Object.entries(daysOfWeekTranslations).map(
                        ([key, label]) => {
                            const isDisabled = disabledDays.has(key);

                            return (
                                <label
                                    key={key}
                                    className={`flex items-center space-x-3 rounded-md border px-3 py-2 text-white transition-colors  ${isDisabled ? "bg-gray-700 border-gray-500 opacity-50" : "bg-gray-800 border-gray-600 hover:bg-red-600 hover:border-red-500"}  ${selectedDays.includes(key) || isDisabled ? "cursor-default" : "cursor-pointer"}`}
                                >
                                    <input
                                        type="checkbox"
                                        value={key}
                                        disabled={isDisabled}
                                        className="h-5 w-5 rounded-sm border-gray-400 text-red-500 focus:ring-red-400"
                                        {...register("routineDays")}
                                        defaultChecked={selectedDays.includes(
                                            key
                                        )}
                                    />
                                    <span className="select-none">{label}</span>
                                </label>
                            );
                        }
                    )}
                </div>
                {errors.routineDays && (
                    <ErrorMessage>{errors.routineDays.message}</ErrorMessage>
                )}
            </div>
        </>
    );
}
