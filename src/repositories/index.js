const mysqlService = require('./src/database/mysqlService');
const mysqlConection = mysqlService.getConection();

const departmentRepository = require('./departmentRepository');

departmentRepository.getAll.bind(this, mysqlConection);

module.exports = {departmentRepository}
