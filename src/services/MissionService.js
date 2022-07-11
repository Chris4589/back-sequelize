const { MissionSchema } = require('../models/Mission');
const utils = require('../utils/utils');

exports.CreateMission = async (req, res, next) => {
    try {
        // TODO: Sacar user del token
        await utils
            .connectDB()
            .query(`INSERT INTO mission (description, isActive, userId) VALUES (?, ?, ?)`, {
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

exports.GetMissions = async (req, res, next) => {
    try {
        // TODO: Sacar user del token
        const missions = await MissionSchema().findAll();

        if (missions.length === 0) {
            utils.error(204);
        }

        res.status(200).json(missions);
    } catch (e) {
        next(e);
    }
}

exports.GetMissionsByActive = async (req, res, next) => {
    try {
        // TODO: Sacar user del token
        const missions = await MissionSchema().findAll({
            where: {
                isActive: true
            }
        });

        if (missions.length === 0) {
            utils.error(204);
        }

        res.status(200).json({ missions: missions[missions.length-1] });
    } catch (e) {
        next(e);
    }
}

exports.UpdateMission = async (req, res, next) => {
    try {
        // TODO: Sacar user del token
        const mission = await MissionSchema().findByPk(req.query.missionId);

        if (!mission) {
            utils.error(204);
        }

        await MissionSchema().update(req.body, {
            where: {
                missionId: mission.missionId
            }
        });

        res.status(201).json();
    } catch (e) {
        next(e);
    }
}

exports.DeleteMission = async (req, res, next) => {
    try {
        // TODO: Sacar user del token
        const mission = await MissionSchema().findByPk(req.query.missionId);

        if (!mission) {
            utils.error(204);
        }

        await MissionSchema().destroy({
            where: {
                missionId: mission.missionId
            }
        });

        res.status(201).json();
    } catch (e) {
        next(e);
    }
}
