const bcrypt = require("bcrypt");
const { validationResult } = require("express-validator");
const { connectDB } = require("../config/");

const registerUser = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { username, password, role } = req.body;

    const validRoles = ["administrador", "usuario"];
    if (!validRoles.includes(role)) {
        return res.status(400).json({ message: "Rol no válido." });
    }

    try {
        const connection = await connectDB();

        const [results] = await connection.query(
            "SELECT * FROM users WHERE username = ?",
            [username]
        );

        if (results.length > 0) {
            await connection.end();
            return res
                .status(400)
                .json({ message: "El nombre de usuario ya está en uso." });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        await connection.query(
            "INSERT INTO users (username, password, role) VALUES (?, ?, ?)",
            [username, hashedPassword, role]
        );

        await connection.end();

        return res.status(201).json({ message: "Usuario creado con éxito." });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Error interno del servidor." });
    }
};

const loginUser = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { username, password } = req.body;

    try {
        const connection = await connectDB();

        const [results] = await connection.query(
            "SELECT * FROM users WHERE username = ?",
            [username]
        );

        if (results.length === 0) {
            await connection.end();
            return res.status(401).json({
                message: "Nombre de usuario o contraseña incorrectos.",
            });
        }

        const user = results[0];

        if (user.blocked) {
            await connection.end();
            return res.status(401).json({ message: "Cuenta bloqueada." });
        }

        let failedAttempts = user.failedAttempts || 0;

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            failedAttempts++;
            if (failedAttempts >= 3) {
                await connection.query(
                    "UPDATE users SET blocked = true WHERE id = ?",
                    [user.id]
                );
                await connection.end();
                return res.status(401).json({ message: "Cuenta bloqueada." });
            } else {
                await connection.query(
                    "UPDATE users SET failedAttempts = ? WHERE id = ?",
                    [failedAttempts, user.id]
                );
                await connection.end();
                return res.status(401).json({
                    message: "Nombre de usuario o contraseña incorrectos.",
                });
            }
        } else {
            await connection.query(
                "UPDATE users SET failedAttempts = 0 WHERE id = ?",
                [user.id]
            );

            await connection.end();

            // Establecer la sesión
            req.session.user = {
                id: user.id,
                username: user.username,
                role: user.role,
            };

            return res.status(200).json({
                message: "Inicio de sesión exitoso.",
                role: user.role,
            });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Error interno del servidor." });
    }
};

const logoutUser = async (req, res, next) => {
    try {
        await req.session.destroy();
        res.redirect("/login");
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Error interno del servidor." });
    }
};

module.exports = { registerUser, loginUser, logoutUser };
