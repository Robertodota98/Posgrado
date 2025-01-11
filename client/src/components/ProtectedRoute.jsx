import { Navigate } from "react-router-dom";

const roleToRoute = {
    administrador: "/", // ruta de inicio despues de login para (administrador)
    usuario: "/", // ruta de inicio despues de login para (usuario)
};

// Este componente se utiliza para proteger las rutas que solo deben ser accesibles para usuarios con un rol específico
// children: los componentes que se deben renderizar si el usuario tiene el rol permitido
// allowedRole: el rol permitido para acceder a la ruta
// eslint-disable-next-line react/prop-types, no-unused-vars
export function ProtectedRoute({ children, allowedRole }) {
    const userRole = sessionStorage.getItem("role");

    // Si no se encuentra ningún rol en sessionStorage, redirigir al usuario a la página de inicio.
    if (!userRole) {
        return <Navigate to="/no-role" />;
    }

    // Si el usuario no tiene el rol permitido, redirigirlo a la página de inicio.
    if (allowedRole && userRole !== allowedRole) {
        return <Navigate to="/" />;
    }

    // Si el usuario tiene el rol permitido, obtener la ruta correspondiente al rol.
    const route = roleToRoute[userRole];
    // Redirigir al usuario a la ruta correspondiente.
    return <Navigate to={route} userRole={userRole} />;
}
