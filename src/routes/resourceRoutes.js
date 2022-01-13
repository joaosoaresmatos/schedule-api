const routes = require('express').Router();

const resourceController = require('../controllers/resourceController');

routes.get('/', resourceController.find);

routes.post('/register', resourceController.register);

routes.patch('/update/:id', resourceController.updateById);

routes.delete('/delete/:id', resourceController.deleteById);

module.exports = routes;
