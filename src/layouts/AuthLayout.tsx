import { Outlet } from "react-router-dom"
import Logo from "../components/Logo"
import { ToastContainer } from "react-toastify"

export default function AuthLayout() {
  return (
    <>
      <div className="bg-gray-900 min-h-screen flex flex-col items-center">
        <Logo />
        <div className="mx-auto w-[450px] pb-10">
          <Outlet />
        </div>
      </div>

      <ToastContainer
        pauseOnHover={false}
        pauseOnFocusLoss={false}
      />
    </>
  )
}
