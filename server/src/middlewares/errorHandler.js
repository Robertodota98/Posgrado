//middlewares/errorHandler.js

function errorHandler(err, req, res, next) {
    console.error(err.stack);
    res.status(500).json({
        success: false,
        error: "Ocurrió un error en el servidor",
    });
}

module.exports = errorHandler;
