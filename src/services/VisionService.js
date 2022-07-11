const { VisionSchema } = require('../models/Vision');
const utils = require('../utils/utils');

exports.CreateVision = async (req, res, next) => {
    try {
        // TODO: Sacar user del token
        await utils
            .connectDB()
            .query(`INSERT INTO vision (description, isActive, userId) VALUES (?, ?, ?)`, {
                replacements: [
                    req.body.description,
                    req.body.isActive,
                    req.userId
                ]
            });
        res.status(201).json();
    } catch (e) {
        next(e);
    }
}

exports.GetVisions = async (req, res, next) => {
    try {
        // TODO: Sacar user del token
        const visions = await VisionSchema().findAll();

        if (visions.length === 0) {
            utils.error(204);
        }

        res.status(200).json(visions);
    } catch (e) {
        next(e);
    }
}

exports.GetVisionsByActive = async (req, res, next) => {
    try {
        // TODO: Sacar user del token
        const visions = await VisionSchema().findAll({
            where: {
                isActive: true
            }
        });

        if (visions.length === 0) {
            utils.error(204);
        }

        res.status(200).json({ visions: visions[visions.length-1] });
    } catch (e) {
        next(e);
    }
}

exports.UpdateVision = async (req, res, next) => {
    try {
        // TODO: Sacar user del token
        const vision = await VisionSchema().findByPk(req.query.visionId);

        if (!vision) {
            utils.error(204);
        }

        await VisionSchema().update(req.body, {
            where: {
                visionId: vision.visionId
            }
        });

        res.status(201).json();
    } catch (e) {
        next(e);
    }
}

exports.DeleteVision = async (req, res, next) => {
    try {
        // TODO: Sacar user del token
        const vision = await VisionSchema().findByPk(req.query.visionId);

        if (!vision) {
            utils.error(204);
        }

        await VisionSchema().destroy({
            where: {
                visionId: vision.visionId
            }
        });

        res.status(201).json();
    } catch (e) {
        next(e);
    }
}
