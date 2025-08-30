import { Link, useLocation, useNavigate } from "react-router-dom";
import { FingerPrintIcon, UserIcon } from "@heroicons/react/20/solid";

const tabs = [
    { name: "My profile", href: "/profile", icon: UserIcon },
    {
        name: "Change password",
        href: "/profile/change-password",
        icon: FingerPrintIcon,
    },
];

function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(" ");
}

export default function Tabs() {
    const navigate = useNavigate();
    const location = useLocation();
    const currentTab = tabs.filter((tab) => tab.href === location.pathname)[0]
        .href;

    return (
        <div className="mb-10 px-4 sm:px-0">
            {/* Mobile select dropdown */}
            <div className="sm:hidden">
                <label htmlFor="tabs" className="sr-only">
                    Select a tab
                </label>
                <select
                    id="tabs"
                    name="tabs"
                    className="block w-full rounded-md border border-gray-300 bg-white text-black py-2 px-3 shadow-sm focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500"
                    onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                        navigate(e.target.value)
                    }
                    value={currentTab}
                >
                    {tabs.map((tab) => (
                        <option value={tab.href} key={tab.name}>
                            {tab.name}
                        </option>
                    ))}
                </select>
            </div>

            {/* Desktop tabs */}
            <div className="hidden sm:block">
                <div className="border-b border-gray-600">
                    <nav
                        className="flex flex-wrap gap-4 sm:gap-0 sm:flex-nowrap sm:space-x-8"
                        aria-label="Tabs"
                    >
                        {tabs.map((tab) => (
                            <Link
                                key={tab.name}
                                to={tab.href}
                                className={classNames(
                                    location.pathname === tab.href
                                        ? "border-red-500 text-red-500"
                                        : "border-transparent text-gray-400 hover:border-gray-300 hover:text-gray-500",
                                    "group inline-flex items-center border-b-2 py-3 px-2 text-sm sm:text-base font-medium transition"
                                )}
                            >
                                <tab.icon
                                    className={classNames(
                                        location.pathname === tab.href
                                            ? "text-red-500"
                                            : "text-gray-400 group-hover:text-gray-500",
                                        "mr-2 h-5 w-5"
                                    )}
                                    aria-hidden="true"
                                />
                                <span>{tab.name}</span>
                            </Link>
                        ))}
                    </nav>
                </div>
            </div>
        </div>
    );
}
