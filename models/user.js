const pool = require('../config/db');

const createUser = async (user) => {
    const { id_cedula, nombre, apellido, correo, telefono, rol, contrasena, activo } = user;
    const [result] = await pool.query(
        `INSERT INTO users (id_cedula, nombre, apellido, correo, telefono, rol, contrasena, activo) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
        [id_cedula, nombre, apellido, correo, telefono, rol, contrasena, activo]
    );
    return result;
};

const findUserByEmail = async (correo) => {
    const [rows] = await pool.query(`SELECT * FROM users WHERE correo = ?`, [correo]);
    return rows[0];
};

module.exports = { createUser, findUserByEmail };
