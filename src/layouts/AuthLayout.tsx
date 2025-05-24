import { Outlet } from "react-router-dom"
import { ToastContainer } from "react-toastify"
import Logo from "@/components/Logo"

export default function AuthLayout() {
  return (
    <>
      <div className="bg-gray-900 min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center max-w-[450px] px-4 pb-10">
          <div className="py-5 md:py-10">
            <Logo />
          </div>
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