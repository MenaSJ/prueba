const { DataTypes } = require('sequelize');
const sequelize = require('../config/dbConnection');

const Usuario = sequelize.define('Usuario', {
    id: {
        type: DataTypes.INTEGER, // datatype
        primaryKey: true,
        autoIncrement: true,
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    correo: {
        type: DataTypes.STRING,
        unique: true, // Correo unico para evitar duplicados
        allowNull: false,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    refreshToken: {
        type: DataTypes.STRING, // Almacena el token de actualizacion jwt
        allowNull: true, // Puede ser nulo hasta que el usuario inicie sesión
    },
}, {
    tableName: 'Usuario', // Nombre explicito de la tabla
    timestamps: true, // Agrega columnas de creacio y update automaticamente
});

module.exports = Usuario;
