const routes = require('express').Router();

const userController = require('../controllers/userController');

routes.post('/register', userController.register);

routes.get('/find/:email', userController.findByEmail);

routes.get('/findAll', userController.findAll);

routes.patch('/update/:id', userController.updateById);

routes.delete('/delete/:id', userController.deleteById);

module.exports = routes;
