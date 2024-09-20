// Importa la configuración de la base de datos
const db = require('../config/db');

// Definición del modelo Sale con varios métodos para interactuar con la tabla de ventas en la base de datos
const Sale = {
    // Método para obtener todas las ventas
    getAll: async () => {
        const [rows] = await db.query('SELECT * FROM ventas');
        return rows; // Retorna todas las filas (ventas)
    },
    // Método para obtener una venta por su ID
    getById: async (id) => {
        const [rows] = await db.query('SELECT * FROM ventas WHERE id_venta = ?', [id]);
        return rows[0]; // Retorna la primera venta que coincide con el ID
    },
    // Método para crear una nueva venta
    create: async (data) => {
        const { producto_id, cantidad, total } = data;
        // Inserta una nueva venta en la base de datos con los datos proporcionados
        await db.query('INSERT INTO ventas (producto_id, cantidad, total) VALUES (?, ?, ?)', [producto_id, cantidad, total]);
    },
    // Método para obtener la venta más reciente
    getLatest: async () => {
        const [rows] = await db.query('SELECT * FROM ventas ORDER BY fecha DESC LIMIT 1');
        return rows[0]; // Retorna la venta más reciente, ordenada por la fecha en orden descendente
    }
};

// Exporta el modelo Sale para ser utilizado en otros módulos
module.exports = Sale;
