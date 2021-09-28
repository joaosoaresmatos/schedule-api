const redis = require('redis');
const client = redis.createClient();

const { promisify } = require('util');
const getAsync = promisify(client.get).bind(client);
const setAsync = promisify(client.setex).bind(client);

// test of connection with redis.

// async function testRedis() {
//     await setAsync('chaveTeste', 10, 'valorTeste');

//     const success = await getAsync('chaveTeste');
//     console.log(success);
// }
// testRedis();

module.exports = {
    getAsync,
    setAsync
};
