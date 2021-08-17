const routes = require('express').Router()

const departmentController = require('../controllers/departmentController')
//const AuthController = require('../app/controllers/AuthController')

// Authentication routes
//routes.post('/signin', AuthController.store)

// User routes
// routes.post('/', UserController.store)
// routes.put('/:id', UserController.update)
routes.get('/', departmentController.findAll)
// routes.delete('/:id', UserController.destroy)

routes.post('/register', departmentController.register);
module.exports = routes
