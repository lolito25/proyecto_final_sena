// Importa el modelo de ventas
const Sale = require('../models/salesModel');
// Importa el modelo de productos
const Product = require('../models/productModel');
// Importa la función de validación de express-validator
const { validationResult } = require('express-validator');

// Controlador para obtener todas las ventas
exports.getAllSales = async (req, res) => {
    try {
        // Obtiene todas las ventas
        const ventas = await Sale.getAll();
        // Obtiene todos los productos
        const productos = await Product.getAll(); // Obtener todos los productos
        // Renderiza la vista 'ventas' pasando ventas, productos y mensajes flash
        res.render('ventas', { ventas, productos, messages: req.flash() }); // Pasar productos a la vista
    } catch (err) {
        // En caso de error, se muestra un mensaje flash y se redirige a la página principal
        req.flash('error', 'Error al obtener las ventas');
        res.redirect('/');
    }
};

// Controlador para obtener una venta por su ID
exports.getSaleById = async (req, res) => {
    try {
        // Obtiene una venta por su ID
        const venta = await Sale.getById(req.params.id);
        // Renderiza la vista 'factura' pasando la venta y los mensajes flash
        res.render('factura', { venta, messages: req.flash() });
    } catch (err) {
        // En caso de error, se muestra un mensaje flash y se redirige a la lista de ventas
        req.flash('error', 'Error al obtener la venta');
        res.redirect('/ventas');
    }
};

// Controlador para crear una nueva venta
exports.createSale = async (req, res) => {
    // Verifica si hay errores de validación
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        // Si hay errores, muestra un mensaje flash y redirige a la lista de ventas
        req.flash('error', 'Datos inválidos');
        return res.redirect('/ventas');
    }

    // Extrae el producto_id y la cantidad del cuerpo de la solicitud
    const { producto_id, cantidad } = req.body;

    try {
        // Obtiene el producto por su ID
        const producto = await Product.getById(producto_id);
        // Verifica si hay suficiente stock disponible
        if (producto.stock < cantidad) {
            // Si no hay suficiente stock, muestra un mensaje flash y redirige
            req.flash('error', 'No hay suficiente stock');
            return res.redirect('/ventas');
        }

        // Calcula el total de la venta (precio * cantidad)
        const total = producto.precio * cantidad;
        // Actualiza el stock del producto restando la cantidad vendida
        await Product.update(producto_id, { ...producto, stock: producto.stock - cantidad });
        // Crea la venta con los datos proporcionados
        await Sale.create({ producto_id, cantidad, total });

        // Muestra un mensaje de éxito y redirige a la vista de la factura
        req.flash('success', 'Venta realizada exitosamente');
        res.redirect('/factura');
    } catch (err) {
        // En caso de error, muestra un mensaje flash y redirige a la lista de ventas
        req.flash('error', 'Error al realizar la venta');
        res.redirect('/ventas');
    }
};

// Controlador para obtener el historial de todas las ventas
exports.getAllSalesHistory = async (req, res) => {
    try {
        // Obtiene todas las ventas
        const ventas = await Sale.getAll();
        // Renderiza la vista 'historial-facturas' pasando las ventas y los mensajes flash
        res.render('historial-facturas', { ventas, messages: req.flash() });
    } catch (err) {
        // En caso de error, muestra un mensaje flash y redirige a la lista de ventas
        req.flash('error', 'Error al obtener el historial de facturas');
        res.redirect('/ventas');
    }
};

// Controlador para obtener la última venta realizada
exports.getLatestSale = async (req, res) => {
    try {
        // Obtiene la última venta registrada
        const venta = await Sale.getLatest();
        // Renderiza la vista 'factura' pasando la última venta y los mensajes flash
        res.render('factura', { venta, messages: req.flash() });
    } catch (err) {
        // En caso de error, muestra un mensaje flash y redirige a la lista de ventas
        req.flash('error', 'Error al obtener la última venta');
        res.redirect('/ventas');
    }
};
