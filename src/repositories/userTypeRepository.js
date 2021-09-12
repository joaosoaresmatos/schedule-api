const redis = require('../utils/redisUtil');

const EXPIRATION_TIME_SECONDS = 120; // 2 minutes

module.exports = {
    async saveToken(token, email) {
        const success = await redis.setAsync(
            email,
            EXPIRATION_TIME_SECONDS,
            token
        );
        return success;
    }
};
