const express = require('express');
const router = express.Router();
const reporteController = require('../controllers/reporteController');
const verifyJWT = require('../middleware/verifyJWT') // importamos verifyJWT para seguridad de enpoint

// Ruta para generar el pdf, ademas de incluir la verificacion por jwt
router.route('/').post(verifyJWT, reporteController.handleGeneratePDF);

module.exports = router;
