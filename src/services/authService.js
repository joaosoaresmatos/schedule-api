const authRepository = require('../repositories/authRepository');
const emailService = require('../services/emailService');
const random = require('../utils/randomUtil');

const TOKEN_LENGTH = 6;

module.exports = {
    async sendVerificationToken(email) {
        const token = random.getRandomString(TOKEN_LENGTH, {
            isUpperCase: true
        });
        emailService.sendTokenToEmail(token, email)
        authRepository.saveToken(token, email);
    }
};
