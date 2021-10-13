const authService = require('../services/authService');
const { User } = require('../models');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('../../config/auth');
const { Op, fn } = require('sequelize');
const tokenDOREDIS = 'a';

module.exports = {
    async authToken(req, res) {
        if ((req.body.token = tokenDOREDIS)) {
        }
    },
    async sendToken(req, res) {
        const token = authService.createToken();
        authService.sendTokenToEmail(token, req.body.email);
    },

    async login(req, res) {
        const { email, password } = req.body;

        const userExist = await User.findOne({
            where: {
                email: email,
                deletedAt: {
                    [Op.is]: null
                }
            }
        });

        if (!userExist) {
            return res.status(400).json({
                error: true,
                message: 'Usuário não existe!'
            });
        }

        if (!(await bcrypt.compare(password, userExist.password))) {
            return res.status(400).json({
                error: true,
                message: 'A senha está inválida!'
            });
        }

        return res.status(200).json({
            user: {
                name: userExist.name,
                email: userExist.email
            },
            token: jwt.sign({ id: userExist._id }, config.secret, {
                expiresIn: config.expireIn
            })
        });
    }
};
