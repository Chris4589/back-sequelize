const { DataTypes } = require('sequelize');

const utils = require('../utils/utils');

exports.VisionSchema =
    () => utils
        .connectDB()
        .define('vision', {
            visionId: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
                required: true
            },
            isActive: {
                type: DataTypes.BOOLEAN,
                required: true,
                default: false
            },
            description: {
                type: DataTypes.STRING,
                required: true,
                unique: false
            }
        }, {
            tableName: 'vision',
            timestamps: false
        });
