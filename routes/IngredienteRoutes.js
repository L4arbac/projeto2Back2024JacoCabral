const express = require('express');
const router = express.Router();
const IngredienteController = require('../controller/IngredienteController');

// rotas para gestão da model ingrediente
router.post('/ingrediente', IngredienteController.createIngrediente.bind(IngredienteController));
router.put('/ingrediente/:id', IngredienteController.updateIngrediente.bind(IngredienteController));
router.get('/ingrediente', IngredienteController.listIngredientes.bind(IngredienteController));
router.get('/ingrediente/:id', IngredienteController.getIngredienteById.bind(IngredienteController));
router.delete('/ingrediente/:id', IngredienteController.deleteIngrediente.bind(IngredienteController));


module.exports = router;
