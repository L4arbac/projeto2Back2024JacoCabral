/**
 * @swagger
 * tags:
 *   - name: Instalação
 *     description: Operações relacionadas ao processo de instalação
 */

/**
 * @swagger
 * /install:
 *   get:
 *     tags: [Instalação]
 *     summary: Executa o script de instalação
 *     description: Executa o script de instalação do banco de dados e outras configurações iniciais.
 *     responses:
 *       200:
 *         description: Instalação concluída com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Instalação concluída com sucesso.
 *       500:
 *         description: Erro do servidor ao executar o script de instalação
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Erro ao executar o script de instalação.
 */

const express = require('express');
const router = express.Router();
const start = require("../scripts/startScript");

// Rota para executar o script de instalação
router.get('/install', start.run.bind(start));

module.exports = router;
