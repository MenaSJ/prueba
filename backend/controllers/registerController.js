const Usuario = require('../models/usuario'); 
const bcrypt = require('bcrypt');

const handleNewUser = async (req, res) => {
    // datos del cuerpo de la solicitud
    const { nombre, correo, password } = req.body;

    try {
        // Hasheamos la contraseña utilizando bcrypt
        const hashedPassword = await bcrypt.hash(password, 10);

        // Creamos el usuario en la base de datos con los datos proporcionados
        const user = await Usuario.create({ 
            nombre, 
            correo, 
            password: hashedPassword // Guardamos la contraseña 
        });

        // enviamos una respuesta indicando que el usuario fue creado exitosamente
        res.status(201).json({ 
            message: 'Usuario registrado exitosamente', 
            user // Enviamos el usuario creado como parte de la respuesta
        });
    } catch (error) {
        // Mostramos en consola el mensaje de error
        console.log(error.message);

        // si ocurre un error de restriccion unica (por ejemplo el correo ya esta registrado)
        if (error.name === 'SequelizeUniqueConstraintError') {
            res.status(409).json({ 
                error: 'El correo ya está registrado. Por favor, usa otro.' 
            });
        } 
        // si ocurre un error de validacion de Sequelize (por ejemplo, campos obligatorios no proporcionados)
        else if (error.name === 'SequelizeValidationError') {
            res.status(400).json({ 
                error: error.errors.map(err => err.message) // Devolvemos los mensajes de error de validacion
            });
        } 
        // Para cualquier otro tipo de error no especificado
        else {
            res.status(500).json({ 
                error: 'Error al registrar el usuario. Inténtalo de nuevo más tarde.' 
            });
        }
    }
};

// exportamos la funcion para que pueda ser utilizada en otros modulos
module.exports = {
    handleNewUser
};
