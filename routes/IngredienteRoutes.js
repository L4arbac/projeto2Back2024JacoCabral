/**
 * @swagger
 * tags:
 *   - name: Ingredientes
 *     description: Operações relacionadas aos ingredientes
 */

/**
 * @swagger
 * /ingrediente:
 *   post:
 *     tags: [Ingredientes]
 *     summary: Cria um novo ingrediente
 *     description: Adiciona um novo ingrediente ao banco de dados.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *                 example: Açúcar
 *               preco:
 *                 type: number
 *                 format: float
 *                 example: 2.50
 *               quantidade:
 *                 type: number
 *                 format: float
 *                 example: 100
 *     responses:
 *       201:
 *         description: Ingrediente criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   example: 1
 *                 nome:
 *                   type: string
 *                   example: Açúcar
 *                 preco:
 *                   type: number
 *                   format: float
 *                   example: 2.50
 *                 quantidade:
 *                   type: number
 *                   format: float
 *                   example: 100
 *       400:
 *         description: Erro de solicitação
 *       500:
 *         description: Erro do servidor
 */

/**
 * @swagger
 * /ingrediente/{id}:
 *   put:
 *     tags: [Ingredientes]
 *     summary: Atualiza um ingrediente existente
 *     description: Atualiza os detalhes de um ingrediente existente.
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID do ingrediente que será atualizado.
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
 *               nome:
 *                 type: string
 *                 example: Açúcar
 *               preco:
 *                 type: number
 *                 format: float
 *                 example: 2.50
 *               quantidade:
 *                 type: number
 *                 format: float
 *                 example: 100
 *     responses:
 *       200:
 *         description: Ingrediente atualizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   example: 1
 *                 nome:
 *                   type: string
 *                   example: Açúcar
 *                 preco:
 *                   type: number
 *                   format: float
 *                   example: 2.50
 *                 quantidade:
 *                   type: number
 *                   format: float
 *                   example: 100
 *       400:
 *         description: Erro de solicitação
 *       404:
 *         description: Ingrediente não encontrado
 *       500:
 *         description: Erro do servidor
 */

/**
 * @swagger
 * /ingrediente:
 *   get:
 *     tags: [Ingredientes]
 *     summary: Lista todos os ingredientes
 *     description: Retorna uma lista de todos os ingredientes registrados.
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
 *         description: Lista de ingredientes
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
 *                   nome:
 *                     type: string
 *                     example: Açúcar
 *                   preco:
 *                     type: number
 *                     format: float
 *                     example: 2.50
 *                   quantidade:
 *                     type: number
 *                     format: float
 *                     example: 100
 *       400:
 *         description: Erro de solicitação
 *       500:
 *         description: Erro do servidor
 */

/**
 * @swagger
 * /ingrediente/{id}:
 *   get:
 *     tags: [Ingredientes]
 *     summary: Obtém um ingrediente por ID
 *     description: Retorna os detalhes de um ingrediente específico.
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID do ingrediente que será retornado.
 *         required: true
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: Detalhes do ingrediente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   example: 1
 *                 nome:
 *                   type: string
 *                   example: Açúcar
 *                 preco:
 *                   type: number
 *                   format: float
 *                   example: 2.50
 *                 quantidade:
 *                   type: number
 *                   format: float
 *                   example: 100
 *       404:
 *         description: Ingrediente não encontrado
 *       500:
 *         description: Erro do servidor
 */

/**
 * @swagger
 * /ingrediente/{id}:
 *   delete:
 *     tags: [Ingredientes]
 *     summary: Remove um ingrediente
 *     description: Remove um ingrediente existente do banco de dados.
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID do ingrediente que será removido.
 *         required: true
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: Ingrediente removido com sucesso
 *       404:
 *         description: Ingrediente não encontrado
 *       500:
 *         description: Erro do servidor
 */

const express = require('express');
const router = express.Router();
const IngredienteController = require('../controller/IngredienteController');

// rotas para gestão da model ingrediente
router.post('/ingrediente', IngredienteController.createIngrediente);
router.put('/ingrediente/:id', IngredienteController.updateIngrediente);
router.get('/ingrediente', IngredienteController.listIngredientes);
router.get('/ingrediente/:id', IngredienteController.getIngredienteById);
router.delete('/ingrediente/:id', IngredienteController.deleteIngrediente);

module.exports = router;
