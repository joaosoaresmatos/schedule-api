const { User } = require('../models');
const { Op, fn } = require('sequelize');
module.exports = {
    async register(req, res) {
        const userResponse = await User.create(req.body);
        res.json(userResponse);
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
