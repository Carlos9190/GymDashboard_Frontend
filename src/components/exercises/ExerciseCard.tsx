import { Link } from "react-router-dom";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Bars2Icon } from "@heroicons/react/20/solid";
import ExerciseThumb from "@/components/exercises/ExerciseThumb";
import type { ExerciseCard } from "@/types/index";

type ExerciseCardProps = {
    exercise: ExerciseCard;
};

export default function ExerciseCard({ exercise }: ExerciseCardProps) {
    const {
        attributes,
        listeners,
        setNodeRef,
        setActivatorNodeRef,
        transform,
        transition,
        isDragging,
    } = useSortable({ id: exercise._id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };

    return (
        <li
            ref={setNodeRef}
            style={style}
            className={`relative flex flex-col overflow-hidden rounded-2xl border border-edge bg-surface-card shadow-md ${
                isDragging ? "z-10 opacity-80" : ""
            }`}
        >
            {/* The drag listeners used to sit on the <li> itself, so the whole
                card was a drag handle and the link below it was hard to
                activate by pointer and impossible by keyboard. */}
            <button
                type="button"
                ref={setActivatorNodeRef}
                {...listeners}
                {...attributes}
                aria-label={`Reorder ${exercise.exerciseName}`}
                className="absolute right-2 top-2 z-10 inline-flex h-11 w-11 cursor-grab items-center justify-center rounded-lg bg-surface-raised/90 text-content-muted transition-colors hover:text-content active:cursor-grabbing"
            >
                <Bars2Icon className="h-5 w-5" aria-hidden="true" />
            </button>

            <ExerciseThumb
                src={exercise.exerciseImage}
                name={exercise.exerciseName}
            />

            <div className="flex flex-1 flex-col gap-3 p-3 text-center">
                <p className="text-sm font-semibold text-content line-clamp-2">
                    {exercise.exerciseName}
                </p>

                <Link
                    to={`/exercises/${exercise._id}`}
                    className="mt-auto inline-flex min-h-11 w-full items-center justify-center rounded-lg bg-brand-600 px-3 text-sm font-semibold text-white transition-colors hover:bg-brand-700"
                >
                    View records
                </Link>
            </div>
        </li>
    );
}
