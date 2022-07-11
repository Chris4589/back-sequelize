const { DataTypes } = require('sequelize');

const utils = require('../utils/utils');

exports.PublishPhotoSchema =
    () => utils
        .connectDB()
        .define('publishPhotos', {
            publishPhotosId: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
                required: true
            },
            description: {
                type: DataTypes.STRING,
                required: true,
                unique: false
            }
        }, {
            tableName: 'publishPhotos',
            timestamps: false
        });
