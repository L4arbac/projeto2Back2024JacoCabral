const express = require('express');
const router = express.Router();
const VendaController = require('../controller/VendaController');

// rotas para gestão da model venda
router.post('/venda', VendaController.createVenda.bind(VendaController));
router.get('/venda', VendaController.listVendas.bind(VendaController));
router.get('/venda/:id', VendaController.getVendaById.bind(VendaController));
router.put('/venda/:id', VendaController.updateVenda.bind(VendaController));
router.delete('/venda/:id', VendaController.deleteVenda.bind(VendaController));
router.get('/balanco', VendaController.balanco.bind(VendaController));
router.get('/rank', VendaController.RankCafe.bind(VendaController));
router.get('/ingredientesVenda/:id',VendaController.ingredientesVenda.bind(VendaController));


module.exports = router;
