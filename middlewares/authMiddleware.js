exports.isAuthenticated = (req, res, next) => {
    if (req.session.loggedin) {
        return next();
    } else {
        req.flash("error", "Por favor, inicia sesión primero.");
        res.redirect("/login");
    }
};

exports.isAdmin = (req, res, next) => {
    if (req.session.role === "admin") {
        return next();
    } else {
        req.flash("error", "No tienes permisos para acceder a esta página.");
        res.redirect("/ventas");
    }
};
