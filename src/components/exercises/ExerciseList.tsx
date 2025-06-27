import ExerciseCard from "@/components/exercises/ExerciseCard"
import { reorderRoutineExercises } from "@/services/RoutineService"
import { ExerciseDashboard, ExerciseOrder, Routine } from "@/types/index"
import {DndContext, DragEndEvent, closestCenter} from "@dnd-kit/core"
import {SortableContext, horizontalListSortingStrategy, arrayMove} from "@dnd-kit/sortable"
import { useMutation, useQueryClient } from "@tanstack/react-query"

type ExerciseListProps = {
  exercises: ExerciseDashboard
  order: ExerciseOrder
  routineId: Routine['_id']
}

export default function ExerciseList({ exercises, order, routineId }: ExerciseListProps) {
  const queryClient = useQueryClient()
      const { mutate } = useMutation({
          mutationFn: reorderRoutineExercises,
          onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['routine', routineId] })
          }
      })

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event

    if (over && over.id) {
      const prevIndex = order.findIndex(id => id === active.id)
      const newIndex = order.findIndex(id => id === over.id)

      const orderedExerciseIds = arrayMove(order, prevIndex, newIndex)
      mutate({ routineId, orderedExerciseIds })
    }
  }

  return (
    <>
        {exercises.length ? (
          <DndContext
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
          >
            <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-10">
              <SortableContext
              items={order}
              strategy={horizontalListSortingStrategy}
            >
              {order.map(id => {
                const exercise = exercises.find(exercise => exercise._id === id)!
                return <ExerciseCard key={id} exercise={exercise} />
              })}
            </SortableContext>
            </ul>
          </DndContext>
        ) : (
          <p className="text-center py-20">No exercises yet for this routine</p>
        )}
    </>
  )
}