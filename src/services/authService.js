const authRepository = require('../repositories/authRepository');
const emailService = require('../services/emailService');
const random = require('../utils/randomUtil');

const TOKEN_LENGTH = 6;

module.exports = {
    async sendVerificationToken(email) {
        const token = random.getRandomString(TOKEN_LENGTH, {
            isUpperCase: true
        });

       await authRepository.saveToken(token, email);
       await emailService.sendTokenToEmail(token, email)
    }
};
