const routes = require('express').Router();

const resourceController = require('../controllers/resourceController');

routes.post('/register', resourceController.register);

routes.get('/', resourceController.findAll);

routes.get('/find/:id', resourceController.findById);

routes.patch('/update/:id', resourceController.updateById);

routes.delete('/delete/:id', resourceController.deleteById);

module.exports = routes;
