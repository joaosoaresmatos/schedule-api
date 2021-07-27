const routes = require('express').Router()

const departmentRoutes = require('./departamentRoutes');
const userRoutes = require('./userRoutes');

routes.use('/department', departmentRoutes);
routes.use('/user', userRoutes);

module.exports = routes;
