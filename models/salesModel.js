const db = require('../config/db');

const Sale = {
    getAll: async () => {
        const [rows] = await db.query('SELECT * FROM ventas');
        return rows;
    },
    getById: async (id) => {
        const [rows] = await db.query('SELECT * FROM ventas WHERE id_venta = ?', [id]);
        return rows[0];
    },
    create: async (data) => {
        const { producto_id, cantidad, total } = data;
        await db.query('INSERT INTO ventas (producto_id, cantidad, total) VALUES (?, ?, ?)', [producto_id, cantidad, total]);
    },
    getLatest: async () => {
        const [rows] = await db.query('SELECT * FROM ventas ORDER BY fecha DESC LIMIT 1');
        return rows[0];
    }
};

module.exports = Sale;
