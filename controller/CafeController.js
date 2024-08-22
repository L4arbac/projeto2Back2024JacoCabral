const CafeService = require("../service/CafeService");
const authMiddleware = require("../auth/authMiddleware");

const CafeController = {
  async create(req, res) {
    // #swagger.tags = ['Café']
    // #swagger.description = 'Endpoint para criar um café.'
    authMiddleware.authenticateToken(req, res, async () => {
      try {
        if (req.user.adm) {
          const { nome, descricao, preco, ingredienteIds } = req.body;
          const cafe = await CafeService.createCafe(nome, descricao, preco, ingredienteIds);
          res.status(201).json({
            message: 'Café criado com sucesso!',
            data: cafe,
          });
        } else {
          res.status(403).json({
            message: 'Processo só poderá ser realizado por um ADM!',
          });
        }
      } catch (error) {
        res.status(400).json({
          message: 'Erro ao criar café',
          error: error.message,
        });
      }
    });
  },

  async getAll(req, res) {
    // #swagger.tags = ['Café']
    // #swagger.description = 'Endpoint para listar todos os cafés com paginação.'
    try {
      const limite = parseInt(req.query.limite) || 5;
      const pagina = parseInt(req.query.pagina) || 1;

      if (![5, 10, 30].includes(limite)) {
        return res.status(400).json({ message: "Limite inválido. Os valores possíveis são 5, 10 ou 30." });
      }

      const cafes = await CafeService.getAllCafes(limite, pagina);
      res.status(200).json({
        message: 'Cafés listados com sucesso!',
        data: cafes,
      });
    } catch (error) {
      res.status(500).json({
        message: 'Erro ao listar cafés',
        error: error.message,
      });
    }
  },

  async getById(req, res) {
    // #swagger.tags = ['Café']
    // #swagger.description = 'Endpoint para obter um café pelo ID.'
    try {
      const { id } = req.params;
      const cafe = await CafeService.getCafeById(id);
      if (!cafe) {
        return res.status(404).json({
          message: 'Café não encontrado.',
        });
      }
      res.status(200).json({
        message: 'Café recuperado com sucesso!',
        data: cafe,
      });
    } catch (error) {
      res.status(404).json({
        message: 'Erro ao buscar café',
        error: error.message,
      });
    }
  },

  async update(req, res) {
    // #swagger.tags = ['Café']
    // #swagger.description = 'Endpoint para atualizar um café pelo ID.'
    authMiddleware.authenticateToken(req, res, async () => {
      try {
        if (req.user.adm) {
          const { id } = req.params;
          const updates = req.body;
          const cafe = await CafeService.updateCafe(id, updates);
          res.status(200).json({
            message: 'Café atualizado com sucesso!',
            data: cafe,
          });
        } else {
          res.status(403).json({
            message: 'Processo só poderá ser realizado por um ADM!',
          });
        }
      } catch (error) {
        res.status(400).json({
          message: 'Erro ao atualizar café',
          error: error.message,
        });
      }
    });
  },

  async delete(req, res) {
    // #swagger.tags = ['Café']
    // #swagger.description = 'Endpoint para deletar um café pelo ID.'
    authMiddleware.authenticateToken(req, res, async () => {
      try {
        if (req.user.adm) {
          const { id } = req.params;
          await CafeService.deleteCafe(id);
          res.status(200).json({
            message: 'Café deletado com sucesso!',
          });
        } else {
          res.status(403).json({
            message: 'Processo só poderá ser realizado por um ADM!',
          });
        }
      } catch (error) {
        res.status(404).json({
          message: 'Erro ao deletar café',
          error: error.message,
        });
      }
    });
  },
};

module.exports = CafeController;
