const { Resource } = require('../models');
const { Op, fn } = require('sequelize');
module.exports = {
    async register(req, res) {
        const resourceResponse = await Resource.create(req.body);
        res.json(resourceResponse);
    },
    async findById(req, res) {
        const resource = await Resource.findOne({
            where: {
                id: req.params.id,
                deletedAt: {
                    [Op.is]: null
                }
            }
        });
        res.json(resource);
    },
    async findByDepartmentId(req, res) {
        const resource = await Resource.findOne({
            where: {
                departmentId: req.params.departmentId,
                deletedAt: {
                    [Op.is]: null
                }
            }
        });
        res.json(resource);
    },
    async findByResourceTypeId(req, res) {
        const resource = await Resource.findOne({
            where: {
                resourceTypeId: req.params.resourceTypeId,
                deletedAt: {
                    [Op.is]: null
                }
            }
        });
        res.json(resource);
    },
    async findAll(req, res) {
        const resource = await Resource.findAll();
        //res.status(200).send(resource);
        res.json(resource);
    },
    async updateById(req, res) {
        const resource = await Resource.update(req.body, {
            where: {
                id: req.params.id
            }
        });
        res.json(resource);
    },
    //https://sequelize.org/master/manual/paranoid.html
    async deleteById(req, res) {
        const resource = await Resource.destroy({
            where: {
                id: req.params.id
            }
        });
        res.json(resource);
    }
};
