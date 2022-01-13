const routes = require('express').Router();

const resourceTypeController = require('../controllers/resourceTypeController');

routes.post('/register', resourceTypeController.register);

routes.get('/', resourceTypeController.find);

routes.get('/find/:id', resourceTypeController.findById);

routes.patch('/update/:id', resourceTypeController.updateById);

routes.delete('/delete/:id', resourceTypeController.deleteById);

module.exports = routes;
