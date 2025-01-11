import { useState, useEffect } from "react";
import { API_URL } from "../../../helpers/helpers";
import Swal from "sweetalert2";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserPlus, faTrash } from "@fortawesome/free-solid-svg-icons";

export const UserManagement = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("");
    const [users, setUsers] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        getUsers();
    }, []);

    const getUsers = async () => {
        try {
            const response = await API_URL.get("/users");
            setUsers(response.data);
        } catch (error) {
            Swal.fire({
                title: "Error",
                text: "Hubo un problema al cargar los usuarios",
                icon: "error",
            });
        }
    };

    const createUser = async () => {
        // Verificar que los campos no estén vacíos
        if (!username || !password || !role) {
            return Swal.fire({
                title: "Error",
                text: "Por favor complete todos los campos",
                icon: "error",
            });
        }

        // Verificar si el nombre de usuario ya existe
        if (users.some((user) => user.username === username)) {
            return Swal.fire({
                title: "Error",
                text: "El nombre de usuario ya está en uso",
                icon: "error",
            });
        }

        try {
            const response = await API_URL.post("/users", {
                username,
                password,
                role,
            });
            console.log(response.data);
            getUsers();
            setUsername("");
            setPassword("");
            setRole("");
            // Mostrar mensaje de éxito
            Swal.fire({
                title: "Éxito",
                text: "El usuario ha sido creado exitosamente",
                icon: "success",
            });
        } catch (error) {
            Swal.fire({
                title: "Error",
                text: "Hubo un problema al crear el usuario",
                icon: "error",
            });
        }
    };

    const confirmDeleteUser = async (id) => {
        const result = await Swal.fire({
            title: "Confirmar eliminación",
            text: "¿Está seguro que desea eliminar este usuario?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Sí, eliminar",
            cancelButtonText: "Cancelar",
        });
        if (result.isConfirmed) {
            deleteUser(id);
        }
    };

    const deleteUser = async (id) => {
        try {
            const response = await API_URL.delete(`/users/${id}`);
            console.log(response.data);
            getUsers();
        } catch (error) {
            Swal.fire({
                title: "Error",
                text: "Hubo un problema al eliminar el usuario",
                icon: "error",
            });
        }
    };

    const filteredUsers = users.filter((user) =>
        user.username.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="flex flex-col md:flex-row justify-center gap-4 p-4">
            <div className="bg-white rounded-lg shadow-lg p-4 w-full md:w-7/12 order-last md:order-first">
                {/* Columna de la lista de usuarios */}
                <h2 className="text-lg font-medium mb-4">Lista de usuarios</h2>
                <div className="flex items-center mb-4">
                    <label htmlFor="search" className="mr-2 font-medium">
                        Buscar:
                    </label>
                    <input
                        type="text"
                        id="search"
                        name="search"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                    />
                </div>
                <table className="w-full table-auto">
                    <thead>
                        <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                            <th className="py-3 px-6 text-left">
                                Nombre de usuario
                            </th>
                            <th className="py-3 px-6 text-left">Rol</th>
                            <th className="py-3 px-6 text-center">Acciones</th>
                        </tr>
                    </thead>
                    <tbody className="text-gray-600 text-sm font-light">
                        {filteredUsers.map((user) => (
                            <tr
                                key={user.id}
                                className="border-b border-gray-200 hover:bg-gray-100"
                            >
                                <td className="py-3 px-6 text-left whitespace-nowrap">
                                    {user.username}
                                </td>
                                <td className="py-3 px-6 text-left">
                                    {user.role}
                                </td>
                                <td className="py-3 px-6 text-center">
                                    <button
                                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 mr-2 rounded"
                                        onClick={() =>
                                            confirmDeleteUser(user.id)
                                        }
                                    >
                                        <FontAwesomeIcon
                                            icon={faTrash}
                                            className="mr-2"
                                        />
                                        Eliminar
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="bg-white rounded-lg shadow-lg p-4 w-full md:w-5/12">
                {/* Columna del formulario de creación de usuario */}
                <h2 className="text-lg font-medium mb-4">
                    Crear nuevo usuario
                </h2>
                <div className="mb-4">
                    <label
                        htmlFor="username"
                        className="block text-gray-700 font-medium mb-2"
                    >
                        Nombre de usuario
                    </label>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 w-full"
                    />
                </div>
                <div className="mb-4">
                    <label
                        htmlFor="password"
                        className="block text-gray-700 font-medium mb-2"
                    >
                        Contraseña
                    </label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 w-full"
                    />
                </div>
                <div className="mb-4">
                    <label
                        htmlFor="role"
                        className="block text-gray-700 font-medium mb-2"
                    >
                        Rol
                    </label>
                    <select
                        id="role"
                        name="role"
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                        className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 w-full"
                    >
                        <option value="">Seleccione un rol</option>
                        <option value="jefeEmpresa">Jefe de Empresa</option>
                        <option value="jefeArea">Jefe de Area</option>
                        <option value="especialista">Especialista</option>
                    </select>
                </div>
                <button
                    className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                    onClick={createUser}
                >
                    <FontAwesomeIcon icon={faUserPlus} className="mr-2" />
                    Crear usuario
                </button>
            </div>
        </div>
    );
};
