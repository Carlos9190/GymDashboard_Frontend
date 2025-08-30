import { Fragment } from "react";
import { Link } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import { Bars3Icon } from "@heroicons/react/20/solid";
import {
    Popover,
    PopoverButton,
    PopoverPanel,
    Transition,
} from "@headlessui/react";
import { User } from "@/types/index";

type NavMenuProps = {
    name: User["name"];
};

export default function NavMenu({ name }: NavMenuProps) {
    const queryClient = useQueryClient();
    const logout = () => {
        localStorage.removeItem("AUTH_TOKEN");
        queryClient.invalidateQueries({ queryKey: ["user"] });
    };

    return (
        <Popover className="relative">
            <PopoverButton className="inline-flex items-center gap-x-1 text-sm font-semibold leading-6 p-2 rounded-lg bg-red-600 cursor-pointer hover:bg-red-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 transition">
                <Bars3Icon className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-white" />
            </PopoverButton>

            <Transition
                as={Fragment}
                enter="transition ease-out duration-200"
                enterFrom="opacity-0 -translate-y-2"
                enterTo="opacity-100 translate-y-0"
                leave="transition ease-in duration-150"
                leaveFrom="opacity-100 translate-y-0"
                leaveTo="opacity-0 -translate-y-2"
            >
                <PopoverPanel
                    className={`
                        absolute z-50 mt-3 w-64 sm:w-72
                        left-1/2 -translate-x-1/2
                        md:left-auto md:right-0 md:translate-x-0
                    `}
                >
                    <div className="w-full rounded-xl bg-white p-4 text-sm sm:text-base font-semibold leading-6 text-gray-900 shadow-lg ring-1 ring-gray-900/5 space-y-1">
                        <p className="text-center text-gray-700">
                            Hello, <span className="font-bold">{name}</span>
                        </p>
                        <Link
                            to="/profile"
                            className="block p-2 rounded hover:text-red-600 hover:bg-gray-100 transition"
                        >
                            Profile
                        </Link>
                        <Link
                            to="/"
                            className="block p-2 rounded hover:text-red-600 hover:bg-gray-100 transition"
                        >
                            Dashboard
                        </Link>
                        <Link
                            to="/routines"
                            className="block p-2 rounded hover:text-red-600 hover:bg-gray-100 transition"
                        >
                            Routines
                        </Link>
                        <Link
                            to="/exercises"
                            className="block p-2 rounded hover:text-red-600 hover:bg-gray-100 transition"
                        >
                            Exercises
                        </Link>
                        <button
                            type="button"
                            className="block w-full text-left p-2 rounded hover:text-red-600 hover:bg-gray-100 font-bold transition"
                            onClick={logout}
                        >
                            Log out
                        </button>
                    </div>
                </PopoverPanel>
            </Transition>
        </Popover>
    );
}
