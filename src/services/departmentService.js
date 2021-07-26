const departmentRepository = require('../repositories/departmentRepository');

module.exports = {
    async getAll() {
        return await departmentRepository.getAll()
    }
};
