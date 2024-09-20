// Importamos el módulo Express para manejar rutas
const express = require("express");
// Creamos una instancia del router de Express
const router = express.Router();

// Importamos middlewares para autenticación y autorización
const { isAuthenticated, isAdmin } = require("../middlewares/authMiddleware");
// Importamos el controlador para manejar las vistas del dashboard
const dashboardController = require("../controllers/dashboardController");

// Ruta para el dashboard de usuario autenticado
router.get("/dashboard", isAuthenticated, dashboardController.dashboard);

// Ruta para el panel de administración (requiere autenticación y ser administrador)
router.get("/dashboard/admin", isAuthenticated, isAdmin, dashboardController.adminPanel);

// Exportamos el router para ser utilizado en la aplicación
module.exports = router;
