const Sale = require('../models/salesModel');
const Product = require('../models/productModel');
const { validationResult } = require('express-validator');

exports.getAllSales = async (req, res) => {
    try {
        const ventas = await Sale.getAll();
        const productos = await Product.getAll(); // Obtener todos los productos
        res.render('ventas', { ventas, productos, messages: req.flash() }); // Pasar productos a la vista
    } catch (err) {
        req.flash('error', 'Error al obtener las ventas');
        res.redirect('/');
    }
};

exports.getSaleById = async (req, res) => {
    try {
        const venta = await Sale.getById(req.params.id);
        res.render('factura', { venta, messages: req.flash() });
    } catch (err) {
        req.flash('error', 'Error al obtener la venta');
        res.redirect('/ventas');
    }
};

exports.createSale = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        req.flash('error', 'Datos inválidos');
        return res.redirect('/ventas');
    }

    const { producto_id, cantidad } = req.body;

    try {
        const producto = await Product.getById(producto_id);
        if (producto.stock < cantidad) {
            req.flash('error', 'No hay suficiente stock');
            return res.redirect('/ventas');
        }

        const total = producto.precio * cantidad;
        await Product.update(producto_id, { ...producto, stock: producto.stock - cantidad });
        await Sale.create({ producto_id, cantidad, total });

        req.flash('success', 'Venta realizada exitosamente');
        res.redirect('/factura');
    } catch (err) {
        req.flash('error', 'Error al realizar la venta');
        res.redirect('/ventas');
    }
};

exports.getAllSalesHistory = async (req, res) => {
    try {
        const ventas = await Sale.getAll();
        res.render('historial-facturas', { ventas, messages: req.flash() });
    } catch (err) {
        req.flash('error', 'Error al obtener el historial de facturas');
        res.redirect('/ventas');
    }
};

exports.getLatestSale = async (req, res) => {
    try {
        const venta = await Sale.getLatest();
        res.render('factura', { venta, messages: req.flash() });
    } catch (err) {
        req.flash('error', 'Error al obtener la última venta');
        res.redirect('/ventas');
    }
};
