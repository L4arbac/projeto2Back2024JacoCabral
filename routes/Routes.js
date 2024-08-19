const express = require('express');
const router = express.Router();
const userController = require('../controller/UserController');
const start = require("../scripts/startScript")
const CafeController = require('../controller/CafeController')
const VendaController = require('../controller/VendaController');

//

// rotas para gestao da model usuario
router.post('/login', userController.login.bind(userController));
router.post('/users', userController.create.bind(userController));
router.put('/users/:id', userController.update.bind(userController));
router.get('/users', userController.list.bind(userController));
router.get('/users/:id', userController.getById.bind(userController));
router.delete('/users/:id', userController.delete.bind(userController));
router.delete('/deteleUser/:id', userController.delete.bind(userController));
router.put('/makeAdm/:id', userController.makeAdm.bind(userController));
router.get('/install', start.run.bind(start));

// rotas para gestao da model cofe
router.post('/cafe', CafeController.create);
router.get('/cafe', CafeController.getAll);
router.get('/cafe/:id', CafeController.getById);
router.put('/cafe/:id', CafeController.update);
router.delete('/cafe/:id', CafeController.delete);


// rotas para gestao da model cofe venda
router.post('/venda', VendaController.createVenda);
router.get('/venda', VendaController.listVendas);
router.get('/venda/:id', VendaController.getVendaById);
router.put('/venda/:id', VendaController.updateVenda);
router.delete('/venda/:id', VendaController.deleteVenda);

module.exports = router;
