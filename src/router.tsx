import { BrowserRouter, Routes, Route } from "react-router-dom"
import AppLayout from "./layouts/AppLayout"
import DashboardView from "./views/DashboardView"
import AuthLayout from "./layouts/AuthLayout"
import LoginView from "./views/auth/LoginView"

export default function Router() {

    return (
        <BrowserRouter>
            <Routes>
                <Route element={<AppLayout />}>
                    <Route path="" element={<DashboardView />} />
                </Route>

                <Route element={<AuthLayout />}>
                    <Route path="/" element={<LoginView />} index />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}