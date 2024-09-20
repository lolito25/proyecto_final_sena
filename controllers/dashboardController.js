// Controlador para el dashboard de ventas
// Renderiza la vista "ventas" y pasa el nombre de usuario almacenado en la sesión
exports.dashboard = (req, res) => {
    res.render("ventas", { username: req.session.username });
};

// Controlador para el panel de administración
// Renderiza la vista "agregar-producto" y pasa el nombre de usuario almacenado en la sesión
exports.adminPanel = (req, res) => {
    res.render("agregar-producto", { username: req.session.username });
};
