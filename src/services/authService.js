const authRepository = require('../controllers/authRepository');
const random = require('../utils/randomUtil');

const TOKEN_LENGTH = 6;

module.exports = {
    async sendTokenToEmail(email) {
        const token = random.getRandomString(TOKEN_LENGTH, {
            isUpperCase: true
        });
        authRepository.sendEmail(token);
        authRepository.saveToken(token, email);
    }
};
