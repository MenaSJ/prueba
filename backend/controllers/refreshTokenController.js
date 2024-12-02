const Usuario = require('../models/usuario');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const handleRefreshToken = async (req, res) => {
       // Obtiene las cookies de la solicitud
    const cookies = req.cookies;
    if (!cookies?.jwt) return res.sendStatus(401); // si no hay cookies, o jwt, mandamos no autorizado
    const refreshToken = cookies.jwt; //almacenamos la JWT

    try {
        // Busca al usuario usando el refreshToken en el campo correspondiente
        const foundUser = await Usuario.findOne({
            where: { refreshToken }
        });

        if (!foundUser) return res.sendStatus(404); // No encontro

        jwt.verify(
            refreshToken,
            process.env.REFRESH_TOKEN_SECRET,
            (err, decoded) => {
                if (err || foundUser.correo !== decoded.correo) return res.sendStatus(403); // prohibido / forbidden
                
                // Si el token es valido, genera un nuevo access token
                const accessToken = jwt.sign(
                    {
                        "UserInfo": {
                            "correo": decoded.correo // metemos el correo
                        }
                    },
                    process.env.ACCESS_TOKEN_SECRET,
                    { expiresIn: '1h' } // expira en 1 minuto
                );

                res.json({accessToken }); // devolvemos el accessToken
            }
        );
    } catch (error) {
        console.error('Error handling refresh token:', error);
        res.sendStatus(500); // Responde con 500 si ocurre un error en el proceso
    }
};

module.exports = { handleRefreshToken };
