// Importa el modelo de Producto
const Product = require('../models/productModel');
// Importa la función para manejar los errores de validación
const { validationResult } = require('express-validator');

// Controlador para obtener todos los productos
exports.getAllProducts = async (req, res) => {
    try {
        // Obtiene todos los productos desde el modelo
        const productos = await Product.getAll();
        // Renderiza la vista "productos" pasando los productos y los mensajes flash
        res.render('productos', { productos, messages: req.flash() });
    } catch (err) {
        // En caso de error, se muestra un mensaje flash y redirige a la página principal
        req.flash('error', 'Error al obtener los productos');
        res.redirect('/');
    }
};

// Controlador para obtener un producto por su ID
exports.getProductById = async (req, res) => {
    try {
        // Obtiene el producto por ID utilizando el parámetro de la URL
        const producto = await Product.getById(req.params.id);
        // Renderiza la vista "editar-producto" pasando el producto y los mensajes flash
        res.render('editar-producto', { producto, messages: req.flash() });
    } catch (err) {
        // En caso de error, se muestra un mensaje flash y redirige a la lista de productos
        req.flash('error', 'Error al obtener el producto');
        res.redirect('/productos');
    }
};

// Controlador para mostrar el formulario de agregar un producto
exports.renderAddProductForm = (req, res) => {
    // Renderiza la vista "agregar-producto" y pasa los mensajes flash
    res.render('agregar-producto', { messages: req.flash() });
};

// Controlador para crear un nuevo producto
exports.createProduct = async (req, res) => {
    // Verifica si hay errores de validación
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        // Si hay errores, se muestra un mensaje flash y redirige a la lista de productos
        req.flash('error', 'Datos inválidos');
        return res.redirect('/productos');
    }

    try {
        // Crea un nuevo producto con los datos del cuerpo de la solicitud
        await Product.create(req.body);
        // Si se crea correctamente, muestra un mensaje flash de éxito y redirige a la lista de productos
        req.flash('success', 'Producto creado exitosamente');
        res.redirect('/productos');
    } catch (err) {
        // En caso de error, se muestra un mensaje flash y redirige a la lista de productos
        req.flash('error', 'Error al crear el producto');
        res.redirect('/productos');
    }
};

// Controlador para actualizar un producto existente
exports.updateProduct = async (req, res) => {
    // Verifica si hay errores de validación
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        // Si hay errores, muestra un mensaje flash y redirige al formulario de edición del producto
        req.flash('error', 'Datos inválidos');
        return res.redirect(`/editar-producto/${req.params.id}`);
    }

    try {
        // Actualiza el producto con el ID y los datos proporcionados en la solicitud
        await Product.update(req.params.id, req.body);
        // Si se actualiza correctamente, muestra un mensaje flash de éxito y redirige a la lista de productos
        req.flash('success', 'Producto actualizado exitosamente');
        res.redirect('/productos');
    } catch (err) {
        // En caso de error, se muestra un mensaje flash y redirige al formulario de edición del producto
        req.flash('error', 'Error al actualizar el producto');
        res.redirect(`/editar-producto/${req.params.id}`);
    }
};

// Controlador para desactivar un producto
exports.deactivateProduct = async (req, res) => {
    try {
        // Desactiva el producto con el ID proporcionado en la solicitud
        await Product.deactivate(req.params.id);
        // Si se desactiva correctamente, muestra un mensaje flash de éxito y redirige a la lista de productos
        req.flash('success', 'Producto desactivado exitosamente');
        res.redirect('/productos');
    } catch (err) {
        // En caso de error, se muestra un mensaje flash y redirige a la lista de productos
        req.flash('error', 'Error al desactivar el producto');
        res.redirect('/productos');
    }
};

// Controlador para obtener todos los productos visibles para el usuario
exports.getAllProductsForUser = async (req, res) => {
    try {
        // Obtiene todos los productos desde el modelo
        const productos = await Product.getAll();
        // Renderiza la vista "productosUsuario" pasando los productos y los mensajes flash
        res.render('productosUsuario', { productos, messages: req.flash() });
    } catch (err) {
        // En caso de error, se muestra un mensaje flash y redirige a la página principal
        req.flash('error', 'Error al obtener los productos');
        res.redirect('/');
    }
};
