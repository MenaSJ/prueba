const express = require('express');
const router = express.Router(); // Crea una instancia del enrutador de Express

// importa el controlador de autenticacion que contiene la lógica para manejar el inicio de sesión
const authController = require('../controllers/authController');

// define la ruta raíz ("/") para este enrutador
router.route('/')
    .post(authController.handleLogin); // maneja las solicitudes POST enviadas a esta ruta con la función handleLogin

// exporta el enrutador para que pueda ser utilizado en otras partes de la aplicacion
module.exports = router;
