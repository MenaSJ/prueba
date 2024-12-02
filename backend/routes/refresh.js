const express = require('express');
const router = express.Router(); // Crea una instancia del enrutador de Express
const refreshTokenController = require('../controllers/refreshTokenController');

router.get('/', refreshTokenController.handleRefreshToken);// maneja las solicitudes get enviadas a esta ruta, mandamos la funcion handlerefreshTOken

module.exports = router;