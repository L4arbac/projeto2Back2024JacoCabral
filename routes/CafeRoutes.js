
const express = require('express');
const router = express.Router();
const CafeController = require('../controller/CafeController')

// rotas para gestão da model café
router.post('/cafe', CafeController.create);
router.get('/cafe', CafeController.getAll);
router.get('/cafe/:id', CafeController.getById);
router.put('/cafe/:id', CafeController.update);
router.delete('/cafe/:id', CafeController.delete);

module.exports = router;
