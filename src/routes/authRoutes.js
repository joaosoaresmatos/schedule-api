const routes = require('express').Router();

const authController = require('../controllers/authController');

routes.post('/sendToken', authController.sendToken);

routes.post('/authToken', authController.authToken);

module.exports = routes;
