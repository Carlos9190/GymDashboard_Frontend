import { useState } from "react";
import { Link } from "react-router-dom";
import { Fragment } from "react/jsx-runtime";
import { UseMutateFunction } from "@tanstack/react-query";
import {
    Menu,
    MenuButton,
    MenuItem,
    MenuItems,
    Transition,
} from "@headlessui/react";
import { EllipsisVerticalIcon } from "@heroicons/react/20/solid";
import { RoutineService } from "@/services/RoutineService";
import ConfirmDeleteModal from "@/components/ConfirmDeleteModal";
import type { ApiResponse, RoutineCard } from "@/types/index";

type RoutineCardProps = {
    routine: RoutineCard;
    mutate: UseMutateFunction<
        ApiResponse | undefined,
        Error,
        Pick<RoutineService, "routineId">,
        unknown
    >;
};

const item =
    "flex min-h-11 items-center px-3 text-sm text-gray-900 data-focus:bg-gray-100";

export default function RoutineCard({ routine, mutate }: RoutineCardProps) {
    const [showModal, setShowModal] = useState(false);

    const confirmDelete = () => {
        mutate({ routineId: routine._id });
        setShowModal(false);
    };

    return (
        <>
            {/* Card was white on the dark shell, with text-gray-400 metadata
                sitting at ~2.9:1. Now it uses the surface tokens and clears AA. */}
            <div className="flex justify-between gap-3 rounded-2xl border border-edge bg-surface-card p-5 shadow-lg transition-colors hover:border-edge-strong">
                <div className="min-w-0 space-y-2">
                    <Link
                        to={`/routines/${routine._id}`}
                        className="block truncate text-xl font-bold text-content hover:text-brand-400 hover:underline"
                    >
                        {routine.routineName}
                    </Link>

                    {routine.routineDays.length ? (
                        <ul className="flex flex-wrap gap-1.5">
                            {routine.routineDays.map((day) => (
                                <li
                                    key={day}
                                    className="rounded-full bg-surface-hover px-2.5 py-1 text-xs font-semibold text-content-muted"
                                >
                                    {day}
                                </li>
                            ))}
                        </ul>
                    ) : (
                        // formatDays([]) returns "", which rendered a bare
                        // "Day(s):" label with nothing after it.
                        <p className="text-sm italic text-content-subtle">
                            No days assigned yet
                        </p>
                    )}
                </div>

                <Menu as="div" className="relative shrink-0">
                    <MenuButton className="inline-flex h-11 w-11 items-center justify-center rounded-lg text-content-muted transition-colors hover:bg-surface-hover hover:text-content">
                        <span className="sr-only">
                            Options for {routine.routineName}
                        </span>
                        <EllipsisVerticalIcon
                            className="h-6 w-6"
                            aria-hidden="true"
                        />
                    </MenuButton>
                    <Transition
                        as={Fragment}
                        enter="transition ease-out duration-100"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                    >
                        <MenuItems className="absolute right-0 z-10 mt-2 w-48 origin-top-right overflow-hidden rounded-xl bg-white py-1 shadow-lg ring-1 ring-gray-900/10">
                            <MenuItem>
                                <Link
                                    to={`/routines/${routine._id}`}
                                    className={item}
                                >
                                    View routine
                                </Link>
                            </MenuItem>
                            <MenuItem>
                                <Link
                                    to={`/routines/${routine._id}/edit`}
                                    className={item}
                                >
                                    Edit routine
                                </Link>
                            </MenuItem>
                            <MenuItem>
                                <button
                                    type="button"
                                    className={`${item} w-full cursor-pointer text-left font-semibold text-red-600`}
                                    onClick={() => setShowModal(true)}
                                >
                                    Delete routine
                                </button>
                            </MenuItem>
                        </MenuItems>
                    </Transition>
                </Menu>
            </div>

            <ConfirmDeleteModal
                isOpen={showModal}
                onClose={() => setShowModal(false)}
                onConfirm={confirmDelete}
                title="Delete routine"
                description={`Are you sure you want to delete "${routine.routineName}"? This action will permanently remove the routine, but the associated exercises and their records will remain intact.`}
            />
        </>
    );
}
