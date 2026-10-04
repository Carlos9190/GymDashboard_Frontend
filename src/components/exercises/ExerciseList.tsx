import { useState, useEffect } from "react";
import ExerciseCard from "@/components/exercises/ExerciseCard";
import {
    DndContext,
    DragEndEvent,
    closestCenter,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors,
} from "@dnd-kit/core";
import {
    SortableContext,
    rectSortingStrategy,
    sortableKeyboardCoordinates,
    arrayMove,
} from "@dnd-kit/sortable";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { reorderRoutineExercises } from "@/services/RoutineService";
import { Routine, RoutineDetails } from "@/types/index";

type ExerciseListProps = {
    exercisesData: RoutineDetails;
    routineId: Routine["_id"];
};

export default function ExerciseList({
    exercisesData,
    routineId,
}: ExerciseListProps) {
    const queryClient = useQueryClient();
    const [localExercises, setLocalExercises] = useState(exercisesData);

    // Keyboard sensor makes the reorder operable without a pointer (WCAG 2.1.1);
    // the distance constraint stops a click on the handle from starting a drag.
    const sensors = useSensors(
        useSensor(PointerSensor, { activationConstraint: { distance: 8 } }),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    );

    useEffect(() => {
        setLocalExercises(exercisesData);
    }, [exercisesData]);

    const { mutate } = useMutation({
        mutationFn: reorderRoutineExercises,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["routine", routineId] });
        },
    });

    const exerciseIdsInOrder = localExercises.map(
        (exercises) => exercises.exercise._id
    );
    const exercisesMap = new Map(
        localExercises.map((exercises) => [
            exercises.exercise._id,
            exercises.exercise,
        ])
    );

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;
        if (!over || active.id === over.id) return;

        const oldIndex = localExercises.findIndex(
            (exercises) => exercises.exercise._id === active.id
        );
        const newIndex = localExercises.findIndex(
            (exercises) => exercises.exercise._id === over.id
        );

        const reordered = arrayMove(localExercises, oldIndex, newIndex).map(
            (exercises, index) => ({
                ...exercises,
                order: index + 1,
            })
        );

        setLocalExercises(reordered);
        mutate({
            routineId,
            orderedExerciseIds: reordered.map(
                (exercises) => exercises.exercise._id
            ),
        });
    };

    return (
        <>
            {exerciseIdsInOrder.length ? (
                <DndContext
                    sensors={sensors}
                    collisionDetection={closestCenter}
                    onDragEnd={handleDragEnd}
                >
                    <ul className="w-full grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                        {/* rectSortingStrategy, not horizontalListSortingStrategy:
                            this is a wrapping multi-row grid, not a single row. */}
                        <SortableContext
                            items={exerciseIdsInOrder}
                            strategy={rectSortingStrategy}
                        >
                            {exerciseIdsInOrder.map((id) => {
                                const exercise = exercisesMap.get(id);
                                return (
                                    <ExerciseCard
                                        key={id}
                                        exercise={exercise!}
                                    />
                                );
                            })}
                        </SortableContext>
                    </ul>
                </DndContext>
            ) : (
                <p className="text-center text-gray-300 italic py-20">
                    No exercises yet for this routine.
                </p>
            )}
        </>
    );
}
