require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const session = require("express-session");
const cors = require("cors");
const errorHandler = require("./middlewares/errorHandler");
const { connectDB } = require("./config");

//!! Importando rutas
const router = require("./routes");

//!! Iniciando la aplicación
const app = express();

// ** Configuración de la aplicación
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
    session({
        secret: "kjbdc87bidhwb8dfgaw8fy4gfubdfiawefg38",
        resave: true,
        saveUninitialized: true,
    })
);

// Middleware de autenticación
var auth = function (req, res, next) {
    if (req.session && req.session.user) {
        return next();
    } else {
        return res.sendStatus(401);
    }
};

app.use(
    cors({
        origin: "*",
        credentials: true,
        methods: ["POST", "GET", "PUT", "DELETE"],
    })
);

//!! Implementando rutas
app.use("/api/", router);

app.get("/protected", auth, function (req, res) {
    res.send("You can only see this after you've logged in.");
});

app.use((req, res) => {
    res.status(404).json({
        success: false,
        error: "Recurso no encontrado",
    });
});

//?? Manejo de errores
app.use(errorHandler);

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`El servidor está escuchando en el puerto ${port}`);
});


