const bcrypt = require("bcryptjs");
const { createUser, findUserByEmail } = require("../models/user");

exports.register = async (req, res) => {
    const { id_cedula, nombre, apellido, correo, telefono, rol, password, confirmPassword } = req.body;
    if (password !== confirmPassword) {
        req.flash("error", "Las contraseñas no coinciden.");
        return res.redirect("/register");
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    try {
        await createUser({ id_cedula, nombre, apellido, correo, telefono, rol, contrasena: hashedPassword, activo: true });
        req.flash("success", "Usuario registrado.");
        res.redirect("/login");
    } catch (err) {
        req.flash("error", "Error al registrar el usuario.");
        res.redirect("/register");
    }
};

exports.login = async (req, res) => {
    const { correo, password } = req.body;
    try {
        const user = await findUserByEmail(correo);
        if (!user || !(await bcrypt.compare(password, user.contrasena))) {
            req.flash("error", "Correo o contraseña incorrecta.");
            res.redirect("/login");
        } else {
            req.session.loggedin = true;
            req.session.username = user.nombre;
            req.session.role = user.rol;
            if (user.rol === 'admin') {
                res.redirect("/agregar-producto");
            } else {
                res.redirect("/ventas");
            }
        }
    } catch (err) {
        req.flash("error", "Error en el servidor.");
        res.redirect("/login");
    }
};

exports.logout = (req, res) => {
    req.session.destroy((err) => {
        if (err) throw err;
        res.redirect("/");
    });
};
