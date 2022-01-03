const routes = require('express').Router();

const scheduleController = require('../controllers/scheduleController');

routes.get('/:resourceId/:date', scheduleController.getAvailable);

routes.get('/:userId', scheduleController.getByUserId);

routes.post('/register', scheduleController.register);

routes.patch('/update/:id', scheduleController.updateById);

routes.delete('/delete/:id', scheduleController.deleteById);

module.exports = routes;
