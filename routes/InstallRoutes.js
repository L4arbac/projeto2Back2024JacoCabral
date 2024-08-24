
const express = require('express');
const router = express.Router();
const start = require("../scripts/startScript");

// Rota para executar o script de instalação
router.get('/install', start.run.bind(start));

module.exports = router;
