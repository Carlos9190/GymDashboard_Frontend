import { Link } from "react-router-dom";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import type { ExerciseCard } from "@/types/index";

type ExerciseCardProps = {
    exercise: ExerciseCard;
};

export default function ExerciseCard({ exercise }: ExerciseCardProps) {
    const { attributes, listeners, setNodeRef, transform, transition } =
        useSortable({
            id: exercise._id,
        });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };

    return (
        <li
            {...listeners}
            {...attributes}
            ref={setNodeRef}
            style={style}
            className="bg-white rounded-2xl shadow-md overflow-hidden aspect-square flex flex-col items-center justify-between p-4"
        >
            <img
                src={exercise.exerciseImage || "/default-image.webp"}
                alt={exercise.exerciseName}
                className="w-full h-2/3 object-cover"
            />
            <div className="w-full text-center mt-2 flex flex-col">
                <p className="mt-2 text-sm text-black font-semibold mb-2">
                    {exercise.exerciseName}
                </p>

                <Link
                    to={`/exercises/${exercise._id}`}
                    className="w-full text-xs bg-blue-100 text-blue-600 px-3 py-1 rounded-sm hover:bg-blue-200 transition"
                >
                    View records
                </Link>
            </div>
        </li>
    );
}
