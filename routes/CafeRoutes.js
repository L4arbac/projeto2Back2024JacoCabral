
const express = require('express');
const router = express.Router();
const CafeController = require('../controller/CafeController')

// rotas para gestão da model café
router.post('/cafe', CafeController.create.bind(CafeController));
router.get('/cafe', CafeController.getAll.bind(CafeController));
router.get('/cafe/:id', CafeController.getById.bind(CafeController));
router.put('/cafe/:id', CafeController.update.bind(CafeController));
router.delete('/cafe/:id', CafeController.delete.bind(CafeController));


module.exports = router;
