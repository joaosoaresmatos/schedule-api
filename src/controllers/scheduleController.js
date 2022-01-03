const { Schedule } = require('../models');
const { Op, fn } = require('sequelize');
module.exports = {
    async register(req, res) {
        const scheduleResponse = await Schedule.create(req.body);
        res.json(scheduleResponse);
    },
    async getAvailable(req, res) {
        const schedule = await Schedule.findOne({
            where: {
                email: req.params.email,
                deletedAt: {
                    [Op.is]: null
                }
            }
        });
        res.json(schedule);
    },
    async getByUserId(req, res) {
        const schedule = await Schedule.findOne({
            where: {
                email: req.params.email,
                deletedAt: {
                    [Op.is]: null
                }
            }
        });
        res.json(schedule);
    },
    async updateById(req, res) {
        const schedule = await Schedule.update(req.body, {
            where: {
                id: req.params.id
            }
        });
        res.json(schedule);
    },
    //https://sequelize.org/master/manual/paranoid.html
    async deleteById(req, res) {
        const schedule = await Schedule.destroy({
            where: {
                id: req.params.id
            }
        });
        res.json(schedule);
    }
};
