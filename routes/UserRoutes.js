/**
 * @swagger
 * tags:
 *   - name: Usuários
 *     description: Operações relacionadas à gestão de usuários
 */

/**
 * @swagger
 * /login:
 *   post:
 *     tags: [Usuários]
 *     summary: Realiza o login de um usuário
 *     description: Autentica um usuário e retorna um token de acesso.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               usuario:
 *                 type: string
 *                 example: joao.silva
 *               senha:
 *                 type: string
 *                 example: senha123
 *     responses:
 *       200:
 *         description: Login bem-sucedido, retorna um token de acesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4iLCJpYXQiOjE1MTYyMzkwMjJ9.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"
 *       401:
 *         description: Falha na autenticação
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Usuário ou senha inválidos
 */

/**
 * @swagger
 * /users:
 *   post:
 *     tags: [Usuários]
 *     summary: Cria um novo usuário
 *     description: Adiciona um novo usuário ao sistema.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *                 example: João Silva
 *               idade:
 *                 type: integer
 *                 example: 30
 *               cpf:
 *                 type: string
 *                 example: 123.456.789-00
 *               usuario:
 *                 type: string
 *                 example: joao.silva
 *               senha:
 *                 type: string
 *                 example: senha123
 *               adm:
 *                 type: boolean
 *                 example: false
 *     responses:
 *       201:
 *         description: Usuário criado com sucesso
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
 *                   example: João Silva
 *                 usuario:
 *                   type: string
 *                   example: joao.silva
 *       400:
 *         description: Erro ao criar usuário
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Dados inválidos
 */

/**
 * @swagger
 * /users/{id}:
 *   put:
 *     tags: [Usuários]
 *     summary: Atualiza um usuário existente
 *     description: Atualiza os dados de um usuário específico.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do usuário a ser atualizado
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
 *                 example: João Silva
 *               idade:
 *                 type: integer
 *                 example: 31
 *               cpf:
 *                 type: string
 *                 example: 123.456.789-00
 *               usuario:
 *                 type: string
 *                 example: joao.silva
 *               senha:
 *                 type: string
 *                 example: senha123
 *               adm:
 *                 type: boolean
 *                 example: true
 *     responses:
 *       200:
 *         description: Usuário atualizado com sucesso
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
 *                   example: João Silva
 *                 usuario:
 *                   type: string
 *                   example: joao.silva
 *       404:
 *         description: Usuário não encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Usuário não encontrado
 */

/**
 * @swagger
 * /users:
 *   get:
 *     tags: [Usuários]
 *     summary: Lista todos os usuários
 *     description: Retorna uma lista paginada de todos os usuários.
 *     parameters:
 *       - in: query
 *         name: limite
 *         required: false
 *         description: Número de usuários a serem retornados (valores possíveis: 5, 10, 30)
 *         schema:
 *           type: integer
 *           example: 10
 *       - in: query
 *         name: página
 *         required: false
 *         description: Número da página para a listagem paginada
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: Lista de usuários
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 users:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         example: 1
 *                       nome:
 *                         type: string
 *                         example: João Silva
 *                       usuario:
 *                         type: string
 *                         example: joao.silva
 *                 total:
 *                   type: integer
 *                   example: 50
 *       500:
 *         description: Erro ao listar usuários
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Erro ao listar usuários
 */

/**
 * @swagger
 * /users/{id}:
 *   get:
 *     tags: [Usuários]
 *     summary: Retorna um usuário específico
 *     description: Retorna os detalhes de um usuário específico pelo ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do usuário a ser retornado
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: Detalhes do usuário
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
 *                   example: João Silva
 *                 usuario:
 *                   type: string
 *                   example: joao.silva
 *       404:
 *         description: Usuário não encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Usuário não encontrado
 */

/**
 * @swagger
 * /users/{id}:
 *   delete:
 *     tags: [Usuários]
 *     summary: Remove um usuário
 *     description: Remove um usuário específico pelo ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do usuário a ser removido
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: Usuário removido com sucesso
 *       404:
 *         description: Usuário não encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Usuário não encontrado
 */

/**
 * @swagger
 * /deteleUser/{id}:
 *   delete:
 *     tags: [Usuários]
 *     summary: Remove um usuário (rota alternativa)
 *     description: Remove um usuário específico pelo ID. Esta rota é uma rota alternativa para a remoção de usuários.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do usuário a ser removido
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: Usuário removido com sucesso
 *       404:
 *         description: Usuário não encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Usuário não encontrado
 */

/**
 * @swagger
 * /makeAdm/{id}:
 *   put:
 *     tags: [Usuários]
 *     summary: Torna um usuário administrador
 *     description: Atualiza um usuário para conceder privilégios de administrador.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do usuário a ser atualizado para administrador
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: Usuário atualizado para administrador com sucesso
 *       404:
 *         description: Usuário não encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Usuário não encontrado
 */

const express = require('express');
const router = express.Router();
const userController = require('../controller/UserController');

// Rotas para gestão da model usuário
router.post('/login', userController.login.bind(userController));
router.post('/users', userController.create.bind(userController));
router.put('/users/:id', userController.update.bind(userController));
router.get('/users', userController.list.bind(userController));
router.get('/users/:id', userController.getById.bind(userController));
router.delete('/users/:id', userController.delete.bind(userController));
router.delete('/deteleUser/:id', userController.delete.bind(userController));
router.put('/makeAdm/:id', userController.makeAdm.bind(userController));

module.exports = router;
