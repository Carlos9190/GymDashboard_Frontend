import { BrowserRouter, Routes, Route } from "react-router-dom"
import AuthLayout from "@/layouts/AuthLayout"
import LoginView from "@/views/auth/LoginView"
import RegisterView from "@/views/auth/RegisterView"
import ConfirmAccountView from "@/views/auth/ConfirmAccountView"
import RequestNewTokenView from "@/views/auth/RequestNewTokenView"
import ForgotPasswordView from "@/views/auth/ForgotPasswordView"
import NewPasswordView from "@/views/auth/NewPasswordView"
import AppLayout from "./layouts/AppLayout"
import CreateRoutineView from "./views/routines/CreateRoutineView"
import RoutinesDashboardView from "./views/RoutineDashboardView"
import ExercisesDashboardView from "./views/ExerciseDashboardView"
import CreateExerciseView from "./views/exercises/NewExerciseView"
import UpdateExerciseView from "./views/exercises/EditExerciseView"

export default function Router() {

    return (
        <BrowserRouter>
            <Routes>
                <Route element={<AuthLayout />}>
                    <Route path="/auth/login" element={<LoginView />} />
                    <Route path="/auth/register" element={<RegisterView />} />
                    <Route path="/auth/confirm-account" element={<ConfirmAccountView />} />
                    <Route path="/auth/request-token" element={<RequestNewTokenView />} />
                    <Route path="/auth/forgot-password" element={<ForgotPasswordView />} />
                    <Route path="/auth/new-password" element={<NewPasswordView />} />
                </Route>

                <Route element={<AppLayout />}>
                    <Route path="/" element={<RoutinesDashboardView />} index />
                    <Route path="/routines/new" element={<CreateRoutineView />} />

                    <Route path="/exercises" element={<ExercisesDashboardView />} />
                    <Route path="/exercises/new" element={<CreateExerciseView />} />
                    <Route path="/exercises/:exerciseId/edit" element={<UpdateExerciseView />} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}