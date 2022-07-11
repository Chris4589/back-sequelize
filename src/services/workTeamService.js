
const schema = require('../models/WorkTeam');
const utils = require('../utils/utils');

exports.createWorkTeam = async (req, res, next) => {
    try {
        // TODO: sacar userId del token
        await utils
            .connectDB()
            .query('INSERT INTO workTeam (userId, fullName, photo, position, description) VALUES (?, ?, ?, ?, ?)', {
            replacements: [
                1,
                req.body.fullName,
                req.body.photo,
                req.body.position,
                req.body.description
            ]
        });
        res.status(201).json();
    } catch (e) {
        next(e);
    }
}

exports.ListWorkTeam = async (_req, res, next) => {
    try {
        const workList = await schema.WorkTeamSchema().findAll();

        if (workList.length === 0) {
            utils.error(204);
        }
        res.status(200).json(workList);
    } catch (e) {
        next(e);
    }
}

exports.DeleteWorkTeam = async (req, res, next) => {
    try {
        const exists = await schema.WorkTeamSchema().findByPk(req.query.groupId);

        if (!exists) {
            utils.error(204);
        }
        await schema.WorkTeamSchema().destroy({
            where: {
                groupId: exists.groupId
            }
        });
        res.status(201).json();
    } catch (e) {
        next(e);
    }
}

exports.UpdateWorkTeam = async (req, res, next) => {
    try {
        const exists = await schema.WorkTeamSchema().findByPk(req.query.groupId);

        if (!exists) {
            utils.error(204);
        }
        await schema.WorkTeamSchema().update({
                fullName: req.body.fullName,
                photo: req.body.photo,
                position: req.body.position,
                description: req.body.description,
            },
            {
            where: {
                groupId: exists.groupId
            }
        });
        res.status(201).json();
    } catch (e) {
        next(e);
    }
}
