const routes = require('express').Router();
//const AuthController = require('../app/controllers/AuthController')

const departmentController = require('../controllers/departmentController');

routes.post('/register', departmentController.register);

routes.get('/', departmentController.findAll);

routes.get('/find/:id', departmentController.findById);

routes.patch('/update/:id', departmentController.updateById);

routes.delete('/delete/:id', departmentController.deleteById);

module.exports = routes;
