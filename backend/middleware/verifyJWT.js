const jwt = require('jsonwebtoken');

// Middleware para verificar el jwt
const verifyJWT = (req, res, next) => {
    let token = null;

    // hay un authorization header ?
    const authHeader = req.headers.authorization || req.headers.Authorization;
    if (authHeader && authHeader.startsWith('Bearer ')) {
        token = authHeader.split(' ')[1]; // Obtiene el token de authorization
    }
    // Si no encuentra el token en Authorization, revisa las cookies
    if (!token && req.cookies && req.cookies.jwt) {
        token = req.cookies.jwt; // obtiene el token de las cookies
    }

    // Si no se encuentra el token responde con no autorizado
    if (!token) return res.sendStatus(401);
    // Verifica el token usando la clave secreta
    jwt.verify(
        token,
        process.env.ACCESS_TOKEN_SECRET, // Clave secreta para verificar el token
        (err, decoded) => { // Callback que maneja la verificacion
            if (err) return res.sendStatus(403); // Si hay un error de token invalido regresamos Prohibido
            next(); // seguirmos con el codigo, de lo contrario, nuestra aplicacion no recibiria ni mandaria respuestas
        }
    );
}

module.exports = verifyJWT; // Exporta el middleware para usarlo en otras partes de la aplicación
