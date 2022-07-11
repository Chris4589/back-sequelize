const { DataTypes } = require('sequelize');

const utils = require('../utils/utils');

exports.PublicationSchema =
    () => utils
        .connectDB()
        .define('publication', {
            publicationId: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
                required: true
            },
            titleName: {
                type: DataTypes.STRING,
                required: true,
                default: false
            },
            description: {
                type: DataTypes.STRING,
                required: true,
                unique: false
            }
        }, {
            tableName: 'publication',
            timestamps: false
        });
