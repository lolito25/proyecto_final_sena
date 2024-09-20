// Importamos el módulo Express para manejar rutas
const express = require('express');
// Creamos una instancia del router de Express
const router = express.Router();

// Importamos el controlador de ventas
const salesController = require('../controllers/salesController');

// Importamos el middleware para verificar si el usuario está autenticado
const { isAuthenticated } = require('../middlewares/authMiddleware');

// Ruta para obtener todas las ventas (requiere autenticación)
router.get('/ventas', isAuthenticated, salesController.getAllSales);

// Ruta para obtener una venta específica por su ID (requiere autenticación)
router.get('/factura/:id', isAuthenticated, salesController.getSaleById);

// Ruta para crear una nueva venta (requiere autenticación)
router.post('/vender', isAuthenticated, salesController.createSale);

// Ruta para obtener la venta más reciente (requiere autenticación)
router.get('/factura', isAuthenticated, salesController.getLatestSale);

// Ruta para obtener el historial de todas las facturas (requiere autenticación)
router.get('/historial-facturas', isAuthenticated, salesController.getAllSalesHistory);

// Exportamos el router para ser utilizado en la aplicación
module.exports = router;
