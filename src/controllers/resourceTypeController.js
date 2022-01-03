const { ResourceType } = require('../models');
const { Op, fn } = require('sequelize');
module.exports = {
    async register(req, res) {
        const resourceTypeResponse = await ResourceType.create(req.body);
        res.json(resourceTypeResponse);
    },
    async findById(req, res) {
        const resourceType = await ResourceType.findOne({
            where: {
                id: req.params.id,
                deletedAt: {
                    [Op.is]: null
                }
            }
        });
        res.json(resourceType);
    },
    async findAll(req, res) {
        const resourceType = await ResourceType.findAll();
        //res.status(200).send(resourceType);
        res.json(resourceType);
    },
    async updateById(req, res) {
        const resourceType = await ResourceType.update(req.body, {
            where: {
                id: req.params.id
            }
        });
        res.json(resourceType);
    },
    //https://sequelize.org/master/manual/paranoid.html
    async deleteById(req, res) {
        const resourceType = await ResourceType.destroy({
            where: {
                id: req.params.id
            }
        });
        res.json(resourceType);
    }
};
