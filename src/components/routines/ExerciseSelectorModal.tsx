import { Fragment } from 'react'
import { Dialog, Transition, TransitionChild, DialogPanel, DialogTitle } from '@headlessui/react'
import { useLocation, useNavigate } from 'react-router-dom'
import { ExerciseDashboard, Routine } from '@/types/index'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { addExerciseToRoutine, removeExerciseFromRoutine } from '@/services/RoutineService'
import { toast } from 'react-toastify'
import { getExercises } from '@/services/ExerciseService'

type ExerciseSelectorModalProps = {
    routineName: Routine['routineName']
    routineData: ExerciseDashboard
    routineId: Routine['_id']
}

export default function ExerciseSelectorModal({ routineName, routineData, routineId }: ExerciseSelectorModalProps) {
    const { data } = useQuery({
        queryKey: ['selectExercises'],
        queryFn: getExercises
    })

    const navigate = useNavigate()
    const location = useLocation()
    const queryParams = new URLSearchParams(location.search)
    const modalRecord = queryParams.get('selectExercises')
    const show = modalRecord ? true : false

    const queryClient = useQueryClient()
    const { mutate: add } = useMutation({
        mutationFn: addExerciseToRoutine,
        onError: (error) => toast.error(error.message),
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ['routine', routineId] })
            toast.success(data?.message)
        }
    })

    const { mutate: remove } = useMutation({
        mutationFn: removeExerciseFromRoutine,
        onError: (error) => toast.error(error.message),
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ['routine', routineId] })
            toast.success(data?.message)
        }
    })

    if (data) return (
        <>
            <Transition appear show={show} as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={() => navigate(location.pathname, { replace: true })}>
                    <TransitionChild
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black/60" />
                    </TransitionChild>

                    <div className="fixed inset-0 overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center p-4 text-center text-white">
                            <TransitionChild
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <DialogPanel className="w-full max-w-7xl transform overflow-hidden rounded-2xl bg-gray-900 text-left align-middle shadow-xl transition-all p-16 border border-gray-300">
                                    <DialogTitle
                                        as="h3"
                                        className="text-2xl uppercase font-bold text-white text-center mb-4"
                                    >
                                        Select exercises for the <span className='text-red-600'>{routineName}</span> routine
                                    </DialogTitle>

                                    {data.length ? (
                                        <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-10">
                                            {data.map((exercise) => {
                                                const isInRoutine = routineData.some(e => e._id === exercise._id)

                                                return (
                                                    <li
                                                        key={exercise._id}
                                                        className="bg-white rounded-2xl shadow-md overflow-hidden aspect-square flex flex-col items-center justify-between p-4"
                                                    >
                                                        <img
                                                            src={exercise.exerciseImage || "/default-image.webp"}
                                                            alt={exercise.exerciseName}
                                                            className="w-full h-2/3 object-cover"
                                                        />

                                                        <div className="w-full text-center mt-2">
                                                            <p className="text-sm text-black font-semibold mb-2">{exercise.exerciseName}</p>

                                                            <div className="flex justify-between gap-2">
                                                                {isInRoutine ? (
                                                                    <button
                                                                        type="button"
                                                                        onClick={() => remove({ routineId, exerciseId: exercise._id })}
                                                                        className="text-xs bg-red-100 text-red-600 px-3 py-1 rounded-sm hover:bg-red-200 transition w-full"
                                                                    >
                                                                        Remove from routine
                                                                    </button>
                                                                ) : (
                                                                    <button
                                                                        type="button"
                                                                        onClick={() => add({ routineId, exerciseId: exercise._id })}
                                                                        className="text-xs bg-green-100 text-green-600 px-3 py-1 rounded-sm hover:bg-green-200 transition w-full"
                                                                    >
                                                                        Add to routine
                                                                    </button>
                                                                )}
                                                            </div>
                                                        </div>
                                                    </li>
                                                )
                                            })}
                                        </ul>
                                    ) : (
                                        <p className="text-center py-20">No registered exercises yet</p>
                                    )}
                                </DialogPanel>
                            </TransitionChild>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </>
    )
}