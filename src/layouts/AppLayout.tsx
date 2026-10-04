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
                <div className="bg-surface w-full min-h-screen text-content flex flex-col">
                    <a
                        href="#main-content"
                        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-brand-600 focus:px-4 focus:py-2 focus:font-semibold focus:text-white"
                    >
                        Skip to content
                    </a>

                    <header className="bg-surface-raised w-full">
                        {/* Was flex-col until md, which pushed the hamburger onto
                            its own row and ate ~110px above the fold on phones. */}
                        <div className="max-w-screen-2xl mx-auto flex flex-row justify-between items-center gap-4 px-4 sm:px-6 py-3 sm:py-4">
                            <Link to="/" aria-label="Gym Dashboard home">
                                <LogoDashboard />
                            </Link>

                            <NavMenu name={data.name} />
                        </div>
                    </header>

                    <main id="main-content" className="grow w-full">
                        <section className="max-w-screen-2xl mx-auto mt-6 sm:mt-10 px-4 sm:px-6 pb-12">
                            <Outlet />
                        </section>
                    </main>

                    <footer className="py-6 px-4 sm:px-6 bg-surface-raised w-full">
                        <p className="text-center text-sm sm:text-base text-content-muted">
                            All rights reserved &copy;{" "}
                            {new Date().getFullYear()} Gym Dashboard
                        </p>
                    </footer>
                </div>

                <ToastContainer pauseOnHover={false} pauseOnFocusLoss={false} />
            </>
        );
}
