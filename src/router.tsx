import { BrowserRouter, Routes, Route } from "react-router-dom"
import AuthLayout from "./layouts/AuthLayout"
import LoginView from "./views/auth/LoginView"
import RegisterView from "./views/auth/RegisterView"
import ConfirmAccountView from "./views/auth/ConfirmAccountView"
import RequestNewTokenView from "./views/auth/RequestNewTokenView"

export default function Router() {

    return (
        <BrowserRouter>
            <Routes>
                <Route element={<AuthLayout />}>
                    <Route path="/auth/login" element={<LoginView />} />
                    <Route path="/auth/register" element={<RegisterView />} />
                    <Route path="/auth/confirm-account" element={<ConfirmAccountView />} />
                    <Route path="/auth/request-token" element={<RequestNewTokenView />} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}