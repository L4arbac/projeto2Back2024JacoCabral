const express = require('express');
const router = express.Router();
const userController = require('../controller/UserController');
const jwtController = require('../controller/JwtController');

// Define as rotas para o recurso `user`
router.post('/users', userController.create.bind(userController));
router.put('/users/:id', userController.update.bind(userController));
router.get('/users', userController.list.bind(userController));
router.get('/users/:id', userController.getById.bind(userController));
router.delete('/users/:id', userController.delete.bind(userController));

// Define as rotas para o recurso `jwt`
router.get('/jwt', jwtController.generateToken.bind(jwtController));
router.post('/jwt', jwtController.verifyToken.bind(jwtController));

module.exports = router;
