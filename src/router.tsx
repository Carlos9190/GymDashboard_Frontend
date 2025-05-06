import { BrowserRouter, Routes, Route } from "react-router-dom"
import AuthLayout from "./layouts/AuthLayout"
import LoginView from "./views/auth/LoginView"
import RegisterView from "./views/auth/RegisterView"

export default function Router() {

    return (
        <BrowserRouter>
            <Routes>
                <Route element={<AuthLayout />}>
                    <Route path="/auth/login" element={<LoginView />} />
                    <Route path="/auth/register" element={<RegisterView />} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}