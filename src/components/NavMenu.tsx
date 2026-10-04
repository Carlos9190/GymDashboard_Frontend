import { Fragment } from "react";
import { NavLink, Link } from "react-router-dom";
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

const links = [
    { to: "/", label: "Dashboard", end: true },
    { to: "/routines", label: "Routines", end: false },
    { to: "/exercises", label: "Exercises", end: false },
];

export default function NavMenu({ name }: NavMenuProps) {
    const queryClient = useQueryClient();
    const logout = () => {
        localStorage.removeItem("AUTH_TOKEN");
        queryClient.invalidateQueries({ queryKey: ["user"] });
    };

    return (
        <div className="flex items-center gap-2">
            {/* Desktop: primary destinations stay visible. They used to be
                hidden behind the hamburger at every breakpoint, including 1440px. */}
            <nav
                aria-label="Main"
                className="hidden md:flex items-center gap-1"
            >
                {links.map((link) => (
                    <NavLink
                        key={link.to}
                        to={link.to}
                        end={link.end}
                        className={({ isActive }) =>
                            `inline-flex min-h-11 items-center rounded-lg px-4 text-base font-semibold transition-colors ${
                                isActive
                                    ? "bg-surface-hover text-brand-400"
                                    : "text-content-muted hover:bg-surface-hover hover:text-content"
                            }`
                        }
                    >
                        {link.label}
                    </NavLink>
                ))}
            </nav>

            <Popover className="relative">
                <PopoverButton
                    aria-label={`Account menu for ${name}`}
                    className="inline-flex min-h-11 min-w-11 items-center justify-center gap-x-1 rounded-lg bg-brand-600 p-2 text-sm font-semibold leading-6 text-white transition-colors cursor-pointer hover:bg-brand-700"
                >
                    <Bars3Icon className="w-6 h-6" aria-hidden="true" />
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
                    <PopoverPanel className="absolute right-0 z-50 mt-3 w-64 sm:w-72">
                        <div className="w-full space-y-1 rounded-xl bg-white p-2 text-base font-semibold leading-6 text-gray-900 shadow-lg ring-1 ring-gray-900/10">
                            <p className="px-2 py-2 text-gray-700">
                                Hello, <span className="font-bold">{name}</span>
                            </p>

                            <Link
                                to="/profile"
                                className="flex min-h-11 items-center rounded-lg px-2 transition-colors hover:bg-gray-100 hover:text-brand-600"
                            >
                                Profile
                            </Link>

                            {/* Mobile only: desktop already shows these inline. */}
                            <div className="md:hidden space-y-1">
                                {links.map((link) => (
                                    <Link
                                        key={link.to}
                                        to={link.to}
                                        className="flex min-h-11 items-center rounded-lg px-2 transition-colors hover:bg-gray-100 hover:text-brand-600"
                                    >
                                        {link.label}
                                    </Link>
                                ))}
                            </div>

                            <button
                                type="button"
                                className="flex min-h-11 w-full items-center rounded-lg px-2 text-left font-bold transition-colors hover:bg-gray-100 hover:text-brand-600"
                                onClick={logout}
                            >
                                Log out
                            </button>
                        </div>
                    </PopoverPanel>
                </Transition>
            </Popover>
        </div>
    );
}
