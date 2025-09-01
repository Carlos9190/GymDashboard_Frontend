import { Link, Outlet, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { useAuth } from "@/hooks/useAuth";
import NavMenu from "@/components/NavMenu";
import Spinner from "@/components/LoadingSpinner";
import LogoDashboard from "@/components/LogoDashboard";

export default function AppLayout() {
    const { data, isError, isLoading } = useAuth();

    if (isLoading) return <Spinner />;
    if (isError) {
        return <Navigate to="/auth/login" />;
    }

    if (data)
        return (
            <>
                <div className="bg-gray-800 w-full min-h-screen text-white flex flex-col">
                    <header className="bg-gray-900 w-full">
                        <div className="max-w-screen-2xl mx-auto flex flex-col gap-4 md:flex-row justify-between items-center px-4 sm:px-6 py-4">
                            <Link
                                to="/"
                                className="flex justify-center md:justify-start"
                            >
                                <LogoDashboard />
                            </Link>

                            <NavMenu name={data.name} />
                        </div>
                    </header>

                    <main className="flex-grow w-full">
                        <section className="max-w-screen-2xl mx-auto mt-6 sm:mt-10 px-4 sm:px-6">
                            <Outlet />
                        </section>
                    </main>

                    <footer className="py-6 px-4 sm:px-6 bg-gray-900 w-full">
                        <p className="text-center text-sm sm:text-base text-gray-400">
                            All rights reserved &copy;{" "}
                            {new Date().getFullYear()} Gym Dashboard
                        </p>
                    </footer>
                </div>

                <ToastContainer pauseOnHover={false} pauseOnFocusLoss={false} />
            </>
        );
}
