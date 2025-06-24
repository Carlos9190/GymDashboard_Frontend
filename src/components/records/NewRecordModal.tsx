import { Fragment } from 'react'
import { Dialog, Transition, TransitionChild, DialogPanel, DialogTitle } from '@headlessui/react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import RecordForm from './RecordForm'
import { RecordFormData } from '@/types/index'
import { useForm } from 'react-hook-form'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createRecord } from '@/services/RecordService'
import { toast } from 'react-toastify'

export default function AddRecordModal() {
    const navigate = useNavigate()

    // Reading whether modal exists
    const location = useLocation()
    const queryParams = new URLSearchParams(location.search)
    const modalRecord = queryParams.get('newRecord')
    const show = modalRecord ? true : false

    // Getting execiseId
    const params = useParams()
    const exerciseId = params.exerciseId!

    const initialValues: RecordFormData = {
        sets: 0,
        reps: 0,
        weight: 0
    }

    const { register, handleSubmit, reset, formState: { errors } } = useForm({ defaultValues: initialValues })

    const queryClient = useQueryClient()
    const { mutate } = useMutation({
        mutationFn: createRecord,
        onError: (error) => toast.error(error.message),
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ['records', exerciseId] })
            toast.success(data?.message)
            reset()
            navigate(location.pathname, { replace: true })
        }
    })

    const handleNewRecord = (formData: RecordFormData) => {
        const data = {
            formData,
            exerciseId
        }
        mutate(data)
    }

    return (
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
                                <DialogPanel className="w-full max-w-3xl transform overflow-hidden rounded-2xl bg-gray-900 text-left align-middle shadow-xl transition-all p-16 border border-gray-300">
                                    <DialogTitle
                                        as="h3"
                                        className="text-2xl uppercase font-bold text-white text-center mb-4"
                                    >
                                        New record
                                    </DialogTitle>

                                    <p className="text-xl font-light text-white text-center">Fill out the form and register  {''}
                                        <span className="text-red-600 font-bold">a record for this exercise</span>
                                    </p>

                                    <form
                                        className='mt-10 space-y-4'
                                        onSubmit={handleSubmit(handleNewRecord)}
                                        noValidate
                                    >
                                        <RecordForm
                                            register={register}
                                            errors={errors}
                                        />

                                        <input
                                            type="submit"
                                            value="Save record"
                                            className="bg-red-600 hover:bg-red-700 transition-colors w-full p-3 text-white font-black text-xl cursor-pointer rounded-4xl mt-2"
                                        />
                                    </form>

                                </DialogPanel>
                            </TransitionChild>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </>
    )
}