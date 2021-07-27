const routes = require('express').Router();

const departmentController = require('../controllers/departmentController');

const { User } = require('../models');

routes.post('/register', async (req, res) => {
    const user = await User.create(req.body);
    res.json(user);
});

routes.get('/find/:id', (req, res) => {
    res.json('Im in register');
});

routes.get('/findall', async (req, res) => {
    const user = await User.findAll();
    res.json(user);
});

routes.put('/update/:id', (req, res) => {
    res.json('Im in update');
});

routes.delete('/delete/:id', (req, res) => {
    res.json('Im in delete');
});

module.exports = routes;
