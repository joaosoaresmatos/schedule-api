const routes = require('express').Router()

const departmentRoutes = require('./departamentRoutes');

routes.use('/department', departmentRoutes);

module.exports = routes;
