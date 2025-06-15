import { Fragment } from 'react'
import { Dialog, DialogPanel, DialogTitle, Transition, TransitionChild } from '@headlessui/react'
import { useNavigate, useParams } from 'react-router-dom'
import { Record, RecordFormData } from '@/types/recordTypes'
import { useForm } from 'react-hook-form'
import RecordForm from './RecordForm'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import { updateRecord } from '@/services/RecordService'

type EditRecordModalProps = {
    data: Record
    recordId: Record['_id']
}

export default function EditRecordModal({ data, recordId }: EditRecordModalProps) {
    const navigate = useNavigate()

    // Getting execiseId
    const params = useParams()
    const exerciseId = params.exerciseId!

    const { register, reset, handleSubmit, formState: { errors } } = useForm<RecordFormData>({
        defaultValues: {
            sets: data.sets,
            reps: data.reps,
            weight: data.weight
        }
    })

    const queryClient = useQueryClient()
    const { mutate } = useMutation({
        mutationFn: updateRecord,
        onError: (error) => toast.error(error.message),
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ['exercise', exerciseId] })
            toast.success(data?.message)
            reset()
            navigate(location.pathname, { replace: true })
        }
    })

    const handleEditRecord = (formData: RecordFormData) => {
        const data = {
            exerciseId,
            recordId,
            formData
        }
        mutate(data)
    }

    return (
        <Transition appear show={true} as={Fragment}>
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
                            <DialogPanel className="w-full max-w-3xl transform overflow-hidden rounded-2xl bg-gray-900 text-left align-middle shadow-xl transition-all p-16 border border-gray-300">
                                <DialogTitle
                                    as="h3"
                                    className="text-2xl uppercase font-bold text-white text-center mb-4"
                                >
                                    Edit record
                                </DialogTitle>

                                <p className="text-xl font-light text-white text-center">Fill out the form to edit  {''}
                                    <span className="text-red-600 font-bold">this record</span>
                                </p>

                                <form
                                    className='mt-10 space-y-4'
                                    onSubmit={handleSubmit(handleEditRecord)}
                                    noValidate
                                >
                                    <RecordForm
                                        register={register}
                                        errors={errors}
                                    />

                                    <input
                                        type="submit"
                                        value="Save changes"
                                        className="bg-red-600 hover:bg-red-700 transition-colors w-full p-3 text-white font-black text-xl cursor-pointer rounded-4xl mt-2"
                                    />
                                </form>

                            </DialogPanel>
                        </TransitionChild>
                    </div>
                </div>
            </Dialog>
        </Transition>
    )
}