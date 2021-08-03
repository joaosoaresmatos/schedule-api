const routes = require('express').Router();

const userController = require('../controllers/userController');

routes.post('/register', userController.register);

routes.get('/find/:email', userController.findByEmail);

routes.get('/findall',userController.findAll);

routes.put('/update/:id', (req, res) => {
    res.json('Im in update');
});

routes.delete('/delete/:id', (req, res) => {
    res.json('Im in delete');
});

module.exports = routes;
