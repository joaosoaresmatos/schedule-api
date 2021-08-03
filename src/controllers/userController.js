const { User } = require('../models');

module.exports = {
    async register(req, res) {
        const user = await User.create(req.body);
        res.json(user);
    },
    async findByEmail(req, res) {
        const user = await User.findOne({ where: { email: req.params.email} });
        res.json(user);
    },
    async findAll(req, res) {
        const user = await User.findAll();
        res.json(user);
    }
};
