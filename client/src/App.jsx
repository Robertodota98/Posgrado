import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import { LoginPage } from "./pages/auth/LoginPage";
import { Layout } from "./pages/layouts/Layout";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { UserManagement } from "./pages/data/usuarios/UserManagement";
import { EditarCursantes } from "./pages/data/cursantes/EditarCursantes";
import { CrearCursantes } from "./pages/data/cursantes/CrearCursante";
import { TablaCursantes } from "./pages/data/cursantes/TablaCursantes";
import LandingPage from "./landing/page";


function App() {
    const { userRole, isUserRoleValid } = useAuth();

   

    return (
        <BrowserRouter>
            <Routes>
                <Route index element={<LandingPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/" element={<Layout />}>
                    {/* GESTION USUARIO */}
                    <Route
                        path="/cpanel"
                        element={<UserManagement userRole={userRole} />}
                    />

                    {/* GESTION Cursantes */}
                    <Route
                        path="/allcursantes"
                        element={<TablaCursantes userRole={userRole} />}
                    />

                    <Route
                        path="/update-cursante/:id"
                        element={<EditarCursantes userRole={userRole} />}
                    />

                    <Route
                        path="/create-cursante"
                        element={<CrearCursantes userRole={userRole} />}
                    />
                </Route>

                <Route path="*" element={<Navigate to="/" />} />
            </Routes>
        </BrowserRouter>
    );
}
export function AppWrapper() {
    return (
        <AuthProvider>
            <App />
        </AuthProvider>
    );
}
