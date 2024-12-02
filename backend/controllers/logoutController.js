const Usuario = require('../models/usuario');

const handleLogout = async (req, res) => {
    // Obtiene las cookies de la solicitud
    const cookies = req.cookies;
    if (!cookies?.jwt) return res.sendStatus(204); // Si no hay cookie jwt, responde con 204 (sin contenido)

    const refreshToken = cookies.jwt; // Almacena el valor de la cookie jwt en una variable

    try {
        // Verifica si el refreshToken está presente en la base de datos
        const foundUser = await Usuario.findOne({ where: { refreshToken } });

        if (!foundUser) {
            // Si no se encuentra al usuario, elimina la cookie y responde con 204
            res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true, maxAge: 24 * 60 * 60 * 1000 });
            return res.sendStatus(204); // No content
        }

        // Elimina el refreshToken del usuario en la base de datos
        foundUser.refreshToken = '';
        await foundUser.save();

        // Elimina la cookie jwt en el cliente
        res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true });

        // Responde con 204 para indicar que el logout fue exitoso
        res.sendStatus(204); // No content
    } catch (error) {
        console.error('Error al cerrar sesión:', error);
        res.status(500).json({ error: 'Error al cerrar sesión. Inténtalo de nuevo más tarde.' });
    }
};

module.exports = { handleLogout };
