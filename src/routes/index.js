const routes = require('express').Router()

const departmentRoutes = require('./departmentRoutes');
const userRoutes = require('./userRoutes');
const userTypeRoutes = require('./userTypeRoutes');

routes.use('/department', departmentRoutes);
routes.use('/user', userRoutes);
routes.use('/userType', userTypeRoutes);

module.exports = routes;
