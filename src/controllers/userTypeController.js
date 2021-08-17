const { UserType } = require('../models');

module.exports = {
    async findAll(req, res) {
        const userType = await UserType.findAll();
        res.json(userType);
    },
    async register(req, res) {
        console.log(req.body);
        const userType = await UserType.create(req.body);
        res.json(userType);
    }
};
