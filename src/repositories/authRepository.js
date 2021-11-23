const redis = require('../utils/redisUtil');

const EXPIRATION_TIME_SECONDS = 120; // 2 minutes

module.exports = {
    async saveToken(token, email) {
      return redis.setAsync(
            email,
            EXPIRATION_TIME_SECONDS,
            token
        );
    }
};
