const bcrypt = require('bcrypt');
const userSchema = require('../models/User');
const roleSchema = require('../models/Role');
const utils = require('../utils/utils');

exports.getUsers = async (_req, res, next) => {
    try {
        const roles = await userSchema.userSchema().findAll({
            attributes: ['userId', 'correo', 'name' ]
        });

        if (roles.length === 0) {
            utils.error(204, 'No se encontraron roles.');
        }
        res.status(200).json(roles);
    } catch (ex) {
        next(ex);
    }
}

exports.createUser = async (req, res, next) => {
    try {
        const { roleId, ...rest } = req.body;
        const findRole = await roleSchema.roleModel().findByPk(roleId);
        const findUser = await userSchema.userSchema().findOne({
            where: {
                correo: req.body.correo
            }
        });
        if (!findRole) {
            utils.error(400, 'No existe el Rol.');
        }
        if (findUser) {
            utils.error(400, 'Usuario ya existente.');
        }
        const salt = bcrypt.genSaltSync();
        const newUser = rest;
        newUser.password = bcrypt.hashSync(rest.password, salt);
        newUser.token = bcrypt.hashSync(
            `${rest.correo}+${new Date()}+${rest.name}`, salt
        );
        const a = await utils.connectDB().query('INSERT INTO user (roleId, correo, name, password, token) VALUES (?, ?, ?, ?, ?)', {
           replacements: [
               findRole.id,
               newUser.correo,
               newUser.name,
               newUser.password,
               newUser.token
           ]
        });
        res.status(201).json(a);
    } catch(ex) {
        next(ex);
    }
}
