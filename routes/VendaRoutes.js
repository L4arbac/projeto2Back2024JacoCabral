/**
 * @swagger
 * tags:
 *   - name: Vendas
 *     description: Operações relacionadas às vendas
 */

/**
 * @swagger
 * /venda:
 *   post:
 *     tags: [Vendas]
 *     summary: Cria uma nova venda
 *     description: Adiciona uma nova venda ao banco de dados.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: integer
 *                 example: 1
 *               cafeIds:
 *                 type: array
 *                 items:
 *                   type: integer
 *                   example: [1, 2]
 *               quantidade:
 *                 type: integer
 *                 example: 2
 *               total:
 *                 type: number
 *                 format: float
 *                 example: 12.50
 *     responses:
 *       201:
 *         description: Venda criada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   example: 1
 *                 userId:
 *                   type: integer
 *                   example: 1
 *                 cafeIds:
 *                   type: array
 *                   items:
 *                     type: integer
 *                     example: [1, 2]
 *                 quantidade:
 *                   type: integer
 *                   example: 2
 *                 total:
 *                   type: number
 *                   format: float
 *                   example: 12.50
 *       400:
 *         description: Erro de solicitação
 *       500:
 *         description: Erro do servidor
 */

/**
 * @swagger
 * /venda:
 *   get:
 *     tags: [Vendas]
 *     summary: Lista todas as vendas
 *     description: Retorna uma lista de todas as vendas registradas.
 *     parameters:
 *       - name: limite
 *         in: query
 *         description: Número de registros a serem retornados (5, 10 ou 30).
 *         required: false
 *         schema:
 *           type: integer
 *           example: 10
 *       - name: pagina
 *         in: query
 *         description: Página de resultados a serem retornados.
 *         required: false
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: Lista de vendas
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     example: 1
 *                   userId:
 *                     type: integer
 *                     example: 1
 *                   cafeIds:
 *                     type: array
 *                     items:
 *                       type: integer
 *                       example: [1, 2]
 *                   quantidade:
 *                     type: integer
 *                     example: 2
 *                   total:
 *                     type: number
 *                     format: float
 *                     example: 12.50
 *       400:
 *         description: Erro de solicitação
 *       500:
 *         description: Erro do servidor
 */

/**
 * @swagger
 * /venda/{id}:
 *   get:
 *     tags: [Vendas]
 *     summary: Obtém uma venda por ID
 *     description: Retorna os detalhes de uma venda específica.
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID da venda que será retornada.
 *         required: true
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: Detalhes da venda
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   example: 1
 *                 userId:
 *                   type: integer
 *                   example: 1
 *                 cafeIds:
 *                   type: array
 *                   items:
 *                     type: integer
 *                     example: [1, 2]
 *                 quantidade:
 *                   type: integer
 *                   example: 2
 *                 total:
 *                   type: number
 *                   format: float
 *                   example: 12.50
 *       404:
 *         description: Venda não encontrada
 *       500:
 *         description: Erro do servidor
 */

/**
 * @swagger
 * /venda/{id}:
 *   put:
 *     tags: [Vendas]
 *     summary: Atualiza uma venda existente
 *     description: Atualiza os detalhes de uma venda existente.
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID da venda que será atualizada.
 *         required: true
 *         schema:
 *           type: integer
 *           example: 1
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: integer
 *                 example: 1
 *               cafeIds:
 *                 type: array
 *                 items:
 *                   type: integer
 *                   example: [1, 2]
 *               quantidade:
 *                 type: integer
 *                 example: 2
 *               total:
 *                 type: number
 *                 format: float
 *                 example: 12.50
 *     responses:
 *       200:
 *         description: Venda atualizada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   example: 1
 *                 userId:
 *                   type: integer
 *                   example: 1
 *                 cafeIds:
 *                   type: array
 *                   items:
 *                     type: integer
 *                     example: [1, 2]
 *                 quantidade:
 *                   type: integer
 *                   example: 2
 *                 total:
 *                   type: number
 *                   format: float
 *                   example: 12.50
 *       400:
 *         description: Erro de solicitação
 *       404:
 *         description: Venda não encontrada
 *       500:
 *         description: Erro do servidor
 */

/**
 * @swagger
 * /venda/{id}:
 *   delete:
 *     tags: [Vendas]
 *     summary: Remove uma venda
 *     description: Remove uma venda existente do banco de dados.
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID da venda que será removida.
 *         required: true
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: Venda removida com sucesso
 *       404:
 *         description: Venda não encontrada
 *       500:
 *         description: Erro do servidor
 */

const express = require('express');
const router = express.Router();
const VendaController = require('../controller/VendaController');

// rotas para gestão da model venda
router.post('/venda', VendaController.createVenda);
router.get('/venda', VendaController.listVendas);
router.get('/venda/:id', VendaController.getVendaById);
router.put('/venda/:id', VendaController.updateVenda);
router.delete('/venda/:id', VendaController.deleteVenda);

module.exports = router;
