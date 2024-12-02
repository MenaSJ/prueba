const express = require('express');
const router = express.Router();
const usuariosController = require('../controllers/usuariosController');
const verifyJWT = require('../middleware/verifyJWT')// importamos verifyJWT para seguridad de enpoint

router.route('/') //solo podras obtener usuario si estas verificado
    .get(verifyJWT, usuariosController.getUsuarios)

module.exports = router;
