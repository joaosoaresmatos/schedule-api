const { Department } = require('../models');

module.exports = {
    async findAll(req, res) {
        const department = await Department.findAll();
        res.json(department);
    },
    async register(req, res) {
        console.log(req.body);
        const userResponse = await Department.create(req.body);
        res.json(userResponse);
    }
};
