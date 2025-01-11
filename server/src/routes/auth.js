const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const { registerUser, loginUser } = require("../controllers/auth");

// Ruta para el registro de usuarios
router.post(
    "/register",
    [
        body("username")
            .notEmpty()
            .withMessage("Debe proporcionar un nombre de usuario.")
            .isLength({ max: 50 })
            .withMessage(
                "El nombre de usuario debe tener como máximo 50 caracteres."
            ),
        body("password")
            .notEmpty()
            .withMessage("Debe proporcionar una contraseña.")
            .isLength({ min: 8, max: 50 })
            .withMessage("La contraseña debe tener entre 8 y 50 caracteres."),
        body("role")
            .notEmpty()
            .withMessage("Debe proporcionar un rol.")
            .isIn(["administrador", "usuario"])
            .withMessage("El rol debe ser administrador o usuario."),
    ],
    registerUser
);

// Ruta para el inicio de sesión
router.post(
    "/login",
    [
        body("username")
            .notEmpty()
            .withMessage("Debe proporcionar un nombre de usuario."),
        body("password")
            .notEmpty()
            .withMessage("Debe proporcionar una contraseña."),
    ],
    loginUser
);

module.exports = router;
