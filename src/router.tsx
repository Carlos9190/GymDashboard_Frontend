import { BrowserRouter, Routes, Route } from "react-router-dom"
import AuthLayout from "./layouts/AuthLayout"
import LoginView from "./views/auth/LoginView"

export default function Router() {

    return (
        <BrowserRouter>
            <Routes>
                <Route element={<AuthLayout />}>
                    <Route path="/auth/login" element={<LoginView />} index />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}