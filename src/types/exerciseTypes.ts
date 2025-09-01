import { z } from "zod";
import {
    exerciseByIdSchema,
    exerciseDashboardSchema,
    exerciseOrderSchema,
    exerciseSchema,
} from "@/schemas/index";

export type Exercise = z.infer<typeof exerciseSchema>;
export type ExerciseById = z.infer<typeof exerciseByIdSchema>;
export type ExerciseOrder = z.infer<typeof exerciseOrderSchema>;
export type ExerciseDashboard = z.infer<typeof exerciseDashboardSchema>;
export type ExerciseFormData = Pick<
    Exercise,
    "exerciseName" | "file" | "routineId"
>;
export type ExerciseCard = Pick<
    Exercise,
    "_id" | "exerciseImage" | "exerciseName"
>;
