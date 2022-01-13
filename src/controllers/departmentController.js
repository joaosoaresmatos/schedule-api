const { Department } = require('../models');
const { Op, fn } = require('sequelize');
module.exports = {
    async register(req, res) {
        const departmentResponse = await Department.create(req.body);
        res.json(departmentResponse);
    },
    async findById(req, res) {
        const department = await Department.findOne({
            where: {
                id: req.params.id,
                deletedAt: {
                    [Op.is]: null
                }
            }
        });
        res.json(department);
    },
    async find(req, res) {
        const { id } = req.query;
        const where = {};
        if (id) {
            where.id = id;
        }
        const department = await Department.findAll({ where });
        //res.status(200).send(department);
        res.json(department);
    },
    async updateById(req, res) {
        const department = await Department.update(req.body, {
            where: {
                id: req.params.id
            }
        });
        res.json(department);
    },
    //https://sequelize.org/master/manual/paranoid.html
    async deleteById(req, res) {
        const department = await Department.destroy({
            where: {
                id: req.params.id
            }
        });
        res.json(department);
    }
};
