
const { AboutSchema } = require('../models/About');
const utils = require('../utils/utils');
/*
* Necesita seguridad, devuelve 1 about creado
*/
exports.AboutPost = async (req, res, next) => {
    try {
        // TODO: Sacar user del token
        await utils
            .connectDB()
            .query('INSERT INTO about (userId, isActive, title, description) VALUES (?, ?, ?, ?) ', {
                replacements: [
                    req.userId,
                    req.body.isActive,
                    req.body.title,
                    req.body.description
                ]
            });

        res.status(201).json();
    } catch (e) {
        next(e);
    }
}
/*
* No necesita seguridad, devuelve 1 about activo
*/
exports.AboutGetBy = async (_req, res, next) => {
    try {
        const response = await AboutSchema().findOne({
            limit: 1,
            where: {
                isActive: true
            }
        });

        if (!response) {
            utils.error(204);
        }
        res.status(200).json(response);
    } catch (e) {
        next(e);
    }
}

/*
* Necesita seguridad, devuelve lista about
*/
exports.AboutList= async (_req, res, next) => {
    try {
        const response = await AboutSchema().findAll();

        if (response.length === 0) {
            utils.error(204);
        }
        res.status(200).json(response);
    } catch (e) {
        next(e);
    }
}

exports.UpdateAbout = async (req, res, next) => {
    try {
        const exists = await AboutSchema().findByPk(req.query.aboutId);

        if (!exists) {
            utils.error(204);
        }

        await AboutSchema().update({
            isActive: !exists.isActive
        },{

            where: {
                aboutId: exists.aboutId
            }
        });
        res.status(201).json();
    } catch (e) {
        next(e);
    }
}
