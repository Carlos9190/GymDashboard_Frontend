import { BrowserRouter, Routes, Route } from "react-router-dom";
import AuthLayout from "@/layouts/AuthLayout";
import LoginView from "@/views/auth/LoginView";
import RegisterView from "@/views/auth/RegisterView";
import ConfirmAccountView from "@/views/auth/ConfirmAccountView";
import RequestNewTokenView from "@/views/auth/RequestNewTokenView";
import ForgotPasswordView from "@/views/auth/ForgotPasswordView";
import NewPasswordView from "@/views/auth/NewPasswordView";
import AppLayout from "@/layouts/AppLayout";
import NewRoutineView from "@/views/routines/NewRoutineView";
import RoutinesDashboardView from "@/views/routines/RoutineDashboardView";
import ExercisesDashboardView from "@/views/exercises/ExerciseDashboardView";
import NewExerciseView from "@/views/exercises/NewExerciseView";
import EditExerciseView from "@/views/exercises/EditExerciseView";
import ExerciseDetailsView from "@/views/exercises/ExerciseDetailsView";
import EditRoutineView from "@/views/routines/EditRoutineView";
import RoutineDetailsView from "@/views/routines/RoutineDetailsView";
import ProfileView from "@/views/profile/ProfileView";
import ChangePasswordView from "@/views/profile/ChangePasswordView";
import ProfileLayout from "@/layouts/ProfileLayout";
import NotFound from "@/views/404/NotFound";
import GymDashboardView from "@/views/GymDashboardView";

export default function Router() {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<AuthLayout />}>
                    <Route path="/auth/login" element={<LoginView />} />
                    <Route path="/auth/register" element={<RegisterView />} />
                    <Route
                        path="/auth/confirm-account"
                        element={<ConfirmAccountView />}
                    />
                    <Route
                        path="/auth/request-token"
                        element={<RequestNewTokenView />}
                    />
                    <Route
                        path="/auth/forgot-password"
                        element={<ForgotPasswordView />}
                    />
                    <Route
                        path="/auth/new-password"
                        element={<NewPasswordView />}
                    />
                </Route>

                <Route element={<AppLayout />}>
                    <Route element={<ProfileLayout />}>
                        <Route path="/profile" element={<ProfileView />} />
                        <Route
                            path="/profile/change-password"
                            element={<ChangePasswordView />}
                        />
                    </Route>

                    <Route path="/" element={<GymDashboardView />} index />

                    <Route
                        path="/routines"
                        element={<RoutinesDashboardView />}
                    />
                    <Route path="/routines/new" element={<NewRoutineView />} />
                    <Route
                        path="/routines/:routineId"
                        element={<RoutineDetailsView />}
                    />
                    <Route
                        path="/routines/:routineId/edit"
                        element={<EditRoutineView />}
                    />

                    <Route
                        path="/exercises"
                        element={<ExercisesDashboardView />}
                    />
                    <Route
                        path="/exercises/new"
                        element={<NewExerciseView />}
                    />
                    <Route
                        path="/exercises/:exerciseId"
                        element={<ExerciseDetailsView />}
                    />
                    <Route
                        path="/exercises/:exerciseId/edit"
                        element={<EditExerciseView />}
                    />
                </Route>

                <Route element={<AuthLayout />}>
                    <Route path="/404" element={<NotFound />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}
