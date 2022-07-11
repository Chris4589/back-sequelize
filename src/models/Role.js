const config = require('config');
const { DataTypes } = require('sequelize');

const utils = require('../utils/utils');

exports.roleModel =
    () => utils
        .connectDB()
        .define('role', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            required: true
        },
        role: {
            type: DataTypes.STRING,
            required: true,
            default: config.get('localServer.roleDefault')
        }
    }, {
            tableName: 'role',
            timestamps: false
        });
