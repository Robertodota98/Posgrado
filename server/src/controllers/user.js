const { connectDB } = require("../config");
const bcrypt = require("bcrypt");

const saltRounds = 10; // Número de rondas para generar la sal

const getUsers = async (req, res) => {
    try {
        const connection = await connectDB();
        const [results] = await connection.query("SELECT * FROM users");
        await connection.end();
        res.json(results);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al obtener usuarios" });
    }
};

const createUser = async (req, res) => {
    const { username, password, role } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, saltRounds); // Encriptar el password
        const connection = await connectDB();
        const [results] = await connection.query(
            "INSERT INTO users (username, password, role) VALUES (?, ?, ?)",
            [username, hashedPassword, role] // Enviar el password encriptado
        );
        await connection.end();
        res.json({
            message: "Usuario creado correctamente",
            id: results.insertId,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al crear usuario" });
    }
};

const updateUser = async (req, res) => {
    const { id } = req.params;
    const { username, password, role } = req.body;
    try {
        const connection = await connectDB();
        const hashedPassword = await bcrypt.hash(password, saltRounds); // Encriptar el password
        const [results] = await connection.query(
            "UPDATE users SET username = ?, password = ?, role = ? WHERE id = ?",
            [username, hashedPassword, role, id] // Enviar el password encriptado
        );
        await connection.end();
        if (results.affectedRows > 0) {
            res.json({ message: "Usuario actualizado correctamente" });
        } else {
            res.status(404).json({ message: "Usuario no encontrado" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al actualizar usuario" });
    }
};

const deleteUser = async (req, res) => {
    const { id } = req.params;
    try {
        const connection = await connectDB();
        const [results] = await connection.query(
            "DELETE FROM users WHERE id = ?",
            [id]
        );
        await connection.end();
        if (results.affectedRows > 0) {
            res.json({ message: "Usuario eliminado correctamente" });
        } else {
            res.status(404).json({ message: "Usuario no encontrado" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al eliminar usuario" });
    }
};

module.exports = {
    getUsers,
    createUser,
    updateUser,
    deleteUser,
};
