const routes = require('express').Router();

const scheduleController = require('../controllers/scheduleController');

//routes.get('/:resourceId, scheduleController.getAvailable);

routes.get('/', scheduleController.find);

routes.post(
    '/findAvailableIntervals',
    scheduleController.findAvailableIntervals
);

routes.post('/register', scheduleController.register);

routes.patch('/update/:id', scheduleController.updateById);

routes.delete('/delete/:id', scheduleController.deleteById);

module.exports = routes;
