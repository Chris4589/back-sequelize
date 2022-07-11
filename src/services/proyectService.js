
const utils = require('../utils/utils');
const SchemaProyect = require('../models/Proyect');
const SchemaPhoto = require('../models/ProyectPhotos');

// TODO: FALTA HACER EL SAVE/DELETE/SELECT DEL DOCUMENTO

exports.createProyect = async (req, res, next) => {
    try {
        // TODO: userId del token
        const [ proyectId ] = await utils
            .connectDB()
            .query('INSERT INTO proyect (userId, name_proyect, video, description) VALUES (?, ?, ?, ?)', {
                replacements: [
                    req.userId,
                    req.body.name_proyect,
                    req.body.video,
                    req.body.description,
                ]
            });

        if (Object.prototype.hasOwnProperty.call(req.body, 'url') && req.body.url.length !== 0) {
            //falta hacer integracion a s3 y guardar ese url
            const photos = req.body.url.map((items) => utils
                    .connectDB()
                    .query('INSERT INTO photos (proyectId, url) VALUES (?, ?)', {
                        replacements: [
                            proyectId,
                            items,
                        ]
                    }));
            await Promise.all(photos);
        }
        res.status(201).json();
    } catch (e) {
        next(e);
    }
}

exports.getPosts = async (req, res, next) => {
    try {
        let { offset, limit } = req.query;

        offset = offset || 0;
        limit = limit || 10;

        const [ result ] = await utils
            .connectDB()
            .query('SELECT * FROM proyect LIMIT ? OFFSET ?', {
                replacements: [
                    parseInt(limit, 10),
                    parseInt(offset, 10)
                ]
            });


        if (result.length === 0) {
            utils.error(204);
        }

        const newResponse = result.map( async (item) => {
            const [ items ] = await utils
                .connectDB()
                .query('SELECT * FROM photos where proyectId = ? LIMIT 15', {
                    replacements: [
                        item.proyectId
                    ]
                });

            return {
                proyectId: item.proyectId,
                userId: item.userId,
                name_proyect: item.name_proyect,
                video: item.video,
                description: item.description,
                photos: items
            }
        });

        res.status(200).json(await Promise.all(newResponse));
    } catch(ex) {
        next(ex);
    }
}

exports.updateProyect = async (req, res, next) => {//probada
    try {
        const exists = await SchemaProyect.ProyectSchema().findByPk(req.query.proyectId);
        if (!exists) {
            utils.error(204);
        }
        await SchemaProyect.ProyectSchema().update({
            name_proyect: req.body.name_proyect,
            video: req.body.video,
            description: req.body.description
        }, {
            where: {
                proyectId: exists.proyectId
            }
        });
        res.status(201).json();
    } catch (e) {
        next(e);
    }
}

exports.deleteProyect = async (req, res, next) => {
    try {
        const exists = await SchemaProyect.ProyectSchema().findByPk(req.query.proyectId);
        if (!exists) {
            utils.error(204);
        }
        // TODO: obtener nombre de fotos y eliminar fotos del s3
        await SchemaPhoto.ProyectPhotosSchema().destroy({
            where: {
                proyectId: exists.proyectId
            }
        });
        await SchemaProyect.ProyectSchema().destroy({
            where: {
                proyectId: exists.proyectId
            }
        });
        res.status(201).json();
    } catch (e) {
        next(e);
    }
}

exports.deletePhoto = async (req, res, next) => {
    try {
        const exists = await SchemaPhoto.ProyectPhotosSchema().findByPk(req.query.photoId);
        if (!exists) {
            utils.error(204);
        }
        // TODO: obtener nombre de fotos y eliminar fotos del s3
        await SchemaPhoto.ProyectPhotosSchema().destroy({
            where: {
                photoId: exists.photoId
            }
        });
        res.status(201).json();
    } catch (e) {
        next(e);
    }
}
