const express = require('express');
const router = express.Router();
const userController = require('../controller/UserController');

//

// rotas para o usuario
router.post('/login', userController.login.bind(userController));
router.post('/users', userController.create.bind(userController));
router.put('/users/:id', userController.update.bind(userController));
router.get('/users', userController.list.bind(userController));
router.get('/users/:id', userController.getById.bind(userController));
router.delete('/users/:id', userController.delete.bind(userController));


module.exports = router;
