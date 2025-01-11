import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

// eslint-disable-next-line react/prop-types
export function AuthProvider({ children }) {
    const userRoles = {
        administrador: "administrador",
        usuario: "usuario",
    };

    const [userRole, setUserRole] = useState(
        sessionStorage.getItem("role") || null
    );

    const isUserRoleValid =
        userRole && Object.values(userRoles).includes(userRole);

    const logout = () => {
        sessionStorage.removeItem("role");
        setUserRole(null);
    };

    const login = (role) => {
        sessionStorage.setItem("role", role);
        setUserRole(role);
    };

    const value = { userRole, isUserRoleValid, logout, login };

    return (
        <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
    );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
    return useContext(AuthContext);
}
