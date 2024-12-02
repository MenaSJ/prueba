const Usuario = require('../models/usuario');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const handleLogin = async (req, res) => {
    const { correo, password } = req.body; // obtenemos los datos del body

    if (!correo || !password) { //correo y password son requeridos
        return res.status(400).json({ message: 'Correo y contraseña son requeridos.' });
    }

    try {
        // buscar usuario en la base de datos
        const user = await Usuario.findOne({ where: { correo } });
        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado.' }); // No encontrado
        }

        // comparar contraseñas
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Contraseña incorrecta.' }); // no autorizado
        }

        // crear tokens JWT
        const accessToken = jwt.sign(
            {
                UserInfo: {
                    correo: user.correo
                }
            },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: '1h' } // Token de acceso valido por 1 hora
        );

        const refreshToken = jwt.sign(
            { correo: user.correo },
            process.env.REFRESH_TOKEN_SECRET,
            { expiresIn: '1d' } // yoken de actualizacion valido por 1 día
        );

        // Guardar el refreshToken en la base de datos
        user.refreshToken = refreshToken;
        await user.save();

        // Crear una cookie segura con el refreshToken
        res.cookie('jwt', refreshToken, {
            httpOnly: true, // Solo accesible desde HTTP (no JavaScript)
            secure: true,   // Requiere HTTPS
            sameSite: 'None', // Compatible con varios dominios
            maxAge: 24 * 60 * 60 * 1000, // 1 dia
        });

        // Enviar token de acceso y correo del usuario si tuvo un inicio de sesion exitoso
        res.json({
            message: 'Inicio de sesión exitoso',
            accessToken,
            correo: user.correo
        });
    } catch (error) {
        console.error('Error en el inicio de sesión:', error);
        res.status(500).json({ error: 'Error al iniciar sesión. Inténtalo de nuevo más tarde.' });
    }
};

module.exports = {
    handleLogin,
};
