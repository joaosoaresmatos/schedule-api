function getRandomString(length, { isUpperCase = false } = {}) {
    let randomChars =
        'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
        result += randomChars.charAt(
            Math.floor(Math.random() * randomChars.length)
        );
    }
    if (isUpperCase) {
        result = result.toUpperCase();
    }
    return result;
}

module.exports = { getRandomString };
