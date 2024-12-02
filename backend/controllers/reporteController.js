const axios = require('axios'); // Para solicitudes HTTP
const Usuario = require('../models/usuario');

const handleGeneratePDF = async (req, res) => {
    const { correo } = req.body; // Solo el correo es necesario para buscar al usuario

    // validar que el correo este presente
    if (!correo) {
        return res.status(400).json({ error: 'El correo es obligatorio.' });
    }

    try {
        // buscar el usuario por correo
        const usuario = await Usuario.findOne({
            where: { correo }, // Buscar por correo
            attributes: ['nombre', 'correo', 'estado', 'createdAt'], 
        });

        // Si el usuario no se encuentra
        if (!usuario) {
            return res.status(404).json({ error: 'Usuario no encontrado.' });
        }

        // preparar los datos a enviar al servicio PHP
        const { nombre, correo: usuarioCorreo, estado, createdAt } = usuario;

        // convertir la fecha a un formato adecuado
        const fechaCreacion = new Date(createdAt).toLocaleDateString('es-ES');

        const requestData = {
            nombre,
            correo: usuarioCorreo,
            estado,
            fechaCreacion,
        };
        
        // Hacer la solicitud POST al servicio PHP para generar el pdf
        const response = await axios.post('http://localhost:8000/reporte.php', requestData, {
            responseType: 'arraybuffer', // Asegura que la respuesta sea tratada como un buffer binario (PDF)
            headers: {
                'Content-Type': 'application/json',
            },
        });

        // configurar encabezados para enviar el pdf al cliente
        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', `attachment; filename=reporte_usuario_${nombre}.pdf`);
        res.send(response.data); // enviar los datos del PDF como respuesta
    } catch (error) {
        console.error('Error al generar el PDF:', error.message);
        res.status(500).json({ error: 'Error al generar el PDF. Por favor, intenta nuevamente.' });
    }
};

module.exports = {
    handleGeneratePDF,
};
