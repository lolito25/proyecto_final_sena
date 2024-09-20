// Importamos el módulo mysql2/promise para crear conexiones a la base de datos
const mysql = require('mysql2/promise');

// Cargamos las variables de entorno desde el archivo .env
require('dotenv').config();

// Creamos un pool de conexiones utilizando las variables de entorno
const db = mysql.createPool({
    host: process.env.DB_HOST,       // Host de la base de datos
    user: process.env.DB_USER,       // Usuario de la base de datos
    password: process.env.DB_PASSWORD, // Contraseña del usuario de la base de datos
    database: process.env.DB_NAME    // Nombre de la base de datos
});

// Intentamos obtener una conexión del pool
db.getConnection()
    .then(connection => {
        console.log("Conectado a la base de datos"); // Mensaje de éxito si se conecta
        connection.release(); // Liberamos la conexión de vuelta al pool para ser reutilizada
    })
    .catch(err => {
        console.error("Error al conectar a la base de datos:", err); // Mensaje de error si falla la conexión
    });

// Exportamos el pool de conexiones para usarlo en otros módulos
module.exports = db;
