const { Sequelize } = require('sequelize');

const config = require('config');
const jwt = require('jsonwebtoken');

exports.connectDB = () => {
    const sequelize = new Sequelize(
        config.get('database.db'),
        config.get('database.username'),
        config.get('database.password'),
        {
            host: config.get('database.host'),
            dialect: 'mysql',
            port: config.get('database.port'),
            ssl: config.get('database.useSSL')
        });
    sequelize
        .sync({ force: false })
        //.then((dd) => console.warn(dd))
        .catch((err) => console.warn(`ERRORRR: ${err.message}`));
    return sequelize;
};

exports.error = (status, message) => {
    let err = Error(message);
    switch (status) {
        case 204:
            err.status = 204;
            err.message = 'Sin contenido';
            break;
        case 401:
            err.status = 401;
            err.message = 'No autorizado';
            break;
        case 404:
            err.status = 404;
            err.message = 'Ruta no encontrada. :(';
            break;
        case 400:
            err.status = 400;
            err.message = 'Parametros mal ingresados';
            break;
        case 500:
            err.status = 500;
            err.message = 'Error server internal';
            break;
        default:
            err.status = 500;
            break;
    }
    if (message) {
        err.message = message;
    }
    throw err;
}

exports.errNotFound = () => {
    exports.error(404);
}

exports.hasErrors = (err, _req, res, _next) => {
    const status = err.status || 500;
    res.status(status).json({
        status,
        message: err.message
    });
}

exports.JoiValidate = (schema, property) => {
    return (req, _res, next) => {
        const { error } = schema.validate(req[property]);

        const valid = error == null;

        if (!valid) {
            const { details } = error;
            const message = details.map(i => i.message).join(',');

            next(exports.error(400, message));
        }
        next();
    };
};

exports.AuthVerify = (req, _res, next) =>{
    try {
        const { authorization: Authorization } = req.headers;

        if(
            !Authorization ||
            (Authorization.split(' ') < 2) ||
            (Authorization.split(' ')[0].toLowerCase() !== 'bearer')
        ) {
            next(exports.error(400, 'No hay token'));
        }

        const token = Authorization.split(' ')[1];
        const { userId } = jwt.verify(token, config.get('localServer.privateKeyJWT'));

        req.userId = userId;
        next();
    } catch (error) {
        next(error);
    }
};

exports.AuthSign = (userId) =>{
    return new Promise((resolve, reject)=>{
        const payload = {
            userId
        };

        jwt.sign(payload, config.get('localServer.privateKeyJWT'), {
            expiresIn: '24h'
        }, (err, token)=>{
            if(err){
                reject(err);
                return;
            }
            resolve(token);
        });
    });
};
