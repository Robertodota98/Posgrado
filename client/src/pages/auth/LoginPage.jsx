import React, { useState } from "react";
import { API_URL } from "../../helpers/helpers";
// Imagenes
import bglogin from "../../assets/image/bg-login.jpg";
import logologin from "../../assets/image/coronavirus.png";

export function LoginPage() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const statusMessages = {
        200: {
            message: "Inicio de sesión exitoso",
            redirect: true,
        },
        401: {
            message: "Nombre de usuario o contraseña incorrectos",
            redirect: false,
        },
        403: {
            message: "Cuenta bloqueada",
            redirect: false,
        },
        default: {
            message: "Error de inicio de sesión",
            redirect: false,
        },
    };

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await API_URL.post("/auth/login", {
                username,
                password,
            });

            const { redirect } =
                statusMessages[response.status] || statusMessages.default;

            if (redirect) {
                const roleToRoute = {
                    administrador: "/allcursantes",
                    usuario: "/allcursantes",
                };

                const { role } = response.data;
                sessionStorage.setItem("role", role);
                const userRole = sessionStorage.getItem("role");
                const route = roleToRoute[userRole];
                window.location.href = route;
            }
        } catch (error) {
            console.error(error);
            console.log("Error interno del servidor");
        }
    };

    return (
        <div
            className="w-full min-h-screen flex items-center justify-center bg-black-50 relative overflow-hidden"
            style={{
                backgroundImage: `url(${bglogin})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
            }}
        >
            <div className="absolute inset-0 bg-black bg-opacity-40"></div>
            <div className="mx-2 sm:mx-auto sm:max-w-md md:max-w-lg lg:max-w-xl bg-white bg-opacity-10 p-8 rounded-xl shadow-lg relative z-10 backdrop-filter backdrop-blur-lg transition-all duration-300 hover:bg-opacity-20">
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white to-transparent opacity-20 animate-pulse"></div>
                <form onSubmit={handleLogin} className="relative z-20">
                    <h1 className="flex italic font-garamond items-center text-4xl sm:text-5xl text-white text-opacity-90 text-center font-bold font-sans mb-4 sm:mb-8 transition-all duration-300 hover:text-opacity-100">
                        <img
                            src={logologin}
                            alt="Logo de login"
                            className="mr-2 w-12 h-12 animate-spin-slow"
                        />
                        Gestor de Posgrado
                    </h1>

                    <div className="mb-4 transform transition-all duration-300 hover:scale-105">
                        <label htmlFor="username" className="sr-only">
                            Nombre de usuario
                        </label>
                        <input
                            type="text"
                            className="w-full px-4 py-2 border text-black bg-white bg-opacity-80 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-300"
                            id="username"
                            placeholder="Ingrese su nombre de usuario"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            autoComplete="username"
                        />
                    </div>
                    <div className="mb-8 transform transition-all duration-300 hover:scale-105">
                        <label htmlFor="password" className="sr-only">
                            Contraseña
                        </label>
                        <input
                            type="password"
                            className="w-full px-4 py-2 border bg-white bg-opacity-80 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-300"
                            id="password"
                            placeholder="Ingrese su contraseña"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            autoComplete="current-password"
                        />
                    </div>
                    <button
                        className="w-full bg-blue-600 bg-opacity-90 text-white py-2 px-4 rounded-lg hover:bg-blue-700 focus:outline-none transition duration-300 ease-in-out transform hover:scale-105 active:scale-95"
                        type="submit"
                    >
                        Iniciar sesión
                    </button>
                </form>
            </div>
        </div>
    );
}

