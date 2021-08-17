const authService = require('../controllers/authService');

module.exports = {
    async authToken(req, res) {},
    async sendToken(req, res) {
        const token = authService.createToken();
        authService.sendTokenToEmail(token, req.body.email);
    }
};
