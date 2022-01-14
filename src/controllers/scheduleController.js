const { Schedule } = require('../models');
const { User } = require('../models');
const { Op, fn } = require('sequelize');
const yup = require('yup');

// User.hasMany(Schedule);
Schedule.belongsTo(User);
const year = 2000;
const classHour = [
    {
        start: new Date(Date.UTC(year, 0, 0, 7, 0)),
        end: new Date(Date.UTC(year, 0, 0, 8, 40))
    },
    {
        start: new Date(Date.UTC(year, 0, 0, 8, 50)),
        end: new Date(Date.UTC(year, 0, 0, 10, 30))
    },
    {
        start: new Date(Date.UTC(year, 0, 0, 10, 40)),
        end: new Date(Date.UTC(year, 0, 0, 12, 20))
    },
    {
        start: new Date(Date.UTC(year, 0, 0, 13, 0)),
        end: new Date(Date.UTC(year, 0, 0, 14, 40))
    },
    {
        start: new Date(Date.UTC(year, 0, 0, 14, 50)),
        end: new Date(Date.UTC(year, 0, 0, 16, 30))
    },
    {
        start: new Date(Date.UTC(year, 0, 0, 16, 40)),
        end: new Date(Date.UTC(year, 0, 0, 18, 20))
    },
    {
        start: new Date(Date.UTC(year, 0, 0, 19, 0)),
        end: new Date(Date.UTC(year, 0, 0, 20, 40))
    },
    {
        start: new Date(Date.UTC(year, 0, 0, 20, 50)),
        end: new Date(Date.UTC(year, 0, 0, 22, 30))
    }
];

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

const isConflictScheduleTime = (start, end, schedule) => {
    const millisecondsPerDay = 24 * 3600 * 1000;
    let scheduleStart = new Date(schedule.start);
    let scheduleEnd = new Date(schedule.end);
    let scheduleStartTime = scheduleStart.getTime() % millisecondsPerDay;
    let scheduleEndTime = scheduleEnd.getTime() % millisecondsPerDay;
    let startTime = start.getTime() % millisecondsPerDay;
    let endTime = end.getTime() % millisecondsPerDay;
    console.log(scheduleStartTime);
    console.log(scheduleEndTime);
    console.log(startTime);
    console.log(endTime);
    if (scheduleStart.getDate() == scheduleEnd.getDate()) {
        console.log('Aqui 1');

        if (
            (scheduleStartTime < startTime && scheduleEndTime < startTime) ||
            (scheduleStartTime > endTime && scheduleEndTime > endTime)
        ) {
            console.log('Aqui');
            return false;
        }
        return true;
    }
    return true;
};

module.exports = {
    async register(req, res) {
        console.log(req.body);
        const schema = yup.object().shape({
            resourceId: yup.number().required(),
            userId: yup.number(),
            userEmail: yup.string().email(),
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

        const { resourceId, userId, userEmail, description, start, end } =
            req.body;
        const data = { resourceId, start, end };
        if (description) {
            data.description = description;
        }
        if (!userId && !userEmail) {
            return res.status(400).json({
                error: false,
                message:
                    'Id ou email do usuário são necessários para realizar um agendamento'
            });
        }
        if (userId) {
            data.userId = userId;
        } else {
            const userByEmail = await User.findOne({
                where: {
                    email: userEmail,
                    deletedAt: {
                        [Op.is]: null
                    }
                }
            });

            if (!userByEmail) {
                return res.status(400).json({
                    error: false,
                    message: 'Email não encontrado'
                });
            }
            data.userId = userByEmail.id;
        }

        data.start = new Date(start);
        data.end = new Date(end);
        console.log(data);
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
        console.log('**********data');
        console.log(data);
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
    async findAvailableIntervals(req, res) {
        console.log('******');
        console.log(req.body);
        const schema = yup.object().shape({
            resourceId: yup.number().required(),
            date: yup.date().required()
        });

        if (!(await schema.isValid(req.body))) {
            return res.status(400).json({
                error: true,
                message:
                    'Por favor informe a data e qual recurso para a consulta de horário disponível'
            });
        }
        const { resourceId, date } = req.body;
        const where = {};
        where.resourceId = resourceId;
        where.start = {
            [Op.gte]: date
        };

        try {
            const schedule = await Schedule.findAll({ where });

            let availableIntervals = classHour.filter((item) => {
                for (i = 0; i < schedule.length; i++) {
                    if (
                        isConflictScheduleTime(
                            item.start,
                            item.end,
                            schedule[i]
                        )
                    ) {
                        return false;
                    }
                }
                return true;
            });

            return res.status(200).json(availableIntervals);
        } catch {
            return res.status(400).json({
                error: false,
                message: 'Informações invalidas'
            });
        }

        //res.status(200).send(user);
        res.json(availableIntervals);
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
        const schedule = await Schedule.findAll({ include: User, where });
        //res.status(200).send(user);
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
