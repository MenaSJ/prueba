const express = require('express');
const router = express.Router(); // Crea una instancia del enrutador de Express
const logoutController = require('../controllers/logoutController');

router.get('/', logoutController.handleLogout);// maneja las solicitudes get enviadas a esta ruta, mandamos la funcion handlelogout

module.exports = router; // export