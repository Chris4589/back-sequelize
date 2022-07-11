const config = require('config');
const { DataTypes } = require('sequelize');

const utils = require('../utils/utils');

exports.AboutSchema =
    () => utils
        .connectDB()
        .define('about', {
            aboutId: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
                required: true
            },
            isActive: {
                type: DataTypes.BOOLEAN,
                required: true,
                default: config.get('localServer.defaultStatusAbout')
            },
            title: {
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
            tableName: 'about',
            timestamps: false
        });
