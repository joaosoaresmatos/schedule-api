const { Schedule } = require('../models');
const { User } = require('../models');
const { Op, fn } = require('sequelize');
const yup = require('yup');

// User.hasMany(Schedule);
Schedule.belongsTo(User);

const isConflictSchedule = (start, end, schedule) => {
    let scheduleStart = new Date(schedule.start);
    let scheduleEnd = new Date(schedule.end);
    if (
        (scheduleStart < start && scheduleEnd < start) ||
        (scheduleStart > end && scheduleEnd > end)
    ) {
        return false;
    } else {
        return true;
    }
};

module.exports = {
    async register(req, res) {
        const schema = yup.object().shape({
            resourceId: yup.number().required(),
            userId: yup.number().required(),
            description: yup.string(),
            start: yup.date().required(),
            end: yup.date().required()
        });

        if (!(await schema.isValid(req.body))) {
            return res.status(400).json({
                error: true,
                message: 'Dados inválidos'
            });
        }

        const getAllSchedules = await Schedule.findAll({
            where: {
                resourceId: req.body.resourceId,
                start: {
                    [Op.gte]: req.body.start
                },
                deletedAt: {
                    [Op.is]: null
                }
            }
        });

        const { resourceId, userId, description, start, end } = req.body;
        const data = { resourceId, userId, start, end };
        if (description) {
            data.description = description;
        }
        data.start = new Date(start);
        data.end = new Date(end);

        if ((data.start < new Date()) | (data.start > data.end)) {
            return res.status(400).json({
                error: false,
                message: 'Data invalidas'
            });
        }

        let isConflict = false;
        for (i = 0; i < getAllSchedules.length; i++) {
            if (
                isConflictSchedule(
                    data.start,
                    data.end,
                    getAllSchedules[i].dataValues
                )
            ) {
                isConflict = true;
                break;
            }
        }
        if (isConflict) {
            return res.status(400).json({
                error: false,
                message: 'Recurso ja agendado na data solicitada'
            });
        }

        try {
            await Schedule.create(data);
            return res.status(200).json({
                error: false,
                message: 'Recurso agendado com sucesso'
            });
        } catch {
            return res.status(400).json({
                error: false,
                message: 'Informações invalidas'
            });
        }
    },
    async find(req, res) {
        const { id, resourceId, userId, start, end } = req.query;
        const where = {};
        if (id) {
            where.id = id;
        }
        if (resourceId) {
            where.resourceId = resourceId;
        }
        if (userId) {
            where.userId = userId;
        }
        if (start) {
            where.start = {
                [Op.gte]: start
            };
        }
        if (end) {
            where.end = {
                [Op.lte]: end
            };
        }
        console.log(where);
        const schedule = await Schedule.findAll({ include: User, where });
        //res.status(200).send(user);
        res.json(schedule);
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
    async findByUserId(req, res) {
        console.log('**************' + req.params);
        const schedule = await Schedule.findAll({
            where: {
                userId: req.params.userId,
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
