const authenticate = (req, res, next) => {
    if (!req.session || !req.session.user) {
        return res
            .status(401)
            .json({ message: "Acceso denegado. No autenticado." });
    }
    req.user = req.session.user;
    next();
};

const authorize = (roles) => {
    return (req, res, next) => {
        if (!req.user || !req.user.role) {
            return res.status(403).json({ message: "Acceso denegado." });
        }

        const userRole = req.user.role;
        if (roles.includes(userRole)) {
            next();
        } else {
            return res.status(403).json({ message: "Acceso denegado." });
        }
    };
};

module.exports = { authenticate, authorize };
