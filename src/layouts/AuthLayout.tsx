import { Outlet } from "react-router-dom"
import Logo from "../components/Logo"

export default function AuthLayout() {
  return (
    <>
      <div className="bg-gray-900 min-h-screen flex flex-col items-center">
        <Logo />
        <div className="mx-auto w-[450px]">
          <Outlet />
        </div>
      </div>
    </>
  )
}
