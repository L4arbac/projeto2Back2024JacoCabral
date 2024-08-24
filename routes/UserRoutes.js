
const express = require('express');
const router = express.Router();
const userController = require('../controller/UserController');

// Rotas para gestão da model usuário
router.post('/login', userController.login.bind(userController));
router.post('/users', userController.create.bind(userController));
router.put('/users/:id', userController.update.bind(userController));
router.get('/users', userController.list.bind(userController));
router.get('/users/:id', userController.getById.bind(userController));
router.delete('/users/:id', userController.delete.bind(userController));
router.delete('/deteleUser/:id', userController.delete.bind(userController));
router.put('/makeAdm/:id', userController.makeAdm.bind(userController));

module.exports = router;
