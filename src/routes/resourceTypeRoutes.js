const routes = require('express').Router();

const userController = require('../controllers/userController');

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - departmentId
 *         - userTypeId
 *         - name
 *         - email
 *         - password
 *       properties:
 *         id:
 *           type: int
 *           description: The auto-generated id of the user
 *         departmentId:
 *           type: int
 *           description: The id of department
 *         userTypeId:
 *           type: int
 *           description: The id of user type
 *         name:
 *           type: string
 *           description: The user name
 *         email:
 *           type: string
 *           description: The user email
 *         password:
 *           type: string
 *           description: The user password key
 *       example:
 *         id: 2
 *         name: João Soares de Matos Neto
 *         email: joaosoaresmatos28@gmail.com
 *         password: 123456
 *         departmentId: 1
 *         userTypeId: 1
 *         createdAt: 2021-08-14T17:27:12.000Z
 *         updatedAt: 2021-08-14T17:27:12.000Z
 *         deletedAt: null
 */
routes.get('/', userController.findAll);

routes.get('/find/:email', userController.findByEmail);

routes.post('/register', userController.register);

routes.patch('/update/:id', userController.updateById);

routes.delete('/delete/:id', userController.deleteById);

module.exports = routes;
