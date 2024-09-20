// Importa el módulo express para crear rutas
const express = require("express");
// Crea un enrutador con express
const router = express.Router();
// Importa el controlador de autenticación
const authController = require("../controllers/authController");

// Ruta para la página de inicio
router.get("/", (req, res) => {
    res.render("index"); // Renderiza la vista 'index'
});

// Ruta para la página de login (GET)
router.get("/login", (req, res) => res.render("login")); // Renderiza la vista 'login'

// Ruta para el inicio de sesión (POST)
router.post("/login", authController.login); // Ejecuta el método 'login' del controlador de autenticación

// Ruta para la página de registro (GET)
router.get("/register", (req, res) => res.render("register")); // Renderiza la vista 'register'

// Ruta para registrar un nuevo usuario (POST)
router.post("/register", authController.register); // Ejecuta el método 'register' del controlador de autenticación

// Ruta para cerrar sesión (GET)
router.get("/logout", authController.logout); // Ejecuta el método 'logout' del controlador de autenticación

// Exporta el enrutador para usarlo en la aplicación principal
module.exports = router;
