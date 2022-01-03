const { User } = require('../models');
const { Op, fn } = require('sequelize');
const bcrypt = require('bcryptjs');
const yup = require('yup');

const isUserRegistered = async (req) => {
    let userExist = await User.findOne({
        where: {
            email: req.body.email,
            deletedAt: {
                [Op.is]: null
            }
        }
    });
    if (userExist) {
        return true;
    }
};

module.exports = {
    async register(req, res) {
        const schema = yup.object().shape({
            name: yup.string().required(),
            email: yup.string().email().required(),
            password: yup.string().required(),
            departmentId: yup.number().required(),
            userTypeId: yup.number().required()
        });

        if (!(await schema.isValid(req.body))) {
            return res.status(400).json({
                error: true,
                message: 'Dados inválidos'
            });
        }

        if (await isUserRegistered(req)) {
            return res.status(400).json({
                error: true,
                message: 'Este usuário já existe!'
            });
        }

        const { name, email, password, userTypeId, departmentId } = req.body;
        const data = { name, email, password, userTypeId, departmentId };
        data.password = await bcrypt.hash(data.password, 8);

        await User.create(data);
        return res.status(200).json({
            error: false,
            message: 'Usuário Cadastrado com sucesso'
        });
    },

    async findByEmail(req, res) {
        const user = await User.findOne({
            where: {
                email: req.params.email,
                deletedAt: {
                    [Op.is]: null
                }
            }
        });
        res.json(user);
    },
    async findAll(req, res) {
        const user = await User.findAll();
        //res.status(200).send(user);
        res.json(user);
    },
    async updateById(req, res) {
        const schema = yup.object().shape({
            name: yup.string(),
            password: yup.string(),
            departmentId: yup.number(),
            userTypeId: yup.number()
        });

        if (!(await schema.isValid(req.body))) {
            return res.status(400).json({
                error: true,
                message: 'Dados inválidos'
            });
        }

        const user = await User.findOne({
            where: {
                id: req.params.id,
                deletedAt: {
                    [Op.is]: null
                }
            }
        });
        if (user == null) {
            return res.status(400).json({
                error: true,
                message: 'Usuário não encontrado'
            });
        }

        const { name, password, userTypeId, departmentId } = req.body;
        const data = {};
        if (name) {
            data.name = name;
        }
        if (userTypeId) {
            data.userTypeId;
        }
        if (departmentId) {
            data.departmentId;
        }
        if (password) {
            data.password = await bcrypt.hash(password, 8);
        }

        await User.update(data, {
            where: {
                id: req.params.id
            }
        });
        return res.status(200).json({
            error: false,
            message: 'Usuário Atualizado com sucesso'
        });
    },

    //https://sequelize.org/master/manual/paranoid.html
    async deleteById(req, res) {
        const user = await User.destroy({
            where: {
                id: req.params.id
            }
        });
        res.json(user);
    },
    async teste(req, res) {
        console.log('teste');
        res.json({});
    }
};
