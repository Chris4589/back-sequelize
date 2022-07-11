const { DataTypes } = require('sequelize');

const utils = require('../utils/utils');

exports.WorkTeamSchema =
    () => utils
        .connectDB()
        .define('workTeam', {
            groupId: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
                required: true
            },
            fullName: {
                type: DataTypes.STRING,
                required: true,
                unique: false
            },
            photo: {
                type: DataTypes.STRING,
                required: true,
                unique: false
            },
            position: {
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
            tableName: 'workTeam',
            timestamps: false
        });
