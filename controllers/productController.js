const Product = require('../models/productModel');
const { validationResult } = require('express-validator');

exports.getAllProducts = async (req, res) => {
    try {
        const productos = await Product.getAll();
        res.render('productos', { productos, messages: req.flash() });
    } catch (err) {
        req.flash('error', 'Error al obtener los productos');
        res.redirect('/');
    }
};

exports.getProductById = async (req, res) => {
    try {
        const producto = await Product.getById(req.params.id);
        res.render('editar-producto', { producto, messages: req.flash() });
    } catch (err) {
        req.flash('error', 'Error al obtener el producto');
        res.redirect('/productos');
    }
};

exports.renderAddProductForm = (req, res) => {
    res.render('agregar-producto', { messages: req.flash() });
};

exports.createProduct = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        req.flash('error', 'Datos inválidos');
        return res.redirect('/productos');
    }

    try {
        await Product.create(req.body);
        req.flash('success', 'Producto creado exitosamente');
        res.redirect('/productos');
    } catch (err) {
        req.flash('error', 'Error al crear el producto');
        res.redirect('/productos');
    }
};

exports.updateProduct = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        req.flash('error', 'Datos inválidos');
        return res.redirect(`/editar-producto/${req.params.id}`);
    }

    try {
        await Product.update(req.params.id, req.body);
        req.flash('success', 'Producto actualizado exitosamente');
        res.redirect('/productos');
    } catch (err) {
        req.flash('error', 'Error al actualizar el producto');
        res.redirect(`/editar-producto/${req.params.id}`);
    }
};

exports.deactivateProduct = async (req, res) => {
    try {
        await Product.deactivate(req.params.id);
        req.flash('success', 'Producto desactivado exitosamente');
        res.redirect('/productos');
    } catch (err) {
        req.flash('error', 'Error al desactivar el producto');
        res.redirect('/productos');
    }
};

exports.getAllProductsForUser = async (req, res) => {
    try {
        const productos = await Product.getAll();
        res.render('productosUsuario', { productos, messages: req.flash() });
    } catch (err) {
        req.flash('error', 'Error al obtener los productos');
        res.redirect('/');
    }
};