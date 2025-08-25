import { useState, useEffect } from "react";
import ExerciseCard from "@/components/exercises/ExerciseCard";
import { reorderRoutineExercises } from "@/services/RoutineService";
import { Routine, RoutineDetails } from "@/types/index";
import { DndContext, DragEndEvent, closestCenter } from "@dnd-kit/core";
import {
    SortableContext,
    horizontalListSortingStrategy,
    arrayMove,
} from "@dnd-kit/sortable";
import { useMutation, useQueryClient } from "@tanstack/react-query";

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
                    collisionDetection={closestCenter}
                    onDragEnd={handleDragEnd}
                >
                    <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-5">
                        <SortableContext
                            items={exerciseIdsInOrder}
                            strategy={horizontalListSortingStrategy}
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
