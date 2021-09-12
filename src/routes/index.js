const express = require('express');
const routes = express.Router();

const authRoutes = require('./authRoutes');
const departmentRoutes = require('./departmentRoutes');
const resourceRoutes = require('./resourceRoutes');
const resourceTypeRoutes = require('./resourceTypeRoutes');
const scheduleRoutes = require('./scheduleRoutes');
const userRoutes = require('./userRoutes');
const userTypeRoutes = require('./userTypeRoutes');

routes.use('/auth', authRoutes);
routes.use('/departments', departmentRoutes);
routes.use('/resources', resourceRoutes);
routes.use('/resourceTypes', resourceTypeRoutes);
routes.use('/schedules', scheduleRoutes);
routes.use('/users', userRoutes);
routes.use('/userTypes', userTypeRoutes);

module.exports = routes;
