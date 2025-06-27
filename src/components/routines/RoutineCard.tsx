import ConfirmDeleteModal from '@/components/ConfirmDeleteModal'
import { useState } from 'react'
import { Menu, MenuButton, MenuItem, MenuItems, Transition } from '@headlessui/react'
import { EllipsisVerticalIcon } from '@heroicons/react/20/solid'
import { formatDays } from '@/utils/datesUtils'
import { Fragment } from 'react/jsx-runtime'
import { Link } from 'react-router-dom'
import type { ApiResponse, RoutineCard } from '@/types/index'
import { UseMutateFunction } from '@tanstack/react-query'
import { RoutineService } from '@/services/RoutineService'

type RoutineCardProps = {
    routine: RoutineCard
    mutate: UseMutateFunction<ApiResponse | undefined, Error, Pick<RoutineService, "routineId">, unknown>
}

export default function RoutineCard({ routine, mutate }: RoutineCardProps) {
    const [showModal, setShowModal] = useState(false)

    const confirmDelete = () => {
    mutate({ routineId: routine._id })
    setShowModal(false)
    }

    return (
        <>
            <div className="border border-gray-100 bg-white shadow-lg p-6 rounded-lg flex justify-between">
                <div className="space-y-2">
                    <Link to={`/routines/${routine._id}`}
                        className="text-gray-600 cursor-pointer hover:underline text-2xl font-bold"
                    >
                        {routine.routineName}
                    </Link>
                    <p className="text-sm text-gray-400">
                        Day{"(s)"}: {formatDays(routine.routineDays)}
                    </p>
                </div>
                <div className="flex justify-end mt-4">
                    <Menu as="div" className="relative">
                        <MenuButton className="-m-2.5 block p-2.5 text-gray-500 hover:text-gray-900">
                            <span className="sr-only">options</span>
                            <EllipsisVerticalIcon className="h-6 w-6" aria-hidden="true" />
                        </MenuButton>
                        <Transition as={Fragment}
                            enter="transition ease-out duration-100"
                            enterFrom="transform opacity-0 scale-95"
                            enterTo="transform opacity-100 scale-100"
                            leave="transition ease-in duration-75"
                            leaveFrom="transform opacity-100 scale-100"
                            leaveTo="transform opacity-0 scale-95"
                        >
                            <MenuItems className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 focus:outline-none">
                                <MenuItem>
                                    <Link to={`/routines/${routine._id}`} className="block px-3 py-1 text-sm leading-6 text-gray-900">
                                        View routine
                                    </Link>
                                </MenuItem>
                                <MenuItem>
                                    <Link to={`/routines/${routine._id}/edit`} className="block px-3 py-1 text-sm leading-6 text-gray-900">
                                        Edit routine
                                    </Link>
                                </MenuItem>
                                <MenuItem>
                                    <button
                                        type="button"
                                        className="block px-3 py-1 text-sm leading-6 text-red-500 cursor-pointer"
                                        onClick={() => setShowModal(true)}
                                    >
                                        Delete routine
                                    </button>
                                </MenuItem>
                            </MenuItems>
                        </Transition>
                    </Menu>
                </div>
            </div>

            <ConfirmDeleteModal
                isOpen={showModal}
                onClose={() => setShowModal(false)}
                onConfirm={confirmDelete}
                title="Delete routine"
                description={`Are you sure you want to delete "${routine.routineName}"? This action will permanently remove the routine, but the associated exercises and their records will remain intact.`}
            />
        </>      
    )
}