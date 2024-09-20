// Importamos el módulo Express para manejar rutas
const express = require('express');
// Creamos una instancia del router de Express
const router = express.Router();

// Importamos el controlador de productos
const productController = require('../controllers/productController');

// Importamos los middlewares para verificar autenticación y autorización de administrador
const { isAuthenticated, isAdmin } = require('../middlewares/authMiddleware'); // Asegúrate de que esta ruta sea correcta

// Ruta para obtener todos los productos (requiere autenticación)
router.get('/productos', isAuthenticated, productController.getAllProducts);

// Ruta para obtener un producto específico por su ID (requiere autenticación)
router.get('/editar-producto/:id', isAuthenticated, productController.getProductById);

// Ruta para renderizar el formulario de agregar producto (requiere autenticación y ser administrador)
router.get('/agregar-producto', isAuthenticated, isAdmin, productController.renderAddProductForm);

// Ruta para agregar un nuevo producto (requiere autenticación y ser administrador)
router.post('/agregar-producto', isAuthenticated, isAdmin, productController.createProduct);

// Ruta para actualizar un producto existente por su ID (requiere autenticación y ser administrador)
router.post('/actualizar-producto/:id', isAuthenticated, isAdmin, productController.updateProduct);

// Ruta para desactivar un producto por su ID (requiere autenticación y ser administrador)
router.post('/desactivar-producto/:id', isAuthenticated, isAdmin, productController.deactivateProduct);

// Ruta para obtener todos los productos disponibles para el usuario (requiere autenticación)
router.get('/productosUsuario', isAuthenticated, productController.getAllProductsForUser);

// Exportamos el router para que pueda ser utilizado en la aplicación principal
module.exports = router;
