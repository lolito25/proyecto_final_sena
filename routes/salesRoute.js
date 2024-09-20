const express = require('express');
const router = express.Router();
const salesController = require('../controllers/salesController');
const { isAuthenticated } = require('../middlewares/authMiddleware');

router.get('/ventas', isAuthenticated, salesController.getAllSales);
router.get('/factura/:id', isAuthenticated, salesController.getSaleById);
router.post('/vender', isAuthenticated, salesController.createSale);
router.get('/factura', isAuthenticated, salesController.getLatestSale);
router.get('/historial-facturas', isAuthenticated, salesController.getAllSalesHistory);

module.exports = router;
