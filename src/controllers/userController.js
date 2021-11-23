const { User } = require('../models');
const { Op, fn } = require('sequelize');
const bcrypt = require('bcryptjs');
const yup = require('yup');
module.exports = {
    async register(req, res) {
        /**
         * Validação através do YUP schema
         * Início
         */
        let schema = yup.object().shape({
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

        /**
         * Fim Validação através do YUP schema
         */

        /**
         * Validação no banco de dados
         * Verifica se o usuário existe
         */

        let userExist = await User.findOne({
            where: {
                email: req.body.email,
                deletedAt: {
                    [Op.is]: null
                }
            }
        });
        if (userExist) {
            return res.status(400).json({
                error: true,
                message: 'Este usuário já existe!'
            });
        }

        /**
         * Desestrutuação dos dados da requisição
         */
        const { name, email, password, userTypeId, departmentId } = req.body;

        /**
         * criação da constante data
         */

        const data = { name, email, password, userTypeId, departmentId };

        /**
         * Criptografar a senha
         */

        data.password = await bcrypt.hash(data.password, 8);

        /**
         * Inserção no banco de dados
         */

        await User.create(data);
        return res.status(200).json({
            error: false,
            message: 'Usuário Cadastrado com sucesso'
        });
        // const userResponse = await User.create(req.body);
        // res.status(200).json(userResponse);
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
        const user = await User.update(req.body, {
            where: {
                id: req.params.id
            }
        });
        res.json(user);
    },
    //https://sequelize.org/master/manual/paranoid.html
    async deleteById(req, res) {
        const user = await User.destroy({
            where: {
                id: req.params.id
            }
        });
        res.json(user);
    }
};
