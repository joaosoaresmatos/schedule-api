const routes = require('express').Router();

const shceduleController = require('../controllers/scheduleController');

routes.get('/:resourceId/:date', shceduleController.getAvaiable);

routes.get('/:userId', shceduleController.getByUserId);

routes.post('/register', shceduleController.register);

routes.patch('/update/:id', shceduleController.updateById);

routes.delete('/delete/:id', shceduleController.deleteById);

module.exports = routes;
