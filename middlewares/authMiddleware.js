// Middleware para verificar si el usuario está autenticado
exports.isAuthenticated = (req, res, next) => {
    // Verifica si la sesión tiene la propiedad 'loggedin'
    if (req.session.loggedin) {
        // Si está autenticado, continúa con la siguiente función
        return next();
    } else {
        // Si no está autenticado, muestra un mensaje de error y redirige al login
        req.flash("error", "Por favor, inicia sesión primero.");
        res.redirect("/login");
    }
};

// Middleware para verificar si el usuario tiene rol de administrador
exports.isAdmin = (req, res, next) => {
    // Verifica si el rol de la sesión es "admin"
    if (req.session.role === "admin") {
        // Si es administrador, continúa con la siguiente función
        return next();
    } else {
        // Si no es administrador, muestra un mensaje de error y redirige a la página de ventas
        req.flash("error", "No tienes permisos para acceder a esta página.");
        res.redirect("/ventas");
    }
};
