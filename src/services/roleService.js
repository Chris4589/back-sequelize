
const roleSchema = require('../models/Role');
const utils = require('../utils/utils');
exports.getRoles = async (_req, res, next) => {
    try {
        const roles = await roleSchema.roleModel().findAll();

        if (roles.length === 0) {
            utils.error(204, 'No se encontraron roles.');
        }
        res.status(200).json(roles);
    } catch (ex) {
        next(ex);
    }
}

exports.createRole = async (req, res, next) => {
    try {
        const findRole = await roleSchema.roleModel().findOne({
           where: {
               role: req.body.role
           }
        });
        if (findRole) {
            utils.error(400, 'Rol ya existente.');
        }
        const newRole = await roleSchema.roleModel().create(req.body);
        res.status(201).json(newRole);
    } catch(ex) {
        next(ex);
    }
}
