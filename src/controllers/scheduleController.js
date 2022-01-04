const { Schedule } = require('../models');
const { Op, fn } = require('sequelize');
const { date } = require('yup/lib/locale');
module.exports = {
    async register(req, res) {
        const { resourceId, userId, description, start, end } = req.body;
        const data = { resourceId, userId, description };
        data.start = new Date(start);
        data.end = new Date(end);

        console.log(data);

        await Schedule.create(data);
        return res.status(200).json({
            error: false,
            message: 'Recurso agendado com sucesso'
        });
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
