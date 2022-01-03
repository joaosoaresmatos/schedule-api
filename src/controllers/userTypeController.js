const { UserType } = require('../models');
const { Op, fn } = require('sequelize');
module.exports = {
    async register(req, res) {
        const userTypeResponse = await UserType.create(req.body);
        res.json(userTypeResponse);
    },
    async findById(req, res) {
        const userType = await UserType.findOne({
            where: {
                id: req.params.id,
                deletedAt: {
                    [Op.is]: null
                }
            }
        });
        res.json(userType);
    },
    async findAll(req, res) {
        const userType = await UserType.findAll();
        //res.status(200).send(userType);
        res.json(userType);
    },
    async updateById(req, res) {
        const userType = await UserType.update(req.body, {
            where: {
                id: req.params.id
            }
        });
        res.json(userType);
    },
    //https://sequelize.org/master/manual/paranoid.html
    async deleteById(req, res) {
        const userType = await UserType.destroy({
            where: {
                id: req.params.id
            }
        });
        res.json(userType);
    }
};
