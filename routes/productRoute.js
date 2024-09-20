const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const { isAuthenticated, isAdmin } = require('../middlewares/authMiddleware'); // Asegúrate de que esta ruta sea correcta

router.get('/productos', isAuthenticated, productController.getAllProducts);
router.get('/editar-producto/:id', isAuthenticated, productController.getProductById);
router.get('/agregar-producto', isAuthenticated, isAdmin, productController.renderAddProductForm);
router.post('/agregar-producto', isAuthenticated, isAdmin, productController.createProduct);
router.post('/actualizar-producto/:id', isAuthenticated, isAdmin, productController.updateProduct);
router.post('/desactivar-producto/:id', isAuthenticated, isAdmin, productController.deactivateProduct);
router.get('/productosUsuario', isAuthenticated, productController.getAllProductsForUser);

module.exports = router;
