const { DataTypes } = require('sequelize');

const utils = require('../utils/utils');

exports.ProyectPhotosSchema =
    () => utils
        .connectDB()
        .define('photos', {
            photoId: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
                required: true
            },
            url: {
                type: DataTypes.STRING,
                required: true,
                unique: false
            }
        }, {
            tableName: 'photos',
            timestamps: false
        });
