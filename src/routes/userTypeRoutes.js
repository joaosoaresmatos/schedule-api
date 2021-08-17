const routes = require('express').Router()

const userTypeController = require('../controllers/userTypeController')

routes.post('/register', userTypeController.register);
module.exports = routes
