// Carga las variables de entorno desde un archivo .env
require('dotenv').config();

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const sequelize = require('./config/dbConnection'); // Configuracion para la base de datos
const cookieParser = require('cookie-parser');

// Crea una instancia de la aplicación Express
const app = express();

// Configuracion de middlewares
const corsOptions = {
    origin: 'http://localhost:4200', // URL del frontend permitida
    credentials: true, // Permite el uso de cookies entre el cliente y el servidor
};

// Middleware para analizar solicitudes con cuerpo en formato JSON
app.use(bodyParser.json());

// Middleware de CORS para gestionar origenes permitidos
app.use(cors(corsOptions));

// Middleware para analizar datos JSON en solicitudes
app.use(express.json());

// Middleware para analizar cookies en solicitudes
app.use(cookieParser());

// Definicion de rutas principales
app.use('/register', require('./routes/register')); // Ruta para registro de usuarios
app.use('/logout', require('./routes/logout')); // Ruta para cerrar sesion
app.use('/auth', require('./routes/auth')); // Ruta para autenticacion
app.use('/reporte', require('./routes/reporte')); // Ruta para generar reportes en PDF
app.use('/usuarios', require('./routes/usuarios')); // Ruta para gestionar usuarios
app.use('/refresh', require('./routes/refresh')); // Ruta para refrescar tokens

// Define el puerto del servidor, con una opcion predeterminada
const PORT = process.env.PORT || 3000;

// Conectar a la base de datos y sincronizar tablas
sequelize
    .authenticate() // Verifica la conexion a la base de datos
    .then(() => {
        console.log('Conexion a PostgreSQL exitosa');
        // Sincroniza las tablas; usa force: true solo para desarrollo
        // return sequelize.sync({ force: true }); 
    })
    .then(() => {
        console.log('Tablas sincronizadas correctamente.');
        // Inicia el servidor Express
        app.listen(PORT, () => {
            console.log(`Servidor corriendo en http://localhost:${PORT}`);
        });
    })
    .catch((err) => {
        // Manejo de errores de conexion o sincronizacion
        console.error('Error al conectar o sincronizar la base de datos:', err);
    });
