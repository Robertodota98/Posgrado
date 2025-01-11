/* eslint-disable react/prop-types */
import { useState } from "react";
import { Navigate } from "react-router-dom";
import validator from "validator";

export function RegisterUserForm({ userRole }) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    if (userRole !== "administrador") {
        return <Navigate to="/" />;
    }

    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handleRoleChange = (event) => {
        setRole(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!username || !password || !role) {
            setErrorMessage("Todos los campos son requeridos.");
            return;
        }

        if (!validator.isAlphanumeric(username)) {
            setErrorMessage(
                "El nombre de usuario solo debe contener letras y números."
            );
            return;
        }

        if (!validator.isLength(password, { min: 6 })) {
            setErrorMessage("La contraseña debe tener al menos 6 caracteres.");
            return;
        }

        if (!["administrador", "usuario"].includes(role)) {
            setErrorMessage("El rol seleccionado no es válido.");
            return;
        }

        try {
            const response = await fetch("/api/users", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ username, password, role }),
            });

            const data = await response.json();

            if (!response.ok) {
                setErrorMessage(data.message);
                return;
            }

            setSuccessMessage(data.message);
            setUsername("");
            setPassword("");
            setRole("");
        } catch (error) {
            setErrorMessage("Error interno del servidor.");
        }
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-md mx-auto">
            {errorMessage && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
                    {errorMessage}
                </div>
            )}
            {successMessage && (
                <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4">
                    {successMessage}
                </div>
            )}
            <div className="mb-4">
                <label
                    htmlFor="username"
                    className="block text-gray-700 font-bold mb-2"
                >
                    Nombre de usuario:
                </label>
                <input
                    type="text"
                    id="username"
                    value={username}
                    onChange={handleUsernameChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
            </div>
            <div className="mb-4">
                <label
                    htmlFor="password"
                    className="block text-gray-700 font-bold mb-2"
                >
                    Contraseña:
                </label>
                <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={handlePasswordChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
            </div>
            <div className="mb-4">
                <label
                    htmlFor="role"
                    className="block text-gray-700 font-bold mb-2"
                >
                    Rol:
                </label>
                <select
                    id="role"
                    value={role}
                    onChange={handleRoleChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                >
                    <option value="">Seleccionar rol</option>
                    <option value="administrador">Administrador</option>
                    <option value="usuario">Usuario</option>
                </select>
            </div>
            <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
                Registrar usuario
            </button>
        </form>
    );
}
