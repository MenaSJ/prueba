const Usuario = require('../models/usuario');

const getUsuarios = async (req, res) => {
    try {
        const correo = req.query.correo; // obtener el correo del usuario desde el cuerpo de la solicitud
        // verificar que el cuerpo de la solicitud tenga el correo
        if (!correo) {
            return res.status(400).json({ error: 'El correo del usuario es requerido.' });
        }

        // Realizar la consulta para obtener el usuario con el correo proporcionado
        const usuario = await Usuario.findOne({
            where: {
                correo: correo // Buscar el usuario con el correo especifico
            },
            attributes: {
                exclude: ['password', 'refreshToken'] // Excluir los campos de password y refreshToken
            }
        });

        // Si no se encuentra el usuario
        if (!usuario) {
            return res.status(404).json({ message: 'Usuario no encontrado.' });
        }
        // Convertir el resultado a un formato JSON
        const usuarioData = usuario.toJSON();

        // responder con el usuario encontrado
        res.status(200).json(usuarioData);

    } catch (err) {
        console.error('Error del servidor:', err); // Para agarrar errores
        res.status(500).json({ error: 'Error al obtener el usuario. Inténtalo de nuevo más tarde.' });
    }
};

module.exports = {
    getUsuarios,
};
