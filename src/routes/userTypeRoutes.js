const routes = require('express').Router();

const userTypeController = require('../controllers/userTypeController');

routes.post('/register', userTypeController.register);

routes.get('/', userTypeController.findAll);

routes.get('/find/:id', userTypeController.findById);

routes.patch('/update/:id', userTypeController.updateById);

routes.delete('/delete/:id', userTypeController.deleteById);

module.exports = routes;
