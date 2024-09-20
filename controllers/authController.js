// Importa bcryptjs para el hashing de contraseñas
const bcrypt = require("bcryptjs");
const { createUser, findUserByEmail } = require("../models/user");

// Controlador para el registro de usuarios
exports.register = async (req, res) => {

     // Extrae los datos del cuerpo de la solicitud
    const { id_cedula, nombre, apellido, correo, telefono, rol, password, confirmPassword } = req.body;

    // Verifica que las contraseñas coincidan
    if (password !== confirmPassword) {

        // Si no coinciden, envía un mensaje de error y redirige al formulario de registro
        req.flash("error", "Las contraseñas no coinciden.");
        return res.redirect("/register");
    }

    // Hashea la contraseña utilizando bcryptjs
    const hashedPassword = await bcrypt.hash(password, 10);

    try {
        // Crea un nuevo usuario con los datos proporcionados y la contraseña hasheada
        await createUser({ id_cedula, nombre, apellido, correo, telefono, rol, contrasena: hashedPassword, activo: true });
        // Si el usuario se crea correctamente, envía un mensaje de éxito
        req.flash("success", "Usuario registrado.");
        // Redirige al login
        res.redirect("/login");
    } catch (err) {
        // Si hay un error durante el registro, envía un mensaje de error
        req.flash("error", "Error al registrar el usuario.");
        // Redirige de nuevo al formulario de registro
        res.redirect("/register");
    }
};

// Controlador para el inicio de sesión de usuarios
exports.login = async (req, res) => {
    // Extrae el correo y la contraseña del cuerpo de la solicitud
    const { correo, password } = req.body;

    try {
        // Busca al usuario por su correo
        const user = await findUserByEmail(correo);

        // Verifica que el usuario exista y que la contraseña sea correcta
        if (!user || !(await bcrypt.compare(password, user.contrasena))) {
            // Si el usuario no existe o la contraseña no coincide, envía un mensaje de error
            req.flash("error", "Correo o contraseña incorrecta.");
            // Redirige al formulario de inicio de sesión
            res.redirect("/login");
        } else {

            // Redirige al formulario de inicio de sesión

            req.session.loggedin = true;
            req.session.username = user.nombre;
            req.session.role = user.rol;

            // Redirige según el rol del usuario: si es administrador, lo envía a agregar productos
            if (user.rol === 'admin') {
                res.redirect("/agregar-producto");
            } else {
                // Si no es administrador, lo redirige a la página de ventas
                res.redirect("/ventas");
            }
        }
    } catch (err) {
        // Si hay un error durante el proceso, envía un mensaje de error
        req.flash("error", "Error en el servidor.");
        // Redirige al formulario de inicio de sesión
        res.redirect("/login");
    }
};

// Controlador para cerrar la sesión de un usuario
exports.logout = (req, res) => {
    // Destruye la sesión del usuario
    req.session.destroy((err) => {
        if (err) throw err;
        // Redirige a la página principal después de cerrar la sesión
        res.redirect("/");
    });
};
