// Importa la configuración de la base de datos
const db = require('../config/db');

// Definición del modelo Product con diferentes métodos para interactuar con la base de datos
const Product = {
    // Método para obtener todos los productos de la base de datos
    getAll: async () => {
        const [rows] = await db.query('SELECT * FROM productos');
        return rows; // Retorna todas las filas (productos)
    },
    // Método para obtener un producto por su ID
    getById: async (id) => {
        const [rows] = await db.query('SELECT * FROM productos WHERE id_producto = ?', [id]);
        return rows[0]; // Retorna el primer resultado (producto)
    },
    // Método para crear un nuevo producto en la base de datos
    create: async (data) => {
        const { nombre, precio, stock, descripcion } = data;
        // Inserta un nuevo producto con los datos proporcionados
        await db.query('INSERT INTO productos (nombre, precio, stock, descripcion) VALUES (?, ?, ?, ?)', [nombre, precio, stock, descripcion]);
    },
    // Método para actualizar un producto existente en la base de datos
    update: async (id, data) => {
        const { nombre, precio, stock, descripcion, activo } = data;
        // Actualiza el producto con los datos proporcionados según su ID
        await db.query('UPDATE productos SET nombre = ?, precio = ?, stock = ?, descripcion = ?, activo = ? WHERE id_producto = ?', [nombre, precio, stock, descripcion, activo, id]);
    },
    // Método para desactivar un producto (marcarlo como inactivo)
    deactivate: async (id) => {
        // Actualiza el campo 'activo' a FALSE para desactivar el producto
        await db.query('UPDATE productos SET activo = FALSE WHERE id_producto = ?', [id]);
    }
};

// Exporta el modelo Product para usarlo en otros módulos
module.exports = Product;
