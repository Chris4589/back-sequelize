const bcrypt = require('bcrypt');
const SchemaUser = require('../models/User');
const utils = require('../utils/utils');

exports.Login = async (req, res, next) => {
    try {
        const { correo, password } = req.body;

        const result = await SchemaUser.userSchema().findOne({
            where: { correo },
            attributes: ['userId', 'correo', 'name', 'password' ]
        });

        if (!result) {
            utils.error(400, 'Contraseña o Usuario invalido.');
        }
        console.log(result.password);

        const validPw = bcrypt.compareSync(password, result.password);

        if (!validPw) {
            utils.error(400, 'Contraseña o Usuario invalido.');
        }

        const token = await utils.AuthSign(result.userId);
        result.token = token;
        res.status(201).json(result);
    } catch (error) {
        next(error);
    }
}
