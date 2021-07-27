const mysql = require('mysql');
const util = require('util');

function getConection() {
    console.log(process.env.DB_HOST);
    const connection = mysql.createPool({
        connectionLimit: 10,
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: 'cefetmg'
    });

    connection.query = util.promisify(connection.query).bind(connection);
    return connection;
}

module.exports = {
    getConection
};
