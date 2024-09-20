const mysql = require('mysql2/promise');
require('dotenv').config();

const db = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

db.getConnection()
    .then(connection => {
        console.log("Conectado a la base de datos");
        connection.release(); // Liberar la conexión de vuelta al pool
    })
    .catch(err => {
        console.error("Error al conectar a la base de datos:", err);
    });

module.exports = db;
