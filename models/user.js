// Importa la configuración de la base de datos (pool de conexiones)
const pool = require('../config/db');

// Función para crear un nuevo usuario en la base de datos
const createUser = async (user) => {
    // Desestructura los datos del usuario proporcionados
    const { id_cedula, nombre, apellido, correo, telefono, rol, contrasena, activo } = user;
    // Ejecuta la consulta SQL para insertar un nuevo usuario en la tabla 'users'
    const [result] = await pool.query(
        `INSERT INTO users (id_cedula, nombre, apellido, correo, telefono, rol, contrasena, activo) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
        [id_cedula, nombre, apellido, correo, telefono, rol, contrasena, activo]
    );
    return result; // Retorna el resultado de la consulta (generalmente información sobre la inserción)
};

// Función para buscar un usuario por su correo electrónico
const findUserByEmail = async (correo) => {
    // Ejecuta la consulta SQL para buscar un usuario en la tabla 'users' por su correo
    const [rows] = await pool.query(`SELECT * FROM users WHERE correo = ?`, [correo]);
    return rows[0]; // Retorna el primer resultado encontrado (si existe)
};

// Exporta las funciones 'createUser' y 'findUserByEmail' para usarlas en otros módulos
module.exports = { createUser, findUserByEmail };
