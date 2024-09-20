const db = require('../config/db');

const Product = {
    getAll: async () => {
        const [rows] = await db.query('SELECT * FROM productos');
        return rows;
    },
    getById: async (id) => {
        const [rows] = await db.query('SELECT * FROM productos WHERE id_producto = ?', [id]);
        return rows[0];
    },
    create: async (data) => {
        const { nombre, precio, stock, descripcion } = data;
        await db.query('INSERT INTO productos (nombre, precio, stock, descripcion) VALUES (?, ?, ?, ?)', [nombre, precio, stock, descripcion]);
    },
    update: async (id, data) => {
        const { nombre, precio, stock, descripcion, activo } = data;
        await db.query('UPDATE productos SET nombre = ?, precio = ?, stock = ?, descripcion = ?, activo = ? WHERE id_producto = ?', [nombre, precio, stock, descripcion, activo, id]);
    },
    deactivate: async (id) => {
        await db.query('UPDATE productos SET activo = FALSE WHERE id_producto = ?', [id]);
    }
};

module.exports = Product;
