const { DataTypes } = require('sequelize');

const utils = require('../utils/utils');

exports.ProyectSchema =
    () => utils
        .connectDB()
        .define('proyect', {
            proyectId: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
                required: true
            },
            name_proyect: {
                type: DataTypes.STRING,
                required: true,
                unique: false
            },
            video: {
                type: DataTypes.STRING,
                required: true,
                unique: false
            },
            description: {
                type: DataTypes.STRING,
                required: true,
                unique: false
            }
        }, {
            tableName: 'proyect',
            timestamps: false
        });
