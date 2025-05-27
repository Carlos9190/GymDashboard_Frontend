import { Link, Outlet, Navigate } from "react-router-dom"
import { ToastContainer } from "react-toastify"
import NavMenu from "@/components/NavMenu"
import Logo from "@/components/Logo"
import { useAuth } from "@/hooks/useAuth"
import Spinner from "@/components/LoadingSpinner"

export default function AppLayout() {

  const { data, isError, isLoading } = useAuth()

  if (isLoading) return <Spinner />
  if (isError) {
    return <Navigate to='/auth/login' />
  }

  if (data) return (
    <>
      <div className="bg-gray-800 w-full min-h-screen text-white">
        <header className="bg-gray-900">
          <div className="max-w-screen-2xl mx-auto flex flex-col md:flex-row justify-between items-center">
            <Link to='/'>
              <Logo />
            </Link>

            <NavMenu
              name={data.name}
            />
          </div>
        </header>

        <section className="max-w-screen-2xl mx-auto mt-10 p-5">
          <Outlet />
        </section>

        <footer className="py-5">
          <p className="text-center">
            All rights reserved &copy; {new Date().getFullYear()} Gym Dashboard
          </p>
        </footer>
      </div>

      <ToastContainer
        pauseOnHover={false}
        pauseOnFocusLoss={false}
      />
    </>
  )
}