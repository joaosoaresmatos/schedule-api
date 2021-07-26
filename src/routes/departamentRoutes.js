const routes = require('express').Router()

const departmentController = require('../controllers/departmentController')
//const AuthController = require('../app/controllers/AuthController')

// Authentication routes
//routes.post('/signin', AuthController.store)

// User routes
// routes.post('/', UserController.store)
// routes.put('/:id', UserController.update)
routes.get('/', departmentController.getAll)
// routes.delete('/:id', UserController.destroy)

module.exports = routes
