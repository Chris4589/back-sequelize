const { DataTypes } = require('sequelize');

const utils = require('../utils/utils');

exports.userSchema =
    () => utils
        .connectDB()
        .define('user', {
            userId: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
                required: true
            },
            correo: {
                type: DataTypes.STRING,
                required: true,
                unique: true
            },
            name: {
                type: DataTypes.STRING,
                required: true
            },
            password: {
                type: DataTypes.STRING,
                required: true
            },
            token: {
                type: DataTypes.STRING,
                required: true
            }
        }, {
            tableName: 'user',
            timestamps: false
        });
